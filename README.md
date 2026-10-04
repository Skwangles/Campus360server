# Campus360 Server

Campus360 Server is the backend and map-generation interface for an academic virtual-tour project. It was developed as a student project to demonstrate how a web UI and server could work together to build and navigate a campus from linked panoramic images.

The project models the tour as a graph: each panorama is represented by a point, and links between points define the paths users can follow. Floor plans, rooms, campuses, and point types provide the structure needed to organize and present the tour.

> **Project history**  
> Campus360 Server is the predecessor to [CampusVirtual](https://github.com/Skwangles/CampusVirtual). Campus360 focused on manually stitching and organizing panoramic images through a graph-based model, while CampusVirtual explored a different approach using VSLAM to automate tour generation.

## Features

- REST API for managing campus-tour data
- Graph-based navigation between panoramic viewpoints
- Storage for panoramic images and floor-plan images
- Campus, area, room, point, and point-type models
- Swagger API documentation
- React/Vite map-generation UI with panoramic-image tooling
- MongoDB persistence through Mongoose

## Technology

- **Server:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **API documentation:** Swagger UI and `swagger-jsdoc`
- **Map generator:** React, TypeScript, Vite
- **Panorama viewers:** Pannellum and Panolens
- **Containerization:** Docker Compose

## Repository structure

```text
.
├── map-generator/       # React/Vite interface for creating and editing tour maps
├── server.js             # API server entry point
├── package.json         # Server dependencies and scripts
└── docker-compose.yml    # Local MongoDB setup
```

## Getting started

### Prerequisites

- Node.js and Yarn
- Docker and Docker Compose
- A MongoDB instance, either through the included Docker Compose configuration or an existing installation

### 1. Start MongoDB

From the directory containing `package.json`, run:

```bash
docker compose up --build -d
```

The development database is configured with the following connection strings:

- **Admin:** `mongodb://admin:password@localhost:27017/`
- **Application:** `mongodb://server:test-password@localhost:27017/campusvirtual`

### 2. Start the API server

Install dependencies and start the server:

```bash
yarn install
yarn start
```

### 3. Start the map generator

In a separate terminal:

```bash
cd map-generator
yarn install
yarn dev
```

The Vite development server will print the local URL when it starts.

## API

Swagger documentation is available at:

```text
/api-docs
```

The API follows a conventional CRUD structure. Available resources include:

- `/images`
- `/points`
- `/pointtypes`
- `/areas`
- `/rooms`
- `/campuses`

Individual resources can be addressed by appending their UUID or identifier, for example:

```text
/images/:id
```

## Data model

### Image

A panoramic image associated with a navigation point.

- `name` — image name
- `base64` — image data

### Area

A floor-plan image or mapped area within a campus.

- `name` — area name
- `base64` — floor-plan image data

### Point type

A category used to describe a point, such as stairs or disabled access.

- `type` — point-type name

### Point

A node in the tour graph and a location from which users can view a panorama.

- `image` — referenced panoramic image
- `pan_offset` — initial horizontal viewing offset
- `tilt_offset` — initial vertical viewing offset
- `type` — referenced point type
- `links` — connected points in the navigation graph
- `x`, `y` — position on the associated area map
- `area` — referenced area
- `campus` — referenced campus

### Campus

The top-level grouping for a virtual tour.

- `name` — campus name

### Room

A room associated with one or more tour points.

- `name` — room name
- `occupants` — optional list of occupants
- `points` — referenced points associated with the room

## Project context

This repository was created as part of a student project in which the team was asked to build both a user interface and a server for assembling panoramic campus tours. It demonstrates an explicit, graph-based approach to navigation: the relationships between panoramic viewpoints are stored directly as links in the data model.

It is preserved as a record of that earlier approach and as the foundation for understanding the later CampusVirtual project, which investigated VSLAM-based automation instead of relying on manually prepared graph connections.

## License

This project is licensed under the MIT License.
