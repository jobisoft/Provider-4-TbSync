/*
 * This file is part of __ProviderShortName__.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 */

"use strict";

// Every object in here will be loaded into the following namespace: tbSync.providers.__ProviderNameSpace__. 
const __ProviderNameSpace__ = tbSync.providers.__ProviderNameSpace__;

/**
 * Base class for the TbSync provider interface.
 */
var Base = class {
    /**
     * Called during load of external provider extension to init provider.
     */
    static async load() {
        // Set default prefs
        let branch = Services.prefs.getDefaultBranch("extensions.__ProviderChromeUrl__.");
        branch.setIntPref("timeout", 50);
        branch.setCharPref("someCharPref", "Test");
        branch.setBoolPref("someBoolPref", true);    
    }



    /**
     * Called during unload of external provider extension to unload provider.
     */
    static async unload() {
    }



    /**
     * Returns nice string for the name of provider for the add account menu.
     */
    static getNiceProviderName() {
        return tbSync.getString("menu.name", "__ProviderNameSpace__");
    }



    /**
     * Returns location of a provider icon.
     *
     * @param size       [in] size of requested icon
     * @param accountData  [in] optional AccountData
     *
     */
    static getProviderIcon(size, accountData = null) {
        switch (size) {
            case 16:
                return "chrome://__ProviderChromeUrl__/skin/logo16.png";
            case 32:
                return "chrome://__ProviderChromeUrl__/skin/logo32.png";
            default :
                return "chrome://__ProviderChromeUrl__/skin/logo48.png";
        }
    }



    /**
     * Returns a list of sponsors, they will be sorted by the index
     *
     * This probably has to be dropped when TbSync gets integrated into
     * Thunderbird.
     *
     */
    static getSponsors() {
        return {
            "Name" : {name: "Name", description: "Something", icon: "", link: "" },
        };
    }



    /**
     * Returns the email address of the maintainer (used for bug reports).
     */
    static getMaintainerEmail() {
        return "__ProviderEmail__";
    }



    /**
     * Returns the URL of the string bundle file of this provider, it can be
     * accessed by tbSync.getString(<key>, <ProviderNameSpace>)
     */
    static getStringBundleUrl() {
        return "chrome://__ProviderChromeUrl__/locale/provider.strings";
    }

    

    /**
     * Returns URL of the new account window.
     *
     * The URL will be opened via openDialog(), when the user wants to create a
     * new account of this provider.
     */
    static getCreateAccountWindowUrl() {
        return "chrome://__ProviderChromeUrl__/content/manager/createAccount.xul";
    }



    /**
     * Returns overlay XUL URL of the edit account dialog
     * (chrome://tbsync/content/manager/editAccount.xul)
     *
     * The overlay must (!) implement:
     *
     *    tbSyncEditAccountOverlay.onload(window, accountData)
     *
     * which is called each time an account of this provider is viewed/selected
     * in the manager and provides the tbSync.AccountData of the corresponding
     * account.
     */
    static getEditAccountOverlayUrl() {
        return "chrome://__ProviderChromeUrl__/content/manager/editAccountOverlay.xul";
    }



    /**
     * Return object which contains all possible fields of a row in the
     * accounts database with the default value if not yet stored in the 
     * database.
     * 
     * Please also check the standard fields added by TbSync.
     */
    static getDefaultAccountEntries() {
        let row = {
            "username" : "",
            "host" : "",
            "https" : true,
            "someOtherOption" : false,
            }; 
        return row;
    }



    /**
     * Return object which contains all possible fields of a row in the folder 
     * database with the default value if not yet stored in the database.
     * 
     * Please also check the standard fields added by TbSync.
     */
    static getDefaultFolderEntries() {
        let folder = {
            "someSetting" : "none",
            };
        return folder;
    }



    /**
     * Is called everytime an account of this provider is enabled in the
     * manager UI.
     *
     * @param accountData  [in] AccountData
     */
    static onEnableAccount(accountData) {
    }



    /**
     * Is called everytime an account of this provider is disabled in the
     * manager UI.
     *
     * @param accountData  [in] AccountData
     */
    static onDisableAccount(accountData) {
    }



    /**
     * Is called everytime an new target is created, intended to set a clean
     * sync status.
     *
     * @param accountData  [in] FolderData
     */
    static onResetTarget(folderData) {
    }



    /**
     * Implement this method, if this provider should add additional entries
     * to the autocomplete list while typing something into the address field
     * of the message composer.
     *
     * When creating directories, you can set:
     *
     *    directory.setBoolValue("enable_autocomplete", false);
     *
     * to disable the default autocomplete for this directory and have full
     * control over the autocomplete.
     *
     * @param accountData   [in] AccountData of the account which should be
     *                           searched
     * @param currentQuery  [in] search query
     *
     * Return arrary of AutoCompleteData entries.
     */
    static async abAutoComplete(accountData, currentQuery)  {
        return [];
    }



    /**
     * Returns all folders of the account, sorted in the desired order.
     * The most simple implementation is to return accountData.getAllFolders();
     *
     * @param accountData         [in] AccountData for the account for which the 
     *                                 sorted folder should be returned
     */
    static getSortedFolders(accountData) {
        return accountData.getAllFolders();
    }



    /**
     * Return the connection timeout for an active sync, so TbSync can append
     * a countdown to the connection timeout, while waiting for an answer from
     * the server. Only syncstates which start with "send." will trigger this.
     *
     * @param accountData      [in] AccountData
     *
     * return timeout in milliseconds
     */
    static getConnectionTimeout(accountData) {
        return Services.prefs.getBranch("extensions.__ProviderChromeUrl__.").getIntPref("timeout");
    }
    


    /**
     * Is called if TbSync needs to synchronize the folder list.
     *
     * @param syncData      [in] SyncData
     * @param syncJob       [in] String with a specific sync job. Defaults to
     *                           "sync", but can be set via the syncDescription
     *                           of AccountData.sync() or FolderData.sync()
     * @param syncRunNr     [in] Indicates the n-th number the account is being synced.
     *                           It starts with 1 and is limited by 
     *                           syncDescription.maxAccountReruns.
     *
     * !!! NEVER CALL THIS FUNCTION DIRECTLY BUT USE !!!
     *    tbSync.AccountData::sync()
     *
     * return StatusData
     */
    static async syncFolderList(syncData, syncJob, syncRunNr) {        
        await __ProviderNameSpace__.sync.folderList(syncData);
        return new tbSync.StatusData();
    }
    


    /**
     * Is called if TbSync needs to synchronize a folder.
     *
     * @param syncData      [in] SyncData
     * @param syncJob       [in] String with a specific sync job. Defaults to
     *                           "sync", but can be set via the syncDescription
     *                           of AccountData.sync() or FolderData.sync()
     * @param syncRunNr     [in] Indicates the n-th number the folder is being synced.
     *                           It starts with 1 and is limited by 
     *                           syncDescription.maxFolderReruns.
     * <p>
     * !!! NEVER CALL THIS FUNCTION DIRECTLY BUT USE !!!
     *    tbSync.AccountData::sync() or
     *    tbSync.FolderData::sync()
     *
     * return StatusData
     */
    static async syncFolder(syncData, syncJob, syncRunNr) {
        await __ProviderNameSpace__.sync.folder(syncData);
        return new tbSync.StatusData();
    }
}




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
        return tbSync.generateUUID();
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
        let calManager = tbSync.lightning.cal.getCalendarManager();

        //Create the new standard calendar with a unique name
        let newCalendar = calManager.createCalendar("storage", Services.io.newURI("moz-storage-calendar://"));
        newCalendar.id = tbSync.lightning.cal.getUUID();
        newCalendar.name = newname;
        calManager.registerCalendar(newCalendar);
        
        return newCalendar;
    }
}






/**
 * The StandardFolderList class allows the provider to use the standard folder
 * list, which requires to implement only a small subset of the entire
 * FolderList class.
 * <p>
 * Check out {@link http://bl.ocks.org/mbostock/4341574| this example} 
 * <p>
 *    let list = document.getElementById("tbsync.accountsettings.folderlist");
 * <p>
 * and the folderData of each entry is attached to each row:
 * <p>
 *    let folderData = folderList.selectedItem.folderData;
 */
var StandardFolderList = class {
    /**
     * Gets called before the context menu of the folderlist is shown, allows
     * to show/hide custom menu options based on selected folder. During an
     * active sync, folderData will be null and the folder list will be
     * disabled.
     *
     * @param {nsIDOMWindow} window      window object of the account
     *                                   settings window
     * @param {FolderData} folderData    FolderData of the selected folder
     */
    static onContextMenuShowing(window, folderData) {
    }



    /**
     * Gets the icon for a folder to be shown in the folderlist.
     *
     * @param {FolderData} folderData    FolderData of the folder for which the
     *                                   icon is requested
     * @returns {string} Chrome URL of icon
     */
    static getTypeImage(folderData) {
        switch (folderData.getFolderProperty("targetType")) {
            case "addressbook":
                return "chrome://tbsync/skin/contacts16.png";
            case "calendar":
                return "chrome://tbsync/skin/calendar16.png";
        }
    }
    


    /**
     * Gets the display name for a folder to be shown in the folderlist.
     *
     * @param {FolderData} folderData    FolderData of the folder for which the
     *                                   display name is requested
     *                                   
     * @returns {string} Display name of the folder   
     */ 
    static getFolderDisplayName(folderData) {
        return folderData.getFolderProperty("foldername");
    }



    /**
     * Gets the attributes for the ACL RO (readonly) menu element for a folder
     * to be shown in the folderlist (label, disabled, hidden, style, ...)
     *
     * @param {FolderData} folderData    FolderData of the folder for which the
     *                                   attributes for the ACL RO XUL element
     *                                   are requested
     * @returns {object} A list of attributes and their values for the ACL RO
     *                   XUL element . If both (RO+RW) do not return any
     *                   attributes, the ACL menu is not displayed at all.
     */ 
    static getAttributesRoAcl(folderData) {
        return null;
        /* 
        return {
            label: tbSync.getString("acl.readonly", "__ProviderNameSpace__"),
        };
        */
    }
    


    /**
     * Gets the attributes for the ACL RW (read/write) menu element for a folder
     * to be shown in the folderlist (label, disabled, hidden, style, ...)
     *
     * @param {FolderData} folderData    FolderData of the folder for which the
     *                                   attributes for the ACL RW XUL element
     *                                   are requested
     * @returns {object} A list of attributes and their values for the ACL RW
     *                   XUL element . If both (RO+RW) do not return any
     *                   attributes, the ACL menu is not displayed at all.
     */ 
    static getAttributesRwAcl(folderData) {
        return null;
    }
}

Services.scriptloader.loadSubScript("chrome://__ProviderChromeUrl__/content/includes/sync.js", this, "UTF-8");
