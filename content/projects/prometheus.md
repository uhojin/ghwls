---
name: "Prometheus"
description: "Secure Automated Media Server"
status: "Archived"
techStack: ["Docker", "Nginx"]
featured: true
featuredDescription: ""
order: 5

image:
  url: "/images/projects/prometheus.png"
  alt: "btop running on Prometheus"

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
technicalDetails: "Utilizes Docker for containerization, Nginx as a reverse proxy, and various minor tweaking for hardware optimization for running headless. Includes services like Jellyfin, Sonarr, and Radarr for media management. Migrated from a 2010 MacBook Pro to a retired i7-3770K with 16GB RAM on the same SSD."
learnings:
  - "Docker  container orchestration, and network security practices"
  - "Useful system changes to run headless and optimize performance on old hardware."
futurePlans: 
  - "New Proxmox server installation instead of running Debian on bare metal, to allow for better resource management and isolation of services."
---
