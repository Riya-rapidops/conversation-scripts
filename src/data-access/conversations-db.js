const TABLE_NAME = 'conversations';

function makeConversationsDb({mysqlQuery}) {
    return Object.freeze({
        createConversations,
        getAllConversations,
        updateConversation
      });

    async function createConversations(data) {
        const query = `INSERT INTO ${TABLE_NAME}
        (conversation_id,type,created_at,updated_at,waiting_since,snoozed_until,open,state,conversation_read,tags_id,assignee_id,assignee_type,customer_first_reply_created_at,customer_first_reply_type,customer_first_reply_url,customers_id,user_type,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())`;
        const values = [
            data.id,
            data.type,
            new Date(data.created_at*1000),
            new Date(data.updated_at*1000),
            data.waiting_since,
            data.snoozed_until,
            data.open,
            data.state,
            data.read,
            data.tags_id,
            data.assignee_id,
            data.assignee_type,
            new Date(data.customer_first_reply_created_at*1000),
            data.customer_first_reply_type,
            data.customer_first_reply_url,
            data.customers_id,
            // data.user_id,
            data.user_type
        ];
        const res = await mysqlQuery(query,values)
        return res.insertId
    }

    async function getAllConversations(id) {
        const query = `SELECT id,conversation_id FROM ${TABLE_NAME} where conversation_parts_sync='0' && id>${id} limit 1000`;
        const conversations = await mysqlQuery(query);
        console.log("Total Conversations: ",conversations.length);
        return conversations;
    }

    async function updateConversation(data,user_id, id) {
        const query = `UPDATE ${TABLE_NAME} SET conversation_rating = ?,conversation_rating_remark = ?,conversation_rating_created_at = ?,user_id = ?,conversation_parts_sync = ? WHERE id = ?`;
        // const query = `UPDATE ${TABLE_NAME} SET conversation_parts_sync = ? WHERE id = ?`;

        const values = [
            data.rating,
            data.remark,
            new Date(data.created_at*1000),
            user_id,
            1,
            id
        ];
        const res = await mysqlQuery(query, values)
        return res.affectedRows
    }
}


module.exports = makeConversationsDb;
