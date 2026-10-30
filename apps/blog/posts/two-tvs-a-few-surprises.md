---
title: Two TVs, a few surprises
description: How I debloated a TCL Google TV over ADB and rooted an LG webOS TV with Codex and Claude, and the parts that didn't go to plan.
date: 2026-10-03
tags: [android-tv, webos, adb, home]
---

I have two TVs at home: a TCL 55Q6C running Google TV and an LG 55UN8000PTA running webOS. Both came with years of preinstalled stuff I never open. I wanted less clutter and a home screen that's quick to use, without breaking the things I actually watch.

## The TCL

I did the planning with Codex before I could even connect to the TV. I looked at launchers, had Codex write a small Python tool to capture the TV's state, and set myself some rules. Nothing gets uninstalled, changes go in small batches, every batch gets tested, and there's a rollback script before anything changes.

Connecting was the easy part. Wireless debugging on Android 14 pairs with a code, then `adb` talks to a TLS port. Claude took a baseline first: packages, memory, storage and settings. The TV turned out to have 2.45 GB of RAM, and it reports itself as a `Smart TV Pro` rather than a 55Q6C, which made looking up firmware notes harder than it should be.

The cleanup itself was 21 packages in three batches of 5, 10 and 6, all disabled for the main user rather than removed:

```sh
adb shell pm disable-user --user 0 com.tcl.hotelmenu
# and to undo it
adb shell pm enable --user 0 com.tcl.hotelmenu
```

The list was mostly TCL extras: the hotel menu, a game bar, a demo mode, the repair guide, AirPlay and Miracast, plus TalkBack and the calendar sync. After each batch I checked the remote, HDMI input, Netflix, YouTube, sound and the on-screen keyboard before going on.

The results were smaller than I hoped. The animation scales were already at 0.5, so there was nothing to gain there. `pm trim-caches` took `/data` from 2.4 GB to 2.1 GB. I never got a fair memory comparison, because the reading after the reboot was taken before the TV had settled. So I can't honestly say it got faster.

Then I tried Projectivy as a launcher. `cmd package set-home-activity` reported success, but TCL's firmware kept sending the Home button to its own launcher anyway. What worked was Projectivy's Accessibility override, which catches the Home button itself. After a while I found the clean screen too clean. I missed finding new things to watch and carrying on with shows across apps, which is the one thing the Google TV home screen is good at. So I removed Projectivy and went back. The disabled packages stayed disabled, and the recommendations came back because they're part of Google's launcher.

The TCL also kept losing my Google sign-in after a restart. The logs showed Google's setup app removing the account about two and a half minutes after boot, and the same thing appeared in logs from before I'd changed anything, so the cleanup didn't cause it. The TV's country code also read `AO`, which is Angola. That looked like a clue, but I never proved it was the cause.

The last thing I did was install Key Mapper so I can remap a button on the remote. I took the F-Droid build, checked its SHA-256 against the F-Droid repository, and installed it with `adb install`. I haven't set up any mappings yet.

## The LG

The LG needed root before I could do much. Codex and I checked its exact firmware (webOS 5.6.2, software 04.64.00), turned off Developer Mode and automatic updates, and rooted it with SlopBro. That installed Homebrew Channel, the community app store for rooted webOS TVs.

Then I locked it down. I added an Ed25519 key for SSH, checked that key login worked, and disabled Telnet, which Homebrew leaves on by default with no password. After a reboot, SSH with the key still gave me root, port 23 refused connections, and the default password no longer worked. The Content Store and the streaming apps were fine.

Removing apps goes through the TV's own installer service over SSH:

```sh
luna-send -n 1 -w 10000 luna://com.webos.appInstallService/remove '{"id":"lgchannels.home","subscribe":false}'
```

One gotcha: `luna-send` returned nothing until I ran SSH with `-tt` to force a terminal. I archived and checksummed each app's folder before removing it. Seven apps went: LG Channels, three promotional stubs, and three streaming apps nobody uses.

Six built-in tiles couldn't be removed, because they're system apps. `removeLaunchPoint` refused, and `updateLaunchPoint` with `visible: false` returned success but changed nothing. What worked was a boot script. Homebrew Channel runs scripts from `/var/lib/webosbrew/init.d/` early in boot, before the launcher reads the app list. Mine writes a copy of each app's `appinfo.json` with `"visible": false` and bind-mounts it over the original. Nothing on the system partition changes. Deleting the script and rebooting brings the tiles back.

Next, with Claude, I set up Life's Good Without Spying, a Homebrew app that blocks LG's ad, tracking and content-recognition hosts in `/etc/hosts` and stops the ad daemons. It took some untangling. One setting is supposed to keep LG's SDP servers reachable, because those handle registration, the Content Store and the clock. In the app's code the check was inverted, so turning it off blocked them straight away. I fixed it on the TV with a one-line change:

```diff
-            is_on "$key" && continue
+            continue  # SDP is never part of the initial block list
```

The "home dashboard" block list also broke the Content Store, which said there was no internet while the TV was clearly online. Turning that category off took the list from 430 domains to 311 and the store came back. Later the app's own on-screen switches turned it back on and the store broke again, so now I know to leave that switch alone. YouTube also signed me out once after a reboot. Every YouTube cookie had been created at that boot, so the cookie jar had been emptied, but I never found out what did it.

My favourite fix was for YouTube AdFree, the Homebrew build of YouTube. It starts at boot, and on this TV it often started before the network was up, then sat on an error screen until someone pressed Retry. My first fix replaced the app's `index.html` with a small page that checks `https://www.youtube.com/generate_204` every two seconds and loads the app once it gets an answer. It also has an "Open anyway" button in case the check is wrong.

That worked, so I moved the same idea into the app itself, a `wait-for-network.ts` that runs before the app handles its launch. I tested it offline by pointing `www.youtube.com` at nothing in the hosts file. The waiting screen showed, and YouTube opened by itself once I removed the entry, about a minute later, because Chromium had cached the fake lookup. I sent it upstream as [PR #487](https://github.com/webosbrew/youtube-webos/pull/487), and it's waiting for review.

One more surprise: YouTube AdFree only starts at boot because it registers itself as a TV input. Uninstalling or reinstalling it removes that input, and then the TV boots into live channels I never watch. So there's a second boot script that registers the input again on every boot. It also puts my waiting page back after an update, but only if the app is the known stock version without the built-in wait. The Content Store lists YouTube AdFree as an update for the official YouTube app, because they share an app ID. Accepting it would quietly replace one with the other, so app updates on that TV stay manual.

## Keeping it all in one place

At the end I moved both projects into one private repository and kept their history. Passwords, keys and raw backups stay out of Git. Every change has a write-up with the exact commands, how I checked it, and how to undo it. I also wrote down the experiments that failed and the checks I didn't finish, so next time I can start from where I actually stopped.
