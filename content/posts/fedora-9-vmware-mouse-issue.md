---
title: Fedora 9 on VMware, mouse tracking issue
description: I recently upgraded from VMware 6.0.3 to VMware 6.5, after installing the latest VMwareTools, the mouse went haywire. I click at one place and X thinks its…
date: 2008-10-12
tags: [tips]
archive:
  site: thesid.net
  url: https://web.archive.org/web/20081015132827/http://www.siddharthabbineni.com/tutorials/tips/fedora-9-vmware-mouse-issue.html
---

I recently upgraded from VMware 6.0.3 to VMware 6.5, after installing the latest VMwareTools, the mouse went haywire. I click at one place and X thinks its somewhere else. Basically the co-ordinate system seems messed up. There are two ways to fix this.

*1\. Replace vmmouse driver with mouse driver in xorg.conf*  
Open the xorg.conf file

sudo gedit /etc/X11/xorg.conf

Section "InputDevice"
Identifier  "VMware Mouse"
Driver      "vmmouse"

Scroll down to the Driver entry in that section and change **vmmouse** to **mouse**  
Save and reboot.  
This is just a minor fix, in some cases there might still be problems in full screen mode and you cant shift from the virtual machine to the host easily.

2\. To fix all the above issues and enable proper vmmouse implementation in the guest,  
Open the xorg.conf file

sudo gedit /etc/X11/xorg.conf

and add this to the xorg.conf file

Section "ServerFlags"
        Option      "AutoAddDevices" "false"
EndSection

Save the file and reboot.  
This will enable true vmmouse and the mouse will track perfectly.

PS: I used **sudo** here, if you haven’t configured sudo on your system, [enable it](http://www.mjmwired.net/resources/mjm-fedora-f9.html#sudo) or just use the root shell.

Tags: [fedora](http://www.siddharthabbineni.com/tag/fedora "fedora"), [mouse](http://www.siddharthabbineni.com/tag/mouse "mouse"), [Tips](http://www.siddharthabbineni.com/tag/tips "Tips"), [troubleshooting](http://www.siddharthabbineni.com/tag/troubleshooting "troubleshooting"), [vmware](http://www.siddharthabbineni.com/tag/vmware "vmware")  

#### Related posts

-   [Vista Explorer Tip](/blog/vista-explorer-tip "Vista Explorer Tip (August 28, 2008)") (1)
-   [Paste with middle click in Firefox](/blog/paste-with-middle-click-in-firefox "Paste with middle click in Firefox (September 11, 2008)") (0)
-   [Návrat idiota](/blog/navrat-idiota "Návrat idiota (April 9, 2006)") (2)
-   [Fedora Core 6 + AIGLX.. naicee](/blog/fedora-core-6-aiglx-naicee "Fedora Core 6 + AIGLX.. naicee (November 3, 2006)") (1)

(**2**)

*\[image lost: 1 Star\]* *\[image lost: 2 Stars\]* *\[image lost: 3 Stars\]* *\[image lost: 4 Stars\]* *\[image lost: 5 Stars\]*
