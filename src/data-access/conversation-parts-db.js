const TABLE_NAME = 'conversation_parts';

function makeConversationPartsDb({mysqlQuery}) {
    return async function createConversationPart(data) {
       
        const query = `INSERT INTO ${TABLE_NAME}
        (conversation_parts_id,conversation_id,type,part_type,body,created_at,updated_at,notified_at,assigned_to_id,assigned_to_type,author_id,author_type,author_name,author_email,attachments_id,external_id,json_data,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())`;
        const values = [
            data.id,
            data.conversation_id,
            data.type,
            data.part_type,
            data.body,
            new Date(data.created_at*1000),
            new Date(data.updated_at*1000),
            new Date(data.notified_at*1000),
            data.assigned_to_id,
            data.assigned_to_type,
            data.author_id,
            data.author_type,
            data.author_name,
            data.author_email,
            data.attachments_id,
            data.external_id,
            JSON.stringify(data)
        ];

        const cp = await cp_Exists(data.id);
        if(cp && cp.length>0){
            return cp[0].id;
        }else{
            const res = await mysqlQuery(query,values)
            return res.insertId
        }


        // const res = await mysqlQuery(query,values);
        // return res.insertId
    }

    async function cp_Exists(cp_Id) {
        const query = `select * from ${TABLE_NAME} where conversation_parts_id = ${cp_Id}`
        const tag = await mysqlQuery(query);
        return tag;
    }

}


module.exports = makeConversationPartsDb;
