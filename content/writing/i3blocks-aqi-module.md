---
title: "i3blocks Air Quality Module"
description: "A simple module to keep track of air quality"
date: "2019-07-17"
tags: [i3blocks, curl, sed, awk]
---

> ***Hello!***
>
> *This is post is old and possibly outdated. I'm keeping it here for reference. (2024/09/01)*

# Overview
Making API requests then displaying response on [i3bar](https://i3wm.org/i3bar/).
Using [cURL](https://curl.se/),[sed](https://linux.die.net/man/1/sed), and [AWK](https://linux.die.net/man/1/awk) to retrieve & manipulate the response data.
This post will cover the process of making a module for [i3blocks](https://vivien.github.io/i3blocks/) to display the local air quality index ([AQI](https://en.wikipedia.org/wiki/Air_quality_index)).

# Why?
During my stay in South Korea, I've noticed that air quality was a rising isse. The residents are mostly blaming it on the neighbouring country, but I'm not going to get into that.

Rather than fixing the bigger problem, I've decided to write a small module for my status bar to keep me updated on the local air quality. I'm doing little things that I can actually achieve.

It's called a "module" but under the hood, they're simply a group of commands to display a number on my status bar. Nothing new there.
There are existing modules out there to show weather reports, and I knew where to get the AQI from, so all I had to do was simply put the two together.

## Preparation
First I needed to grab the air quality data from somewhere, then I came across this [website](https://aqicn.org). By default, it shows your location, local air quality forecast, and explains what the numbers mean.

Further down the page, there's a [link](https://aqicn.org/api) to their API, which returns more information than I needed, so I still needed to put in some effor to make the information usable for the status bar.

I needed to get a token to access the API, which was well documented on the initial setup section of the page. Once I got my token, I was able to make a successful request using cURL:
```shell
curl -s http://api.wapi.info/feed/here/?token=yourtoken
```

which returns following format:
```json
{
    "status":"ok",
    "data":
    {
        "aqi":69,
        "idx":xxxx,
        "attributions":
        [
            {
                "url":"https://www.airkorea.or.kr/",
                "name":"South Air Korea Environment Corporation"
            },
            {
                "url":"https://waqi.info/",
                "name":"World Air Quality Index Project"
            }
        ],
        "city":
        {
            "geo":[latitude,longitude],
            "name":"Some City, Some Place, Somewhere, South Korea",
            "url":"https://aqicn.org/city/korea/some/place"
        },
        "time":
        {
            "s":"2019-07-10 22:00:00",
            "tz":"+09:00",
            "v":1562796000
        },
        "debug":
        {
            "sync":"2019-07-10T22:26:57+09:00"
        }
    }
}
```

Pretty standard JSON response. Using `here` returns the local air quality, the website also contains a [list of all available cities](https://aqicn.org/city/all).

## Now What?
I saved the response to a file, which was done with pipes and redirection.

```shell
curl -s http://api.wapi.info/feed/here?token=mytoken > ~/file/location/airdata
```

Now with a file to work with, I had to trim the response because I only needed to AQI value.

I decided to use *sed* and *awk* for this text manipulation, there's a better way to do this probably, but this is how I did it.

```shell
sed "s/,/\n/g;s/:/ /g" ~/file/location/airdata | awk /data/ | awk "{print \$3}"
```

### Breakdown
- `sed` is a stream editior, it reads the file line by line and performs the operations that are given.
  - `s/,/\n/g` replaces all the commas with new line character `\n`.
  - `s/:/ /g` replaces all the colons with spaces.
- `awk /data/` prints the line that contains the word "data".
- `awk "{print \$3}"` prints the third word of the line.

Output for each command:
```shell
{"status" "ok" "data" {"aqi" 69
"data" {"aqi" 69
69
```

**Nice**, now that I have what I need, I can move on to the i3blocks part of this.

### Some Assembly Required
Luke Smith's [weather module](https://github.com/LukeSmithxyz/voidrice/blob/fb456c4d98ac44497294617411c1100943d14a40/.local/bin/statusbar/weather) for LARBS was a good place to start.

I had to modify the script to point to the correct directoy and file, which will be created by the script later.

`rm -f "$HOME/.local/share/airdata" ;}`

This will clear pre-existing data file when the script runs.

I modified the `getforecast()` function into `get_air_quality()`.
```shell
get_air_quality() {
    ping -q -c 1 1.1.1.1 > /dev/null || exit 1
    curl -s "http://api.wapi.info/feed/here?token=mytoken" > "$HOME/.local/share/airdata" || exit 1
}
```

This will:
1. Check if device is connected to the internet.
2. Then send a request to the API.
3. Save the response into a file called `airdata`.

Which will be read by the script. Then I modified the `showforecast()` function into `show_air_quality()`.

```shell
show_air_quality() {
    sed "s/,/\n/g;s/:/ /g" $HOME/.local/share/airdata | awk /data/ | awk "{print \"AQI: \" \$3}"
}
```

This function will return something that looks like `AQI: 69`, which will be displayed on the status bar.

```shell
case $BLOCK_BUTTON in
    2) get_air_quality && show_air_quailty ;;
    3) pgrep -x dunst >/dev/null && notify-send "Air Quality Module" "\- Middle click to update forecast.
-AQI - Air Quality Index
   0-50: Good
 51-100: Moderate
101-150: Mildly Unhealthy
151-200: Unhealthy" ;;
esac

if [ "$(stat -c %y "$HOME/.local/share/airdata" >/dev/null 2>&1 | awk '{print $1}')" != "$(date '+%Y-%m-%d')" ]
	then rm $HOME/.local/share/airdata && get_air_quality && show_air_quality
	else show_air_quality
fi
```

> **Mouse Actions**
>
> Each case corresponds to different mouse actions:
> - `1) Left click`
> - `2) Middle click`
> - `3) Right click`
For this module, I've yet to find a use for left clicking on the module, so I decided to leave it out. I added some descriptions for the numbers. Saved the file as "airquality", then added it to my i3blocks config gile, then set it to update every 30 minutes.

### Final Touches
Still need to make the script executable.
`chmod +x ~/.local/bin/statusbar/airquality`
in my case.

# Wrapping Up
Once I reloaded the i3wm, I was agreeted with an air quality index. The module responds to mouse actions as expected, and I'm happy with the result.

Writing this module was a good practice, since I got to write something that I found useful, and it was pretty easy to do so since most of the work was already done for me. I got to make something I could use everyday.
