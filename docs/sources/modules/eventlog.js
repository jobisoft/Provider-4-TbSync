/*
 * This file is part of TbSync.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 */
 
 "use strict";

/**
 *
 */
var EventLogInfo = class {
  /**
   * Create an EventLogInfo instance, which is used when adding entries to the
   * TbSync event log. The information given here will be added as a header to
   * the actual event.
   *
   * @param {string} provider     A provider ID (also used as provider 
   *                              namespace).
   * @param {string} accountname  An account name. Can be arbitrary but should
   *                              match the accountID (if provided). Optional.
   * @param {string} accountID    An account ID. Used to filter events for a
   *                              given account. Optional.
   * @param {string} foldername   A folder name. Optional
   *
   */
  constructor(provider, accountname, accountID, foldername) {
    this._provider = provider;
    this._accountname = accountname;
    this._accountID = accountID;
    this._foldername = foldername;
  }
  
  /**
   * Returns the provider ID of this EventLogInfo
   * @returns {string}
   */
  get provider() {return this._provider};
  /**
   * Returns the account name of this EventLogInfo
   * @returns {string}
   */
  get accountname() {return this._accountname};
  /**
   * Returns the account ID of this EventLogInfo
   * @returns {string}
   */
  get accountID() {return this._accountID};
  /**
   * Returns the folder name of this EventLogInfo
   * @returns {string}
   */
  get foldername() {return this._foldername};

  /**
   * Sets the provider ID of this EventLogInfo
   *
   * @param {string} A provider ID.
   */
  set provider(v) {this._provider = v};
  /**
   * Sets the account name of this EventLogInfo. Can be arbitrary but should
   * match the accountID (if provided).
   *
   * @param {string} An account name.
   */
  set accountname(v) {this._accountname = v};
  /**
   * Sets the account ID of this EventLogInfo
   *
   * @param {string} An account ID.
   */
  set accountID(v) {this._accountID = v};
  /**
   * Sets the folder name of this EventLogInfo
   *
   * @param {string} A folder name.
   */
  set foldername(v) {this._foldername = v};
}


  
/**
 * The TbSync event log 
 */
var eventlog = {

  events: null,
  eventLogWindow: null,
  
  load: async function () {
    this.clear();
  },

  unload: async function () {
    if (this.eventLogWindow) {
      this.eventLogWindow.close();
    }
  },

  /**
   * Gets event log entries. An event log entry is an Object with the following
   * members:
   *
   * ::
   *
   *    
   *
   * @param {string} accountID  Optional filter the returned log entries for a
   *                            specific account.
   * @returns Array of event log objects.
   */
  get: function (accountID = null) {
    if (accountID) {
      return this.events.filter(e => e.accountID == accountID);
    } else {
      return this.events;
    }
  },
  
  clear: function () {
    this.events = [];
  },
  
  add: function (type, eventInfo, message, details = null) {
    let entry = {
      timestamp: Date.now(),
      message: message, 
      type: type,
      link: null, 
      //some details are just true, which is not a useful detail, ignore
      details: details === true ? null : details,
      provider: "",
      accountname: "",
      foldername: "",
    };
  
    if (eventInfo) {
      if (eventInfo.accountID) entry.accountID = eventInfo.accountID;
      if (eventInfo.provider) entry.provider = eventInfo.provider;
      if (eventInfo.accountname) entry.accountname = eventInfo.accountname;
      if (eventInfo.foldername) entry.foldername = eventInfo.foldername;
    }

    let localized = "";
    let link = "";        
    if (entry.provider) {
      localized = tbSync.getString("status." + message, entry.provider);
      link = tbSync.getString("helplink." + message, entry.provider);
    } else {
      //try to get localized string from message from tbSync
      localized = tbSync.getString("status." + message);
      link = tbSync.getString("helplink." + message);
    }
  
    //can we provide a localized version of the event msg?
    if (localized != "status."+message) {
      entry.message = localized;
    }

    //is there a help link?
    if (link != "helplink." + message) {
      entry.link = link;
    }

    //dump the non-localized message into debug log
    tbSync.dump("EventLog", message + (entry.details !== null ? "\n" + entry.details : ""));
    this.events.push(entry);
    if (this.events.length > 100) this.events.shift();
    Services.obs.notifyObservers(null, "tbsync.observer.eventlog.update", null);
  },
  
  open: function (accountID = null, folderID = null) {
    this.eventLogWindow = tbSync.manager.prefWindowObj.open("chrome://tbsync/content/manager/eventlog/eventlog.xul", "TbSyncEventLog", "centerscreen,chrome,resizable");
  },    
}
