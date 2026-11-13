# Float — Beauty Workspace Marketplace

**Your space. Your business. Your rules.**

Float is a React-based beauty workspace marketplace prototype designed to help independent beauty professionals discover and manage flexible rental spaces.

Inspired by the challenges beauty professionals face when finding affordable, short-term workspaces, Float provides an intuitive platform for exploring available studios and managing rental listings.

## Features

### For Beauty Professionals (Renters)
- **Location Search:** Search for cities using the Open-Meteo Geocoding API.
- **Studio Discovery:** Browse beauty studios with photos, descriptions, amenities, and daily rental rates.
- **Search & Filtering:** Filter studios by location, studio name, neighborhood, or workspace type.
- **Saved Spaces:** Save favorite studios for future reference.
- **Personal Notes:** Add and edit notes on saved studios.
- **Cost Overview:** View the combined daily rental cost of saved spaces.

### For Studio Owners (Hosts)
- **Host Dashboard:** Access a dedicated interface for managing studio listings.
- **Create Listings:** Add new beauty workspaces with details such as location, pricing, amenities, and descriptions.
- **Edit Listings:** Update previously created studio information.
- **Delete Listings:** Remove listings that are no longer needed.
- **Marketplace Integration:** Display newly created listings alongside existing demo studios.
- **Persistent Storage:** Keep host-created listings saved between browser sessions using localStorage.

## Technologies Used

- **React** — Component-based user interface
- **JavaScript (ES6+)** — Application functionality and logic
- **HTML5 & CSS3** — Structure, styling, and responsive layouts
- **Vite** — Development environment and production build tool
- **Open-Meteo Geocoding API** — Real city and location search
- **localStorage** — Browser-based data persistence
- **Git & GitHub** — Version control and project management

## React Concepts Demonstrated

Float incorporates foundational React concepts, including:

- Reusable functional components
- Props and component communication
- State management with `useState`
- Side effects with `useEffect`
- Controlled forms and event handling
- Conditional rendering
- Rendering dynamic lists using `.map()`
- Searching and filtering arrays with `.filter()`
- API requests using `fetch()`
- CRUD (Create, Read, Update, Delete) operations
- Persistent browser storage

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone this repository to your computer.
2. Navigate into the `float-app` project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm run dev`.
5. Open the localhost URL provided in your terminal.

### Production Build

Run `npm run build` to generate the production-ready application.

Run `npm run preview` to preview the production build locally.

## API Integration

Float uses the **Open-Meteo Geocoding API** to retrieve real geographic location information.

Users can search for a city and select a result to filter marketplace listings based on the corresponding city and state.

The application also includes loading and error-handling states to improve the user experience during API requests.

Studio listings themselves are demonstration data rather than live listings from the API.

## Project Structure

The application is organized into React components, data files, and stylesheets.

Key components include:

- `App.jsx` — Main application logic, state, and navigation
- `StudioCard.jsx` — Individual studio listing display
- `BeautyDiscovery.jsx` — API-powered location discovery
- `HostDashboard.jsx` — Host management interface
- `StudioForm.jsx` — Create and edit studio listings
- `MyListings.jsx` — Display and manage host-created listings
- `Footer.jsx` — Application footer
- `mockStudios.js` — Sample beauty workspace data

## Current Limitations

Float is currently a front-end educational prototype.

- Studio listings and ratings are demonstration data.
- Host-created listings are stored locally in the user's browser.
- Information is not shared between different users or devices.
- Studio photo uploads are not yet supported.
- Real bookings, payment processing, and user authentication are not yet implemented.

## Future Development

Future versions of Float may include:

- Secure user registration and authentication
- Database integration for shared listings
- Studio photo uploads
- Calendar-based rental availability
- Booking and reservation management
- Payment processing
- Host verification and reviews
- Mobile application development

## About the Project

Float was developed as a React project during the Color Coded Labs JavaScript development program.

The project combines front-end development skills with a marketplace concept inspired by real-world needs in the professional beauty industry.

**Developed by Anahya Pankey**

*Float is an independent educational prototype and is not currently operating as a live booking marketplace.*
