const mysqlQuery = require("./data-access/connection");
const makeContactsDb = require("./data-access/contact-db");


// const {getAllContacts,updateContact} = makeContactsDb({mysqlQuery});

async function runScript() {
    console.log('Script started....');
    try {

        const allCp = await mysqlQuery(`select id,json_data from conversation_parts where attachments_id!='' && id>419609`);
        for (const cp of allCp) {
            const attachments = JSON.parse(cp.json_data).attachments;
            let attachment_ids;
            if (attachments && attachments.length > 0) {
                for (const attachment of attachments) {
                    const values = [
                        attachment.type,
                        attachment.name,
                        attachment.url,
                        attachment.content_type,
                        attachment.filesize,
                        attachment.width,
                        attachment.height
                    ]
                    const res = await mysqlQuery('INSERT into attachment(type,name,url,content_type,filesize,width,height,createdAt,updatedAt) VALUES(?,?,?,?,?,?,?,NOW(),NOW())', values)
                    console.log(res.insertId);
                    attachment_ids = attachment_ids ? `${attachment_ids},${res.insertId}` : res.insertId
                }
                console.log(cp.id + ' - ' + attachment_ids);
            }
            await mysqlQuery(`UPDATE conversation_parts SET attachment_ids=? where id=?`,[attachment_ids,cp.id]);
            console.log(`cp updated for id: ${cp.id}`);
        }
    } catch (e) {
        console.log(e);
    }
}
runScript();

