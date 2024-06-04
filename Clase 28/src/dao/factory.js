import { options } from "../config/config.js";
const persistence = options.server.persistence;

let contactsDao;

switch (persistence) {
    case 'MONGO':
        const { ContactsMongo } = await import("./manager/mongo/contacts.mongo.js");
        const { connectDB } = await import("../config/dbConnection.js");
        connectDB;
        contactsDao = new ContactsMongo();
        break;
    case 'MEMORY':
        const { ContactsMemory } = await import("./manager/memory/contacts.memory.js");
        contactsDao = new ContactsMemory();
        break;
    default:
        break;
}


export {contactsDao}; 
