const axios = require('axios')
const makeGetAllConversation = require('./external-api-call/get-all-conversation')
const intercomAccessToken = 'Bearer dG9rOmE5MTRkMzYyXzI0OWNfNGFlMl9iNWU5X2VjYzA1MGFmMzg1ZjoxOjA=';

const makeConversationsDb = require('./data-access/conversations-db');
const makeConversationMessagesDb = require('./data-access/conversation-message-db');
const makeCustomersDb = require('./data-access/customers-db');
const makeTagsDb = require('./data-access/tags-db');
const makeAttachmentsDb = require('./data-access/attachments-db');
const mysqlQuery = require('./data-access/connection');

const getAllConversations = makeGetAllConversation({ axios, intercomAccessToken });
const {createConversations} = makeConversationsDb({ mysqlQuery });
const createConversationMessage = makeConversationMessagesDb({ mysqlQuery });
const createAttachment= makeAttachmentsDb({mysqlQuery});
const createCustomer = makeCustomersDb({ mysqlQuery });
const createTags = makeTagsDb({ mysqlQuery });

const pageNumber = 1
let total_pages;
let count = 0;
function flattenObj(obj, parent, result = {}) {
    for (let key in obj) {

        let propName = parent ? parent + '_' + key : key;
        if (obj[key] && typeof obj[key] === 'object') {
            flattenObj(obj[key], propName, result);
        } else {
            result[propName] = obj[key];
        }
    }
    return result;
}

async function runScript() {
    console.log('script started....');
    try {
       
        for (let i = 612; i <= 734; i++) {
            console.log(`-------------- Page Number ${i} -----------------`);
            const resData = await getAllConversations(i);
            const conversations = resData.conversations;

            for (const conversation of conversations) {
                //Inserting tags data...
                let tags_id;
                if(conversation.tags?.tags && conversation.tags.tags.length>0){
                    for (const tag of conversation.tags.tags) {
                        const tagData = flattenObj(tag);
                        const tag_id = await createTags(tagData);
                        tags_id = tags_id ? tags_id + `,${tag_id}` : tag_id
                    }
                }

                //Inserting cunstomers data...
                let customers_id=''
                if(conversation.customers && conversation.customers.length>0){
                    for (const customer of conversation.customers) {
                        const customer_id = await createCustomer(customer);
                        customers_id = customers_id ? customers_id + `,${customer_id}` : customer_id
                    }
                }

                //Inserting attachments data...
                let attachments_id=''
                if(conversation.conversation_message.attachments && conversation.conversation_message.attachments.length>0){
                    for (const attachment of conversation.conversation_message.attachments) {
                        const attachment_id = await createAttachment(attachment);
                        attachments_id = attachments_id ? attachments_id + `,${attachment_id}` : attachment_id
                    }
                }

                //Inserting conversation-messages ...
                const conversationMessageData = flattenObj(conversation.conversation_message);
                conversationMessageData.conversation_id = conversation.id;
                conversationMessageData.attachments_id = attachments_id ? `${attachments_id}` : ''
                const con_msg_id = await createConversationMessage(conversationMessageData);

                //Inserting conversation....
                const conversationData = flattenObj(conversation);
                conversationData.tags_id = tags_id ? `${tags_id}` : '';
                conversationData.customers_id = customers_id ? `${customers_id}` : ''
                
                const conversation_id = await createConversations(conversationData);
                console.log('conversation created',conversation_id);
            }
        }
        console.log(`script ended ....`);
    } catch (e) {
        console.log(e);
    }
}

runScript();