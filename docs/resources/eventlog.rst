.. _TbSyncEventLog:

TbSync Event Log
================

The TbSync event log can be used by any provider to log messages which could be important for the user. 

.. js:autofunction:: eventlog.add

Example usage:

::

   let eventInfo = new TbSync.EventLogInfo();
   TbSync.eventlog.add(TbSync.StatusData.WARNING, eventInfo, "Something bad happend!");

Instead of creating a custom :class:`EventLogInfo` instance, you can also get one with prefilled information via 

* :class:`ProviderData.eventLogInfo`
* :class:`AccountData.eventLogInfo`
* :class:`FolderData.eventLogInfo`
* :class:`SyncData.eventLogInfo`
