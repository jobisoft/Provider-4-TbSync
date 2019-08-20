/*
 * This file is part of __ProviderShortName__.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. 
 */
 
 "use strict";

var { tbSync } = ChromeUtils.import("chrome://tbsync/content/tbsync.jsm");

const __ProviderNameSpace__ = tbSync.providers.__ProviderNameSpace__;

var tbSyncNewAccount = {

    onClose: function () {
        return true;
    },

    onLoad: function () {
        this.providerData = new tbSync.ProviderData("__ProviderNameSpace__");

        this.elementName = document.getElementById('tbsync.newaccount.name');
        this.elementUser = document.getElementById('tbsync.newaccount.user');
        this.elementUrl = document.getElementById('tbsync.newaccount.url');
        this.elementPass = document.getElementById('tbsync.newaccount.password');
        this.elementServertype = document.getElementById('tbsync.newaccount.servertype');
        
        document.documentElement.getButton("back").hidden = true;
        document.documentElement.getButton("finish").disabled = true;

        document.getElementById("tbsync.newaccount.name").focus();

        document.addEventListener("wizardfinish", tbSyncNewAccount.onFinish.bind(this));
    },

    onUnload: function () {
    },

    onUserTextInput: function () {
        document.documentElement.getButton("finish").disabled = (this.elementName.value.trim() == "" || this.elementUser.value == "" || this.elementPass.value == "" ||  this.elementUrl.value.trim() == "");
    },

    onFinish: function (event) {
        let username = this.elementUser.value;
        let password = this.elementPass.value;
        let accountname = this.elementName.value.trim();
        let url = this.elementUrl.value.trim();
        tbSyncNewAccount.addAccount(username, password, accountname, url);
    },

    addAccount (username, password, accountname, url) {
        let newAccountEntry = this.providerData.getDefaultAccountEntries();
        newAccountEntry.username = username;

        if (url) {
            //if no protocoll is given, prepend "https://"
            if (url.substring(0,4) != "http" || url.indexOf("://") == -1) url = "https://" + url.split("://").join("/");
            newAccountEntry.host = eas.network.stripAutodiscoverUrl(url);
            newAccountEntry.https = (url.substring(0,5) == "https");
        }

        // Add the new account.
        let newAccountData = this.providerData.addAccount(accountname, newAccountEntry);
        window.close();
    }
};
