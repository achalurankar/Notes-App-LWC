import { LightningElement, track, wire } from 'lwc';

import getNotes from '@salesforce/apex/NoteManager.getNotes';
import manageNote from '@salesforce/apex/NoteManager.manageNote';
import { publish, MessageContext } from 'lightning/messageService';
import noteSelectedChannel from '@salesforce/messageChannel/noteSelectedChannel__c';

import Utils from 'c/utils';

export default class NotesEnhanced extends LightningElement {

    @track notes;
    @track currentNote = {};

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        getNotes()
            .then(notes => {
                this.notes = notes;
                console.log('notes', JSON.stringify(notes))
                if(notes && notes.length > 0) {
                    publish(this.messageContext, noteSelectedChannel, notes[0]);
                }
            })
            .catch(err => {
                console.log('err', err)
            })
        // Utils.startPolling(getNotes, (notes) => {
        //     console.log(JSON.stringify(notes));
        //     this.notes = notes;
        // }, true)
    }

    // handleCopyToClipboard(event) {
    //     //todo copy to clipboard
    //     var data = event.currentTarget.dataset.data;
    //     navigator.clipboard.writeText(data); // not working
    // }

    // handleDeleteClick(event) {
    //     var id = event.currentTarget.dataset.id;
    //     this.postNote(id, 'delete');
    //     this.notes = this.notes.filter((note) => note.Id != id)
    // }

    // handlePostClick() {
    //     let inp = this.template.querySelector('.input');
    //     let data = inp.value;
    //     inp.value = "";
    //     this.postNote(data, 'insert');
    //     this.notes.unshift({
    //         Data__c: data
    //     })
    // }

    // async postNote(data, action) {
    //     await manageNote({ data : data, action : action });
    // }
}