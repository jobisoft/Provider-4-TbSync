# EWS-4-TbSync
Example implementation of the TbSync interface for external provider extensions.

### Steps to hook into TbSync

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

2. Implement the sync interface
3. Implement the user interface (if the external provider wants to re-use the standard TbSync account settings UI)
4. Add overlays to add custom UI elements to TB (TbSync has its own overlayManager, works with TB61+)
