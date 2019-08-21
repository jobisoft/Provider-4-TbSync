Implementing the TbSync API
===========================

The file ``provider.js`` is the central starting point to implement the TbSync Provider API. The following classes must be implemented:

:doc:`Base Class <base>`
  By implementing the ``Base`` class, you define where TbSync can find certain things, like icons, XUL files for different dialogs or localized string definitions. It also defines, what fields your provider needs in the account and folder database and what should happen, if an account is being synchronized.


:doc:`Folder List Class <folderlist>`
  A central part of the TbSync manager UI is the folder list, which displays available resources discovered by your provider and their synchronization status. It even allows interaction via additional buttons or context menus. 
  
  You may implement the ``FolderList`` class, which allows to fully control how your list items should look like, or the ``StandardFolderList`` class, which is a lot simpler but does not give you full control over the layout.

:doc:`Target Classes <targets>`
  TbSync is target driven and does not restrict you, where you want to sync into.
 
.. toctree::
   :hidden:
   :maxdepth: 2

   base
   folderlist

