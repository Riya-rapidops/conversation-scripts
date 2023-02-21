const { INTEGER } = require("sequelize");

const TABLE_NAME = 'attachments';

function makeAttachmentsDb({ mysqlQuery }) {

    return async function createAttachment(data) {
        const query = `INSERT INTO ${TABLE_NAME}
        (type,name,url,content_type,filesize,width,height,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,NOW(),NOW())`;
        const values = [
            data.type,
            data.name,
            data.url,
            data.content_type,
            data.filesize,
            data.width,
            data.height
        ];

        const res = await mysqlQuery(query, values)
        return res.insertId
    }
    
}

module.exports = makeAttachmentsDb;
