---
name: "Peruser"
description: "A web-based marketplace with a custom currency system."
status: "Archived"
techStack: [".NET", "SQLite", "JavaScript", "Entity Framework"]
featured: false
featuredDescription: ""
order: 2

image:
  url: "/images/projects/peruser.jpg"
  alt: "View of the Piazza Grande in Parma by Boccaccio Giuseppe, 1847"
  position: "bottom 12% left 30%"
  scale: "300%"
  hoverPosition: "bottom 12% left 30%"
  hoverScale: "130%"
  coverPosition: ""

githubUrl: "https://github.com/uhojin/Peruser"
liveUrl: ""
postUrl: ""

challenges:
  - "Implementing a secure and efficient custom currency system"
  - "Optimizing performance for quick loading of product listing and images"
  - "Responsive UI without relying on modern frameworks"
solutions:
  - "SQLite DB with C# Entity Framework for proof of concept platform with simple transaction logic"
  - "Using third party image hosting website, storing links to the image"
  - "Flexbox and Grids allowing users to toggle between views"
technicalDetails: "RESTful API written in C#, using Entity Framework read and write from SQLite DB."
learnings:
  - "RESTful naming conventions & using DTOs"
  - "Not worth wasting time on building your own auth"
  - "I need to practice my frontend"
futurePlans: []
figmaEmbed: ""
figmaPrototype: ""
images: []
---

### Contributions

**Backend**
- Listing CRUD and offer system
- Buy feature with currency
- Refactored repositories to async/await

**Frontend**
- Profile page
- Navigation links and styling
- View toggle and search bar
- Most of the frontend styling
