const mysqlQuery = require('./data-access/connection');
const makeGetAttachmentsDb = require('./data-access/get-attachments-db');

const {getAttachments,updateAttachment} = makeGetAttachmentsDb({ mysqlQuery });
const download = require('download-file')


async function runScript() {
    // console.log('script started....');
    try {
        const folderPath = `${__dirname}/attachments`;
        const attachments = await getAttachments();
        for (const attachment of attachments) {
            if (attachment.url) {
                var options = {
                    directory: folderPath,
                    filename: `${attachment.id}-${attachment.name}`
                }
                 
                const file = attachment.url;
                download(file, options,async function(err){
                    if (err) {
                        await updateAttachment(attachment.id,err);
                        console.log(`Error in file download - id:${attachment.id}`,err);
                    }
                    else{
                        await updateAttachment(attachment.id,null);
                        console.log(`File downloaded successfully! - ${attachment.id}`);
                    }
                }) 
            }
        }

        // console.log('script ended....');
    }
    catch (e) {
        console.log('error in downloading attachments');
        console.log(e);
    }
}

runScript();
