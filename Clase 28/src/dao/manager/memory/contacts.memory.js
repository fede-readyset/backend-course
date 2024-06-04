export class ContactsMemory {
    constructor() {
        this.contacts =  [{
            name:"David",
            phone: 1234567,
            email: "david@hola.com"
        }];
    }
    get() {
        return this.contacts;
    }
    post(contact) {
        this.contacts.push(contact);
    }
}
