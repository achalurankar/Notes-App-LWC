import { LightningElement, wire, track } from 'lwc';

import { publish, subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import manageNote from '@salesforce/apex/NoteManager.manageNote';
import noteSelectedChannel from '@salesforce/messageChannel/noteSelectedChannel__c';
import noteUpdatedChannel from '@salesforce/messageChannel/noteUpdatedChannel__c';

export default class NoteEditor extends LightningElement {
    
    subscription = null;
    @wire(MessageContext)
    messageContext;

    @track note = {}

    connectedCallback() {
        this.subscribeForNoteSelect()
    }

    subscribeForNoteSelect() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                noteSelectedChannel,
                (note) => this.handleNoteSelect(note),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    handleNoteSelect(note) {
        this.note = note;
        this.template.querySelector('textarea').value = note.data
    }
    
    titleCallbackId = null
    handleTitleChange(event) {
        let value = event.currentTarget.value;
        let tempNote = JSON.parse(JSON.stringify(this.note))
        tempNote.title = value
        this.note = tempNote;
        publish(this.messageContext, noteUpdatedChannel, this.note);
        if(this.titleCallbackId) 
            clearTimeout(this.titleCallbackId)
        this.titleCallbackId = setTimeout(() => {
            //save note in backend
            this.saveNote();
        }, 1000)
    }
    
    textAreaCallbackId = null
    handleTextAreaChange(event) {
        let value = event.currentTarget.value;
        let tempNote = JSON.parse(JSON.stringify(this.note))
        tempNote.data = value
        this.note = tempNote;
        publish(this.messageContext, noteUpdatedChannel, this.note);
        if(this.textAreaCallbackId) 
            clearTimeout(this.textAreaCallbackId)
        this.textAreaCallbackId = setTimeout(() => {
            //save note in backend
            this.saveNote();
        }, 1000)
    }

    saveNote() {
        manageNote({ payload : JSON.stringify(this.note), action : 'update' });
    }
}