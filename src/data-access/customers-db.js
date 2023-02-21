const TABLE_NAME = 'customers';

function makeCustomersDb({mysqlQuery}) {
    
    return async function createCustomer(data) {
        const query = `INSERT INTO ${TABLE_NAME}
        (customer_id,type,createdAt,updatedAt) VALUES (?,?,NOW(),NOW())`;
        const values = [
            data.id,
            data.type
        ];

        const customer = await customerExists(data.id);
        if(customer && customer.length>0){
            return customer[0].id;
        }else{
            const res = await mysqlQuery(query,values)
            return res.insertId
        }
        
    }
    async function customerExists(customer_id) {
        const query = `select * from ${TABLE_NAME} where customer_id = '${customer_id}'`
        const tag = await mysqlQuery(query);
        return tag;
    }

}

module.exports = makeCustomersDb;
