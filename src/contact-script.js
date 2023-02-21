const mysqlQuery = require("./data-access/connection");
const makeContactsDb = require("./data-access/contact-db");


const {getAllContacts,updateContact} = makeContactsDb({mysqlQuery});

async function runScript(){
    console.log('Script started....');
    try{

        const allContacts = await getAllContacts();
        for (const contact of allContacts) {
            const data = JSON.parse(contact.data);
            await updateContact(data,contact.id);
            console.log(`Contact updated for id: ${contact.id}`);
        }
    }catch(e){
        console.log(e);
    }
}
runScript();