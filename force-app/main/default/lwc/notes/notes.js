import { LightningElement, track } from 'lwc';

import getNotes from '@salesforce/apex/NoteManager.getNotes';
import manageNote from '@salesforce/apex/NoteManager.manageNote';

import Utils from 'c/utils';

export default class Notes extends LightningElement {

    @track notes;

    connectedCallback(){
        Utils.startPolling(getNotes, (notes) => {
            this.notes = notes;
        })
    }

    handleCopyToClipboard(event) {
        //todo copy to clipboard
        var data = event.currentTarget.dataset.data;
        navigator.clipboard.writeText(data); // not working
    }

    handleDeleteClick(event) {
        var id = event.currentTarget.dataset.id;
        this.postNote(id, 'delete');
    }

    handlePostClick() {
        let inp = this.template.querySelector('.input');
        let data = inp.value;
        inp.value = "";
        this.postNote(data, 'insert');
    }

    postNote(data, action) {
        manageNote({ data : data, action : action })
            .then(result => {
                // log(result, true);
            })
            .catch(error => {
                Utils.log(error, true);
            });
    }
}