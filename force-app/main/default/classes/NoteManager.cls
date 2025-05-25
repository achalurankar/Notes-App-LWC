@RestResource(urlMapping='/Notes/*')
global virtual class NoteManager{
    
    @AuraEnabled
    @HttpGet
    global static List<NoteWrapper> getNotes(){
        List<Note__c> notes = [SELECT Id, Name, Title__c, Is_Synced__c, Data__c FROM Note__c ORDER BY LastModifiedDate DESC];
        List<NoteWrapper> notesToReturn = new List<NoteWrapper>();
        for(Note__c note : notes) {
            notesToReturn.add(new NoteWrapper(note));
        }
        return notesToReturn;
    }
    
    @AuraEnabled
    @HttpPost
    global static ResponseWrapper manageNote(string payload, string action){
        try{
            NoteWrapper wrapper = NoteWrapper.parse(payload);
            Note__c note = wrapper.getObject();
            if(action == 'insert') {
                insert note;
            } else if(action == 'delete') {
                delete note;
            } else if(action == 'update') {
                update note;
            }
            return new ResponseWrapper(note.Id, true, action + ' successful');
        } catch(Exception e){
            return new ResponseWrapper(null, false, e.getMessage());
        }
    }
    
    global class ResponseWrapper {
        @AuraEnabled global string id;
        @AuraEnabled global boolean isSuccess;
        @AuraEnabled global string message;
        
        public ResponseWrapper(string id, boolean isSuccess, string message){
            this.id = id;
            this.isSuccess = isSuccess;
            this.message = message; 
        }
    }
}