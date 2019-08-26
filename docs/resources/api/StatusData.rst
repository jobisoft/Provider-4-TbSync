StatusData
----------

.. js:autoclass:: StatusData
   :members: constructor

   .. js:autoattribute:: StatusData.SUCCESS
   .. js:autoattribute:: StatusData.INFO
   .. js:autoattribute:: StatusData.WARNING
   .. js:autoattribute:: StatusData.ERROR
   .. js:autoattribute:: StatusData.ACCOUNT_RERUN
   .. js:autoattribute:: StatusData.FOLDER_RERUN

Example usage:

::

   let status = TbSync.StatusData.INFO;
   return new TbSync.StatusData(status, "Have a nice day!", "Everything is fine");