---
title: "X1: The death"
description: It all started when I wanted to search for a document I stored a month ago. I couldn’t find it anywhere as I couldn’t remember its name, so I used the built…
date: 2006-07-21
tags: [software]
archive:
  site: thesid.net
  url: https://web.archive.org/web/20090605041634/http://www.siddharthabbineni.com/tech/software/x1-the-death.html
---

It all started when I wanted to search for a document I stored a month ago. I couldn’t find it anywhere as I couldn’t remember its name, so I used the built in windows search. I disable the indexing engine as soon as I install the OS, and so none of the files on the disk were indexed and the normal search couldn’t find what I was looking for. It was then; I felt the need of a desktop search tool. Once on Slashdot I was reading an article on some topic related to desktop search wherein a hippie wrote that Google should be scared about X1 Desktop search engine being made free. He also bragged about how great an indexing engine it is. I was convinced and decided to give it a try, a 12MB download which took almost a full night to finish on my gay ass connection, I was all set to install it.

That evening I installed it and set it to the recommended indexing aggressiveness. It was running all night, the next day morning and also even when I came back home the next day. It was almost 20 hours since it started and it was still indexing, saying “Optimizing file index”. It used almost all possible resources available; I decided to free all the resources by rebooting the system.

It shut down and restarted posted well and everything was normal till the Intel RAID (ICH5R) bios showed up. It was showing the HDDs’ status as “Unknown” for both the 160G 7200.7s on the controller. In my experience I have seen “Normal” and “Error Occurred” but I have never seen “Unknown”. After a couple of reboots one disk showed up as “Normal” but the other didn’t, even after checking it with 4-5 HDD diagnostic tools like Sea Tools, MHDD etc. The “Unknown” status was holding back the controller in detecting the RAID0 (Stripe) Set. As a last attempt I used Norton Disk Doctor, and NDD without any user intervention, said something about fixing the drive and started doing something all on its own. I lost all hopes at that moment, I had to wave goodbye to my 320GB data. All the little hopes I had of retaining the data were lost when the RAID bios reported both the disks as “Normal” but wasn’t able to detect the previous RAID set. I was mortified! All the 320GB data gone! Vanished!

What was the reason? X1. It tried to index every byte of the files in the RAID partition; the HDDs couldn’t take that torture and failed one after another. All the 320G data was nothing but videos, yes 95% of the data was either movies or TV series, and I still don’t know what X1 was indexing in those files. Key frames? What ever it did, it was the reason I lost 320Gigs of data. It didn’t really bother me because I have seen almost every byte on those disks, so I am not that disturbed as I was be when I lost my 5600XT. Fortunately both the disks are under warranty and I am absolutely sure ill be getting new disks when I claim the warranty, some good news at last.

X1 will never be forgotten. It reached the top of my “Worst Software ever” list, right above Norton Antivirus 2002. The next time I see such suggestions by hippies on Slashdot, I’ll openly flames their asses.
