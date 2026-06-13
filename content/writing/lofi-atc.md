---
title: "Lofi Air Traffic Control Mixer"
description: "Because I can... for educational purposes"
date: "2026-01-13"
tags: [Svelte, Rust, Cloudflare]
---

# Why?
Literally. Why would anyone make this? or why would anyone want something like this? for educational purposes, obviously...

I made [lofi-atc.ghwls.com](https://lofi-atc.ghwls.com) because the original [lofiatc.com](https://lofiatc.com) is no longer functioning. Plus the alternatives didn't give me that "comfy" feeling.
![Mixer preview](/images/writing/lofi-atc/main.png)

Naturally, I searched around for an alternative, but I figured I could just make one for a quick side project. For that reason, rust was chosen and svelte for front. I don't have a need to have different views or pages, which made svelte perfect candidate, and personally, writing react components gives me that mobile app development feeling, which I'm not particularly a big fan of.

## Preview
Because pictures are better than words, and I really don't think anyone will be reading nor clicking on my link...

![Music selection menu](/images/writing/lofi-atc/music-selection.png)
The selection menu is pretty self explanatory, only design challenge I had for this was deciding what to do for stations with multiple broadcasts such as YYZ, and making them paged like below seemed like the most obvious solution.
![Station selection menu](/images/writing/lofi-atc/station-selection.png)
**Remaining challenges** for Station Picker:
- Show station status without spamming their servers
- Automate top stations, also without spamming

but the current version is good enough so until I hear user complaints (which I wont), it's going to stay as is.

## Oversimplified App Architecture
I didn't want to use node or some other javascript based backend because I wanted something light, since I knew I was going to be self-hosting on my server.

So the options were down to **Rust vs. Go**, and after thinking about potentially adding zig to the line up, I decided that I wouldn't really benefit from this decision making process and decided to go with Rust. Then the reality set in, and I decided to vibe code, which lead me down to only caring about performance of the languages, since the code would be mediocre at best, and major benefit of Go being rapid development really fell off once I factored in "**vibe-coding**".

Since I wanted to self-host, and went the simplest route of serving the pre-built static site from the rust backend. I exposed that server port via cloudflare tunnel and made the front end accessible from the internet.

![Oversimplified architecture diagram](/images/writing/lofi-atc/arch.png)

The rust server starts FFmpeg process that plays audio to the audio engine. The youtube connection happens via yt-dlp command, and [LiveATC.net](https://liveatc.net) provides the Air Traffic Control audio stream via their website.

Proxies are created by a request sent to the backend's endpoint, which returns a url from the backend, which is the audio source, which can be played from the browser.

### Quick Svelte Glazing
I love using [Svelte](https://svelte.dev) whenever I can, which is rarely unless I'm working on a hobby project, but I've yet to try SvelteKit, so I can't say much about that side of Svelte. Nonetheless the experience feels much direct compared to classic seperate file based web development experience. I like that I can edit the style and add the functionality within the same file, less context switching in my head, maybe that will matter less with the vibe-coding era, but we'll see where it leads. Regardless for simple pages I really enjoy the experience over existing frontend solutions out there.

The tiny build size also is a bonus, it also allows one to host a nice web page off of a microcontroller dev board, such as an ESP32, which I'll be writing about another time.
![Svelte build size](/images/writing/lofi-atc/svelte-build-size.png)


## Future plans
I do want to improve the music source/providers to include custom playlists from YouTube or even Spotify.

Also need to polish the top stations list, which is another challenge since the LiveATC website doesn't really provide any APIs, and I'm pretty sure scraping is not allowed, but when did that stop anyone on the internet from scraping...

Oh and I should employ some DevOps practices as part of self-deployment learning experience so I don't have to manually build and move the files around every time, and think of better ways to manage the processes to minimize downtime, even though it's over complicating just for a hobby project that no one is using.

## Finishing thoughts
I like how the aesthetic came out, I think the use of array font was a nice touch, but I might look into swapping it out for the new [pixelated font from Vercel](https://vercel.com/font?type=pixel). The site is at a "good-enough" point for me so I'm not really sure when I'll feel motivated to actually work on it more. Until then, it's most likely just going to be some maintenance.
