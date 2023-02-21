const mysqlQuery = require("./data-access/connection");
const makeContactsDb = require("./data-access/contact-db");


// const {getAllContacts,updateContact} = makeContactsDb({mysqlQuery});

async function runScript(){
    console.log('Script started....');
    try{

        const allCp = await mysqlQuery(`select id,json_data from conversation_parts where id>=420068`);
        for (const cp of allCp) {
            const author = JSON.parse(cp.json_data).author;
            const assigned_to = JSON.parse(cp.json_data).assigned_to;
            const values = [
                assigned_to ? assigned_to.id : '',
                assigned_to ? assigned_to.type : '',
                author.id ? author.id : '',
                author.type ? author.type : '',
                author.name ? author.name : '',
                author.email ? author.email : '',
                cp.id]
            await mysqlQuery(`UPDATE conversation_parts SET assigned_to_id=?,assigned_to_type=?, author_id = ? ,author_type = ?,author_name = ?,author_email = ? where id=?`,values);
            console.log(`cp updated for id: ${cp.id}`);
        }
    }catch(e){
        console.log(e);
    }
}
runScript();