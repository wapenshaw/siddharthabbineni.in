---
title: "NuPrint: printing without the phone app"
description: "How I ended up building a desktop app for my little Bluetooth printer, with a few detours along the way."
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

That was the point where it started moving again. I'd spent all this time figuring out the printer, and now there was something working to build on. From there, we planned the Rust app, and I've spent roughly the last month working on it with Claude Code around my day job.

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

## Signing, updates, and what's left

The installers still have the usual unsigned-app warnings. I haven't done Apple notarization, and I've applied to the SignPath Foundation for Windows signing but am still waiting on that.

The release builds do have GitHub attestations, so there's a way to verify where a download came from. The update files are signed too, although that's separate from getting rid of the operating system's installer warnings.

I've added in-app updates, with checking turned off unless you enable it or check manually. I didn't want a printer app going online without being asked. Updates also wait while something is printing, rather than restarting in the middle of a job.

A review caught a problem in the Slint updater's version checks, which is fixed. Adding updates also broke the Mac packaging on the first attempt because the app bundle wasn't being kept for the update step. That held up the release until I fixed the build.

I haven't watched an update install end to end yet. This is the first release with the updater in it, so that test comes with the next one.

As for printer support, I've used NuPrint with my SC03h on Windows and macOS. There's a Linux build, but I haven't tested it with the printer yet. The phone app listed other models with matching settings, so I've exposed those as experimental. I only own the one printer, and I don't want to imply I've tested hardware I haven't.

It's grown quite a bit from the Python test. AI helped me get past the point where the earlier attempts had stalled, and a lot of the work since then has been testing, reviewing and fixing things I wouldn't have thought about at the start.

NuPrint is open source under the MIT licence, with builds for Windows, macOS and Linux. If you have one of these little printers and try it, I'd be interested to hear how it works for you.
