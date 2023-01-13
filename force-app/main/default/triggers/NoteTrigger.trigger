trigger NoteTrigger on Note__c (after insert, after update, after delete) {
    
    //fire event for note update as records have been updated
    List<Note__c> records = Trigger.isDelete ? Trigger.old : Trigger.new;
    List<Note_Event__e> evts = new List<Note_Event__e>();
    for (Note__c note : records) {
        Note_Event__e evt = new Note_Event__e();
        evt.Id__c = note.Id;
        evt.Data__c = note.Data__c;
        evt.Name__c = note.Name;
        evt.Action__c = Trigger.isDelete ? 'delete' : 'insert';
        evts.add(evt);
    }
    List<Database.SaveResult> results = EventBus.publish(evts);
    // Inspect publishing result for each event
    for (Database.SaveResult sr : results) {
        if (sr.isSuccess()) {
            System.debug('Successfully published event.');
        } else {
            for(Database.Error err : sr.getErrors()) {
                System.debug('Error returned: ' +
                            err.getStatusCode() +
                            ' - ' +
                            err.getMessage());
            }
        }       
    }
}