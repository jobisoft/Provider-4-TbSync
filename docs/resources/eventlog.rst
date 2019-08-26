TbSync Event Log
================

The TbSync event log can be used by any provider to log messages which could be important for the user. 

.. js:autofunction:: eventlog.add

Example usage:

::

   let info = new TbSync.EventLogInfo();
   TbSync.eventlog.add("warning", info, "Have a nice day!");
