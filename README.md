# A&S Industrial Service Management Platform

## Project Overview

A&S Industrial is a full-stack industrial service management platform designed to streamline customer service scheduling, appointment management, and project coordination through a modern web-based application experience.
The platform also incorporates an intelligent service recommendation assistant to help users identify the most appropriate industrial service category during the booking workflow.

This project was built as a capstone portfolio application using React.js, Node.js, Express.js, and MongoDB.

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## Key Features

- User registration and login
- JWT authentication
- Browse repair services
- Book repair appointments
- User dashboard
- Intelligent Service Recommendation Assistant
- MongoDB database integration
- Public cloud deployment

---

## Intelligent Service Recommendation Feature

The platform includes an integrated intelligent recommendation feature that evaluates project descriptions and aligns users with the most appropriate industrial service offering.

This feature improves the booking workflow by helping users identify the correct service category before scheduling an appointment.

---


## Security Features

- JWT-based authentication
- Protected frontend routes
- Secure password hashing
- Environment variable protection
- Backend authorization middleware

## Project Architecture

### Architectural Design Principles

- Modular component-based frontend architecture
- Separation of concerns across frontend, backend, middleware, and database layers
- Reusable React components
- Protected route authorization structure
- RESTful API communication
- Non-monolithic application structure

### Presentation Layer
- React.js frontend
- Component-based structure
- Responsive UI design
- React Router navigation

### Application Layer
- Node.js and Express backend
- REST API architecture
- Authentication middleware
- Booking and service management routes

### Data Layer
- MongoDB Atlas database
- Mongoose schema models
- Users, services, and bookings collections

---

## Setup Instructions

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

---

## Deployment Links

### Frontend
https://repair-service-capstone.vercel.app/

### Backend
https://repair-service-backend.onrender.com

### GitHub Repository
https://github.com/AlexisDMartinez/repair-service-capstone

---

## Development Assistance and Tooling

AI-assisted development tools were utilized during implementation, debugging, architectural refinement, and deployment support throughout the project lifecycle.

All functionality and final implementation decisions were reviewed and tested before deployment.


---

## Main Functional Features
- Update and cancel appointments
- Dynamic booking availability validation
- Protected booking management
- Role-based authentication structure

## Modular Application Structure

### Frontend
- Pages separated from reusable UI components
- ProtectedRoute authorization wrapper
- Dedicated booking and dashboard components
- Reusable AI assistant widget
- Centralized route protection using reusable ProtectedRoute components

### Backend
- Express route separation
- Middleware-based authentication
- Modular backend route and middleware structure
- MongoDB model abstraction

### Authentication
- User registration
- User login
- JWT token authentication
- Protected routes

### Service Browsing
- Browse repair services
- View categories and descriptions
- Display estimated pricing and duration

### Booking Management
- Create appointments
- View bookings in dashboard
- Manage appointment information
- Create, update, and cancel booking operations

### Dashboard
- Display user bookings
- Show booking summaries
- Personalized user area

### Intelligent Recommendation Integration
- Intelligent service recommendation workflow
- Project requirement evaluation and service alignment
- Integrated customer booking assistance

---

## Deployment Platforms

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlas

---

## Project Summary

This project demonstrates a modern full-stack industrial service platform focused on secure authentication, appointment scheduling, modular application structure, and intelligent service guidance for users throughout the booking experience.

---

## Author

Alexis D Martinez

Capstone Project – Modular Full-Stack Industrial Service Management Platform
