---
title: Upgrade Wordpress 2.6.* to 2.7
description: Wordpress 2.7 is out! Here is the way to upgrade from any of the previous versions of wordpress ( 2.6.* / 2.6.5) to the latest version i.e. 2.7. The process…
date: 2008-12-11
tags: [tutorials]
archive:
  site: thesid.net
  url: https://web.archive.org/web/20081219121653/http://www.siddharthabbineni.com/tutorials/upgrading-wordpress-26-to-27.html
---

Wordpress 2.7 is out! Here is the way to upgrade from any of the previous versions of wordpress ( 2.6.\*  /  2.6.5) to the latest version i.e. 2.7. The process is very simple, involves only a few steps and I assure you the upgrade is worth the effort. Wordpress 2.7 was released to wordpress.com users earlier but for individual sites it is out now! Lets get started.  

![Wordpress](/images/upgrading-wordpress-26-to-27/e59ad0d2f010.png)

Wordpress

***The Upgrade :***

1.  Backup the following files and folders :
    -   wp-content (backup the whole directory)
    -   wp-config.php (file)
    -   Database (using phpmyadmin, backup the whole database, safe.)
2.  Downloaded the latest Wordpress [here](http://wordpress.org/download/ "Wordpress download").
3.  Delete all the old Wordpress files .
4.  Extract and upload (or upload and extract) the new Wordpress files.
5.  Copy the wp-config.php to the Wordpress root directory.
6.  Run *wp-admin/update.php* (http://yourwordpresssite/*wp-admin/update.php*). It will ask for a database upgrade, continue. If all goes well it will redirect to a blank page.
7.  Delete the new wp-content directory and upload your old wp-content directory in place of it.
8.  Visit your site!  All your posts and plugins will be active and it will look the same! (All incompatible plugins will be disabled automatially, but most of the plugins that work with 2.6.\* also work with 2.7
9.  Admin URL is the same: http://yourwordpresssite/*wp-admin/*

***Known Issues :***

1.  If you by chance cannot see the left navigation menu, disable any menu optimizing plugin that you have installed before like Ozh’ Admin Drop Down Menu plugin or Lighter Menus. Do that by deleting the corresponding plugin directory in the wp-plugins directory.

Successfully upgraded my site by exactly following the above steps :). The new admin interface is brilliant! Its good to look at and the interface is just amazing. Moreover, once you upgrade to 2.7 you don’t need to follow this painful upgrade process every time a new version is released. You can directly upgrade from the admin interface. Cheers ;)

Tags: [Tips](http://www.siddharthabbineni.com/tag/tips "Tips")[troubleshooting](http://www.siddharthabbineni.com/tag/troubleshooting "troubleshooting")[Tutorials](http://www.siddharthabbineni.com/tag/tutorials "Tutorials")[upgrade](http://www.siddharthabbineni.com/tag/upgrade "upgrade")[wordpress](http://www.siddharthabbineni.com/tag/wordpress "wordpress")

#### Related posts

-   [Wordpress post title rearrangement](/images/wordpress-pos-title-rearrangement "Wordpress post title rearrangement (November 3, 2008)") (0)
-   [Fedora 9 on VMware, mouse tracking issue](/images/fedora-9-vmware-mouse-issue "Fedora 9 on VMware, mouse tracking issue (October 12, 2008)") (8)
-   [Call of Duty - World at War, Solo start error (fixed)](/images/cod-world-at-war-solo-start-error-fixed "Call of Duty - World at War, Solo start error (fixed) (November 18, 2008)") (130)
