const axios = require('axios')
const intercomAccessToken = 'Bearer dG9rOmE5MTRkMzYyXzI0OWNfNGFlMl9iNWU5X2VjYzA1MGFmMzg1ZjoxOjA=';
const mysqlQuery = require('./data-access/connection');

const makeConversationsDb = require('./data-access/conversations-db');
const makeConversationPartsDb = require('./data-access/conversation-parts-db');
const makeAttachmentsDb = require('./data-access/attachments-db');
const makeGetConversation = require('./external-api-call/get-conversation');

const { getAllConversations, updateConversation } = makeConversationsDb({ mysqlQuery });
const createConversationPart = makeConversationPartsDb({ mysqlQuery });
const createAttachment = makeAttachmentsDb({ mysqlQuery });
const getConversation = makeGetConversation({ axios, intercomAccessToken });


async function runScript() {
    console.log('script started....');
    try {
        const allConversations = await getAllConversations(18066);

        console.log(allConversations[0]);
        console.log(allConversations[allConversations.length - 1]);
        for (const conversation of allConversations) {

            // getting conversation_parts data...
            let { conversation_rating, user, conversation_parts } = await getConversation(conversation.conversation_id);
            //Inserting conversation-parts data ...
            for (const conversation_part of conversation_parts.conversation_parts) {

                //Inserting attachments data...
                let attachments_id = ''
                if (conversation_part.attachments && conversation_part.attachments.length > 0) {
                    for (const attachment of conversation_part.attachments) {
                        const attachment_id = await createAttachment(attachment);
                        attachments_id = attachments_id ? attachments_id + `,${attachment_id}` : attachment_id
                    }
                }
                conversation_part.attachments_id = attachments_id ? `${attachments_id}` : ''
                conversation_part.conversation_id = conversation.conversation_id;
                const cp_id = await createConversationPart(conversation_part);

                //Updating coversation table
                await updateConversation(conversation_rating, user.id, conversation.id);

            }
            console.log('Conversation Part Created for conversation_id: ', conversation.id);
        }
        console.log('script ended....');
    } catch (e) {
        console.log('error in inserting conversations parts');
        console.log(e);
    }


}


runScript();