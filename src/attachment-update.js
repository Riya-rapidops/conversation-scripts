const mysqlQuery = require("./data-access/connection");
const makeGetConversation = require('./external-api-call/get-conversation');
const axios = require('axios')
const intercomAccessToken = 'Bearer dG9rOmE5MTRkMzYyXzI0OWNfNGFlMl9iNWU5X2VjYzA1MGFmMzg1ZjoxOjA=';
const getConversation = makeGetConversation({ axios, intercomAccessToken });



async function runScript(){
    const query = `select id,conversation_id,attachments_id from conversation_messages where attachments_id!='' && id>=1`;
    const cps = await mysqlQuery(query);
    for (const cp of cps) {
        console.log("id: ",cp.id);
        const all_attachment_ids = cp.attachments_id.split(',');
        let attachment_ids;
        for (const attachment_id of all_attachment_ids) {
            const res = await mysqlQuery(`select * from attachments where id=${attachment_id}`);
            const data = res[0];
            const values = [
                data.type,
                data.name,
                data.url,
                data.content_type,
                data.filesize,
                data.width,
                data.height
            ]
            const response = await mysqlQuery('INSERT into attachment(type,name,url,content_type,filesize,width,height,createdAt,updatedAt) VALUES(?,?,?,?,?,?,?,NOW(),NOW())', values)
            attachment_ids = attachment_ids ? `${attachment_ids},${response.insertId}` : response.insertId
        }
        await mysqlQuery(`UPDATE conversation_messages SET attachment_ids=? where id=?`,[attachment_ids,cp.id]);
        console.log(`cp updated for id: ${cp.id}`);
        
        console.log('-----------------------------------------------');
    
        
    }

}
runScript();