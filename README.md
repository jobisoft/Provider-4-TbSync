# EWS-4-TbSync
Example implementation of the TbSync interface for an external sync provider extension.

### Testing the example implementation

The [prototype of the EWS-4-TbSync extension](https://github.com/jobisoft/EWS-4-TbSync/releases) needs the latest [beta of TbSync](https://github.com/jobisoft/TbSync/releases).
 
### Steps to hook an external sync provider into TbSync

1. Provide hook information so it can be registered in TbSync.
```
ews: {
      name: "Exchange WebServices (EWS)", 
      js: "//ews4tbsync/content/ews.js" ,                       // implementation of the interface
      newXul: "//ews4tbsync/content/newaccount.xul",            // layout for "new account" dialog
      accountXul: "//ews4tbsync/content/accountSettings.xul",   // layout for "settings" dialog
      downloadUrl: "https://..."                                // URL with information about provider, so
    }                                                              I could inform user about it and guide them to
                                                                   a download page
```

2. Implement the [sync interface](https://github.com/jobisoft/EWS-4-TbSync/blob/v0.1/content/ews.js#L6-L327)
3. Implement the [user interface](https://github.com/jobisoft/EWS-4-TbSync/blob/v0.1/content/ews.js#L332-L525) (if the external provider wants to re-use the standard TbSync account settings UI)
4. Add overlays to add custom UI elements to TB (TbSync has its own overlayManager, works with TB61+)

### Images of the prototype hooked into TbSync

External sync provider shows up in "Add account" menu:
![image](https://github.com/jobisoft/EWS-4-TbSync/raw/master/img/add_account.png)

Sync progress feedback:
![image](https://github.com/jobisoft/EWS-4-TbSync/raw/master/img/sync_progress.png)

Autocomplete integration:
![image](https://github.com/jobisoft/EWS-4-TbSync/raw/master/img/autocomplete.png)

