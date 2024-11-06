# User Management System Backend

This is a backend REST API for a User Management System built using Express.js with Javascru=ipt and PostgreSQL with Docker.

## Features

- Admin registration and login with JWT authentication
- Admin can manage sub-users (create, view)
- Sub-user login with JWT authentication
- Sub-users can view their own profile information

## Tech Stack

- Express.js (Javascript)
- PostgreSQL
- JWT authentication
- bcrypt for password hashing
- Docker for PostgreSQL containerization

## Getting Started

1. Clone the repository:

   ```bash
   
   git clone https://github.com/mehraankush/dgenius-enterprises.git
   cd dgenius-enterprises

   npm install

   start the demon first 
   // start the docker config 
   docker compose up -d
   // for loading the schema
   docker exec -i your_container_id psql -U admin -d user_management < src/schema/init.sql

   npm run dev
   ```

   .ENV
   
   ```bash
       DB_USER=admin
       DB_PASSWORD=password123
       DB_NAME=user_management
       DB_HOST=localhost
       DB_PORT=5432
       JWT_SECRET=Dgenius_Enterprises
       PORT=3000
   ```


# API Endpoints

## Admin Operations

- **POST** `/api/admin/register`: Register a new admin.
- **POST** `/api/admin/login`: Log in as an admin and receive a JWT token.
- **GET** `/api/admin/sub-users`: Get all sub-users under the logged-in admin.
- **POST** `/api/admin/sub-users`: Create a new sub-user under the logged-in admin.

## Sub-user Operations

- **POST** `/api/sub-user/login`: Log in as a sub-user and receive a JWT token.
- **GET** `/api/sub-user/profile`: Get the profile information of the logged-in sub-user.
