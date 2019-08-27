/*
 * This file is part of __ProviderShortName__.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 */

"use strict";

var { MailServices } = ChromeUtils.import("resource:///modules/MailServices.jsm");

// Every Object in here will be loaded into the following namespace: TbSync.providers.__ProviderNameSpace__. 
const __ProviderNameSpace__ = TbSync.providers.__ProviderNameSpace__;

/**
 * Base class for the TbSync provider interface.
 */
var Base = class {
    /**
     * Called during load of this provider add-on.
     *
     */
    static async load() {
      // Set default prefs
      let branch = Services.prefs.getDefaultBranch("extensions.__ProviderChromeUrl__.");
      branch.setIntPref("timeout", 50);
      branch.setCharPref("someCharPref", "Test");
      branch.setBoolPref("someBoolPref", true);    
    }



    /**
     * Called during unload of this provider add-on.
     *
     */
    static async unload() {
    }



    /**
     * Returns name of this provider for the *Add account* menu of tbe TbSync
     * account manager.
     *
     * @returns {string}  A name.
     *
     */
    static getProviderName() {
        return TbSync.getString("menu.name", "__ProviderNameSpace__");
    }



    /**
     * Returns the version identifier of the TbSync API this provider is using.
     * If it is not matching the version identifier of the TbSync add-on the
     * user has currently installed, this provider add-on is not loaded.
     *
     * @returns {string}  The API version identifier.
     *
     */
    static getApiVersion() { return "Beta 2.1"; }



    /**
     * Returns location of a provider icon.
     *
     * @param {integer}      size         Size of the requested icon.
     * @param {AccountData}  accountData  The AccountData instance of the
     *                                    account, which is requesting the
     *                                    icon. Optional.
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
     * Returns a list of sponsors, they will be sorted by sortIndex.
     * 
     * ::
     * 
     *    return {
     *      "sortIndex" : {name       : "Name", 
     *                     description: "Something", 
     *                     icon: chrome://path/or/empty,
     *                     link: "url://or/empty"
     *                    },
     *    }
     *
     * @returns {Object}  List of sponsors.
     *
     */
    static getSponsors() {
        return {
            "Name" : {name: "Name", description: "Something", icon: "", link: "" },
        };
    }



    /**
     * Returns the email address of the maintainer (used for bug reports).
     *
     * @returns {string}  An email address.
     *
     */
    static getMaintainerEmail() {
        return "__ProviderEmail__";
    }



    /**
     * Returns the URL of the string bundle file of this provider, it can be
     * accessed by :func:`getString`.
     *
     * @returns {string}  Chrome uri to the string bundle file.
     *
     */
    static getStringBundleUrl() {
        return "chrome://__ProviderChromeUrl__/locale/provider.strings";
    }

    

    /**
     * Returns URL of the new account window.
     *
     * The URL will be opened via openDialog(), when the user wants to create a
     * new account of this provider.
     *
     * @returns {string}  Chrome uri to file to be used in create account 
     *                    dialog.
     *
     */
    static getCreateAccountWindowUrl() {
        return "chrome://__ProviderChromeUrl__/content/manager/createAccount.xul";
    }



    /**
     * Returns uri to the overlay for the edit account dialog
     * (chrome://tbsync/content/manager/editAccount.xul)
     *
     * The overlay must (!) implement:
     *
     *    ``tbSyncEditAccountOverlay.onload(window, accountData)``
     *
     * which is called each time an account of this provider is viewed/selected
     * in the manager and gets passed the AccountData of the corresponding
     * account.
     *
     * @returns {string}  Chrome uri to overlay for edit account dialog.
     *
     */
    static getEditAccountOverlayUrl() {
        return "chrome://__ProviderChromeUrl__/content/manager/editAccountOverlay.xul";
    }



    /**
     * Returns an Object which contains all possible account properties of
     * accounts of this provider, with its default value if not yet stored in the 
     * database.
     * 
     * The returned Object uses the properties names as key and its default
     * values as their value:
     *
     * ::
     * 
     *    return {
     *     "username" : "",
     *     "host" : "",
     *     "https" : true,
     *     "someOtherOption" : false,    
     *    }
     *
     * Please also check the standard properties added by TbSync.
     *
     * @returns {Object}  List of properties with default values.
     *
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
     * Returns an Object which contains all possible folder properties of
     * folders of this provider, with its default value if not yet stored in the 
     * database.
     * 
     * The returned Object uses the properties names as key and its default
     * values as their value:
     * 
     * ::
     * 
     *    return {
     *      "someSetting" : "none",    
     *    }
     *
     * Please also check the standard properties added by TbSync.
     *
     * @returns {Object}  List of properties with default values.
     *
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
     * @param {AccountData}  accountData  The AccountData instance of the
     *                                    account being enabled.
     *
     */
    static onEnableAccount(accountData) {
    }



    /**
     * Is called everytime an account of this provider is disabled in the
     * manager UI.
     *
     * @param {AccountData}  accountData  The AccountData instance of the
     *                                    account being disabled.
     *
     */
    static onDisableAccount(accountData) {
    }



    /**
     * Is called everytime a new target is created. 
     *
     * @deprecated Whatever has been done in here should be done createTarget.
     * @param {FolderData}  folderData  The FolderData instance of the folder
     *                                  being resetted.
     *
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
     *    ``directory.setBoolValue("enable_autocomplete", false);``
     *
     * to disable the default autocomplete for this directory and have full
     * control over the autocomplete.
     *
     * @param {AccountData}  accountData  The AccountData instance of the
     *                                    account being queried.
     * @param {string}       query        The search query.
     *
     * @returns {Array.AutoCompleteData} Array of AutoCompleteData entries.
     *
     */
    static async abAutoComplete(accountData, query)  {
        return [];
    }



    /**
     * Returns all folders of the account, sorted in the desired order.
     *
     * The order will be used in the folder list and also as the order to sync
     * the resources of the account identified by the passed AccountData.
     *
     * @param {AccountData}  accountData  The AccountData instance for the
     *                                    account for which the sorted list of
     *                                    folders should be returned.
     *
     * @returns Array of :class:`FolderData` instances in the desired
     *          order.
     *
     */
    static getSortedFolders(accountData) {
        return accountData.getAllFolders();
    }



    /**
     * Returns the connection timeout for an active server request, so TbSync
     * can append a countdown to the connection timeout, while waiting for an
     * answer from the server. Only syncstates which start with ``send.`` will
     * trigger this, see :class:`SyncData.setSyncState`.
     *
     * @param {AccountData}  accountData  The AccountData instance for the
     *                                    account for which the timeout is
     *                                    being requested.
     *
     * @returns {integer}  The timeout in milliseconds.
     *
     */
    static getConnectionTimeout(accountData) {
        return Services.prefs.getBranch("extensions.__ProviderChromeUrl__.").getIntPref("timeout");
    }
    


    /**
     * Is called to synchronize the folder list.
     *
     * Never call this method directly, but use :class:`AccountData.sync`.
     *
     * @param {SyncData}  syncData   The SyncData instance with information 
     *                               regarding the requested sync
     * @param {string}    syncJob    A specific sync job, defaults to "sync",
     *                               but can be set via the syncDescription.
     *                               (see AccountData.sync or FolderData.sync).
     * @param {integer}   syncRunNr  Indicates the n-th number the account is
     *                               being (re-)synced due to enforced retries.
     *                               It starts with 1 and is limited by 
     *                               syncDescription.maxAccountReruns.
     *
     * @return A :class:`StatusData` instance with information of the
     *         sync (failed/success).
     *
     */
    static async syncFolderList(syncData, syncJob, syncRunNr) {        
        await __ProviderNameSpace__.sync.folderList(syncData);
        return new TbSync.StatusData();
    }
    


    /**
     * Is called to synchronize a folder.
     *
     * Never call this method directly, but use :class:`AccountData.sync` or
     * :class:`FolderData.sync`.
     *
     * @param {SyncData}  syncData   The SyncData instance with information 
     *                               regarding the requested sync
     * @param {string}    syncJob    A specific sync job, defaults to "sync",
     *                               but can be set via the syncDescription.
     *                               (see AccountData.sync or FolderData.sync).
     * @param {integer}   syncRunNr  Indicates the n-th number the account is
     *                               being (re-)synced due to enforced retries.
     *                               It starts with 1 and is limited by 
     *                               syncDescription.maxAccountReruns.
     *
     * @return A :class:`StatusData` instance with information of the
     *         sync (failed/success).
     *
     */
    static async syncFolder(syncData, syncJob, syncRunNr) {
        await __ProviderNameSpace__.sync.folder(syncData);
        return new TbSync.StatusData();
    }
}




var TargetData = class {
    /**
     * TargetData constrcutor.
     *
     * @param {FolderData}  folderData  The FolderData instance of the folder
     *                                  for which this TargetData instance is
     *                                  being created.
     *
     */
    constructor(folderData) {            
        this._targetType = folderData.getFolderProperty("targetType");
        this._folderData = folderData;
    }
    
    /**
     * Getter for the targetType, this TargetData was initialized with.
     */
    get targetType() { 
        return this._targetType;
    }
    
    /**
     * Check, if the target of this TargetData exists.
     *
     * @returns {boolean}  True, if target exists.
     *
     */
    hasTarget() {
        let target = folderData.getFolderProperty("target");
        let directory = __ProviderNameSpace__.addressbook.getDirectoryFromDirectoryUID(target);
     
        if (directory !== null && directory instanceof Components.interfaces.nsIAbDirectory) {
            return true;
        }
         
        return false;
    }

    /**
     * Returns the actual target object (for example a `nsIAbDirectory <https://dxr.mozilla.org/comm-central/source/comm/mailnews/addrbook/public/nsIAbDirectory.idl>`_).
     * If the target does not exist, it should be created. 
     *
     * .. note::
     *    The thrown error message will be used as a status and TbSync will
     *    use ``status.<Error.message>`` from your string bundle (see
     *    :class:`Base.getStringBundleUrl`) for the actual error/status 
     *    message.
     *
     * @returns {Object}  Whatever you want to use as target object for
     *                    this TargetData.
     *
     * @throws {Error}    Reason, why the target could not be created.
     *
     */
    getTarget() { 
        let target = this._folderData.getFolderProperty("target");
        let directory = __ProviderNameSpace__.addressbook.getDirectoryFromDirectoryUID(target);
      
        if (!directory) {
            let dirPrefId = MailServices.ab.newAddressBook(this._folderData.getFolderProperty("targetName"), "", 2);
            let directory = MailServices.ab.getDirectoryFromId(dirPrefId);
            if (!directory) {
                throw new Error("notargets");
            }
        }
        
        return directory;
    }
    
    /**
     * Removes the target from the local storage. TbSync will reset any target
     * information of the associated folder after this has been executed.
     *
     */
    removeTarget() {
        let target = this._folderData.getFolderProperty("target");
        let directory = __ProviderNameSpace__.addressbook.getDirectoryFromDirectoryUID(target);
        try {
            if (directory) {
                MailServices.ab.deleteAddressBook(directory.URI);
            }
        } catch (e) {}
    }
    
    /**
     * Getter/Setter for the target name.
     *
     * @throws {Error}    Reason, why the target name could not be set/retrieved.
     *
     */
    set targetName(newName) {
        let target = this._folderData.getFolderProperty("target");
        let directory = __ProviderNameSpace__.addressbook.getDirectoryFromDirectoryUID(target);
        if (directory && newName) {
            directory.dirName = newName;
        }     
    }
    get targetName() {
        let target = this._folderData.getFolderProperty("target");
        let directory = __ProviderNameSpace__.addressbook.getDirectoryFromDirectoryUID(target);
        if (directory) {
            return directory.dirName;
        }
        throw new Error("notargets");
    }

    /**
     * Is called before a target is being disconnected from a folder, but
     * not deleted. TbSync will reset any target information of the associated
     * folder after this has been executed.
     * 
     */
    onBeforeDisconnectTarget() {
    }    
}






/**
 * StandardFolderList class.
 *
 */
var StandardFolderList = class {
    /**
     * Is called before the context menu of the folderlist is shown, allows to
     * show/hide custom menu options based on the selected folder. During an
     * active synchronisation, folderData will be null and the folder list will
     * be disabled.
     *
     * @param {nsIDOMWindow}  window      Object of the account settings window.
     * @param {FolderData}    folderData  The FolderData instance of the selected
     *                                    folder.
     *
     */
    static onContextMenuShowing(window, folderData) {
    }



    /**
     * Returns the icon for a folder to be shown in the folderlist.
     *
     * @param {FolderData}  folderData  The FolderData instance of the folder for
     *                                  which the icon is requested.
     *                                   
     * @returns {string}  Chrome URL of icon.
     *
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
     * Returns the display name for a folder to be shown in the folderlist.
     *
     * @param {FolderData}  folderData  The FolderData instance of the folder for
     *                                  which the display name is requested.
     *                                   
     * @returns {string}  Display name of the folder.   
     *
     */
    static getFolderDisplayName(folderData) {
        return folderData.getFolderProperty("foldername");
    }



    /**
     * Returns the attributes for the *readonly* `menuitem <https://dxr.mozilla.org/comm-central/source/comm/mailnews/addrbook/public/nsIAbDirectory.idl>`_
     * element of the ACL selector for a folder to be shown in the folderlist.
     * You can define any available attribute (label, disabled, hidden, style, 
     * ...) by returning an Object which uses the attribute names as key and
     * its values as their value. For example:
     * 
     * ::
     * 
     *    return {
     *      label: "Readonly access",
     *      disabled: false
     *    }
     *
     * If both (RO+RW) do not return any attributes, the ACL menu is not
     * displayed at all.
     *
     * @param {FolderData}  folderData  The FolderData instance of the folder for
     *                                  which the attributes for the ACL RO XUL
     *                                  element are requested.
     *                                   
     * @returns {Object}  A list of attributes and their values for the ACL RO
     *                    XUL element.
     *
     */
    static getAttributesRoAcl(folderData) {
        return null;
    }
    


    /**
     * Returns the attributes for the *read/write* `menuitem <https://dxr.mozilla.org/comm-central/source/comm/mailnews/addrbook/public/nsIAbDirectory.idl>`_
     * element of the ACL selector for a folder to be shown in the folderlist.
     * You can define any available attribute (label, disabled, hidden, style, 
     * ...) by returning an Object which uses the attribute names as key and
     * its values as their value. For example:
     * 
     * ::
     * 
     *    return {
     *       label: "Read/Write access",
     *       disabled: true
     *    }
     *
     * If both (RO+RW) do not return any attributes, the ACL menu is not
     * displayed at all.
     *
     * @param {FolderData}  folderData  The FolderData instance of the folder for
     *                                  which the attributes for the ACL RW XUL
     *                                  element are requested.
     *                                   
     * @returns {Object}  A list of attributes and their values for the ACL RW
     *                    XUL element.
     *
     */
    static getAttributesRwAcl(folderData) {
        return null;
    }
}

Services.scriptloader.loadSubScript("chrome://__ProviderChromeUrl__/content/includes/addressbook.js", this, "UTF-8");
