Implementing the Provider Classes
==================================

The file ``provider.js`` is the central starting point to implement the TbSync provider classes:

:doc:`implementing/base`
  Implementing the :class:`Base` class defines, where TbSync can find certain things, like icons, XUL files for different dialogs or localized string definitions. It also defines, what properties the provider needs in the account and folder database and what should happen, if an account is being synchronized.


:doc:`implementing/folderlist`
  A central part of the TbSync manager UI is the folder list, which displays available resources discovered by the provider and their synchronization status. It even allows interaction via additional buttons or context menus. 
  
  Either the :class:`FolderList` class or the :class:`StandardFolderList` class has to be implemented. The first one allows to fully control how the list items should look like, the second one is a lot simpler but does not give full control over the layout.

:doc:`implementing/targets`
  Implementing one or more :class:`TargetData` classes defines, how TbSync can access the local elements like address books, calendars or whatever is used to store the elements received from the server.
 
.. toctree::
   :hidden:
   :maxdepth: 2

   implementing/base
   implementing/folderlist
   implementing/targets

