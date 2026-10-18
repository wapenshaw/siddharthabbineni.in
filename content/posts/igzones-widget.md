---
title: IGZones Wordpress Widget
description: IGZones provides a unique service where in you can get the live game ratings. They can be either your ratings or your clan’s. I wanted to display my n00b…
date: 2008-08-28
tags: [tutorials]
archive:
  site: thesid.net
  url: https://web.archive.org/web/20080905220629/http://www.siddharthabbineni.com/tutorials/igzones-widget.html
---

[IGZones](http://www.igzones.com "International Gaming Zones") provides a unique service where in you can get the live game ratings. They can be either your ratings or your clan’s. I wanted to display my n00b rating here on this site in the sidebar. Its very easy you just have to write a small piece of [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code") and you are off.

First of all, go here » [Rating Services](http://www.igzones.com/ratingservices_learn "Rating Services") and familiarise yourself with the type of requests and the variables.

Now, to add the ratings to the sidebar, there are two ways. One, You can directly edit the template and add the [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code") in the sidebar.[php](http://www.siddharthabbineni.com/tag/php "Posts tagged with php"). This is the simplest way. There is a problem with this though, you cannot place the widget at any place you like, you can only add it either at the top or the bottom of the dynamic sidebar which is controlled by [wordpress](http://www.siddharthabbineni.com/tag/wordpress "Posts tagged with wordpress").

The other and a better way is to add the a widget with your [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code") via [wordpress](http://www.siddharthabbineni.com/tag/wordpress "Posts tagged with wordpress") so that you have full control over its position. [Wordpress](http://www.siddharthabbineni.com/tag/wordpress "Posts tagged with wordpress") has a Text/Html widget but it doens’t parse [PHP](http://www.siddharthabbineni.com/tag/php "Posts tagged with php") on the fly, so download and install this plugin » [**PHP Code Widget**.](http://wordpress.org/extend/plugins/php-code-widget/ "Wordpress : PHP Code Widget") This plugin allows us to insert and execute [php](http://www.siddharthabbineni.com/tag/php "Posts tagged with php") [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code") in a widget. After installing the plugin, in the [widgets](http://www.siddharthabbineni.com/tag/widgets "Posts tagged with widgets") page, a “[PHP](http://www.siddharthabbineni.com/tag/php "Posts tagged with php") [Code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code")” widget will appear, add it to your sidebar, click on edit and enter the [php](http://www.siddharthabbineni.com/tag/php "Posts tagged with php") [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code"). Save and refresh. The [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code") will now be executed.

Coming to the [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code") to display the ratings, its similar to the example on the [Rating Services](http://www.igzones.com/ratingservices_learn "Rating Services") page. Its simpler if you are displaying the ratings of just one user. First, we have to prepare the request URL. If your user name is **tHeSiD** and you want the ratings from the **AoC Random Map** ladder, the URL will be

http://www.igzones.com/ratingservices?ladder=**AoCRM**&player=**tHeSiD**

The format would be

http://www.igzones.com/ratingservices?ladder=<**ladder**\>&player=<**username without clan tag**\>

The response to this will be a Comma Separated Values string

example : 114752,tHeSiD,1622,56,53,0,1,AoCRM,1233541,2008-08-27 19:14:43

The values are in the following order

User ID, User name, Rating, Wins, Losses, Incomplete, Streak, Ladder, Last Match, Last Match Date & Time

Rest is just to explode this string into an array and get the values from it. The [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code") will explain this better.

This [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code") is for single user only. Prepare your Request URL and replace the URL in the [code](http://www.siddharthabbineni.com/tag/code "Posts tagged with code") with yours.

<table><tbody><tr><td class="line_numbers"><pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
</pre></td><td class="code"><pre class="php php" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">&lt;?php</span>
	<span style="color: #000088;">$igz_site</span> <span style="color: #339933;">=</span> <span style="color: #990000;">fopen</span><span style="color: #009900;">(</span><span style="color: #0000ff;">"http://www.igzones.com/ratingservices?ladder=AoCRM&amp;player=tHeSiD"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"r"</span><span style="color: #009900;">)</span>;
	<span style="color: #000088;">$ratingservices_page</span> <span style="color: #339933;">=</span> <span style="color: #990000;">fread</span><span style="color: #009900;">(</span><span style="color: #000088;">$igz_site</span><span style="color: #339933;">,</span> <span style="color: #990000;">filesize</span><span style="color: #009900;">(</span><span style="color: #000088;">$igz_site</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>;
	<span style="color: #990000;">fclose</span><span style="color: #009900;">(</span><span style="color: #000088;">$igz_site</span><span style="color: #009900;">)</span>;
	<span style="color: #000088;">$igz</span> <span style="color: #339933;">=</span> <span style="color: #990000;">explode</span><span style="color: #009900;">(</span><span style="color: #0000ff;">","</span><span style="color: #339933;">,</span> <span style="color: #000088;">$ratingservices_page</span><span style="color: #009900;">)</span>;
		<span style="color: #000088;">$userid</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color:#800080;">0</span><span style="color: #009900;">]</span>;
		<span style="color: #000088;">$name</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color: #cc66cc;">1</span><span style="color: #009900;">]</span>;
		<span style="color: #000088;">$rating</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color: #cc66cc;">2</span><span style="color: #009900;">]</span>;
		<span style="color: #000088;">$wins</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color: #cc66cc;">3</span><span style="color: #009900;">]</span>;
		<span style="color: #000088;">$losses</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color: #cc66cc;">4</span><span style="color: #009900;">]</span>;
		<span style="color: #000088;">$inc</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color: #cc66cc;">5</span><span style="color: #009900;">]</span>;
		<span style="color: #000088;">$streak</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color: #cc66cc;">6</span><span style="color: #009900;">]</span>;
		<span style="color: #000088;">$ladder</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color: #cc66cc;">7</span><span style="color: #009900;">]</span>;
		<span style="color: #000088;">$lastmatch</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color: #cc66cc;">8</span><span style="color: #009900;">]</span>;
		<span style="color: #000088;">$date</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$igz</span><span style="color: #009900;">[</span><span style="color: #cc66cc;">9</span><span style="color: #009900;">]</span>;
&nbsp;
	<span style="color: #000088;">$data</span> <span style="color: #339933;">=</span> <span style="">'&lt;ul&gt;
		&lt;li&gt;Tag : &lt;a href="http://www.igzones.com/user/'</span><span style="color: #339933;">.</span><span style="color: #000088;">$userid</span><span style="color: #339933;">.</span><span style="">'" onclick="javascript:pageTracker._trackPageview ('</span><span style="color: #339933;">/</span>outbound<span style="color: #339933;">/</span>www<span style="color: #339933;">.</span>igzones<span style="color: #339933;">.</span>com<span style="">');"&gt;'</span><span style="color: #339933;">.</span><span style="color: #000088;">$name</span><span style="color: #339933;">.</span><span style="">'&lt;/a&gt;&lt;/li&gt;
		&lt;li&gt;Ladder : '</span><span style="color: #339933;">.</span><span style="color: #000088;">$ladder</span><span style="color: #339933;">.</span><span style="">'&lt;/li&gt;
		&lt;li&gt;Rating : '</span><span style="color: #339933;">.</span><span style="color: #000088;">$rating</span><span style="color: #339933;">.</span><span style="">'&lt;/li&gt;
		&lt;li&gt;Wins : '</span><span style="color: #339933;">.</span><span style="color: #000088;">$wins</span><span style="color: #339933;">.</span><span style="">'&lt;/li&gt;
		&lt;li&gt;Losses : '</span><span style="color: #339933;">.</span><span style="color: #000088;">$losses</span><span style="color: #339933;">.</span><span style="">'&lt;/li&gt;
		&lt;li&gt;Streak : '</span><span style="color: #339933;">.</span><span style="color: #000088;">$streak</span><span style="color: #339933;">.</span><span style="">'&lt;/li&gt;
		&lt;li&gt;Last match : &lt;a href="http://www.igzones.com/matches/'</span><span style="color: #339933;">.</span><span style="color: #000088;">$lastmatch</span><span style="color: #339933;">.</span><span style="">'" target="_blank" onclick="javascript:pageTracker._trackPageview ('</span><span style="color: #339933;">/</span>outbound<span style="color: #339933;">/</span>www<span style="color: #339933;">.</span>igzones<span style="color: #339933;">.</span>com<span style="">');"&gt;'</span><span style="color: #339933;">.</span><span style="color: #000088;">$date</span><span style="color: #339933;">.</span><span style="">'&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;'</span>;
	<span style="color: #990000;">echo</span> <span style="">'&lt;a href="http://www.igzones.com" align="center" target="_blank" onclick="javascript:pageTracker._trackPageview ('</span><span style="color: #339933;">/</span>outbound<span style="color: #339933;">/</span>www<span style="color: #339933;">.</span>igzones<span style="color: #339933;">.</span>com<span style="">');"&gt;&lt;img class="igzimg" src="http://www.igzones.com/images/microbanner.png"  border="0" alt="Age of Empires IGZones"&gt;&lt;/a&gt;&lt;br/&gt;'</span>;
	<span style="color: #990000;">echo</span> <span style="color: #000088;">$data</span>;
<span style="color: #000000; font-weight: bold;">?&gt;</span></pre></td></tr></tbody></table>

If in any case you have a problem with the filesize() function, just replace filesize($igz\_site) with a numerical value. I recommend 75. so line 3 should be

$ratingservices\_page \= fread($igz\_site,75);

Save the widget and refresh your site. Your ratings will now be visible in the sidebar.

Tags: [code](http://www.siddharthabbineni.com/tag/code "code"), [php](http://www.siddharthabbineni.com/tag/php "php"), [Programming](http://www.siddharthabbineni.com/tag/programming "Programming"), [widgets](http://www.siddharthabbineni.com/tag/widgets "widgets"), [wordpress](http://www.siddharthabbineni.com/tag/wordpress "wordpress")
