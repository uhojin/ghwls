---
title: "Desktop Migration Notes"
description: "BTW, I use... nevermind."
date: "2024-09-02"
tags: [Linux, rEFInd, pacman]
---

# Not a Guide
This is merely just my chicken scratches for installing "GNU/"Linux on my desktop, so I can squeeze the last drop of performance out of it.

I wanted to use UEFI only with the sole purpose of using [rEFInd](https://www.rodsbooks.com/refind/index.html) as my boot manager, because I can, and it's one of those things that has just worked for me in the past, and have continuted to do so.

Maybe I'll try out the GRUB skins sometime in the future, but for now rEFInd minimal dark theme feels just right for my personal taste.

## LiveUSB
Used the latest Arch ISO, booted into the live environment, and started following the installation guide from the infamous [ArchWiki](https://wiki.archlinux.org/title/Installation_guide).

### Display
`# echo 3 > /sys/class/graphics/fbcon/rotate_all` to rotate clockwise, if using a monitor vertically.

### Disk Partition
`# fdisk /dev/sda` because I know my SATA ports and order them everytime I install new storage :)

docker uses `/var` which requires more maintenance if on a separate partition.
- 1G EFI `/dev/sda1 -> "/boot"` Just in case of wanting to distro hop.
- 4G Swap `/dev/sda2`
- 920G root `/dev/sda3 -> "/"`

> "Savage Installation"

> **TIP**
>
> `passwd` to create live account passwword for SSH access to install from remote.
>
> **.tmux.conf**: `<bind> + : resize-pane -R 20` for pane resizing
### Mirrorlist
```shell frame=none
reflector --verbose --latest 5 --sort rate --save /etc/pacman.d/mirrorlist
```
to overwrite the mirrorlist with top 5 fast mirrors.

> **Author Note**
>
> I was tempted to do a hardened install, but I'll save that for later.
Installed base packages and other packages that I might need on the system, such as `vim` because I need something to get stuck in. I grabbed `man-db, man-pages` noob essentials that I most likey will never read unless my internet goes down, and some other firmware packages.

#### Official Repo
`linux-firmware-qlogic`
`intel-ucode`

#### Arch User Repo
- `ast-firmware` -> ast
- `upd72020x-fw` -> xhci_pci
- `wd719x-firmware` -> wd719x
- `aic94xx-firmware` -> aic94xx

Following the installation guide to generate fstab, grabbed UUID from `/etc/fstab` to use with boot loader.

## chroot - Installed System
After chroot-ing into the installed system, continued following the wiki.

Re-using the previous hostname:

```shell frame=none
echo yggdrasil > /etc/hostname

```

### Bootloader

I also wiped the pre-existing EFI paritions that was created by Windows, because I didn't like that there was 2 recovery partitions in front of the EFI partition.

#### rEFInd
Since we're on a UEFI installation, it should "just work"
```shell frame=none
pacman -S refind
```

Then `refind-install` was enough to create an entry in `/boot/refind_linux.conf`, however it used my live usb, and  also used labels instead of disk UUID, which I didn't like.

Replaced the USB label with UUID from fstab earlier to specify `"/"` mount point `UUID=e192a67b-b649-4fde-a673-92f99a9acca5`. Could've added `initrd=` entry for loading microcode before initial file system, but `/etc/mkinitcpio.conf`'s HOOKS array contained `microcode` which will generated a combined image.

I was pretty sure that I've read that rEFInd will find the correct initframfs automatically from `/boot` if nothing is specified, but I just went ahead and manually specifed both in my `refind_linux.conf`.

## Reboot
Unmounted the mounted partitions following the wiki, rebooted, removed the install USB, then successfully booted into bare system.

### Networking
> I totally didn't forget to install DHCP... I **totally** meant to use manual configuration...

All the links were set to down.
> **TIP**
>
> `ss -atu` to show all TCP sockets with port numbers
- `ip li set enp8s0 up` - didn't get any IP because no DHCP client is installed.
- `ip addr add 192.168.0.82/24 dev enp8s0` - manually assign IP.
- Still only able to reach local network - `ip route show` returned empty table.
- `ip route add default via 192.168.0.1 dev enp8s0` - manual entry for gateway.
- Unable to resolve domain names - created a manual entry in `/etc/resolv.conf`
```sh title=/etc/resolv.conf
nameserver 9.9.9.9
```

Now everything was working.

> **TIP**
>
> **Optionally** install NetworkManager and enable it.
> ```shell frame=none
> pacman -S networkmanager
> systemctl enable NetworkManager.service
> ```
Then I installed a SSH server and enabled it so I could access this machine from my laptop.
```shell frame=none
pacman -S openssh
systemctl enable sshd
```

> **Knowledge +1**
>
> When dealing with systemd services with `systemctl`, `enable` means it will start on boot, while `start` doesn't necessarily mean it will start on next boot.
# Setup & Personalization
After networking was persistent, I created a user account for daily use, then added it to `/etc/sudoers`, then I went to get a different shell, because pretty colours.

## [Zsh](https://www.zsh.org/)
I've been pavlov'd to use [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh?tab=readme-ov-file#getting-started), just because of the powerline theme, maybe I'll look for alternatives, but not right now.

Since I'll only be using `user` over SSH, there won't be a need to install supported fonts since a patched font is already installed on my laptop, and root prompt won't be messed up.

### [Powerlevel10k](https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#installation)
~~Formerly known as Powerlevel9k~~ Clean modern prompt theme for the visually dry command line.

Specify the theme in `.zshrc`
```shell title=~/.zshrc
...
ZSH_THEME="powerlevel10/powerlevel10k"
...
```
then reload the configs by running `source ~/.zshrc`, which makes you go through a setup wizard to choose and customize the powerlevel theme. I chose something different from my laptop to visually set apart the environment at a glance.

## [Security](https://wiki.archlinux.org/title/Security)
### User
Following the ArchWiki, I added a 4 seconds of delay between failed login attempts. Then edited the `pam_faillock.so` to uncomment the defaults just to make sure they were being used for my own sanity.

> **Unlocking a User**
>
> ```shell frame=none
> faillock --user *username* --reset
> ```
I'll limit the process counts later...

Same with setting up Wayland, I don't really have a need for GUI yet, I do plan on trying Valve's new game so maybe.

I remember the argument of X11 + i3 vs Wayland + Sway, when Wayland was still relatively new. I'll try Wayland this time, whenever I get around to installing a graphical environment.

> I'm not sure if that's the best combo for gaming, but it's the one I want to try, so whatever.

Before I lock down the root account, I wanted to make sure `visudo` would use `rvim` to edit, and I also enabled insults, because I thought it would be funny to have it on my local system.

> **Wiki Says...**
>
> Always use `visudo` to edit `/etc/sudoers` because it will error check before copying over the contents.
Just had to make sure `Defaults targetpw` or `rootpw` was set in the `/etc/sudoers`. Tested by adding `Defaults env_reset,timestamp_timeout=0`, so I could verify that it asks for my password instead of root password. Commented it because I will leave the default grace period.

I created a group for ssh, added my user to it, then edited `/etc/ssh/sshd_config` to only limit ssh login to users that only belong to that group.

There's more user & permission separationg I could do, but I'll settle for disabling root account with the configuration I have so far.

`passwd -l root`

I'll need to setup other users for docker & other services later.

## Package Management
I love pacman, don't get me wrong, but picking an AUR helper was a choice paralysis hell for me last time. It appears that yaourt has been deprecated.

I'll build from source untill I feel like I need to get a helper this time, and it looks like pacman can be used to do most of the things now.

# Wrapping Up
I'll finish configuring power management, GUI & multimedia, and networking and other optimization such as TRIM for SSDs later, since this covers most of the installation.
