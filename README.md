# Events7 Application

A full-stack event management application built with Angular, NestJS, and MariaDB in an Nx monorepo.

## Table of Contents

- [Events7 App Info and Description](#events7-app-info-and-description)
- [Development Process](#development-process)
- [Build Process](#build-process)
- [Runtime Process](#runtime-process)
- [Extra Information](#extra-information)

---

## Events7 App Info and Description

Events7 is a monorepo application for managing events, built with modern web technologies:

### Technology Stack

- **Frontend**: Angular 20.3 with PrimeNG UI components
- **Backend**: NestJS 11.0 with Express
- **Database**: MariaDB with TypeORM
- **State Management**: NgRx (Store, Effects, Entity)
- **Styling**: TailwindCSS with PrimeUI
- **Build Tool**: Nx monorepo
- **Containerization**: Docker with multi-stage builds

### Architecture

The project is organized as an Nx monorepo with the following structure:

```
apps/
  ├── api/                    # NestJS backend API
  ├── api-e2e/               # API end-to-end tests
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

- Node.js 20.x
- Yarn package manager
- Docker and Docker Compose (for containerized development)
- MariaDB (for local development without Docker)

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

# Run e2e tests
npx nx e2e api-e2e

# Lint code
npx nx lint api
npx nx lint frontend-angular

# Build for production
npx nx build api
npx nx build frontend-angular

# View dependency graph
npx nx graph
```

### Database Configuration

The API connects to the database using environment variables:

- `DATABASE_HOST` - Database host (default: `127.0.0.1`)
- `DATABASE_PORT` - Database port (default: `5050`)
- `DATABASE_USERNAME` - Database username (default: `root`)
- `DATABASE_PASSWORD` - Database password (default: `root`)
- `DATABASE_NAME` - Database name (default: `events7`)

---

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
   - **API**: Uses `node:20-alpine` with production dependencies
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

#### Using Specific Version

```bash
VERSION=1.0.0 docker-compose up -d
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

### Managing Services

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Restart a specific service
docker-compose restart api
```

### Accessing the Application

Once all services are running:

- **Frontend**: http://localhost (or configured `FRONTEND_PORT`)
- **API**: http://localhost:3000 (or configured `API_PORT`)
- **API Documentation (Swagger)**: http://localhost:3000/api
- **Database**: localhost:5050 (for direct connections)

### Health Checks

The database includes a health check that ensures it's fully initialized before the API starts. This prevents connection errors during startup.

### Data Persistence

Database data is persisted in a Docker volume named `db-data`. This ensures data survives container restarts and updates.

---

## Extra Information

### Assumptions and Explanations

#### Architecture Decisions

1. **Monorepo Approach**
   - **Why**: Enables code sharing between frontend and backend (shared types, entities)
   - **Tool**: Nx provides excellent support for monorepo management
   - **Benefit**: Single source of truth for data models

2. **Multi-Stage Docker Builds**
   - **Why**: Minimize production image size
   - **How**: Build in one stage, run in a minimal runtime stage
   - **Benefit**: API image ~100MB vs ~1GB+ with build tools

3. **Base Build Environment**
   - **Why**: Avoid rebuilding dependencies for each service
   - **How**: Shared base image with all dependencies pre-installed
   - **Benefit**: Faster subsequent builds, consistent build environment

4. **TypeORM Synchronize**
   - **Current**: `synchronize: true` for development convenience
   - **Production**: Should use migrations for schema changes
   - **Note**: This is a development convenience; production should use proper migrations

#### Database Design

- Using MariaDB as it's MySQL-compatible and open source
- TypeORM handles schema synchronization in development
- Entities are defined in `libs/data-repo` for sharing between services

#### Frontend Architecture

- **PrimeNG**: Rich UI component library for professional appearance
- **NgRx**: State management for predictable data flow
- **TailwindCSS**: Utility-first CSS for rapid UI development

#### API Design

- RESTful endpoints following best practices
- Swagger documentation auto-generated from decorators
- Class-validator for request validation
- Class-transformer for DTO transformation

#### Development Workflow

1. Make changes in local development environment
2. Test locally with `nx serve`
3. Build Docker images with version tag
4. Deploy to runtime environment
5. Verify in production-like environment

#### Container Networking

- All services on isolated bridge network (`events7-network`)
- Services communicate by container name (e.g., `http://api:3000`)
- Only necessary ports exposed to host machine

#### Security Considerations

- Database credentials configurable via environment variables
- Production should use secrets management (not `.env` files)
- API should implement authentication/authorization (not included in base setup)
- Frontend should implement route guards and token management

#### Scalability Notes

- API is stateless and can be horizontally scaled
- Database would need replication/clustering for high availability
- Frontend can be served from CDN after build
- Consider adding Redis for caching and sessions

#### Future Improvements

- Add authentication and authorization (JWT, OAuth)
- Implement proper database migrations
- Add CI/CD pipeline
- Add monitoring and logging (Prometheus, Grafana, ELK stack)
- Implement API rate limiting
- Add frontend error boundary and logging
- Implement automated backup for database
- Add environment-specific configurations (dev, staging, production)

### Troubleshooting

#### Common Issues

**Database connection errors:**

- Ensure database container is running: `docker-compose ps`
- Check health status: `docker-compose logs database`
- Verify credentials match in both API and database services

**API won't start:**

- Check if database is healthy: `docker-compose ps`
- View API logs: `docker-compose logs api`
- Verify image was built: `docker images | grep events7-api`

**Frontend can't reach API:**

- Check API is running: `curl http://localhost:3000`
- Verify network configuration
- Check browser console for CORS errors

**Build fails:**

- Ensure base-build-env built successfully first
- Check disk space: `docker system df`
- Clean up old images: `docker system prune`

### Contributing

When making changes:

1. Create a feature branch
2. Make changes and test locally
3. Update tests as needed
4. Build Docker images to verify
5. Update this README if adding new features or changing workflows

### License

MIT

### Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
