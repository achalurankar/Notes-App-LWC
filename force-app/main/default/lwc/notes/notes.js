import { LightningElement, track } from 'lwc';

import getNotes from '@salesforce/apex/NoteManager.getNotes';
import manageNote from '@salesforce/apex/NoteManager.manageNote';

import { log } from 'c/utils';
import { subscribe, onError } from 'lightning/empApi';

export default class Notes extends LightningElement {

    @track notes;
    channelName = '/event/Note_Event__e';

    connectedCallback(){
        this.loadNotes();
        this.subscribeForNoteUpdates();
        this.registerErrorListener();
    }

    loadNotes() {
        getNotes()
            .then(result => {
                this.notes = result;
                // log(result, true);
            })
            .catch(error => {
                log(error, true);
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
                log(error, true);
            });
    }

    subscribeForNoteUpdates() {
        
        // Callback invoked whenever a new event message is received
        const messageCallback = (response) => {
            console.log('New message received: ', JSON.stringify(response));
            this.loadNotes();
            // Response contains the payload of the new message received
        };
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
        });
    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }
}