const TABLE_NAME = 'conversations';

function makeGetConversationsDb({mysqlQuery}) {
    return Object.freeze({
        getAllConversations,
        updateConversation
      });
    
     async function getAllConversations() {
        const query = `SELECT id,conversation_id FROM ${TABLE_NAME} where conversation_parts_sync='0' limit 100`;
        const conversations = await mysqlQuery(query);
        console.log("Total Conversations: ",conversations.length);
        return conversations;
    }
    async function updateConversation(data, id) {
        console.log(data);
        const query = `UPDATE ${TABLE_NAME} SET conversation_rating = ?,conversation_rating_remark = ?,conversation_rating_created_at = ?,conversation_parts_sync = ? WHERE id = ?`;
        const values = [
            data.rating,
            data.remark,
            new Date(data.created_at*1000),
            1,
            id
        ];
        const res = await mysqlQuery(query, values)
        return res.affectedRows
    }
}


module.exports = makeGetConversationsDb;


