#!/usr/bin/python
print
print "Please enter the following 8 information, so your provider add-on can be prepared."
print 

values = {}
order = [
  "AddonAuthor",
  "Email",
  "AddonName",
  "AddonDescription",
  "AddonHompepage",
  "NameSpace",
  "ID",
  "MenuName"
]

values["AddonAuthor"]      = raw_input("1. Your name: ")
values["Email"]            = raw_input("2. Your email address: ")
values["AddonName"]        = raw_input("3. The name of your add-on as shown in the Thunderbird add-on manager (en-US): ")
values["AddonDescription"] = raw_input("4. The description of your add-on as shown in the Thunderbird add-on manager (en-US): ")
values["AddonHompepage"]   = raw_input("5. The project homepage: ")
values["NameSpace"]        = raw_input("6. A short identifier for your add-on, like 'dav', 'google', which will be used as its name space inside TbSync: ")
values["ChromeUrl"]        = values["NameSpace"] + "4tbsync"
values["ShortName"]        = values["NameSpace"].upper() + "-4-TbSync"
values["ID"]               = raw_input("7. A unique ID for your add-on (e.g. " + values["ChromeUrl"] + "@yourcompany.com): ")
values["MenuName"]         = raw_input("8. The label for your provider in the TbSync add-account-menu: ")

print
print "This is what has been entered:"
print

for x in order:
  print(x + " "*(20 - len(x)) + " : " + values[x])

print

if raw_input("Is this correct? (Y/n): ").lower().strip()[:1] == "n":
  print "Aborting."
  print
else:
  print "Updating files."
  print

  files = {
    "CONTRIBUTORS.md"                 : ["AddonAuthor"],
    "bootstrap.js"                    : ["ShortName", "NameSpace", "ChromeUrl"],
    "chrome.manifest"                 : ["ChromeUrl"],
    "manifest.json"                   : ["ID", "AddonAuthor", "AddonHomepage"],
    "_locales\en-US\messages.json"    : ["AddonName", "AddonDescription"],
    "_locales\en-US\provider.dtd"     : ["AddonName"],
    "_locales\en-US\provider.strings" : ["MenuName"],
    "content\includes\sync.js"        : ["ShortName"],
    "content\provider.js"             : ["ShortName", "NameSpace", "ChromeUrl", "Email"]
  }

  for file in files.keys():
    print file
