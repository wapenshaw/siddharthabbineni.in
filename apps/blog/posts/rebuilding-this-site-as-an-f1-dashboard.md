---
title: Rebuilding this site as an F1-style dashboard
description: How my portfolio went from a long scrolling page to a gamer profile to a one-screen F1 dashboard, how the blog moved out to a site of its own, and how I dug 145 old posts out of the Wayback Machine.
date: 2026-10-19
tags: [nextjs, css, design, devlog, meta]
---

My old portfolio was a long page you scrolled down, like most people's.

![The site this replaces, at 1536×730: a 1080p laptop with Windows at 125%](/images/rebuilding-this-site-as-an-f1-dashboard/current-site.webp)

At that size the page is almost four screens tall. It had also broken quietly: the Xbox card said 0 games, next to a picture that no longer loaded.

I rebuilt it twice in a few days. The first rebuild was a gamer profile, and it didn't survive my own laptop. The second is the F1-style dashboard at [siddharthabbineni.in](https://www.siddharthabbineni.in). After that I moved the blog out to a site of its own, the one you're reading now.

I built all of it with Claude Code running Opus. I decided what I wanted and Opus did most of the typing.

## The player profile, and why it went

The first version was a character sheet: a character build, a campaign timeline for my jobs, and a trophy cabinet with certifications and live Xbox and Steam achievements. On my 1440p monitor it looked great.

Then I opened it on a 1080p laptop with Windows set to 125%. That leaves the browser about 1536×730 pixels, and the page turned into a wall of text.

![The player profile at 1536×730: three columns, all of them full of small text](/images/rebuilding-this-site-as-an-f1-dashboard/player-profile.webp)

Three columns were all talking at once, and every panel was packed with small labels, chips and bullets. Nothing on the screen was more important than anything else. Making the text smaller to fit only made it worse.

## Trying ideas before writing code

This time I didn't touch the code first. I asked Opus for rough screens of very different ideas: game menus, a magazine spread, a metro map, an F1 pit wall. I liked the metro map and the pit wall, so we mashed them together and drew my career as a line on the Nürburgring GP circuit.

![An early concept: the whole circuit, with each section as a coloured sector](/images/rebuilding-this-site-as-an-f1-dashboard/concept-pit-wall.webp)

I got a second opinion on that concept, and it made two points I agreed with. The section menu shouldn't be part of the career track, and the track shouldn't be a closed lap with a finish line, because my career hasn't finished yet. So the route became an open stretch of the circuit with the road carrying on past my current job.

## The F1 dashboard

The site shows one section at a time, with F1 names and a plain line under each: Seasons (where I've worked), Driver profile, Podiums, Garage and Press. It uses the real F1 colours, and every button, tab and card has the same slanted cut as the nameplate.

![Seasons: the route climbs from my first job at the bottom to now at the top](/images/rebuilding-this-site-as-an-f1-dashboard/seasons.webp)

On the track, grey is life before work, black is work, and red is my current job and the road after it. When you pick an older job, it and the stretch up to the next job turn teal. One job shows at a time, with a short summary, up to three numbers, a few bullets and the tools I used with their logos. That's far less text than before.

The buttons for moving between jobs took two goes. At first "Earlier" sat on the right and disappeared on the oldest job, so "Later" slid under the mouse. Clicking Earlier a few times in a row took me back to the newest job. Now each button has its own fixed spot and keeps it, even when the other one is hidden.

The header copies a driver's TV graphic: a picture on a red panel, with my first name small and my surname big, the way F1 shows "Max / VERSTAPPEN". It started as my photo. It's now a drawing of me in a helmet with SA on the side, which is also the little icon in your browser tab on both sites.

The Garage has my side projects, with my pull requests to other people's projects in a column that looks like a timing tower. One that hasn't been merged yet is marked "Under review", which is what the stewards say about an incident they haven't ruled on. The footer is a single "Team radio" line that flips between my two newest posts and two newest merged PRs.

![Garage in dark mode: project cards and the pull request timing tower](/images/rebuilding-this-site-as-an-f1-dashboard/garage.webp)

You can get around without the mouse. The keys 1 to 5 open a section, and ↑ and ↓ change job. On a desktop the page never scrolls, so the mouse wheel steps through the jobs and then on to the next section. The animations use Motion, the library that used to be Framer Motion.

I worried that the logos would make the site heavy, since Simple Icons has 3,466 of them. I checked the production build: only the 14 I use reach the browser, about 15 KB in all.

## Fitting on one screen

The whole design is 96 by 45.6 rem, and one line of CSS sets the size of a rem:

```css
html {
	font-size: min(100vw / 96, 100dvh / 45.625, 20px);
}
```

At 1536×730 that's 16px, and at 1920×1080 it's 20px, where it stops. On bigger screens the page sits in the middle of a dark backdrop with a faint outline of the circuit.

![The whole old page beside the whole new site, at the same scale. Each yellow line marks one screen at 1536×730.](/images/rebuilding-this-site-as-an-f1-dashboard/before-after.webp)

I asked Opus for a Playwright script that opens every section at five laptop sizes, from 1280×600 to 1920×1080, and fails if anything scrolls or gets cut off. It checks all five jobs too, because each one has a different amount of text.

The track outline comes from Pitlane02's Nürburgring drawing on Wikimedia Commons (CC BY-SA 3.0).

## Moving the blog home

My two posts lived on dev.to, and the site pulled them in through its API. I moved them into my repo as markdown files, so a new post is a commit, a draft gets a staging preview, and the pages are built ahead of time.

At first the posts lived inside the dashboard, under Press. Next.js 16 with Cache Components surprised me a few times along the way:

- `dynamicParams` isn't allowed any more. Unknown slugs call `notFound()` instead.
- With Partial Prefetching on, you have to read `params` inside a `<Suspense>` boundary so the page can show its outline straight away.
- Typed routes won't accept `` `/blog/${slug}` `` for a plain string. A small `postHref()` helper fixed it in one place.
- The standalone build doesn't copy files you read with `fs`, so the posts folder has to go in `outputFileTracingIncludes`.
- Running `next build` while `next dev` was still running confused the dev server, and every page started reloading itself about five times a second. Restarting it fixed that.
- A `'use cache'` function caches whatever it returns, failures included. My Xbox and Steam data is cached for six hours, so one rate-limited request would have emptied the Podiums section until the next refresh. Failures now call `cacheLife('minutes')` and get retried soon after.

## Sharing a link

When I pasted a link into LinkedIn, the preview had a title and no picture. X was worse, showing the wrong title. Each page set its own Open Graph tags, and those replaced the site-wide ones, image included.

Now every section of the dashboard gets its own card, made at build time with Next's `opengraph-image` files and `next/og`. It has the same tab, slashes and nameplate as the site. The fonts had to be TTF files, because the renderer behind `next/og` can't read the WOFF2 files the site uses.

![The share card for the Garage](/images/rebuilding-this-site-as-an-f1-dashboard/share-card.webp)

## Digging up 2005

I had a blog long before dev.to. It started on Blogger, moved to WordPress on thesid.net, and died when my hosting ran out while I was moving countries. Luckily the Wayback Machine had saved it.

Its API lists every address it saved for a domain. For my two old domains that was about 1,300 addresses, and most were junk: client sites I used to host, and the crawler going round in circles. After removing duplicates I had 145 posts. Opus wrote a scraper that fetched them slowly, then a second script went looking for the images. Most image hosts from 2006 are gone (RIP echo.cx and ImageShack), so some pictures are lost for good.

I kept the posts exactly as I wrote them, typos and all. They're under Earlier sessions on this blog, one page per year. Reading 2006 me go on about BSNL and the new Iron Maiden album made the whole thing worth it.

## The blog gets its own site

With 150 posts in it, the blog didn't fit the dashboard any more. The dashboard is built to fit on one screen, and a long post doesn't. I kept making the reader tighter, with smaller text, Older and Newer up in the tab row, and the title moving into the tabs once you scrolled past it, and it was still a long article in a box.

So the blog moved to [blog.siddharthabbineni.in](https://blog.siddharthabbineni.in). Press on the dashboard is now a short feed of the three newest posts, and each one opens here. It reads a `posts.json` file the blog publishes at build time and caches it with `'use cache'`. If the blog doesn't answer, Press says so and gives you the link.

I wanted it to feel like racing without copying the dashboard. Opus drew a few directions on a canvas. The first name was Night session, which I didn't like, so I picked Free practice. That's the session where drivers try things out, and that's most of what I write about. The look I picked is wet tarmac: dark asphalt with grain and puddles, worn white paint, and a chequered line under the title. New posts line up on a starting grid with the newest in P1. Inside a post, each heading is a lap, and the bar at the top lights them up as you read.

![Free practice in dark mode: the title, a search box, and the newest posts on a starting grid](/images/rebuilding-this-site-as-an-f1-dashboard/free-practice.webp)

A few things changed after I lived with it for a day:

- The header was far too tall. On a 1080p screen the title, blurb and tags took up most of the first screen, so I drew red lines on screenshots where I wanted them to stop. The home header is now about 256 pixels tall, and the tags moved to the end of each post.
- The light mode background was too dark. Now it's pale concrete, and the white paint became charcoal, because white lines don't show up on concrete.
- Search came back after I noticed it had gone missing in the redesign. It's a box in the header. Press `/` on any page to jump to it, and it searches titles, tags and the full text from an index made at build time. On the search page the footer stays put, since the results changing height made it jump up and down.

The blog is a plain static site. Next.js exports it as files, so route handlers like the RSS feed and the search index need `dynamic = 'force-static'`. Each post's share card gets drawn at build time into an `og.png` next to the post.

## One repo, two sites

The repo is now split into `apps/portfolio` and `apps/blog`. Each has its own `package.json` and lockfile, and I skipped npm workspaces, since the two apps share nothing. Each one has its own GitHub workflow that only runs when its folder changes, so fixing a typo in a post doesn't rebuild the dashboard.

Both run on Azure Static Web Apps. My first apps were in West Europe for no good reason, so I deleted them and made new ones in East Asia, which is a lot closer to India. There are four now: the portfolio and the blog, each with a staging copy. Everything goes to staging first, and the staging sites tell search engines not to index them. Opus handled the Cloudflare DNS records through the API with a token that can only edit DNS for this one domain. Adding another subdomain later, like one for NuPrint, is one more app and one more record.

## Phones, again

- The Email button is gone. My resume has my email on it anyway. Resume and Blog moved to the end of the page, and a small pen icon next to the theme toggle opens the blog.
- The Team radio line is now a bar stuck to the bottom of the screen.
- Swiping used to work only on the tab row. Now a sideways swipe anywhere on the page moves to the next section, and the tabs scroll to keep the open one in view.
- On a 360-pixel phone the pen and theme buttons wrapped onto their own line, so the photo, name and slashes shrink a little on small phones.

![The dashboard on a phone: the helmet header and Seasons, then the same page after tapping Pinion](/images/rebuilding-this-site-as-an-f1-dashboard/phone.webp)

Seasons on a phone took the most work. Tapping a job used to open it in place while the old one stayed open, so the page jumped around and the job you tapped ended up somewhere different every time. I wanted an accordion: the open job folds up, the tapped one opens, and the page scrolls so the tapped one sits just under the tabs.

My first version did nothing at all. The fold animated `height: 'auto'` with Motion, and to measure that, Motion saves the scroll position, measures, and puts the scroll back with `window.scrollTo`. That cancelled my smooth scroll every time. I swapped Motion for a CSS grid row that goes from `0fr` to `1fr`, which folds just as well without measuring anything.

Then the tapped job landed anywhere from 16 to 19 pixels off. There were two causes. The page wasn't tall enough yet to scroll that far while the new job was still opening, so it now gets a temporary minimum height. And the browser's scroll anchoring was nudging the page as content above it folded away, so that's turned off until the fold finishes. Now it lands in the same spot every time. The first fold took 350ms, which was too quick to see what happened, so it takes 550ms now.

## What I'd tell myself

- Look at your site on the laptop people actually use, at the scaling they actually use.
- Draw the screens before writing code. Throwing away a mockup takes seconds.
- Less text on screen beats smaller text.
- A dashboard and a blog want different layouts. Give long reading its own site.
- If an animation fights your scrolling, find out what the library does when it measures.
- Keep your writing somewhere you own.
