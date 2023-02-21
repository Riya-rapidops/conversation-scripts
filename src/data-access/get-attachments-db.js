const TABLE_NAME = 'attachments';

function makeGetAttachmentsDb({ mysqlQuery }) {
    return Object.freeze({
        getAttachments,
        updateAttachment
      });
      
      async function getAttachments() {
        const query = `SELECT * FROM ${TABLE_NAME} where downloaded=0 && id>1500`;
        const res = await mysqlQuery(query);
        return res
    }
    async function updateAttachment(id,error) {
        const query = `UPDATE ${TABLE_NAME} SET downloaded = ?,error=? WHERE id = ?`;
        const values = [
            error ? '0' : '1',
            error,
            id
        ];
        const res = await mysqlQuery(query, values)
        return res.affectedRows
    }
}

module.exports = makeGetAttachmentsDb;
