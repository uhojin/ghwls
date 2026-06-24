---
name: "Mercury"
description: "Tiny macOS menu bar temperature monitor built with SwiftUI and IOKit."
status: "Active"
techStack: ["Swift", "SwiftUI", "IOKit", "Homebrew"]
featured: false
featuredDescription: ""
order: 9

image:
  url: "/images/projects/mercury.jpg"
  alt: "Mercury temperature monitor"
  position: "center"
  scale: "100%"
  hoverPosition: "center"
  hoverScale: "100%"
  coverPosition: "center"

githubUrl: "https://github.com/uhojin/mercury"
liveUrl: ""
postUrl: "/writing/mercury"

challenges:
  - "Reading SMC sensor data directly from macOS kernel"
  - "Supporting both Apple Silicon and Intel sensor key mappings"
  - "Keeping CPU usage minimal with continuous polling"
solutions:
  - "Direct SMC reads via IOKit with sub-millisecond sensor polling"
  - "Auto-detection of available sensors per chip architecture"
  - "Configurable refresh interval (1-10s) with <1% CPU at default rate"
technicalDetails: "Native macOS app using SwiftUI for UI and IOKit for direct SMC temperature reads. Monitors CPU, GPU, and battery temperatures. Dynamic menu bar icon reflects thermal state. Distributed via Homebrew cask."
learnings:
  - "IOKit — direct SMC communication for hardware sensor data"
  - "macOS menu bar app architecture — no dock icon, no windows"
  - "Homebrew cask distribution and CI/CD with GitHub Actions"
  - "Apple Silicon vs Intel SMC key differences"
futurePlans: []
figmaEmbed: ""
figmaPrototype: ""
images: []
---
