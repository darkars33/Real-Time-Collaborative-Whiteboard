# Real-Time Collaborative Whiteboard

## Overview

The Real-Time Collaborative Whiteboard project is a web application that allows multiple users to collaborate on a digital whiteboard in real time. It uses:

- **React.js with Vite** for the frontend
- **Node.js with Express** for the backend
- **Keycloak** for authentication via Docker

## Project Structure

The repository contains two main folders:

- `frontend`: Contains the React.js application built with Vite.
- `backend`: Contains the Node.js and Express.js backend server.

## Getting Started

### Prerequisites

- Docker (for Keycloak and local development)
- Node.js (for backend development)
- npm or yarn (for managing frontend and backend dependencies)

### Setup Keycloak with Docker

1. **Create a `docker-compose.yml` file** (if not already provided):

   ```yaml
   version: '3.8'
   
   services:
     keycloak:
       image: quay.io/keycloak/keycloak:15.0.2
       container_name: keycloak
       environment:
         - KEYCLOAK_USER=admin
         - KEYCLOAK_PASSWORD=admin
         - DB_VENDOR=h2
       ports:
         - "8080:8080"
    ```
   
2. Start Keycloak:

   ```bash
   docker-compose up
   ```
Keycloak will be accessible at http://localhost:8080.

3. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
4. Install dependencies:

     ```bash
     npm install
     ```
5. Start the frontend application:
     ```bash
     npm run dev
      ```
6.Navigate to the backend directory:
    ```bash
    cd backend
    ```
7.Install dependencies:

  ```bash
  npm install
  ```

8.Start the backend server:

  ```bash
  npm run dev
  ```   
