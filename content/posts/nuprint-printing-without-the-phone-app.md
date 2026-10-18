---
title: "NuPrint: printing to a tiny Bluetooth printer without the phone app"
description: How a pocket thermal printer that only worked from a phone app became a Rust desktop app, and what a detour into Slint taught me about fonts, GPUs and multi-monitor setups.
date: 2026-10-19
tags: [rust, tauri, slint, bluetooth, nuprint]
---

I have a ZEITEL SC03h, a small thermal printer that fits in your hand and prints on receipt paper. It's great for labels, to-do lists and notes for the fridge. But you can only print from the maker's phone app, so anything on my laptop had to go to my phone first.

So I wrote NuPrint. It's a desktop app and a command-line tool that print straight to the printer over Bluetooth LE. You don't need the phone, you don't need to pair, and there's no system print queue. I built it with Claude Code and Codex. Most of the work was finding out exactly what the printer expects, then proving my app sends exactly that.

## Reading the Android app

There's no public documentation for these printers. The Android app has to know how to talk to them, though, so I opened the app file (the APK) with JADX, which turns it back into readable Java. It has everything: a list of printer models, the command bytes, the checksum, how a picture becomes rows of dots, and what the app does when the printer says "slow down".

Every command is a small frame. It starts with `51 78`, then a command byte, a length, the data, a CRC-8 checksum and `FF`. A picture goes as rows of 384 dots, eight dots to a byte, lowest bit first. The printer replies with its status, and tells the app to pause and resume when its buffer fills up.

Two details would have cost me hours without that code. First, the exact model name matters. `SC03h` (small h) and `SC03H` are different printers with different heat settings. Send the wrong settings and the print comes out pale or the paper gets scorched.

Second, the printer lies about itself. It says it offers one Bluetooth service (`AF30`) but actually prints on another (`AE30`). If you search for printers by the print service, you'll never find it. NuPrint looks for printers by name, then checks that the print service is really there before sending anything.

## Python first

The first version was a small Python app (Bleak for Bluetooth, Pillow for images, a Tk window). I wanted proof that it could work before I built anything bigger. On day one it printed a 384 × 164-dot test strip with a border and some text, and it came out right.

That strip turned out to be more useful than the app. Once I knew the Python output was correct, I checked everything after it against that output. The Python app is still in the repo as a proof of concept, and I don't add features to it.

## Then Rust, matched to Python byte for byte

The real app is written in Rust, with Tauri 2 and a React front end. It's split into crates (Rust packages): one for the protocol, one for Bluetooth, one for drawing, and a core one that runs the job queue. The Tauri app and the command-line tool both use that same core.

To make sure the rewrite didn't break anything, a script in the Python app creates 40 "golden" print jobs. The Rust code has to produce exactly the same bytes for every one, and it does. There are also about 150 Rust tests that run without a printer.

I set a few rules early, and I'm glad I did:

- Never print twice by accident. Jobs are saved to a queue on disk. If the app crashes halfway through sending, the job is marked *uncertain* and isn't sent again automatically. Only someone looking at the paper knows if it printed.
- Only say what you know. The app says "Transfer complete, printer reports ready" instead of "printed". The printer took the data, but nobody has seen the paper yet.
- Keep logs private. Exported logs hide device names, Bluetooth addresses and job titles unless you choose to include them. A code review also found that PDF passwords and typed text were being saved with jobs. That's fixed.

The phone app listed dozens of other models with the same settings as the SC03h. NuPrint offers 34 of them as experimental, with a warning and a confirmation step. I only own one printer, so that's the only one I know works. NuPrint runs on Windows and macOS, and Linux is next.

## The Slint detour

Once the core was its own crate, I wondered if the whole app could be Rust, without a web view. I asked Opus about egui and Slint. For what I want (a good-looking app that might go mobile one day), the answer was to stay with Tauri, and that's still my plan. But with the core shared, a demo was cheap, so I had Opus rebuild the whole NuPrint UI in [Slint](https://slint.dev).

It worked: finding and setting up the printer, text, image and PDF previews, the queue, settings and dialogs. Then the problems started, and I learned a lot.

First, the fonts looked wrong. The demo started on Slint's FemtoVG renderer, which draws text itself. Small text was blurry and didn't look like other apps. The Slint team explains the differences between their renderers on their site. The Skia and Qt renderers let the operating system draw the text (DirectWrite, Core Text or FreeType), so it matches everything else. Switching to Skia fixed the text and made the exe 9.5 MB bigger (28.4 MB to 37.9 MB).

Then my NVIDIA overlay popped up and the window started blinking. On Windows, Skia draws through the graphics card (a Direct3D swap chain) by default. The NVIDIA overlay saw that, decided I'd started a game, and attached itself. On my HDR 240 Hz monitor the window flickered too. The fix was Skia's software mode. It draws the same text on the CPU and doesn't load Direct3D, DXGI or OpenGL at all. For a small app window, the CPU is plenty fast.

I wanted to try Qt too, but Opus talked me out of it. Qt wouldn't draw text any better than Skia, because both use DirectWrite. It needs about a gigabyte of tools on every machine that builds it, adds 25 to 30 MB of DLLs, has to stay dynamically linked because of its LGPL licence, and Slint's Qt version only works on desktop anyway.

The last problem is still open: the window grows when I drag it between monitors. My main monitor is set to 125% scaling and the second to 100%. If I drag the Slint window across and back by its title bar, it comes back about 25% bigger. After a few trips it was 4624 × 1873, wider than either screen. Moving it with code didn't cause it, only a real drag did. Slint's own code has a TODO note at that exact spot, because it doesn't keep the window's size when the scaling changes. I'm working around it by saving the size when the scaling changes and putting it back on the next resize. That's still in progress as I write this.

(Also, the "PDF support is unavailable" error in one test build was just me running an exe without `pdfium.dll` next to it.)

## What I learned

- A decompiled app is documentation. It's messy and unofficial, but it's better than guessing.
- Make the first version prove one thing. One correct strip of paper became the test for everything after it.
- Golden files make rewrites boring, in a good way. Python to Rust went smoothly because the bytes had to match.
- Drawing text is a big topic. "Why does this font look wrong?" led me to renderers, graphics cards and NVIDIA overlays.
- Keep the core separate. Trying a second UI toolkit took an afternoon because nothing under the UI had to change.

NuPrint isn't public yet. If you own one of these little printers and want to try it, get in touch.
