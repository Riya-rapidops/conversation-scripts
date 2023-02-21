const TABLE_NAME = 'contact';

function makeContactsDb({mysqlQuery}) {
    return Object.freeze({
        getAllContacts,
        updateContact
      });
    
    async function getAllContacts(id) {
        const query = `SELECT * from ${TABLE_NAME}`;
        const Contacts = await mysqlQuery(query);
        console.log("Total Contacts: ",Contacts.length);
        return Contacts;
    }

    async function updateContact(data,id) {
        const query = `UPDATE ${TABLE_NAME} SET last_request_at= ?,created_at = ?,remote_created_at = ?,signed_up_at = ?,updated_at = ? WHERE id = ?`;
        const values = [
            data.last_request_at ? new Date(data.last_request_at*1000) : null,
            data.created_at ? new Date(data.created_at*1000) : null,
            data.remote_created_at ? new Date(data.remote_created_at*1000) : null,
            data.signed_up_at ? new Date(data.signed_up_at*1000) : null,
            data.updated_at ? new Date(data.updated_at*1000) : null,
            id
        ];
        const res = await mysqlQuery(query, values)
        return res.affectedRows
    }
}


module.exports = makeContactsDb;
