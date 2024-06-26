﻿# Fluid_AI_Tasks_Assignment

## Task Management System

### Introduction

Welcome to the Task Management System documentation! This application provides functionality for managing tasks with user authentication. It allows users to register, login, create, update, delete tasks, and view tasks based on their authentication status.

### Project Type

Backend

### Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- node-cron for scheduling tasks

### Installation and Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up MongoDB and configure the connection string in `config/db.js`.
4. Generate JWT secret key and update it in the authentication middleware (`Middlewares/auth.middleware.js`).
5. Run the server using `npm run server/node index.js`.

### API Endpoints

#### Users

- **POST /users/register**
  - Description: Register a new user.
  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **POST /users/login**
  - Description: Login an existing user.
  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Authentication Middleware**: All endpoints under `/tasks` require authentication. JWT token should be included in the Authorization header as "Bearer <token>".

#### Tasks

- **POST /tasks/create**
  - Description: Create a new task.
  - Authentication: Required
  - Request Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "duedate": "string (format: YYYY-MM-DDTHH:MM:SSZ)"
    }
    ```
- **GET /tasks/**
  - Description: Get all tasks.
  - Authentication: Required
- **GET /tasks/:taskID**
  - Description: Get a single task by ID.
  - Authentication: Required
- **PATCH /tasks/:taskID**
  - Description: Update a task by ID.
  - Authentication: Required
  - Request Body: (Fields to update)
    ```json
    {
      "title": "string",
      "description": "string",
      "duedate": "string (format: YYYY-MM-DDTHH:MM:SSZ)",
      "priority": "number",
      "status": "string"
    }
    ```
- **DELETE /tasks/:taskID**
  - Description: Delete a task by ID.
  - Authentication: Required

### Scheduled Tasks

- A cron job is scheduled to update task priorities based on due dates. This runs daily at midnight.

### Server Information

- The server is running on a dynamic port configured via the `.env` file.
- Connected to MongoDB database.

### Testing

For testing the Task Management System, I have provided unit tests using the Mocha framework. You can run these tests to ensure the correctness of the application functionalities.

To run the tests, execute the following command:

```bash
npm run test

### Server Information

- The server is running on a dynamic port configured via the `.env` file.
- Connected to MongoDB database.

### Contributors

- Vishnuraj K R
```
