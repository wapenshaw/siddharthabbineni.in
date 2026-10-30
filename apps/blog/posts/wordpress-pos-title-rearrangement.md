---
title: Wordpress post title rearrangement
description: I had the All-in-one SEO package installed and I thought it took care of the titles but it didn’t. The only thing in the title tag was the blogs name/title.…
date: 2008-11-03
tags: [tips]
archive:
  site: thesid.net
  url: https://web.archive.org/web/20090227102136/http://www.siddharthabbineni.com/tutorials/tips/wordpress-pos-title-rearrangement.html
---

I had the All-in-one SEO package installed and I thought it took care of the titles but it didn’t. The only thing in the title tag was the blogs name/title. Even though the settings in the SEO plugin were set properly, it just refused to show the post title in the main title. I even tried setting the custom title for a post individually and that didnt work either. Sucks really coz all the pages in google had only one title, the title of the blog.

I eventually disabled the plugin and the titles were reverted back to Wordpress default. Blog name - Post title. I didnt want that either. I want Post title | Blog name. I checked the template header file and rearranged the wp\_title() function and the bloginfo(’name’) variable. There was still a problem with that, the separator was still on the left side. The title looked like this ” » Post title | Blog name “.

I went on to codex and researched a bit, unlike the older versions wp\_title() does take parameters. Setting the right parameters can help customize the way the title of the post is displayed. Here is an example, one I used for this blog.

Originally

<table width="100%"><tbody><tr id="p3381"><td class="line_numbers"><pre>1
</pre></td><td class="code" id="p338code1"><pre class="php" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">&lt;?php</span> bloginfo<span style="color: #009900;">(</span><span style="color: #0000ff;">'name'</span><span style="color: #009900;">)</span><span style="color: #339933;">;</span> <span style="color: #000000; font-weight: bold;">?&gt;&lt;?</span>php wp_title<span style="color: #009900;">(</span><span style="color: #009900;">)</span><span style="color: #339933;">;</span> <span style="color: #000000; font-weight: bold;">?&gt;</span></pre></td></tr></tbody></table>

This resulted in a Title of this format. “Blogname » Post title”

You can change that to this

<table width="100%"><tbody><tr id="p3382"><td class="line_numbers"><pre>1
</pre></td><td class="code" id="p338code2"><pre class="php" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">&lt;?php</span> wp_title<span style="color: #009900;">(</span><span style="color: #0000ff;">'|'</span><span style="color: #339933;">,</span><span style="color: #000000; font-weight: bold;">true</span><span style="color: #339933;">,</span><span style="color: #0000ff;">'right'</span><span style="color: #009900;">)</span><span style="color: #339933;">;</span> <span style="color: #000000; font-weight: bold;">?&gt;&lt;?</span>php bloginfo<span style="color: #009900;">(</span><span style="color: #0000ff;">'name'</span><span style="color: #009900;">)</span><span style="color: #339933;">;</span> <span style="color: #000000; font-weight: bold;">?&gt;</span></pre></td></tr></tbody></table>

This results in a title of this format “Post title | Blogname”

A small tweak but really helpful when you want your search listings proper.

For more information and customizations of your own read the wp\_title() documentation here. [Template Tags/wp title](http://codex.wordpress.org/Template_Tags/wp_title#Description)
