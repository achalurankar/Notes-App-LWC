global class NoteWrapper{

    @AuraEnabled public String id;
    @AuraEnabled public String data;
    @AuraEnabled public String title;

    public NoteWrapper(Note__c note) {
        this.id = note.Id;
        this.data = note.Data__c;
        this.title = note.Title__c;
    }
    
    public Note__c getObject() {
        Note__c note = new Note__c();
        note.Id = this.id;
        note.Data__c = this.data;
        note.Title__c = this.title;
        return note;
    }

    public static NoteWrapper parse(String jsonString) {
        return (NoteWrapper) JSON.deserialize(jsonString, NoteWrapper.class);
    }
}