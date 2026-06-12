---
title: "Monitoring macOS Temperature in the Menubar"
description: "You'd think it's a built-in feature"
date: "2026-02-10"
tags: [macOS, Swift, SMCKit]
---

> **Work in progress** — this post is unfinished.

> Cover image source: [Mercury (Hermes). Wood engraving by Jonnard after W.B. Richmond, 1866.](https://commons.wikimedia.org/wiki/File:Mercury_(Hermes)._Wood_engraving_by_Jonnard_after_W.B._Richm_Wellcome_V0035817.jpg)

# A Trillion Dollar Company, BTW...
Since Apple doesn't provide an easy way to keep an eye on your hardware's health, "power users" often resort to community made solutions. Some popular choices being [stats](https://github.com/exelban/stats), [Hot](https://github.com/macmade/Hot), or the classic [coconutBattery](https://www.coconut-flavour.com/coconutbattery/). Apple does allow ways to track these metrics, but using `powermetrics` or creating a script or an alias isn't accessible for the most part, especially not the best user experience when I just want to know how hot my machine is at this moment.

# Existing Solutions
Naturally us humans can't agree on a single thing, someone wants this, or that, or just something entirely new. It applies on many levels. Feature scope is one thing, but paywalling is just a sin. Especially in this day and age of "Vibe-Coding", at least in my point-of-view.

I was using free version of coconutBattery for the longest time, since version 3 on my now [retired media server](/writing/prometheus-notes). I've been using version 4 on my M1 laptop to monitor my battery temperature without any issues... until recently.

## Numbers don't lie... Until they do
I monitor my battery temperature because it's what I grew accustomed to with coconutBattery, and I've found it to be a 'good enough' metric for general status of my machine, especially in a laptop context. I can also get a general baseline of 
