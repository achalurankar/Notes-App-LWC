import { LightningElement, wire, track } from 'lwc';

import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import noteSelectedChannel from '@salesforce/messageChannel/noteSelectedChannel__c';

export default class NoteEditor extends LightningElement {
    
    subscription = null;
    @wire(MessageContext)
    messageContext;

    @track note = {}

    connectedCallback() {
        this.subscribeToMessageChannel()
    }

    subscribeToMessageChannel() {
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
    }
}