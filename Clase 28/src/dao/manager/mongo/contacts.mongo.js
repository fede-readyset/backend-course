import { contactsModel } from "../../models/contacts.model.js"

export class ContactsMongo {
    constructor() {
        this.model = contactsModel;
    }
    async get() {
        return await this.model.find()
    }

    async post(contact) {
        await this.model.create(contact);
    }
}