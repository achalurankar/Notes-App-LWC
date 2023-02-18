import { LightningElement } from 'lwc';

import Utils from 'c/utils';
import manageNote from '@salesforce/apex/NoteManager.manageNote';

export default class CreateNote extends LightningElement {

    handleCreateClick() {
        let note = {
            id : null,
            title : 'New Page',
            data : null
        }
        Utils.dispatchEvent(this, 'notecreate', {
            note : note
        })
        this.createNote(note)
    }

    async createNote(note) {
        await manageNote({
            payload : JSON.stringify(note),
            action : 'insert'
        })
    }
}