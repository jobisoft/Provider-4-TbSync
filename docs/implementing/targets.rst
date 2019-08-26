.. _TbSyncTargets:

Target Classes
--------------

TbSync uses the folder property ``targetType`` to manage different types of
storage targets (calendars, address books, whatever). The provider must set the
value of this folder property when creating new folders. 

For each possible ``targetType`` value, the provider must implememt a matching
class of type ``TargetData`` in his provider namespace. 

*Example:*
   
If the value of the ``targetType`` property can be ``MyCalendar``, the provider
must implement a ``TargetData`` class inside his ``provider.js`` with a name of 
``MyCalendar``.

For further information check :class:`FolderData.targetData`.

   
.. js:autoclass:: TargetData
   :members:
