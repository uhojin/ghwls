---
title: "Tikrolling"
description: "Never giving it up."
date: "2026-01-08"
tags: [Rickrolling, MikroTik, scripting]
---

> **Date Advisory**
>
> This was back in the summer of 2018

# Background
I used to work for a local ISP, during my time there I was fortunate enough to gain some experience with hardware, while working a helpdesk job.

They were growing and also provided wireless services across the county, the paid hotspot service was built using MikroTik hardware.

It being a rural WISP, the single programmer was a wizard named Geoff who migrated the original customer management software from 1994 into a php backend. Everyone had their own thing, but Geoff was the wizard in programming. 

One day at work, I found a box full of "dead" equipments, they appeared to be no longer booting properly. I asked another tech if these were okay to use, and I got told they were dead so I just decided to perform a reset using their [Netinstall](https://help.mikrotik.com/docs/spaces/ROS/pages/24805390/Netinstall) tool which reinstalls RouterOS.

To my surprise they started working again, and I was able to WinBox into them. So I asked Geoff more about our MikroTik usage.

## The Bait
Back in the box, I found a RouterBoard they were using for outdoors and a hAP which was a rental unit for hotspot customers. The hAP's been through Geoff's script to have been configured and registered to our network. So I obviously had to show him that the broken batch wasn't actually broken, and decided to give it to him so he could program them again.

## and Switch
I couldn't just give it back to him without doing something to them, so I decided to rickroll him because office pranks I guess.

He was the one who told me that you could make the devices beep at different frequencies.
So I decided to get busy that night, since he only was in office 3 times a week and it was the perfect time to do it. Plus Mike thought it would be hilarious, so he encouraged me when I asked him.

### Music is Math
Each notes had corresponding frequencies, I looked up the sheet for the infamous "Never Gonna Give You Up" by Rick Astley and then looked up the frequencies for the notes that I need, then started writing out some chicken scratches
![Notes on notes](/images/writing/tik-rolling/math.jpg)

With this I was able to write a script for MikroTik's RouterOS and make it play it on boot instead of the standard beep:
<iframe width="100%" height="468" src="https://www.youtube.com/embed/00U_kFnLjck" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

I figured it was good enough and decided to call it.

# Big Success
Geoff loved it, and decided to listen to the whole script. I felt pretty good for bringing back a device that was deemed unusable, which was now beeping on his desk, I think it was a win-win for everyone, maybe other than how he got rickrolled.

## [Forum's Music Thread](https://forum.mikrotik.com/t/some-music/95593/39)
Has a great resource that are posted more recently, such as playing the tik like a piano. The songs on there is some crazy work though. I'll leave with the final video that I recovered from my old snapchat archive.
<iframe width="100%" height="468" src="https://youtube.com/embed/U-qTn0nR7IQ" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
