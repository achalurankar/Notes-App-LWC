import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import noteSelectedChannel from '@salesforce/messageChannel/noteSelectedChannel__c';
import noteDeletedChannel from '@salesforce/messageChannel/noteDeletedChannel__c';

export default class NotePreview extends LightningElement {

    @api note

    @wire(MessageContext)
    messageContext;

    selectNote(event) {
        publish(this.messageContext, noteSelectedChannel, this.note);
    }

    deleteNote() {
        publish(this.messageContext, noteDeletedChannel, this.note);
    }
}