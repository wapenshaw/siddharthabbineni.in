---
title: "NuPrint: printing without the phone app"
description: "How I ended up building a desktop app for my ZEITEL SC03h, a little Bluetooth thermal printer, so I could print from Windows, macOS and Linux without the phone app."
date: 2026-10-29
tags: [rust, tauri, slint, bluetooth, nuprint]
---

I have a little ZEITEL SC03h thermal printer. It's handy for labels, to-do lists and small notes, but using it meant going through the phone app. Even when whatever I wanted to print was already on my laptop, I had to send it to my phone first.

I wanted to get rid of that extra step. That was how NuPrint started.

It wasn't something I built in one stretch. I work full time and have other things going on, so I'd pick it up when I had time, make some progress, then leave it for a while. There were a few attempts before this one that didn't get very far.

## Getting it to print

There wasn't any public documentation for the printer, so I started looking through the Android app with JADX. The app already knew how to talk to it; I needed to work out what it was sending.

A lot of that was digging through commands, checksums and the way images were converted into something the printer could understand. There were also a few things that weren't obvious at all. The Bluetooth service it advertised wasn't the one it used for printing, which explained why looking for the printing service wasn't finding it. Even the capitalisation of the model name mattered. Two names that looked almost identical needed different settings.

I did most of that initial digging myself. Eventually I gave what I had to Codex, and it got the remaining pieces working in about an hour. I had a small Python app that could actually print.

That was the point where it started moving again. I'd spent all this time figuring out the printer, and now there was something working to build on. From there, I planned the Rust app with Claude Code, and I've spent roughly the last month building it around my day job.

The Python version was basic. A little window, some text and image handling, and Bluetooth. The first test was a strip with a border and some text. It came out properly, and I kept that version around as a reference for the rewrite rather than trying to turn it into the finished app.

## The Rust version

NuPrint is now a Rust app with a Tauri and React UI, plus a command-line tool. I kept the printing logic separate from the UI so both could use the same code, without tying the whole thing to one operating system.

The working Python version helped here. I could compare what the Rust code produced against output I already knew printed correctly. There are tests for that now, along with plenty of other checks that don't need the printer connected.

![NuPrint with a to-do list and print preview](/images/nuprint-printing-without-the-phone-app/app-text.webp)

Getting a clean print was only part of it, though. I also had to think about what happens when Bluetooth disconnects or the app closes halfway through a job. I didn't want it automatically trying again when it had no way of knowing how much paper had already come out. Interrupted jobs are left for the user to check instead.

That also affected the wording in the app. Sending everything successfully isn't quite the same as knowing the print came out correctly, so I avoided simply calling that "printed".

There was some cleanup around saved jobs and logs too. A review caught text and PDF passwords being retained with jobs, which I fixed. Exported logs leave out identifying details by default.

## A detour into Slint

Somewhere along the way I started wondering whether I could make the UI in Rust as well, without the web view.

I asked Opus about egui and Slint. The advice was to stay with Tauri for what I wanted, especially with the possibility of mobile later. But I still wanted to try Slint, and the shared core meant I didn't have to rewrite the printing side to do it.

So I had Opus build a Slint version of the UI. It got surprisingly far: printer discovery, previews, the queue, settings. It was usable enough that I kept working on it.

The fonts were the first thing that bothered me. Small text looked blurry and different from the other apps on my machine. Switching to Skia sorted that out, but then I got a different problem on Windows: the NVIDIA overlay decided this little printer app was a game. The window was also flickering on my HDR monitor.

Using Skia's software rendering fixed that. I looked at Qt as another option, but didn't take that further.

The oddest problem was moving the window between my monitors. They use different scaling settings, and the window kept getting bigger as I dragged it back and forth. Eventually it was wider than the screen. I traced that back to how Slint handled the scaling change and added a workaround to keep the size consistent.

I spent more time on fonts and window behaviour than I'd expected to spend on a printer app.

The Slint version ended up staying. Releases now include both versions, although Tauri is still the main app and the Slint one is less tested. They use the same printing core, so I don't have two separate implementations of the protocol to maintain.

![An image prepared for printing in dark mode](/images/nuprint-printing-without-the-phone-app/app-picture-dark.webp)

## Making it something other people could use

Once it was working on my machines, I started sorting out the repository, installers and releases. I put it under the MIT licence and set up pull requests and CI across Windows, macOS and Linux. Releases build installers for both apps, and everything has to pass before the release is published.

There were a few things to learn there too. I put a version override in an empty commit for release-please, only for GitHub to drop the commit during the rebase merge. The release came out with a different version than I'd intended. That override now goes on a commit that actually changes something.

I also had Opus review the code and help plan some cleanup. For performance work, the rule was to measure first and keep a change only if it made a useful difference.

Some changes were worth doing. Keeping the log file open instead of reopening it for every line helped, and limiting how many previews were being rendered at once brought memory use down quite a bit. Other ideas would have saved a few milliseconds on a print that spent far longer being sent over Bluetooth, so I left those alone.

I managed to confuse myself with the benchmarks as well. One change initially looked like it did nothing. It turned out that two copies of the repo were sharing a build directory, and I was testing the same old binary twice. Separate build directories gave me the comparison I'd meant to run.

Testing cancellation also turned up a Windows Bluetooth issue. Cancelling a scan could leave the next scan apparently finding nothing. That needed some recovery handling rather than just assuming another scan would work.

## Getting it working on Linux

Linux was the last system I tried with the printer, and it didn't work first time. On Fedora 44, with BlueZ 5.87, the app found the printer but every connection ended in "Bluetooth connection failed."

I went through the BlueZ logs with Opus. The SC03h is a dual-mode device. On one public address it advertises the LE print service (`af30`, served as `AE30`) and also offers Classic profiles: serial port, headset, A2DP, AVRCP, hands-free and phonebook. NuPrint talks to Bluetooth through [btleplug](https://github.com/deviceplug/btleplug), and on Linux btleplug connects with `org.bluez.Device1.Connect`. That call leaves the bearer to BlueZ, and [BlueZ's documentation](https://github.com/bluez/bluez/blob/5.87/doc/org.bluez.Device.rst?plain=1#L25-L46) spells out the order for a dual-mode device: the bonded bearer first, then the one it saw last, with BR/EDR winning a tie. For this printer it picked Classic. The printer refused A2DP with `Connection refused (111)`, BlueZ answered "No more profiles to connect to", and the GATT print service never appeared.

Removing the pairing didn't help. btleplug scans with its discovery filter set to [`Transport::Auto`](https://github.com/deviceplug/btleplug/blob/0.13.5/src/bluez/adapter.rs#L96), so BlueZ runs a Classic inquiry alongside the LE scan and learns about the Classic side anyway. Finding the printer with an LE-only `bluetoothctl` scan and then calling `Device1.Connect` didn't help either. BlueZ still connected over Classic, and this time it paired with the printer using "Just Works", without a prompt. Windows and macOS never had this problem, because their Bluetooth APIs connect to an LE device over LE.

The first print on Linux worked with `ControllerMode = le` in `/etc/bluetooth/main.conf`, which turns the adapter into an LE-only controller. It also turns off Classic Bluetooth for headphones and everything else, so it wasn't something I could ask anyone to do.

Newer BlueZ has two ways to ask for LE on a dual-mode device. BlueZ 5.80 added a [`PreferredBearer`](https://github.com/bluez/bluez/blob/5.87/doc/org.bluez.Device.rst?plain=1#L449) device property that can be set to `le`, and 5.84 added [`org.bluez.Bearer.LE1`](https://github.com/bluez/bluez/blob/5.87/doc/org.bluez.Bearer.LE.rst), whose `Connect` goes over LE for that one connection and stores nothing. btleplug doesn't expose either, so Opus wrote a small [BlueZ module](https://github.com/wapenshaw/nuprint/blob/master/crates/nuprint-transport/src/ble/bluez.rs) for NuPrint that calls them over D-Bus ([PR #10](https://github.com/wapenshaw/nuprint/pull/10)):

1. If BlueZ has only heard the printer over Classic, so the device has `Bearer.BREDR1` but no `Bearer.LE1`, it runs an LE-only discovery (`SetDiscoveryFilter` with `Transport = le`) for up to 5 seconds. Discovery filters belong to the D-Bus client that sets them, so btleplug's own scans aren't affected.
2. It calls `Bearer.LE1.Connect` when BlueZ offers it.
3. Otherwise it sets `PreferredBearer` to `le`, calls `Device1.Connect`, and puts the old value back whether the connection worked or not.
4. Then it waits for `ServicesResolved`, the same as btleplug's own connect.

Disconnecting needed the same treatment. With the printer paired over Classic, `Device1.Disconnect` on its own left the LE link up, and BlueZ logged "No matching connection for device". NuPrint now calls `Bearer.LE1.Disconnect` first.

The catch is that both are experimental. BlueZ registers `Bearer.LE1.Connect` and `Disconnect` with [`GDBUS_EXPERIMENTAL_ASYNC_METHOD`](https://github.com/bluez/bluez/blob/5.87/src/bearer.c#L199-L202), and `PreferredBearer` is marked experimental too, so they only show up with `Experimental = true` in [`main.conf`](https://github.com/bluez/bluez/blob/5.87/src/main.conf#L125-L127). Fedora and Ubuntu ship that line commented out, and neither GNOME nor KDE has a switch for it. I thought about having the `.deb` and `.rpm` set it, but it turns on experimental D-Bus interfaces for every app on the machine, and I didn't want an installer changing that behind anyone's back. The [guide](https://nuprint.app/guide) has the two commands instead, and if BlueZ still goes for Classic, the app says what to change. Without the setting, NuPrint falls back to btleplug's plain connect, which only works on an LE-only adapter.

NuPrint never pairs on Linux now. A connection through `Bearer.LE1` leaves the printer unpaired, and BlueZ forgets it about 30 seconds after the job, which is its default `TemporaryTimeout`. A printer paired in GNOME's Bluetooth settings still prints, but BlueZ reconnects to it over LE by itself about 10 seconds after NuPrint disconnects and keeps the link open, which can stop the phone app from reaching it. Choosing **Forget** in the settings ends that.

One problem is outside NuPrint. bluez-async 0.9.0, which btleplug uses on Linux, [unwraps the reply](https://github.com/bluez-rs/bluez-async/blob/bluez-async-0.9.0/bluez-async/src/messagestream.rs#L40) when it removes a D-Bus match as an event stream is dropped. If the match is already gone, that background task panics with "No match with that id found". Tokio keeps the panic inside the task and the app carries on, but the message still lands on standard error. Someone else has [reported the same panic](https://github.com/bluez-rs/bluez-async/issues/419), and it's still open.

The releases only had a `.deb`, which Fedora can't install, so [PR #12](https://github.com/wapenshaw/nuprint/pull/12) added an `.rpm` and AppImages. The `.rpm` and the main app's AppImage both printed on my Fedora 44 machine. On Ubuntu it comes down to the BlueZ version ([Launchpad](https://launchpad.net/ubuntu/+source/bluez)). Ubuntu 26.04 ships 5.85, so it should work, but I haven't tried it. Ubuntu 24.04 ships 5.72, which is older than both features, so there the only option is `ControllerMode = le`.

The longer write-up, with the hardware record, is in [docs/linux.md](https://github.com/wapenshaw/nuprint/blob/master/docs/linux.md).

## Signing, updates, and what's left

The installers still have the usual unsigned-app warnings. I haven't done Apple notarization, and I've applied to the SignPath Foundation for Windows signing but am still waiting on that.

The release builds do have GitHub attestations, so there's a way to verify where a download came from. The update files are signed too, although that's separate from getting rid of the operating system's installer warnings.

I've added in-app updates, with checking turned off unless you enable it or check manually. I didn't want a printer app going online without being asked. Updates also wait while something is printing, rather than restarting in the middle of a job.

A review caught a problem in the Slint updater's version checks, which is fixed. Adding updates also broke the Mac packaging on the first attempt because the app bundle wasn't being kept for the update step. That held up the release until I fixed the build.

I haven't watched an update install end to end yet. This is the first release with the updater in it, so that test comes with the next one.

As for printer support, I've used NuPrint with my SC03h on Windows, macOS and Linux. The phone app listed other models with matching settings, so I've exposed those as experimental. I only own the one printer, and I don't want to imply I've tested hardware I haven't.

It's grown quite a bit from the Python test. AI helped me get past the point where the earlier attempts had stalled, and a lot of the work since then has been testing, reviewing and fixing things I wouldn't have thought about at the start.

NuPrint is open source under the MIT licence, with builds for Windows, macOS and Linux. The downloads are on [nuprint.app](https://nuprint.app) and the code is on [GitHub](https://github.com/wapenshaw/nuprint). If you have one of these little printers and try it, I'd be interested to hear how it works for you.
