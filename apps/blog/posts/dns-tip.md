---
title: DNS Tip
description: For you people who have gay DNS servers like the ones that belong to my isp, ones which dont resolve addresses of even the sites you know for sure, exist.…
date: 2006-02-24
tags: [personal]
archive:
  site: thesid.net
  url: https://web.archive.org/web/20090606004255/http://www.siddharthabbineni.com/personal/dns-tip.html
---

For you people who have gay DNS servers like the ones that belong to my isp, ones which dont resolve addresses of even the sites you know for sure, exist. I’ve got this small idea which works.

First off, we need an online DNS service. A site which can resolve addresses using its own connection. I have chosen http://www.dnsstuff.com. The simplest way to get the ip address is to go to the site and put in the host name in the ping box. But if you have to resolve addresses frequently, there is a better option which uses firefox or any other browser for that matter.

1.  In Firefox, goto Bookmarks >> Manage Bookmarks
2.  Click on Create a new bookmark button
3.  Type in whatever name you want in the Name and Description fields.
4.  In the location field put this “http://www.dnsstuff.com/tools/ping.ch?ip=%s” without quotes.
5.  And for The keyword, you can put anything you want, for the sake of easy understanding better type in “ping”, again without the quotes.
6.  Thats it! now to test, in the address bar type this  
    ping www.google.com  
    
7.  If you have done it all right, you must end up with this.
    
    *\[image lost: Webping example\]*
    

9.  Now that everything has worked out fine, Its time to tell the computer where to go when you hit that address. Open up your ‘hosts’ file, located in “c:\\windows\\system32\\drivers\\etc\\hosts” with any text editor, prefreably notepad.
10.  Add the ip address and the hostname separated by a tab-space next to the default entries. Remember each new entry should be on a new line and the tab-space is a must. Save it!.  
     My hosts file looks like this….
     
     *\[image lost: Image hosting by Photobucket\]*
     

12.  All done! Now just type in the normal address in any browser and you will be take to that site.

PS. Thanks to Arvind for teaching me how to create such bookmarks using the %s directive. What happens is, the %s is replaced by the string you type in after the keyword and the formatted url is then submitted.

Quote of the Day :  

> Arvind: NEW FOUND GLORY — ( Head on Collison Lyrics )  
> Arvind: u have that song?  
> TheScarletCars: nope  
> Arvind: found that song in a porn clip  
> TheScarletCars: lol  
> Arvind: ripping it frm that clip and and adding it to my collection  
> TheScarletCars: rofl!  
> TheScarletCars: pervert!
