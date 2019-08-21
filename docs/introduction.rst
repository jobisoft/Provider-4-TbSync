Introduction
============

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
