# EN2H Booking Platform REST API

A production-ready Backend REST API built using **NestJS**, **TypeScript**, and **PostgreSQL** that allows users to manage services and handles public customer bookings securely with business rules enforcement.

## 🌐 Live Application
- **Live Swagger API Documentation:** [https://en2h-booking-platform.onrender.com/api](https://en2h-booking-platform.onrender.com/api)

---

## 🚀 Features Implemented
- **JWT Authentication:** Secure user registration and login endpoints using password hashing via `bcrypt`.
- **Service Management (CRUD):** Complete control over services (Create, Read, Update, Delete) strictly protected by an `AuthGuard`.
- **Booking Management:** Publicly accessible booking creations embedded with robust business logic validation.
- **Global Exception Filter:** Standardized JSON error response formatting across the entire application.
- **Data Validation:** Seamless DTO validation using `class-validator` and `class-transformer`.
- **Bonus Features Implemented:**
  - Complete **Swagger UI** integration for interactive testing.
  - **Docker Support** with custom multi-stage `Dockerfile` and `docker-compose.yml`.
  - **Search, Filter & Pagination** on the bookings endpoint.
  - Double booking mitigation strategy (preventing duplicate time slots for the same service).

---

## 🛠️ Tech Stack
- **Framework:** NestJS (v10+)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Containerization:** Docker

---

## ⚙️ Environment Variables
Create a `.env` file in the root directory and configure the following parameters (Refer to `.env.example`):

env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=en2h_booking_db
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1d

---

Getting Started & Installation Steps
Prerequisites
Make sure you have Node.js (v20+) and PostgreSQL installed locally, or Docker running.

1. Local Setup Without Docker
# Clone the repository
git clone <your-repository-url>
cd en2h-booking-platform

# Install dependencies
npm install

# Create local PostgreSQL Database
# Run your postgres instance and create a database named 'en2h_booking_db'

# Configure your environment variables
cp .env.example .env

# Run the application in development mode (Database tables will auto-sync)
npm run start:dev

Once started, the API will be available at http://localhost:3000 and Swagger UI at http://localhost:3000/api.


2. Run via Docker (Recommended)
With Docker installed, you can spin up both the NestJS server and the PostgreSQL database container seamlessly with a single command:
docker-compose up --build



Assumptions Made
Dynamic DB Synced: Used synchronize: true in development for schema generation as migrations are traditionally handled by infrastructure operators via CI/CD pipelines in production.

Public Bookings: Customers do not require an account or authentication to register a booking slot, fitting real-world service requirements.

Time Slot Constraints: Duplicates are checked based on exact matches of serviceId, bookingDate, and bookingTime.



Future Improvements
Refresh Token Lifecycle: To ensure smooth UI session lifetimes without prompt expirations.

Unit & Integration Testing: Expanding code coverage using Jest for critical service blocks.

Dynamic Scheduling: Checking available intervals by operating hours rather than exact hour/minute text matching.
