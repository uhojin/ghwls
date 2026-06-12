---
name: "Hauler"
description: "A job platform connecting truckers with brokers."
status: "Archived"
techStack: ["Swift", "React", ".NET", "Azure", "Entity Framework"]
featured: false
featuredDescription: "Full-stack Azure-deployed job platform connecting brokers and truck drivers across web and iOS."
order: 4

image:
  url: "/images/projects/hauler.jpg"
  alt: "Mercury and Argus by Diego Velázquez, 1659"
  position: "top 25% left"
  scale: "200%"
  hoverPosition: "top 25% left 10%"
  hoverScale: "170%"
  coverPosition: ""

githubUrl: "https://github.com/HighwayHackers"
liveUrl: ""
postUrl: ""

challenges:
  - "Designing a system that caters to both web and mobile users"
  - "Implementing real-time job posting and application features"
  - "Ensuring data consistency across platforms"
solutions:
  - "Developed a responsive React web app and a native iOS app for optimal user experience on all devices"
  - "Utilized Azure DB for data synchronization between web and mobile clients"
  - "Implemented a robust API with .NET Core to serve both web and mobile clients"
technicalDetails: "React for the web frontend, Swift for iOS app, .NET Core for backend API, and Azure services including App Service and SQL Database."
learnings:
  - "Designing and building a .NET API to serve both web and mobile clients"
  - "iOS development with SwiftUI — views, view models, and API integration"
  - "Azure deployment and cloud service configuration"
  - "Working across a monorepo with separate frontend, mobile, and backend codebases"
futurePlans: []
figmaEmbed: '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="650" src="https://embed.figma.com/design/uLWp75BBp2tZI9H3H0niun/Hauler-UI?node-id=0-1&embed-host=share" allowfullscreen></iframe>'
figmaPrototype: '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="650" src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/uLWp75BBp2tZI9H3H0niun/Hauler-UI?node-id=0-1&t=heJCZhvWgjLILUWl-1" allowfullscreen></iframe>'
images: []
---

### Contributions

**Backend**
- Data model design and DTO mapping
- Load and User controllers and repositories
- iOS-specific endpoints (GetLoadByDriver)
- Authentication fixes

**iOS**
- Authentication and load views
- Load bidding system
- Delivery view with driver-specific loads
- Navigation bar fixes

**Design**
- Figma wireframes and prototype
- PR reviews across all three repos
