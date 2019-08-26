Target Classes
--------------

TbSync uses the folder property ``targetType`` to manage different types of
storage targets (calendars, address books, whatever). The provider must set the
value of this folder property when creating new folders. 

For each possible ``targetType`` value, the provider must implememt a matching
class of type ``TargetData`` in his provider namespace. 

*Example:*
   
If the short name identifer of the provider is ``dav`` and the value of the
``targetType`` property is ``DavCalendar``, the provider must implement a
TargetData class at:
 
::

   TbSync.providers.dav.DavCalendar()
   
   
.. js:autoclass:: TargetData
   :members:
