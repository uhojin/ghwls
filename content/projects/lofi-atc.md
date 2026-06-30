---
name: "Lofi ATC"
description: "Web app that mixes lofi beats with live air traffic control radio."
status: "Archived"
techStack: ["Svelte", "Rust", "Axum", "FFmpeg", "yt-dlp", "Cloudflare"]
featured: false
featuredDescription: ""
order: 8

image:
  url: "/images/projects/lofi_atc.png"
  alt: "Lofi ATC Radio"
  size: "small"

githubUrl: "https://github.com/uhojin/lofi-atc"
liveUrl: "https://lofi-atc.ghwls.com"
postUrl: "/writing/lofi-atc"

challenges:
  - "Handling CORS for cross-origin audio streams from LiveATC and YouTube"
  - "Client-side audio mixing with independent volume control"
  - "Extracting direct stream URLs from YouTube live streams"
solutions:
  - "Rust backend proxy with Axum for unified stream interface"
  - "Web Audio API with dual GainNodes for independent ATC and music volume"
  - "yt-dlp integration for automatic YouTube stream URL extraction"
technicalDetails: "Svelte frontend with Web Audio API for client-side audio mixing. Rust backend using Axum and Tokio for async stream proxying, CORS handling, and FFmpeg transcoding of YouTube streams extracted via yt-dlp. Supports LiveATC feeds from JFK, LAX, ORD, and CYYZ. Self-hosted and exposed via Cloudflare Tunnel."
learnings:
  - "Web Audio API — dual-track audio engine with independent gain control"
  - "Rust async HTTP — long-lived streaming connections with Axum and Tokio"
  - "Stream proxying patterns for CORS-restricted audio sources"
  - "FFmpeg transcoding and yt-dlp integration for live stream extraction"
  - "Self-hosting with Cloudflare Tunnel"
futurePlans:
  - "Spotify and SoundCloud integration"
  - "Audio visualization with spectrum analyzer"
  - "Mobile-responsive design"
figmaEmbed: ""
figmaPrototype: ""
images: []
---
