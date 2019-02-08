/*
 * This file is part of EWS-4-TbSync.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 */
 
 "use strict";

/**
 * Implements the TbSync interface for external provider extensions.
 */
var ews = {
    bundle: Services.strings.createBundle("chrome://ews4tbsync/locale/ews.strings"),
    prefSettings: Services.prefs.getBranch("extensions.ews4tbsync."),


    /**
     * Called during load of external provider extension to init provider.
     *
     * @param lightningIsAvail       [in] indicate wheter lightning is installed/enabled
     */
    load: Task.async (function* (lightningIsAvail) {
        //load overlays or do other init stuff, use lightningIsAvail to init stuff if lightning is installed

        if (lightningIsAvail) {
        }
        
    }),

    /**
     * Called during unload of external provider extension to unload provider.
     *
     * @param lightningIsAvail       [in] indicate wheter lightning is installed/enabled
     */
    unload: function (lightningIsAvail) {
        if (lightningIsAvail) {
        }        
    },



    /**
     * Called to get passwords of accounts of this provider
     *
     * @param accountdata       [in] account data structure
     */
    getPassword: function (accountdata) {
        let host4PasswordManager = tbSync.getHost4PasswordManager(accountdata.provider, accountdata.host);
        return tbSync.getLoginInfo(host4PasswordManager, "TbSync", accountdata.user);
    },



    /**
     * Called to set passwords of accounts of this provider
     *
     * @param accountdata       [in] account data structure
     * @param newPassword       [in] new password
     */
    setPassword: function (accountdata, newPassword) {
        let host4PasswordManager = tbSync.getHost4PasswordManager(accountdata.provider, accountdata.host);
        tbSync.setLoginInfo(host4PasswordManager, "TbSync", accountdata.user, newPassword);
    },



    /**
     * Returns location of a provider icon.
     *
     * @param size       [in] size of requested icon
     * @param accountId  [in] optional ID of the account related to this request
     *
     */
    getProviderIcon: function (size, accountId = null) {
        return "chrome://ews4tbsync/skin/exchange-addrbook.png";
    },



    /**
     * Returns the email address of the maintainer (used for bug reports).
     */
    getMaintainerEmail: function () {
        return "john.bieling@gmx.de";
    },



    /**
     * Returns XUL URL of the new account dialog.
     */
    getCreateAccountXulUrl: function () {
        return "chrome://ews4tbsync/content/createAccount.xul";
    },



    /**
     * Returns overlay XUL URL of the edit account dialog (chrome://tbsync/content/manager/editAccount.xul)
     */
    getEditAccountOverlayUrl: function () {
        return "chrome://ews4tbsync/content/editAccount.xul";
    },



    /**
     * Is called after the settings overlay of this provider has been added to the main settings window
     *
     * @param window       [in] window object of the settings window
     * @param accountID    [in] accountId of the selected account
     */
    onSettingsGUILoad: function (window, accountID) {
    },



    /**
     * Is called each time after the settings window has been updated
     *
     * @param window       [in] window object of the settings window
     * @param accountID    [in] accountId of the selected account
     */
    onSettingsGUIUpdate: function (window, accountID) {
    },



    /**
     * Returns nice string for name of provider (is used in the add account menu).
     */
    getNiceProviderName: function () {
        return "Exchange WebServices";
    },



    /**
     * Returns a list of sponsors, they will be sorted by the index and shown at the community tab
     */
    getSponsors: function () {
        return {
            //"sort string" : {name: "Name", description: "sponsoring", icon: "", link: "" },
        };
    },



    /**
     * Return object which contains all possible fields of a row in the accounts database with the default value if not yet stored in the database.
     */
    getDefaultAccountEntries : function () {
        let row = {
            "account" : "",
            "accountname": "",
            "provider": "ews",
            "lastsynctime" : "0", 
            "status" : "disabled", //global status: disabled, OK, syncing, notsyncronized, nolightning, ...
            "servertype" : "", //auto or custom
            "host" : "",
            "user" : "",
            "https" : "1",
            "autosync" : "0",
            "downloadonly" : "0",            
            //some example options
            "syncdefaultfolders" : "1",
            "displayoverride" : "0",
            "seperator" : "44",            
            }; 
        return row;
    },




    /**
     * Return object which contains all possible fields of a row in the folder database with the default value if not yet stored in the database.
     */
    getDefaultFolderEntries: function (account) {
        let folder = {
            "account" : account,
            "folderID" : "",
            "name" : "",
            "type" : "",
            "target" : "",
            "targetName" : "",
            "targetColor" : "",
            "selected" : "",
            "lastsynctime" : "",
            "status" : "",
            "parentID" : "",
            "useChangeLog" : "1", //log changes into changelog
            "downloadonly" : tbSync.db.getAccountSetting(account, "downloadonly"), //each folder has its own settings, the main setting is just the default,
            "createdWithProviderVersion" : "0",
            };
        return folder;
    },


    /**
     * Returns an array of folder settings, that should survive unsubscribe/subscribe and disable/re-enable (caching)
     */
    getPersistentFolderSettings: function () {
        return ["targetName", "targetColor", "selected"];
    },


    /**
     * Return the thunderbird type (tb-contact, tb-event, tb-todo) for a given folder type of this provider. A provider could have multiple 
     * type definitions for a single thunderbird type (default calendar, shared address book, etc), this maps all possible provider types to
     * one of the three thunderbird types.
     *
     * @param type       [in] provider folder type
     */
    getThunderbirdFolderType: function(type) {
        switch (type) {
            case "addressbook": 
                return "tb-contact";
            case "calendar":
                return "tb-event";
            case "task":
                return "tb-todo";
            default:
                return "unknown ("+type + ")";
        };
    },



    /**
     * Is called everytime an account of this provider is enabled in the manager UI, set/reset database fields as needed.
     *
     * @param account       [in] account which is being enabled
     */
    onEnableAccount: function (account) {
        db.resetAccountSetting(account, "lastsynctime");

        // reset custom values
        //db.resetAccountSetting(account, "policykey");
        //db.resetAccountSetting(account, "foldersynckey");
    },



    /**
     * Is called everytime an account of this provider is disabled in the manager UI, set/reset database fields as needed and
     * remove/backup all sync targets of this account.
     *
     * @param account       [in] account which is being disabled
     */
    onDisableAccount: function (account) {
    },



    /**
     * Is called everytime an new target is created, intended to set a clean sync status.
     *
     * @param account       [in] account the new target belongs to
     * @param folderID       [in] folder the new target belongs to
     */
    onResetTarget: function (account, folderID) {
        tbSync.db.setFolderSetting(account, folderID, "createdWithProviderVersion", tbSync.loadedProviders.ews.version);
    },



    /**
     * Is called if TbSync needs to create a new thunderbird address book associated with an account of this provider.
     *
     * @param newname       [in] name of the new address book
     * @param account       [in] id of the account this address book belongs to
     * @param folderID      [in] id of the folder this address book belongs to (sync target)
     */
    createAddressBook: function (newname, account, folderID) {
        //This example implementation is using the standard address book, but you may use another one
        let abManager = Components.classes["@mozilla.org/abmanager;1"].getService(Components.interfaces.nsIAbManager);

        return abManager.newAddressBook(newname, "", 2);
    },



    /**
     * Is called if TbSync needs to create a new UID for an address book card
     *
     * @param aItem       [in] card that needs new ID
     *
     * returns the new id 
     */
    getNewCardID: function (aItem, folder) {
        return aItem.localId;
    },



    /**
     * Is called if TbSync needs to create a new lightning calendar associated with an account of this provider.
     *
     * @param newname       [in] name of the new calendar
     * @param account       [in] id of the account this calendar belongs to
     * @param folderID      [in] id of the folder this calendar belongs to (sync target)
     */
    createCalendar: function(newname, account, folderID) {
        //This example implementation is using the standard storage calendar, but you may use another one
        let calManager = cal.getCalendarManager();
        
        //Create the new standard calendar with a unique name
        let newCalendar = calManager.createCalendar("storage", Services.io.newURI("moz-storage-calendar://"));
        newCalendar.id = cal.getUUID();
        newCalendar.name = newname;

        newCalendar.setProperty("color", tbSync.db.getFolderSetting(account, folderID, "targetColor"));
        newCalendar.setProperty("relaxedMode", true); //sometimes we get "generation too old for modifyItem", this check can be disabled with relaxedMode
        newCalendar.setProperty("calendar-main-in-composite", true);

        calManager.registerCalendar(newCalendar);

        //is there an email identity we can associate this calendar to? 
        //getIdentityKey returns "" if none found, which removes any association
        let key = tbSync.getIdentityKey(tbSync.db.getAccountSetting(account, "user"));
        newCalendar.setProperty("fallbackOrganizerName", newCalendar.getProperty("organizerCN"));
        newCalendar.setProperty("imip.identity.key", key);
        if (key === "") {
            //there is no matching email identity - use current default value as best guess and remove association
            //use current best guess 
            newCalendar.setProperty("organizerCN", newCalendar.getProperty("fallbackOrganizerName"));
            newCalendar.setProperty("organizerId", cal.email.prependMailTo(tbSync.db.getAccountSetting(account, "user")));
        }

        return newCalendar;
    },



    /**
     * Is called if TbSync needs to find contacts in the global address list (GAL / directory) of an account associated with this provider.
     * It is used for autocompletion while typing something into the address field of the message composer and for the address book search,
     * if something is typed into the search field of the Thunderbird address book.
     *
     * DO NOT IMPLEMENT AT ALL, IF NOT SUPPORTED
     *
     * TbSync will execute this only for queries longer than 3 chars.
     *
     * @param account       [in] id of the account which should be searched
     * @param currentQuery  [in] search query
     * @param caller  [in] "autocomplete" or "search"
     */
    abServerSearch: Task.async (function* (account, currentQuery, caller)  {
        //generating example data
        let galdata = [];
        let resultset = {};

        switch (caller) {
            case "search":
                resultset.properties = {};                    
                //any property defined here will be added to the found contacts card 
                resultset.properties["FirstName"] = "EWS First";
                resultset.properties["LastName"] = "LAST";
                resultset.properties["DisplayName"] = "FIRST LAST";
                resultset.properties["PrimaryEmail"] = "user@inter.net"
                break;
           
            case "autocomplete":
                resultset.autocomplete = {};                    
                resultset.autocomplete.value = "EWS First Last" + " <" + "user@inter.net" + ">";
                resultset.autocomplete.account = account;
                break;
        }
        galdata.push(resultset);
    
        return galdata;
    }),



    /**
     * Is called if a card is loaded in the edit dialog to show/hide elements 
    *  besides those of class type "<provider>Container"
     * 
     * OPTIONAL, do not implement, if this provider is not manipulating 
     * the edit/new dialog beyond toggeling the elements of 
     * class  "<provider>Container"
     *
     * @param document       [in] document obj of edit/new dialog
     * @param isOwnProvider  [in] true if the open card belongs to this provider
     * @param aCard          [in] the card being loaded
     */
    onAbCardLoad: function (document, isOwnProvider, aCard = null) {
//        document.getElementById("WorkAddress2Container").hidden = isOwnProvider;
//        document.getElementById("abHomeTab").children[1].hidden = isOwnProvider;
    },



    /**
     * Is called if TbSync needs to synchronize an account.
     *
     * @param syncdata      [in] object that contains the account and maybe the folder which needs to worked on
     *                           you are free to add more fields to this object which you need (persistent) during sync
     * @param job           [in] identifier about what is to be done, the standard job is "sync", you are free to add
     *                           custom jobs like "deletefolder" via your own accountSettings.xul
     */
    start: Task.async (function* (syncdata, job)  {                        
        //Suggestion: Implement this as a loop to be able to do a resync if standard sync failed (if resyncing is part of the EWS sync method)
        //Also do the sync inside a try { .. } catch { ... } so you can throw a custom error at any given time in any called function
        //and evaluate the error msg *here* and decide what to do (sync next folder, abort, resync etc...)
        
        //This is more like a "glue" function, to attach this provider logic to TbSync. The actually EWS Sync methods
        //are defined in the ews.sync object (defined in sync.js)
        try {
            switch (job) {
                case "sync":
                    //update folders avail on server and handle added, removed, renamed folders
                    yield ews.sync.folderList(syncdata);

                    //set all selected folders to "pending", so they are marked for syncing 
                    //this also removes all leftover cached folders and sets all other folders to a well defined cached = "0"
                    //which will set this account as connected (if at least one folder with cached == "0" is present)
                    tbSync.prepareFoldersForSync(syncdata.account);

                    //check if any folder was found
                    if (!tbSync.isConnected(syncdata.account)) {	
                        throw dav.sync.failed("no-folders-found-on-server");
                    }

                    //update folder list in GUI
                    Services.obs.notifyObservers(null, "tbsync.updateFolderList", syncdata.account);

                    //process all pending folders
                    yield ews.sync.allPendingFolders(syncdata);
                    break;
                                    
                default:
                    throw ews.sync.failed("unknown::"+job);
                    break;
            }
        } catch (e) {
            if (e.type == "ews4tbsync") tbSync.finishAccountSync(syncdata, e.message);
            else {
                tbSync.finishAccountSync(syncdata, "Javascript Error");
                Components.utils.reportError(e);
            }
        }            
    }),
    



    /**
     * Functions used by the folderlist in the main account settings tab
     */
    folderList: {

         /**
         * Is called before the context menu of the folderlist is shown, allows to 
         * show/hide custom menu options based on selected folder
         *
         * @param document       [in] document object of the account settings window
         * @param folder         [in] folder databasse object of the selected folder
         */
        onContextMenuShowing: function (document, folder) {
        },



        /**
         * Returns an array of attribute objects, which define the number of columns 
         * and the look of the header
         */
        getHeader: function () {
            return [
                {style: "font-weight:bold;", label: "", width:"24"},
                {style: "font-weight:bold;", label: tbSync.getLocalizedMessage("manager.resource"), width:"145"},
                {style: "font-weight:bold;", label: tbSync.getLocalizedMessage("manager.status"), flex:"1"},
            ]
        },



        /**
         * Returns an array of folderRowData objects, containing all information needed 
         * to fill the folderlist. The content of the folderRowData object is free to choose,
         * it will be passed back to addRow() and updateRow()
         *
         * @param account        [in] account id for which the folder data should be returned
         */
        getSortedData: function (account) {
            let folderData = [];
            let folders = tbSync.db.getFolders(account);
            let folderIDs = Object.keys(folders);

            for (let i=0; i < folderIDs.length; i++) {
                folderData.push(tbSync.ews.folderList.getRowData(folders[folderIDs[i]]));
            }
            return folderData;
        },



        /**
         * Returns a folderRowData object, containing all information needed to fill one row
         * in the folderlist. The content of the folderRowData object is free to choose, it
         * will be passed back to addRow() and updateRow()
         *
         * Use tbSync.getSyncStatusMsg(folder, syncdata, provider) to get a nice looking 
         * status message, including sync progress (if folder is synced)
         *
         * @param folder         [in] folder databasse object of requested folder
         * @param syncdata       [in] optional syncdata obj send by updateRow(),
         *                            needed to check if the folder is currently synced
         */        
        getRowData: function (folder, syncdata = null) {
            let rowData = {};
            rowData.folderID = folder.folderID;
            rowData.selected = (folder.selected == "1");
            rowData.type = folder.type;
            rowData.name = folder.name;
            rowData.status = tbSync.getSyncStatusMsg(folder, syncdata, "ews");

            return rowData;
        },
    


        /**
         * Is called to add a row to the folderlist.
         *
         * @param document       [in] document object of the account settings window
         * @param newListItem    [in] the listitem of the row, where row items should be added to
         * @param rowData        [in] rowData object with all information needed to add the row
         */        
        addRow: function (document, newListItem, rowData) {
            //add folder type/img
            let itemTypeCell = document.createElement("listcell");
            itemTypeCell.setAttribute("class", "img");
            itemTypeCell.setAttribute("width", "24");
            itemTypeCell.setAttribute("height", "24");
                let itemType = document.createElement("image");
                itemType.setAttribute("src", tbSync.ews.folderList.getTypeImage(rowData.type));
                itemType.setAttribute("style", "margin: 4px;");
            itemTypeCell.appendChild(itemType);
            newListItem.appendChild(itemTypeCell);

            //add folder name
            let itemLabelCell = document.createElement("listcell");
            itemLabelCell.setAttribute("class", "label");
            itemLabelCell.setAttribute("width", "145");
            itemLabelCell.setAttribute("crop", "end");
            itemLabelCell.setAttribute("label", rowData.name);
            itemLabelCell.setAttribute("tooltiptext", rowData.name);
            itemLabelCell.setAttribute("disabled", !rowData.selected);
            if (!rowData.selected) itemLabelCell.setAttribute("style", "font-style:italic;");
            newListItem.appendChild(itemLabelCell);

            //add folder status
            let itemStatusCell = document.createElement("listcell");
            itemStatusCell.setAttribute("class", "label");
            itemStatusCell.setAttribute("flex", "1");
            itemStatusCell.setAttribute("crop", "end");
            itemStatusCell.setAttribute("label", rowData.status);
            itemStatusCell.setAttribute("tooltiptext", rowData.status);
            newListItem.appendChild(itemStatusCell);
        },		



        /**
         * Is called to update a row of the folderlist.
         *
         * @param document       [in] document object of the account settings window
         * @param listItem       [in] the listitem of the row, which needs to be updated
         * @param rowData        [in] rowData object with all information needed to add the row
         */        
        updateRow: function (document, listItem, rowData) {
            tbSync.updateListItemCell(listItem.childNodes[1], ["label","tooltiptext"], rowData.name);
            tbSync.updateListItemCell(listItem.childNodes[2], ["label","tooltiptext"], rowData.status);
            if (rowData.selected) {
                tbSync.updateListItemCell(listItem.childNodes[1], ["style"], "font-style:normal;");
                tbSync.updateListItemCell(listItem.childNodes[1], ["disabled"], "false");
            } else {
                tbSync.updateListItemCell(listItem.childNodes[1], ["style"], "font-style:italic;");
                tbSync.updateListItemCell(listItem.childNodes[1], ["disabled"], "true");
            }
        },
        


        /**
         * Return the icon used in the folderlist to represent the different folder types
         *
         * @param type       [in] provider folder type
         */
        getTypeImage: function (type) {
            let src = ""; 
            switch (type) {
                case "addressbook": 
                    src = "contacts16.png";
                    break;
                case "calendar":
                    src = "calendar16.png";
                    break;
                case "task":
                    src = "todo16.png";
                    break;
            }
            return "chrome://tbsync/skin/" + src;
        }
   }
};

tbSync.includeJS("chrome://ews4tbsync/content/sync.js");
