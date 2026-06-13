---
name: "Prometheus"
description: "Secure Automated Media Server on 2010 MacBook Pro"
status: "Active"
techStack: ["Docker", "Nginx"]
featured: true
featuredDescription: ""
order: 5

image:
  url: "/images/projects/prometheus.jpg"
  alt: "Prometheus Carrying Fire by Jan Cossiers, 1637"
  position: "bottom 38% right 25%"
  scale: "170%"
  hoverPosition: "center 25%"
  hoverScale: "100%"
  coverPosition: ""

githubUrl: ""
liveUrl: ""
postUrl: "/writing/prometheus-notes"

challenges:
  - "Optimizing performance on older hardware, OS unresponsive after some duration"
  - "Ensuring security for a home media server accessible from outside"
  - "Automating updates and maintenance"
solutions:
  - "Using lightweight containers to maximize resource, allocating more swap space to prevent slowing down during heavy load."
  - "Set up a robust Nginx reverse proxy with SSL encryption"
  - "Possible cron job to run commands periodically in the future"
technicalDetails: "Utilizes Docker for containerization, Nginx as a reverse proxy, and various minor tweaking for hardware optimization for running headless. Includes services like Jellyfin, Sonarr, and Radarr for media management."
learnings:
  - "Docker  container orchestration, and network security practices"
  - "Useful system changes to run headless and optimize performance on old hardware."
futurePlans: []
figmaEmbed: ""
figmaPrototype: ""
images: []
---
