Final Project — Full-Stack Web App (React + Express, Fully Hosted on Render)
Combine everything we've learned this semester and implement a full-stack web application using:

React (single-page application) for the front-end
Node/Express for the back-end API
Persistent storage: a JSON file on the server
Render for deployment (both client and server)
Important note for the 12/2 class:
On December 2 we will walk through how to configure your React project to communicate with a server, and how to deploy both front-end and back-end together on Render.

Before class on 12/2 you are expected to have made significant progress on your React front-end using a local JSON data import (for example `import data from './data/items.json'`). Specifically, your React app should already:

Render pages and routes (using React Router)
Display imported JSON data via components
Include components, layout, and initial CSS styling
Begin designing the form UI (validation can wait until after class)
Project Requirements
Front-end (React)
Professional-ish CSS: Make it look like a real website.
Interactive UI elements: e.g. dropdowns, buttons, inputs, collapsible sections, or anything else.
Form: a form that collects information (e.g. text, email, password, whatever.), with client-side validation and helpful errors.
External library: use at least one external JS/CSS library (like you did on Assignment 5 - External Libraries)
Routing: use React Router (npm install react-router-dom). At minimum provide Home, a view that contains a complete list of data, and a Create/Form page to add data (name them however you wish).
Back-end (Express)
Implement a small (REST) API:
GET /api/items — return a list of items
POST /api/items — add a new item from the form
Validate incoming POST data on the server and return sensible error messages if there is an error (e.g. an entry already exists).
Persist data across server restarts using a JSON file. You can also use MongoDB if you want to be impressive/teach yourself a valuable skill.
Full-stack Integration
The React front-end must fetch the collection from your Express API and present it with custom components.
Form submissions on the front-end should POST to the API, update the persistent data, and update the UI.
Deployment
Everything must be hosted on Render.
Front-end deployed as a static site on Render.
Back-end deployed as a web service on Render.
Your front-end must fetch from your deployed back-end (again, we'll go over this on 12-2)
Suggested Themes / Example Ideas
Choose a theme that fits the requirements. Some ideas:

Personal portfolio — add project entries via a form
Fan wiki for some fictional world — character pages, user submissions
Event website — schedule + guest registration
Recipe manager — add and tag recipes
Creative demo — p5.js interactive canvas + data
Deliverables
A folder named final in your course repository that contains both the front-end and back-end (client/ and server/) (see below)
A README.md file in your final folder that contains:
The URL to your deployed app on Render
What your app is and what it does
Which external libraries you used
Anything you would like me to know
Example Project File Layout

final/
├─ client/ # React app (Vite)
│ ├─ public/
│ ├─ src/
│ │ ├─ Home.jsx
│ │ ├─ List.jsx # Doesn't need to be named this
│ │ ├─ AddToList.jsx # Doesn't need to be named this
│ │ ├─ App.jsx
│ │ └─ main.jsx
│ ├─ package.json
│
├─ server/
│ ├─ index.js # Express app
│ ├─ data.json # If using file-based persistence
│ ├─ package.json
│ ├─ public/
| | └─ # the static build of your client (from running npm run build in the client)
|
└─ README.md # See above for what to put in here