---
title: "Journey to the DMZ"
description: "Bruteforce attack? In the current year?"
date: "2025-01-03"
tags: [SSH, Networking, Security]
---

> **Incident Summary**
>
> - Designated local media server to be a DMZ host
> - Probed initially on 24/12/31 @ 23:52 by SSH Bot
> - First IP Address 216.107.162.242, more logged from different locations
> - Implemented Fail2Ban, Public Key-based Authentication
> - Resumed Normal Operation 25/01/03
# House Keeping
I was spending time with my friends with the new years right around the corner. Just minding my own business, feeling pretty good about my server's uptime.
![Server uptime](/images/writing/ssh-incident-report/uptime.png)

Suddenly the media server laptop's fans were on max RPM, trying to take off. So I checked processes using `htop` and found multiple sshd processes from random public IPs.
![Multiple sshd processes](/images/writing/ssh-incident-report/attempts.png)

These IPs appeared to be registered on [AbuseIP DB](https://www.abuseipdb.com/) which is a registry of reported IP addresses that has a record of abusive activity. Kind of like an online criminal database.

When I looked the IPs up and got a match, I was able to put together what was going on.

# It Wasn't Very Effective...
It did manage odnw to slow down my connection and slow the server down in a form of Denial of Service attack. Other than that, nothing of value was lost, or stolen, or exposed.

## What to do?
Now I had unwanted guests knocking on the door of my server, and it's not like I can just call up the internet police to get rid of them.

I had few ways to deal with the problem at hand.
1. Ban the "guest" after they make `n` amount of failed attempts - Fail2Ban
2. Only allow "guests" with a pre-authorized pass - SSH Key based Authentication

Both sounded like a good idea, but I wanted to take the least path of resistance, so I decided to go with fail2ban.

### [Fail2Ban](https://github.com/fail2ban/fail2ban)
Available on Debian repo, simply had to install it using `apt`

```shell frame=none
sudo apt update
sudo apt install fail2ban
```

Then I copied `/etc/fail2ban/jail.conf` to `/etc/fail2ban/jail.local` and went through the configuration file and enabled options such as ban time.

Then restarted the service via `systemctl restart fail2ban`, then left the system on overnight to see how it would play out.

I woke up the next morning to annoying max RPM fan noises, so I needed a better solution.

### SSH Key Based Authentication
Maybe it was a skill issue on my end, maybe the attacker just has a crazy botnet, but that didn't matter. I just needed to get this spam sshd process to stop.

I copied my public key from my daily driver laptop using 
```shell frame=none
ssh-copy-id user@prometheus
```

Then I logged into the server, then disabled password based authentication:
```shell title=/etc/ssh/sshd_config
# HostbasedAuthentication
...
# To disable tunneled clear text passwrds, change to no here!
PasswordAuthentication no
#PermitEmptyPasswords no
...
```

Restarted SSH service:
```shell frame=none
systemctl restart sshd
```
And finally there was peace, and everything went back to normal.

# Learning Points
1. Key based Authentication is good
2. Managing that key is a different problem
3. Forward specific ports, instead of exposing it all.
