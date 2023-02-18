import { LightningElement, track, wire } from 'lwc';

import getNotes from '@salesforce/apex/NoteManager.getNotes';
import { publish, subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import noteSelectedChannel from '@salesforce/messageChannel/noteSelectedChannel__c';
import noteUpdatedChannel from '@salesforce/messageChannel/noteUpdatedChannel__c';

export default class NotesEnhanced extends LightningElement {

    @track notes;

    subscription = null;
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeForNoteUpdate();
        getNotes()
            .then(notes => {
                this.notes = notes;
                // console.log('notes', JSON.stringify(notes))
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

    subscribeForNoteUpdate() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                noteUpdatedChannel,
                (note) => this.handleNoteUpdate(note),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    handleNoteUpdate(note) {
        let tempNotes = JSON.parse(JSON.stringify(this.notes));
        for(let noteIndex in tempNotes) {
            if(tempNotes[noteIndex].id === note.id) {
                tempNotes[noteIndex] = note;
                break;
            }
        }
        this.notes = tempNotes;
    }

    handleNoteCreate(event) {
        let note = event.detail.note;
        this.notes.unshift(note)
    }
}