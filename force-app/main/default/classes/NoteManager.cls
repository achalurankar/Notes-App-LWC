@RestResource(urlMapping='/Notes/*')
global class NoteManager{
    
    @AuraEnabled
    @HttpGet
    global static List<Note__c> getNotes(){
        return [SELECT Id, Name, Data__c FROM Note__c ORDER BY LastModifiedDate];
    }
    
    
    @AuraEnabled
    @HttpPost
    global static Wrapper manageNote(string data, string action){
        try{
            Note__c note = new Note__c();
            if(action == 'insert') {
                note.Data__c = data;
                insert note;
            } else if(action == 'delete') {    
                note.Id = data;
                delete note;
            }
            return new Wrapper(note.Id, true, action + ' successful');
        } catch(Exception e){
            return new Wrapper(null, false, e.getMessage());
        }
    }
    
    global class Wrapper {
        @AuraEnabled global string id;
        @AuraEnabled global boolean isSuccess;
        @AuraEnabled global string message;
        
        public Wrapper(string id, boolean isSuccess, string message){
            this.id = id;
            this.isSuccess = isSuccess;
            this.message = message; 
        }
    }
}