---
title: Two TVs, a few surprises
description: How I cleaned up a TCL Google TV and rooted an LG webOS TV with Codex and Claude, and what didn't go to plan.
date: 2026-10-03
tags: [android-tv, webos, adb, home]
---

In the middle of October I cleaned up the two TVs at home: a TCL 55Q6C running Google TV and an LG 55UN8000PTA running webOS. I wanted less clutter, fewer apps I never open, and a home screen that's easy to use.

## The TCL

I started on 15 October, before I could even connect to the TV. With Codex I looked into launchers, built a small tool to list everything installed, and wrote down some rules. Every change had to be reversible, I'd make changes in small batches, and I'd have a restore script ready.

On 3 October Claude connected to the TV over wireless ADB and recorded how everything looked before I changed anything. I disabled 21 packages in three batches. After each batch I checked the remote, HDMI, Netflix, YouTube, sound and the keyboard. I didn't uninstall anything.

The results were smaller than I hoped. The animation settings were already at 0.5, and clearing caches freed about 300 MB. I never got a fair before-and-after memory comparison, so I can't say the TV got faster.

Then I tried Projectivy, a different launcher. TCL's firmware ignores the default launcher setting, but Projectivy has an Accessibility option that takes over the Home button, and that worked. After a while I found the clean screen too clean. I missed finding new things to watch and picking up shows across different apps. So I removed Projectivy and went back to Google TV. The packages I'd disabled stayed disabled. The recommendations came back because they're part of Google's own launcher.

The TCL also kept losing my Google sign-in after a restart. The logs showed Google's setup app removing the account about two and a half minutes after the TV started, and there was an earlier removal from before my cleanup. The TV's country was set to Angola for some reason, which looked like a clue, but I never found the real cause. I also installed Key Mapper so I could remap a button on the remote, but I haven't done the remapping yet.

## The LG

The LG went a different way, on the same day. With Codex I checked its exact firmware version, rooted it with SlopBro, installed Homebrew Channel, and made sure SSH access with my key still worked after a reboot. The Content Store and streaming apps kept working. I removed seven apps I didn't want and hid six built-in tiles. The hiding uses overlays, so I can undo it.

Next I set up a privacy blocker with Claude, and that took some untangling. One switch did the opposite of what it said, and I had to fix the code on the TV. One blocking category broke the Content Store twice, so I turned that one off. The store came back, and the other ad and tracking blocks still work. YouTube also signed me out once, and I still don't know why.

My favourite fix was for YouTube AdFree, which was starting before the LG's network was ready. My first fix was a local "waiting" screen. That grew into a change inside the app itself, which I tested offline and through a reboot, then sent upstream as PR #487. I also added a boot script that puts the app back in the TV's startup list, so the TV opens YouTube instead of dropping into live channels I never watch.

## Keeping it all in one place

At the end I moved both projects into one private repository, `home-tvs`, and kept their history. Passwords and raw backups stay out of Git. I also wrote down the experiments that failed and the checks I didn't finish, so next time I can start from where I actually stopped.
