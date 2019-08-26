
/**
 * The addressbook class allows the provider to use the standard TbSync
 * addressbook target, which provides a changelog and some observer
 * notifications for directories, cards and lists.
 */
var StandardAddressbookTarget = class {
    /**
     * Returns the card property, which should be used as primary key for the
     * changelog. Fallback to UID, if nothing is returned.
     */
    static get primaryKeyField() {
        return "UID";
    }
    


    /**
     * Returns a value to be stored in the primary key field, if a card or list
     * does not yet have a valid primary key.
     *
     * @param {FolderData} folderData FolderData object of thedirectory, the
     *                                list belongs to
     */
    static generatePrimaryKey(folderData) {
        return TbSync.generateUUID();
    }
    


    /**
     * Returns if changes made to elements (by the user) should be added to the
     * changelog.
     */
    static get logUserChanges() {
        return true;
    }



    /**
     * An observer for directory events.
     *
     * @param {string} aTopic         Name of the event, can be one of these: 
     *                                "addrbook-removed",
     *                                "addrbook-updated"
     * @param {FolderData} folderData FolderData object of the directory,
     *                                that triggered the event 
     */
    static directoryObserver(aTopic, folderData) {
        switch (aTopic) {
            case "addrbook-removed":
            case "addrbook-updated":
                //Services.console.logStringMessage("["+ aTopic + "] " + folderData.getFolderProperty("foldername"));
                break;
        }
    }
    


    /**
     * An observer for card events.
     *
     * @param {string} aTopic         Name of the event, can be one of these: 
     *                                "addrbook-contact-updated",
     *                                "addrbook-contact-removed",
     *                                "addrbook-contact-created"
     * @param {FolderData} folderData FolderData object of the directory,
     *                                containing the card that triggered the
     *                                event 
     * @param {AbCardItem} abCardItem AbCardItem of the card that triggered
     *                                the event 
     */
    static cardObserver(aTopic, folderData, abCardItem) {
        switch (aTopic) {
            case "addrbook-contact-updated":
            case "addrbook-contact-removed":
                //Services.console.logStringMessage("["+ aTopic + "] " + abCardItem.getProperty("DisplayName"));
                break;

            case "addrbook-contact-created":
            {
                //Services.console.logStringMessage("["+ aTopic + "] " + abCardItem.getProperty("DisplayName"));
                break;
            }
        }
    }
    


    /**
     * An observer for list events.
     *
     * @param {string} aTopic           Name of the event, can be one of these:
     *                                  "addrbook-list-member-added",
     *                                  "addrbook-list-member-removed",
     *                                  "addrbook-list-removed",
     *                                  "addrbook-list-updated",
     *                                  "addrbook-list-created"
     * @param {FolderData} folderData   FolderData object of the directory,
     *                                  containing the list that triggered the
     *                                  event 
     * @param {AbListItem} abListItem   AbListItem of the list that triggered
     *                                  the event 
     * @param {AbCardItem} [abListMember] AbCardItem of the member of the list
     *                                    that triggered the event 
     */
    static listObserver(aTopic, folderData, abListItem, abListMember) {
        switch (aTopic) {
            case "addrbook-list-member-added":
            case "addrbook-list-member-removed":
                //Services.console.logStringMessage("["+ aTopic + "] MemberName: " + abListMember.getProperty("DisplayName"));
                break;
            
            case "addrbook-list-removed":
            case "addrbook-list-updated":
                //Services.console.logStringMessage("["+ aTopic + "] ListName: " + abListItem.getProperty("ListName"));
                break;
            
            case "addrbook-list-created": 
                //Services.console.logStringMessage("["+ aTopic + "] ListName: " + abListItem.getProperty("ListName"));
                break;
        }
    }
    


    /**
     * Create a new address book.
     *
     * @param {string} newname         name of the new address book
     * @param {FolderData} folderData  FolderData object belonging to the new
     *                                 address book
     * @returns {nsIAbDirectory}       the new address book
     */
    static createAddressBook(newname, folderData) {
        let dirPrefId = MailServices.ab.newAddressBook(newname, "", 2);
        let directory = MailServices.ab.getDirectoryFromId(dirPrefId);

        if (directory && directory instanceof Components.interfaces.nsIAbDirectory && directory.dirPrefId == dirPrefId) {
            directory.setStringValue("tbSyncIcon", "__ProviderNameSpace__");
            
            // Disable AutoComplete, so we can have full control over the auto completion of our own directories.
            // Implemented in https://bugzilla.mozilla.org/show_bug.cgi?id=1546425
            directory.setBoolValue("enable_autocomplete", false);
            
            return directory;
        }
        return null;
    }
}



/**
 * The calendar class allows the provider to use the standard TbSync
 * calendar target, which provides a changelog and some observer
 * notifications for calendars and events.
 */
var StandardCalendarTarget = class {        
    // The calendar target does not support a custom primaryKeyField, because
    // the lightning implementation only allows to search for items via UID.
    // Like the addressbook target, the calendar target item element has a
    // primaryKey getter/setter which - however - only works on the UID.
    
    /**
     * Returns if changes made to elements (by the user) should be added to the
     * changelog.
     */
    static get logUserChanges() {
        return false;
    }



    /**
     * An observer for calendar events.
     *
     * @param {string} aTopic         Name of the event, can be one of these: 
     *                                "onCalendarPropertyChanged",
     *                                "onCalendarPropertyDeleted",
     *                                "onCalendarDeleted"
     * @param {FolderData} folderData FolderData object of the calendar,
     *                                that triggered the event 
     */
    static calendarObserver(aTopic, folderData, tbCalendar, aPropertyName, aPropertyValue, aOldPropertyValue) {
        switch (aTopic) {
            case "onCalendarPropertyChanged":
                //Services.console.logStringMessage("["+ aTopic + "] " + tbCalendar.calendar.name + " : " + aPropertyName);
                break;
            
            case "onCalendarDeleted":
            case "onCalendarPropertyDeleted":
                //Services.console.logStringMessage("["+ aTopic + "] " +tbCalendar.calendar.name);
                break;
        }
    }



    /**
     * An observer for item events.
     *
     * @param {string} aTopic         Name of the event, can be one of these: 
     *                                "onAddItem",
     *                                "onModifyItem"
     *                                "onDeleteItem"
     * @param {FolderData} folderData FolderData object of the calendar,
     *                                that triggered the event 
     * @param {TbItem} tbItem         TbItem of the item that triggered
     *                                the event 
     * @param {TbItem} [tbOldItem]    TbItem of the item before the change was
     *                                made
     */
    static itemObserver(aTopic, folderData, tbItem, tbOldItem) {
        switch (aTopic) {
            case "onAddItem":
            case "onModifyItem":
            case "onDeleteItem":
                //Services.console.logStringMessage("["+ aTopic + "] " + tbItem.nativeItem.title);
                break;
        }
    }



    /**
     * Create a new calendar.
     *
     * @param {string} newname         name of the new calendar
     * @param {FolderData} folderData  FolderData object belonging to the new
     *                                 calendar
     * @returns {calICalendar}         the new calendar
     */
    static createCalendar(newname, folderData) {
        let calManager = TbSync.lightning.cal.getCalendarManager();

        //Create the new standard calendar with a unique name
        let newCalendar = calManager.createCalendar("storage", Services.io.newURI("moz-storage-calendar://"));
        newCalendar.id = TbSync.lightning.cal.getUUID();
        newCalendar.name = newname;
        calManager.registerCalendar(newCalendar);
        
        return newCalendar;
    }
}
