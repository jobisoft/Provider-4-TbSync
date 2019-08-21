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

Once your TbSync provider add-on is stable and released to `addons.thunderbird.net <https://addons.thunderbird.net>`_, it can be added as a standard entry to the "Add new account" menu of TbSync, so all TbSync users will learn about it and get directed to its add-on page. For example this is what users see, when they try to create an *ActiveSync* account, but the provider add-on for *ActiveSync* is not yet installed:

.. image:: https://raw.githubusercontent.com/jobisoft/TbSync/master/screenshots/missing_provider.PNG





Directory Structure of a TbSync Provider Add-on
-----------------------------------------------

These are the important files and folders of the generated provider add-on:

::

    Project
    ├── bootstrap.js
    ├── chrome.manifest
    ├── manifest.json
    ├── _locales
    │   └── en-US
    │       ├── messages.json
    │       ├── provider.dtd
    │       └── provider.strings
    ├── skin
    │   ├── logo16.png
    │   └── logo32.png
    │   └── logo48.png
    └── content
        ├── provider.js
        ├── includes
        │   └── sync.js
        └── manager
            ├── createAccount.js
            ├── createAccount.xul
            ├── editAccountOverlay.js
            └── editAccountOverlay.xul

The author suggests to not rename files or folders, to not break the add-on. The following list provides an overview:

bootstrap.js
  This file is registering your provider with TbSync. The generated file should work out of the box.

manifest.json
  The main configuration file for your add-ons. Further details about this file can be found in the `MDN documentation <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json>`_. The generated file should work out of the box.

chrome.manifest
  An additional configuration file for your add-on. You probably only have to change it, when adding further translations (locales).

provider.js
  After your provider has been registered, TbSync will read this file, where the provider interface has to be implemented.

_locales
  Folder containing files to translate your add-on into different languages. Add a subfolder for each language and register them in ``chrome.manifest``. The name of the folder must not be changed.

  en-US/messages.json
    Localization for entries in ``manifest.json``. Check the `MDN documentation <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization#Internationalizing_manifest.json>`_ for more details. The name of the file must not be changed.

  en-US/provider.strings
    Localization for your add-on, which can be accessed from JavaScript. The name of the file may be anything you like, but it must be announced via `Base.getStringBundleUrl() <https://tbsync.readthedocs.io/en/latest/#Base.getStringBundleUrl>`_ as TbSync needs to access some of your localized strings. In paticular error messages and synchronization states your add-on is using. TODO:LINK

  en-US/provider.dtd
    Deprecated localization for XUL files of your add-on. Try to avoid its usage and instead set the localized labels of XUL/HTML elements via JavaScript. The generated provider add-on is using this in ``createAccount.xul`` and ``editAccountOverlay.xul``.
  
skin
  Folder containing all your additional resources like images and CSS files. It exists for historical reasons and the author is used to that approach. The generated provider also stores its logo files there. If you change their names, please also update your `manifest.json <https://github.com/jobisoft/Provider-4-TbSync/blob/ebfeec7b714baf956703511e30656208c8375526/manifest.json#L16>`_ and `Base.getProviderIcon() <https://tbsync.readthedocs.io/en/latest/#Base.getProviderIcon>`_. 

content
  Folder containing your add-ons source files.
   
  provider.js
    File containing your implementation of the ``Base`` class and a few other classes, depending on what your add-on is supposed to do. See the `corresponding section <https://todo>`_ for more details.
   
  manager
    Folder containing resources used be the manager UI. In paticular the XUL file for the *Create new account* dialog of your provider add-on (announced via `Base.getCreateAccountWindowUrl <https://tbsync.readthedocs.io/en/latest/#Base.getCreateAccountWindowUrl>`_) and the XUL file containing your tabs for the *Edit account dialog* (announced via `Base.getEditAccountOverlayUrl <https://tbsync.readthedocs.io/en/latest/#Base.getEditAccountOverlayUrl>`_).


.. js:autoclass:: Base
   :members:

.. js:autoclass:: StandardFolderList
   :members:

