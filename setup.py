#!/usr/bin/python
# Tested with Pyhton 2.7

print
print "Please enter the following 7 information, so your provider add-on can be prepared."
print 

values = {}
order = [
  "AddonAuthor",
  "Email",
  "AddonName",
  "AddonDescription",
  "NameSpace",
  "ID",
  "MenuName"
]

values["AddonAuthor"]      = raw_input("1. Your name: ")
values["Email"]            = raw_input("2. Your email address: ")
values["AddonName"]        = raw_input("3. The name of your add-on as shown in the Thunderbird add-on manager (en-US): ")
values["AddonDescription"] = raw_input("4. The description of your add-on as shown in the Thunderbird add-on manager (en-US): ")
values["NameSpace"]        = raw_input("5. A short identifier for your add-on, like 'dav', 'google', which will be used as its name space inside TbSync: ")
values["ChromeUrl"]        = values["NameSpace"] + "4tbsync"
values["ShortName"]        = values["NameSpace"].upper() + "-4-TbSync"
values["ID"]               = raw_input("6. A unique ID for your add-on (e.g. " + values["ChromeUrl"] + "@yourcompany.com): ")
values["MenuName"]         = raw_input("7. The label for your provider in the TbSync add-account-menu: ")

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
    "CONTRIBUTORS.md"                   : ["AddonAuthor"],
    "bootstrap.js"                      : ["ShortName", "NameSpace", "ChromeUrl"],
    "chrome.manifest"                   : ["ChromeUrl"],
    "manifest.json"                     : ["ID", "AddonAuthor"],
    "_locales/en-US/messages.json"      : ["AddonName", "AddonDescription"],
    "_locales/en-US/provider.dtd"       : ["MenuName"],
    "_locales/en-US/provider.strings"   : ["MenuName"],
    "content/includes/sync.js"          : ["ShortName"],
    "content/provider.js"               : ["ShortName", "NameSpace", "ChromeUrl", "Email"],
    "content/manager/createAccount.js"  : ["ShortName", "NameSpace"],
    "content/manager/createAccount.xul" : ["ChromeUrl"]
  }

  for file in files.keys():
    # Read in the file
    with open(file, "r") as f :
       filedata = f.read()
    # Replace everything
    for repl in files[file]:
      filedata = filedata.replace("__Provider" + repl + "__", values[repl])
    # Write the file out again
    with open(file, 'w') as f:
      f.write(filedata)

  print "Done."
