---
name: "Router"
description: "Group destination planner for iOS."
status: "Archived"
techStack: ["Swift", "MapKit", "Firebase"]
featured: false
featuredDescription: ""
order: 3

image:
  url: "/images/projects/router.jpg"
  alt: "The Fairman Rogers Four-in-Hand by Thomas Eakins, 1879-80"
  position: "top 40% right 35%"
  scale: "280%"
  hoverPosition: "center right 35%"
  hoverScale: "160%"
  coverPosition: ""

githubUrl: "https://github.com/uhojin/Router"
liveUrl: ""
postUrl: ""
videoUrl: "https://www.youtube.com/embed/avsTq-2EsJs"
videoPortrait: true

challenges:
  - "Building an intuitive map-based location picker that feels native"
  - "Keeping destination data in sync across multiple users in real time"
  - "Designing a voting system that's clear and easy to use at a glance"
  - "Bridging SwiftUI and UIKit for the MKMapView integration"
solutions:
  - "Crosshair map picker with fullscreen expand/collapse and POI tap-to-select with reverse geocoding"
  - "Firestore snapshot listeners for real-time sync with pull-to-refresh fallback"
  - "Going / Not Going voting with live counts and destination history with attendance stats"
  - "UIViewRepresentable wrapper around MKMapView with SwiftUI state bindings"
technicalDetails: "Interactive MapKit picker with crosshair and POI selection, reverse geocoding for addresses, Firestore real-time listeners for group sync, and a voting system with attendance tracking. 'Take Me There' opens Apple Maps with directions."
learnings:
  - "MapKit integration with SwiftUI via UIViewRepresentable"
  - "Real-time data sync patterns with Firestore snapshot listeners"
  - "iOS location permissions and CoreLocation best practices"
  - "Bridging UIKit components into a SwiftUI-first architecture"
futurePlans: []
figmaEmbed: ""
figmaPrototype: ""
images: []
---

