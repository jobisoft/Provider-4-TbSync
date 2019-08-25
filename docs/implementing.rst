Implementing the Provider Classes
==================================

The file ``provider.js`` is the central starting point to implement the TbSync provider classes:

:doc:`implementing/base`
  By implementing the :class:`Base` class, you define where TbSync can find certain things, like icons, XUL files for different dialogs or localized string definitions. It also defines, what properties your provider needs in the account and folder database and what should happen, if an account is being synchronized.


:doc:`implementing/folderlist`
  A central part of the TbSync manager UI is the folder list, which displays available resources discovered by your provider and their synchronization status. It even allows interaction via additional buttons or context menus. 
  
  You may implement the ``FolderList`` class, which allows to fully control how your list items should look like, or the :class:`StandardFolderList` class, which is a lot simpler but does not give you full control over the layout.

:doc:`implementing/targets`
  By implementing one or more :class:`TargetData` classes, you can define how TbSync can access the local elements like address books, calendars or whatever you use to store the elements received from the server.
 
.. toctree::
   :hidden:
   :maxdepth: 2

   implementing/base
   implementing/folderlist
   implementing/targets

