TbSync Provider Documentation
=================================

THIS IS NOT DONE YET.

Introduction
~~~~~~~~~~~~

This document tries to cover all aspects of how to create a provider add-on for TbSync to extends its sync capabilities. All TbSync provider add-ons are currently designed as *bootrapped extensions*, for which support is probably going to be dropped from Thunderbird at some time. We are working on migrating the TbSync API into a WebExtension API, so - hopefully - all provider add-ons can be converted into `MailExtensions <https://developer.thunderbird.net/add-ons/about-add-ons#mailextensions>`_ without much effort.

What is TbSync ?
----------------

TbSync is a central user interface to manage cloud accounts and to synchronize their contact, task and calendar information with Thunderbird. Its main objective is to simplify the setup process for such accounts and to improve the user experience by creating a common place to manage them.

.. image:: https://raw.githubusercontent.com/jobisoft/TbSync/master/screenshots/TbSync_005.png

Further details can be found in the `wiki <https://github.com/jobisoft/TbSync/wiki>`_ of the TbSync project.

What is a TbSync Provider Add-on ?
----------------------------------

TbSync itself is just the manager UI and does not provide any sync capabilities on its own. But it provides an API for other add-ons to hook into TbSync. Such add-ons, which use this API and add sync capabilities are called TbSync provider add-ons. The following provider add-ons are currently available:

* `CalDAV & CardDAV <https://addons.thunderbird.net/addon/dav-4-tbsync>`_
* `Exchange ActiveSync (EAS) <https://addons.thunderbird.net/addon/eas-4-tbsync>`_

Getting Started
~~~~~~~~~~~~~~~

Generating a Basic TbSync Provider Add-on
-----------------------------------------

Head over to

::

  https://github.com/jobisoft/Provider-4-TbSync
 
and clone the provider add-on template repository. If you have a GitHub account yourself, you can simply `add a copy of the provider add-on template to your own account <https://github.com/jobisoft/Provider-4-TbSync/generate>`_.

After you have all the files on disc, run

::

  ./setup.py

which will ask you a couple of questions to setup the provider add-on for you. To install your own provider add-on into Thunderbird 68, just zip the project folder and install the file using the gear menu in the Thunderbird add-on manager:

.. image:: https://raw.githubusercontent.com/jobisoft/TbSync/master/screenshots/install-from-file.PNG

To see your own provider add-on in action, you need to install the latest version of TbSync from the so called *beta release channel* for Thunderbird 68.

::

  https://github.com/jobisoft/TbSync/wiki/Get-the-latest-TbSync-version#beta-release-channel
 
Please make sure, that you uninstall any other TbSync provider add-on or switch to their version from the *beta release channel* as well. Your own provider should then show up in the "Add new account" menu of TbSync:

.. image:: https://raw.githubusercontent.com/jobisoft/TbSync/master/screenshots/custom_provider.PNG

Once your TbSync provider add-on is stable and released to `addons.thunderbird.net <https://addons.thunderbird.net>`_, it can be added as a standard entry to the "Add new account" menu of TbSync, so all TbSync users will learn about it and get directed to its add-on page. For example this is what users see, when they try to create an *ActiveSync* account, but the provider for ActiveSync is not yet installed:

.. image:: https://raw.githubusercontent.com/jobisoft/TbSync/master/screenshots/missing_provider.PNG





Understanding the Directory Structure of a TbSync Provider Add-on
-----------------------------------------------------------------

The generated provider add-on has the following structure:

::

    Project
    ├── LICENSE         
    ├── manifest.json
    ├── chrome.manifest
    ├── bootstrap.js
    ├── skin         
    │   ├── logo16.png
    │   └── logo32.png
    │   └── logo48.png
    ├── _locales         
    │   └── en-US
    │       ├── provider.strings
    │       ├── provider.dtd
    │       └── messages.json
    └── content
        ├── provider.js       
        ├── includes
        │   └── sync.js   
        └── manager
            ├── provider.strings
            ├── provider.dtd
            └── messages.json

This documentation will refer to this structure and will explain the different files and folders as needed.

``bootstrap.js``
  This file is registering your provider with TbSync and the generated file should work out of the box. You should not touch it, if you   do not know exactly what you are doing.

``provider.js``
  After your provider has been registered, TbSync will read this file, where the provider interface has to be implemented.



.. js:autoclass:: Base
   :members:

.. js:autoclass:: StandardFolderList
   :members:

