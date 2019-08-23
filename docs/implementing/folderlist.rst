Implementing the folder list of the manager UI
----------------------------------------------

The DOM of the folderlist can be accessed by its ID and the FolderData of each entry is attached to its row. To get the FolderData of the selected row can be accessed like so:

::

   let folderlist = document.getElementById("tbsync.accountsettings.folderlist");
   let folderData = folderList.selectedItem.folderData;

.. |menuitem| replace:: ``menuitem``
.. _|menuitem|: https://dxr.mozilla.org/comm-central/source/comm/mailnews/addrbook/public/nsIAbDirectory.idl

.. js:autoclass:: StandardFolderList
   :members:
