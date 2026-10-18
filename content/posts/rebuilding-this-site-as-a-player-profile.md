---
title: Rebuilding this site as a player profile
description: What I learned turning my portfolio into a one-screen character sheet, moving my blog off dev.to, and digging 145 old posts out of the Wayback Machine.
date: 2026-10-19
tags: [nextjs, css, devlog, meta]
---

My old portfolio was a long page you scrolled down, like most people's. I wanted something that felt more like me, so I turned it into a gamer profile. It has a character build, a campaign timeline for my jobs, and a trophy cabinet with my certifications and whatever I unlocked on Xbox and Steam this week. On a desktop it all fits on one screen, with no scrolling.

I built it over a couple of days with Claude Code running Opus. I decided what I wanted and Opus did most of the typing. I learned more than I expected, so here are the parts I want to remember.

## Fitting on one screen

One screen means every screen: a 1280×600 laptop where the browser takes a big chunk of the height, a 1366×650, a 1920×1080 and a 2560×1440. What made it work was one setting. Every font size is in `rem`, and the root size gets smaller on short or narrow windows. I change one number in `globals.css` and the whole page scales.

I asked Opus for a small Playwright script that opens the page at 14 sizes and fails if anything scrolls or spills out of its card. I ran it after every change. It caught things I'd never have seen myself, like a chip that stuck out by 4 pixels at exactly 1280×768.

## Square cards that size their own text

The character build cards are squares. On a small laptop each one is only about 110px inside, so the text has to shrink with the card instead of the window. Container query units do exactly that:

```css
.card {
	aspect-ratio: 1;
	container: card / inline-size;
}

.name {
	font-size: 11cqi;
}
```

`cqi` is a percentage of the card's own width. The grid around the cards is a container too. When the column is tall enough (`max-aspect-ratio: 2 / 3`), cards five and six show up, and a short screen shows four. It's all CSS.

## Buttons that stay still

The header has a Devlog button that changes to "← Profile" when you're on the blog. The two labels are different widths, so the buttons next to it jumped every time I switched. The fix was to put both labels in the same grid cell and hide the one I'm not using with `visibility: hidden`. The button is always as wide as the longer label, so only the text changes.

## A logo that follows the theme

My SA logo is a transparent PNG, and on the avatar it looked like a box. When I used it as a CSS mask, the theme could colour it: a lime circle with the mark cut out in the background colour. It works in dark and light mode with one image.

## Stopping at 1920

On my 1440p monitor the layout kept stretching until the panels were huge and mostly empty. Limiting the width was easy, but the headings still grew because they were sized in `vw`. The fix was a viewport unit with a limit:

```css
:root {
	--max-width: 1920px;
	--vw: min(1vw, var(--max-width) / 100);
}
```

Sizes now use `var(--vw)` and stop growing at 1920 pixels. On bigger screens the page sits at the top, in the middle, on a faint dot grid. The dots use the theme's line colour, so they switch with dark mode on their own.

## Moving the blog home

My two posts lived on dev.to, and the site pulled them in through dev.to's API. Now they're markdown files in my repo. A new post is a commit, a draft gets its own branch and a staging preview, and the pages are built ahead of time.

Next.js 16 with Cache Components surprised me a few times:

- `dynamicParams` isn't allowed any more. Unknown slugs call `notFound()` instead.
- With Partial Prefetching on, you have to read `params` inside a `<Suspense>` boundary so the page can show its outline straight away. The dev overlay tells you this, which is nice.
- Typed routes won't accept `` `/blog/${slug}` `` for a plain string, because they can't be sure the slug has no slash in it. A small `postHref()` helper fixed it in one place.
- The standalone build doesn't copy files you read with `fs`, so the posts folder has to go in `outputFileTracingIncludes`. Otherwise production can't find them.

Code blocks get their colours at build time, in a light and a dark version, and CSS shows the right one for the site's mode. Nothing extra runs in the browser.

## Digging up 2005

I had a blog long before dev.to. It started on Blogger, moved to WordPress on thesid.net, and died when my hosting ran out while I was moving countries. Luckily the Wayback Machine had saved it.

The Wayback Machine has an API that lists every address it saved for a domain. For my two old domains that was about 1,300 addresses, and most were junk. Some were client sites I used to host, and some were the crawler going round in circles and making paths like `/tutorials/tips/personal/personal/5-things.html`. After removing duplicates I had 145 posts. My blog's own archive list counted 137 in 2011, and there are a couple more from when I briefly started it again in 2013.

Opus wrote a scraper that fetched each post slowly, so the archive wasn't hammered, and pulled out the title, date, category and text. A second script went looking for the images, first at Blogger's old links and then in the archive. Most image hosts from 2006 are gone (RIP echo.cx and ImageShack), so some pictures are lost for good.

I kept the posts exactly as I wrote them, typos and all. They're in the Archive tab now, next to the two dev.to guides. Reading 2006 me go on about BSNL and the new Iron Maiden album made the whole thing worth it.

## What I'd tell myself

- Check the layout with a script. Bugs hide at screen sizes you never try.
- When something jumps around, save space for it.
- Keep your writing somewhere you own. My first blog disappeared when the hosting ran out, and the second one depended on someone else's API.
