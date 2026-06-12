---
title: "Media Server Setup Notes"
description: "Getting chained for sharing forbidden tech is an ancient concept."
date: "2024-06-16"
tags: [debian, docker, networking, media server]
---

> Cover image source: [Jan Cossiers - Prometheus Carrying Fire](https://commons.wikimedia.org/wiki/File:Jan_Cossiers_-_Prometheus_Carrying_Fire.jpg)

# Preamble
I usually don't assign hostnames to my devices names. Even if I do, I have to grow some sort of attachment to it.

When I do name it, I like to give them some meaningful name, for example my desktop is named **Yggdrasil** because I use it to connect to all my devices, and my old phone's hostname was **Hermes**, which is just making me cringe writing this intro, but you get the idea, something mythical and thematic to their purpose.

I've been wanting to turn my old MacBook Pro into a server for a while, but I didn't really have a purpose for it. So I decided to self host a media server, and assigned the hostname **Prometheus**, because it'll be chained to the wall, and sharing media. It might raise a problem when I want to try to setup the [monitoring service by the same name](https://prometheus.io/), but we'll deal with that when I get there.

## Hardware History
I managed to get my hands on a used **2010 MacBook Pro** back in 2017 before I started my school. It was pretty beaten up:
- Broken left hinge
- Cracked trackpad
- Old battery
- HDD

I needed XCode for college, I sure wasn't going to pay full price for a new one, so I decided to fix it up and give it a last breath. Thankfully I had access to vendor pricing for some parts.

I found a dead MacBook Pro at work that another tech was using it to get parts off of, which had compatible screen and trackpad, which I received for **free** (I got other free hardware from my ISP summer job, which I'll write about some other time).

Overall, I spent **\$40 CAD** on a new battery, and about **\$100 CAD** on 500GB SSD, which seems like a lot now, but it was a good deal back then.

The SSD came with an adapter to replace the optical drive, and I made a mistake of not getting a new charger.

My Franken MacBook saw some immediate improvements after replacing the HDD with an SSD, such as lower temperature and faster boot speed.

### Prep for Media Server

I used Apple's [recovery tool](https://support.apple.com/en-ca/102655#startup) to reset the laptop to the latest available version, however it felt sluggish after some usage, so I decided to make my annual pilgrimage to [DistroWatch](https://distrowatch.com/) and as always, left feeling even more unsatisfied. I narrowed it down to [Debian](https://www.debian.org/) vs [FreeBSD](https://www.freebsd.org/), and I decided to save BSD for next time.

Did a standard fresh install with these options:
- **Enable SSH** - since I planned on running it headless
- **Disable DHCP** - I already assigned a static IP

# Setup Notes
I had 3 main goals for this project:
1. Make my network more fault tolerant - Done via UPS
2. Have an automated media stack - [Jellyfin](https://jellyfin.org/) and other \*arr stack.
3. Securely access the said media stack from anywhere - [Reverse Proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/#:~:text=A%20reverse%20proxy%20is%20a,security%2C%20performance%2C%20and%20reliability) behind a domain

I followed [this guide](https://zerodya.net/self-host-jellyfin-media-streaming-stack/) for setting up the Media stack. I set upthe reverse proxy myself using nginx, first manually, then used [NginxProxyManager](https://nginxproxymanager.com/) a.k.a. NPM, not to be confused with Node Packaage Manager :)

## Planning
Since I was doing this for educational purposes, I made a diagram to show my approach, and updated the diagram from the guide to match my setup.
![Network Diagram](/images/writing/prometheus-notes/network.png)

> As much as I like Excalidraw, the font really is horrible to read at a glance

Jellyfin has a client for [Tizen](https://www.tizen.org/about/) available on their [github](https://github.com/jellyfin/jellyfin-tizen?tab=readme-ov-file#jellyfin-for-tizen), but you have to build it on your own. The guide links to a [repo by jeppevinkel](https://github.com/jeppevinkel/jellyfin-tizen-builds?tab=readme-ov-file#installation) with other pre-built versions which I've used.

## Implementing

The diagram below goes into the services that are running on the media server.
![Service Diagram](/images/writing/prometheus-notes/containers2.png)

BSDs have [jails](https://www.freebsd.org/doc/handbook/jails.html) which are linux's version of containers. Maybe it was a good decision to use Debian for this, since I would've had to build a version of Jellyfin for FreeBSD based NAS on my own.

### Media Stack
It was pretty straight forward setup experience following the guide. Changed my timezone accordingly using a neat macro `:%s/old/new/g` 😎

I learned some good maintenance commands from the guide, and that the volumes are mapped physical:virtual

### Reverse Proxy
I decided to use a NPM container for better management experience, but later learned that it got slower security updates, so I will update this in the future migration phase.

I could've used my public IP to access it, but I can't be bothered to remember it, so I decided to get a domain.

The setup was easy, port 81 was used for management, I issued a certificate using Let's Encrypt, and directed the requests to goto Jellyfin at the corresponding IP and port.

#### Resetting Nginx Proxy Manager's Password
I forgot the password for the web interface, so I had to access the container via cli and use sqlite3 to disable the user, then was able to recover the account using the default account.

#### DNS hosting
GitHub's student developer pack came with a free year of .tech domain from [get.tech](https://get.tech/github-student-developer-pack) so I devided to try it out.

Every hosting service offers a different dashboard, therefore varying user experience. I added an A record and a SRV record for the domain to point to my public IP, then it was live in few minutes.

#### SSL Certificates
I planned on using subdomains to separate the services on my newly acquired domain. I had 2 options:
- Use acme.sh to get a wildcard certificate
- manage multiple certificates for each subdomain

To be honest I just opted to issue multiple certificates for each subdomain for the time being, since I couldn't really figure out how to get a wildcard certificate for my provider. Once I migrate my domain to Cloudflare then I might give it another attempt, but for now this got the job done.

## Wrapping Up
When I was actually using the media server, I noticed that my RAM usage was hitting cap and would cause the machine to hang sometimes, I simply assigned more swap space and problem was magically solved.

Other than the laptop fan whirring very loudly when someone is watching something when I'm trying to sleep, I have no complaints, one day I'll set it free from it's eternal punishment.
