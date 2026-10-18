---
title: Change or Modify Bluetooth Device hardware (MAC) address
description: I am in the middle of an ongoing experiment, where in I am trying to get a Bluetooth headset to work simultaneously with my windows mobile phone and also my…
date: 2009-02-08
tags: [hardware]
archive:
  site: thesid.net
  url: https://web.archive.org/web/20090208214754/http://www.siddharthabbineni.com/tech/hardware/change-bluetooth-device-mac-address.html
---

I am in the middle of an ongoing experiment, where in I am trying to get a Bluetooth headset to work simultaneously with my windows mobile phone and also my PC. I recently got my hands on a Nokia BH-209 headset, I tested the audio quality on the and its amazing! I tested it with skype by pairing it with my PC and the voice clarity is brilliant. I have always been searching for a good reason to ditch my table Mic and this headset maybe the one.

Right now, I am still unable to make it work with both the PC and the phone at the same time, so I need to pair it to the device every time I need to use it. Although pairing is not a tedious process, it still needs some manual labour, like deleting existing devices, adding and re-pairing. Almost a 5 minute task every time I want to use it. I want to avoid this hassle. Yes I am lazy.  
  
The basic idea behind my experiment is simple, fake the connection. Make the headset think that is communicating its my phone, a spoof attack sort of a thing. My knowledge in bluetooth is limited so my initial plan of action was to follow these steps, spoof the mac of the bluetooth dongle on my pc so that it is the same as that of my phone, then change the device class of my PC from Computer -> Desktop to Computer -> Palm (My phone is the imate version of the htc wizard with windows mobile 2005) and finally find the secret authentication key between the phone and the headset. Once I get that I can emulate the phone on the pc and try to connect to it. Unfortunately there are any tools available in windows to do some serious work. The tools that we generally use to change the MACs of network cards like SMAC or A-MAC will not work with bluetooth adapters, so I had to come to Linux.

The first step was to change the Bluetooth hardware address of my bluetooth dongle. After hours of digging around, I finally found a way to do this. Here it is. I did this in Ubuntu 8.10 Intrepid Ibex, it had all the bluetooth modules already installed, else, install hci and hci related packages on your distro.

Some info first. All bluetooth devices have a hardware address similar to the MAC address for network (NIC) cards. That address is the unique identification information on the dongle. There’s a great tool called bdaddr that allows you to change the BD\_ADDR, the physical address, in your Bluetooth adapter. It works with Ericcson, Cambridge Silicon Radio and Zeevo chipsets. You can download it here: [bdaddr](http://www.siddharthabbineni.com/wp-content/uploads/2009/02/bdaddrtar.bz2). By the way, you must intstall the *bluez-utils* and *libbluetooth-dev* packages.

<table width="100%"><tbody><tr id="p4831"><td class="line_numbers"><pre>1
</pre></td><td class="code" id="p483code1"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">apt-get</span> <span style="color: #c20cb9; font-weight: bold;">install</span> bluez-utils libbluetooth-dev</pre></td></tr></tbody></table>

Getting the address of the phone or the device you want to fake. Switch on the bluetooth on the phone.

<table width="100%"><tbody><tr id="p4832"><td class="line_numbers"><pre>1
</pre></td><td class="code" id="p483code2"><pre class="bash" style="font-family:monospace;">$ hcitool scan</pre></td></tr></tbody></table>

![Scanning for available devices](/blog/change-bluetooth-device-mac-address/8ddba68761d4.png)

Scanning for available devices

Now we have the address that we need to fake. i.e. 00:12:37:85:1B:78. We need to compile the bdaddr application, extract it to a folder and “make” it.

![Compiling bdaddr](/blog/change-bluetooth-device-mac-address/93b08b699a1e.png)

Compiling bdaddr

Once that is done, we now a working version of bdaddr.

![BD\_ADDR](/blog/change-bluetooth-device-mac-address/096e228b9392.png)

BD\_ADDR

As you can see, bdaddr detected my dongle. *The device address is same as that of the phone because I recently changed it.*

<table width="100%"><tbody><tr id="p4833"><td class="line_numbers"><pre>1
2
3
</pre></td><td class="code" id="p483code3"><pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">[</span>heaton<span style="color: #000000; font-weight: bold;">@</span>sulphure:~<span style="color: #000000; font-weight: bold;">/</span>Downloads<span style="color: #000000; font-weight: bold;">/</span>bdaddr<span style="color: #7a0874; font-weight: bold;">]</span>$ .<span style="color: #000000; font-weight: bold;">/</span>bdaddr
Manufacturer:   Cambridge Silicon Radio <span style="color: #7a0874; font-weight: bold;">(</span><span style="color: #000000;">10</span><span style="color: #7a0874; font-weight: bold;">)</span>
Device address: 00:<span style="color: #000000;">12</span>:<span style="color: #000000;">37</span>:<span style="color: #000000;">85</span>:1B:<span style="color: #000000;">78</span></pre></td></tr></tbody></table>

Switch to root to proceed and then follow what I did (in the image below).

![Changing the BD\_ADDR of the dongle](/blog/change-bluetooth-device-mac-address/d6dde580d22c.png)

Changing the BD\_ADDR of the dongle

<table width="100%"><tbody><tr id="p4834"><td class="line_numbers"><pre>1
2
3
</pre></td><td class="code" id="p483code4"><pre class="bash" style="font-family:monospace;">hciconfig hci0
.<span style="color: #000000; font-weight: bold;">/</span>bdaddr <span style="color: #660033;">-i</span> hci0 00:<span style="color: #000000;">12</span>:<span style="color: #000000;">37</span>:<span style="color: #000000;">85</span>:1B:<span style="color: #000000;">98</span>
hciconfig hci0 reset</pre></td></tr></tbody></table>

Unplug the adapter and insert it again. Check for the change in address.

![Address changed to new specified one.](/blog/change-bluetooth-device-mac-address/44c4120ecc8f.png)

Address changed to new specified one.

YAY! my first step is complete, I am working on the next two steps and will post as soon I make a breakthrough.
