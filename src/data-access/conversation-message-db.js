const TABLE_NAME = 'conversation_messages';

function makeConversationMessagesDb({mysqlQuery}) {
    return async function createConversationMessage(data) {
       
        const query = `INSERT INTO ${TABLE_NAME}
        (conversation_message_id,conversation_id,type,delivered_as,subject,body,author_id,author_type,author_name,author_email,attachments_id,url,json_data,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())`;
        const values = [
            data.id,
            data.conversation_id,
            data.type,
            data.delivered_as,
            data.subject,
            data.body,
            data.author_id,
            data.author_type,
            data.author_name,
            data.author_email,
            data.attachments_id,
            data.url,
            JSON.stringify(data)
        ];
        const res = await mysqlQuery(query,values);
        return res.insertId
    }

}


module.exports = makeConversationMessagesDb;

