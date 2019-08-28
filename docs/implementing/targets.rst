.. _TbSyncTargets:

Target Classes
--------------

TbSync can manage different types of storage targets (calendars, address books, whatever) for
each folder / resource found on the server. The provider only has to set a value for the 
``targetType`` folder property when creating new folders. For each possible value, the provider
must implememt a matching class of type TargetData in his provider namespace. 

*Example:*
   
If one of the possible values of the ``targetType`` property is ``MyCalendar``, the provider
must implement a TargetData class inside his ``provider.js`` with a name of 
``TargetData_MyCalendar``.

When interacting with TbSync, for example when syncing a specific folder / resource,
you will usually have access to a :class:`FolderData` instance, which will return the 
associated TargetData via :class:`FolderData.targetData`.
   
.. js:autoclass:: TargetData
   :members:
