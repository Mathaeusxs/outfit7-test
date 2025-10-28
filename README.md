# Events7 Application

A full-stack event management application built with Angular, NestJS, and MariaDB in an Nx monorepo. This application was created as a technical assessment and served as a playground for testing new implementations, architectural patterns, and full-stack development principles.

**Note:** As with any experimental project, bugs are not just possible—they're practically guaranteed. Consider them "features in disguise" waiting to be discovered! 🐛

## Table of Contents

- [Events7 App Info and Description](#events7-app-info-and-description)
- [Development Process](#development-process)
- [Build Process](#build-process)
- [Runtime Process](#runtime-process)
- [Extra Information](#extra-information)

---

### Technology Stack

- **Frontend**: Angular with PrimeNG UI components
- **Backend**: NestJS with Express
- **Database**: MariaDB with TypeORM
- **State Management**: NgRx (Store, Effects, Entity)
- **Styling**: TailwindCSS with PrimeUI
- **Build Tool**: Nx monorepo
- **Containerization**: Docker with multi-stage builds

### Architecture

The project is organized as an Nx monorepo with the following structure:

```
apps/
  ├── api/                   # NestJS backend API
  └── frontend-angular/      # Angular frontend application

libs/
  ├── data-repo/             # Shared data repository (TypeORM entities)
  └── types/                 # Shared TypeScript types

docker/
  ├── build/                 # Docker build configurations
  ├── runtime/               # Docker runtime configurations
  └── database-dev/          # Development database setup
```

### Key Features

- Event CRUD operations
- RESTful API with Swagger documentation
- Responsive UI with PrimeNG components
- Type-safe data models shared between frontend and backend
- Docker-based deployment

---

## Development Process

### Prerequisites

- Node.js 22.x
- Yarn package manager
- Docker and Docker Compose (for containerized development)

### Local Development Setup

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Start the development database:**

   ```bash
   cd docker/database-dev
   docker-compose up -d
   ```

3. **Start the API server:**

   ```bash
   npx nx serve api
   ```

   The API will be available at `http://localhost:3000`

4. **Start the Frontend application:**
   ```bash
   npx nx serve frontend-angular
   ```
   The frontend will be available at `http://localhost:4200`

### Development Commands

```bash
# Run tests
npx nx test api
npx nx test frontend-angular

# Lint code
npx nx lint api
npx nx lint frontend-angular

# Build test for production
npx nx build api
npx nx build frontend-angular

```

## Build Process

The build process uses Docker with multi-stage builds for optimized production images.

### Build Architecture

1. **Base Build Environment** - Contains all dependencies and build tools
2. **Application Builds** - API and Frontend built from the base image
3. **Runtime Images** - Minimal production images with only runtime dependencies

### Building with Docker Compose

#### Build All Applications

```bash
cd docker/build
docker-compose build
```

This will build:

- `base-build-env:latest` - Base image with Nx and all dependencies
- `events7-api:latest` - NestJS API server
- `events7-frontend-angular:latest` - Angular application served by Nginx

#### Build with Version Tags

```bash
VERSION=1.0.0 docker-compose build
```

This creates versioned images:

- `events7-api:1.0.0`
- `events7-frontend-angular:1.0.0`

#### Build Specific Service

```bash
# Build only the API
docker-compose build api

# Build only the frontend
docker-compose build frontend-angular
```

### Using Environment Variables

Create a `.env` file in `docker/build/` to set default values:

```env
VERSION=1.0.0
```

### Build Process Details

The build uses multi-stage Dockerfiles for efficiency:

1. **Stage 1 (Builder)**:
   - Uses `base-build-env` image
   - Copies entire project
   - Runs `nx build <app>` to create production bundle

2. **Stage 2 (Runtime)**:
   - **API**: Uses `node:22-alpine` with production dependencies
   - **Frontend**: Uses `nginx:alpine` to serve static files

---

## Runtime Process

The runtime environment uses Docker Compose to orchestrate all services.

### Starting the Application

#### Using Latest Images

```bash
cd docker/runtime
docker-compose up -d
```

### Services

The runtime configuration includes:

1. **Database (MariaDB)**
   - Container: `events7-database`
   - Port: `5050`
   - Persistent storage via Docker volume

2. **API (NestJS)**
   - Container: `events7-api`
   - Port: `3000`
   - Connects to database automatically
   - Waits for database health check

3. **Frontend (Angular + Nginx)**
   - Container: `events7-frontend-angular`
   - Port: `5000`
   - Depends on API availability

### Runtime Configuration

Create a `.env` file in `docker/runtime/` to customize:

```env
# Image version
VERSION=1.0.0

# Service ports
API_PORT=3000
FRONTEND_PORT=5000
DATABASE_PORT=5050

# Database configuration
DATABASE_NAME=events7
DATABASE_USERNAME=root
DATABASE_PASSWORD=root

# Environment
NODE_ENV=production
```

### Accessing the Application

Once all services are running:

- **Frontend**: http://localhost (or configured `FRONTEND_PORT`)
- **API**: http://localhost:3000 (or configured `API_PORT`)
- **API Documentation (Swagger)**: http://localhost:3000/api
- **Database**: localhost:5050 (for direct connections)

---

## Extra Information

### Assumptions and Explanations

For role system application checks based on client ip for "roles". Application offers changes of fake role preview.
Mind that application was made with testing and trying new implementations in mind. Therefore it could be improved with additional refinements, better error handling, code organization, and performance optimizations.

### Future Improvements

- Add translations (ngx-translate)
- Implement proper database migrations (TypeORM Synchronize)
- Add CI/CD pipeline
- Add environment-specific configurations (dev, staging, production)
- And many other improvements.
