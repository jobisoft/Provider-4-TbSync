FolderList Classes
-------------------

The DOM of the folderlist can be accessed by its ID and the FolderData of each entry is attached to its row. To get the FolderData of the selected row can be accessed like so:

::

   let folderlist = document.getElementById("tbsync.accountsettings.folderlist");
   let folderData = folderList.selectedItem.folderData;

   
.. js:autoclass:: StandardFolderList
   :members:


.. js:autoclass:: FolderList
   :members:



