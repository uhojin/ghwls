---
name: "Praiser"
description: "iOS and web platform for logging and visualizing chronic pain."
status: "Archived"
techStack: ["Swift", "Next.js", "Express", "Supabase", "SceneKit", "Three.js", "Cloudflare"]
featured: true
featuredDescription: ""
order: 7

image:
  url: "/images/projects/praiser.png"
  alt: "Praiser iOS app screenshot"

githubUrl: ""
liveUrl: ""
postUrl: ""

challenges:
  - "Building an intuitive 3D body model for pain point placement on mobile"
  - "Keeping pain data in sync across iOS and web with offline support"
  - "Migrating the web app from client-side to server-side rendering"
  - "Designing a doctor-patient workflow with role-based access"
solutions:
  - "SceneKit with quaternion-based trackball rotation, axis-locking, and haptic feedback"
  - "Offline sync queue with automatic retry using Network framework, Supabase for real-time sync"
  - "Hybrid RSC + client component architecture, modularized data layer for tree-shaking"
  - "Supabase Auth with invite flow, RLS policies, and server-side permission checks"
technicalDetails: "iOS app uses SceneKit for 3D pain point placement on a human body model. Web app built with Next.js using server-side rendering, Three.js for 3D visualization, and Supabase for auth and data. Express API serves as middleware between iOS and Supabase. Hosted on Cloudflare Tunnel."
learnings:
  - "SceneKit 3D interaction — quaternion rotation, gesture handling, sphere placement"
  - "SwiftUI architecture patterns — @EnvironmentObject, dependency injection"
  - "Next.js SSR migration — hybrid RSC + client components"
  - "Three.js 3D visualization in React"
  - "Supabase Auth with role-based access and RLS policies"
  - "Offline-first patterns with sync queues"
futurePlans:
  - "Revive as a simplified logging-only app"

images: []
---

### Contributions

**iOS**
- 3D body model with SceneKit — trackball rotation, axis-locking, sphere placement/editing
- Full UI redesign following Apple HIG (auth, tabs, pain log, history, settings)
- Offline sync queue with automatic retry
- Architecture refactor to proper SwiftUI patterns

**Web**
- Next.js app with SSR migration from client-side rendering
- Three.js 3D pain visualization
- Sidebar navigation, theming, doctor invite flow
- Modularized data layer and API cleanup
- Database schema design for pain sessions

**API**
- Express server with session/user routes and auth middleware

**Infrastructure**
- Cloudflare Tunnel hosting
- Supabase configuration and RLS policies
