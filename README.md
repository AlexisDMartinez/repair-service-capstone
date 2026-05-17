# Repair Service Capstone Project

## Overview

This project is a full-stack MERN repair service platform that allows users to register, log in, browse repair services, book repair appointments, manage bookings, and receive AI-generated repair recommendations.

The application was built as a capstone project using MongoDB, Express.js, React, and Node.js.

---

## Features

- User Registration
- User Login Authentication
- Repair Service Listings
- Appointment Booking System
- Dashboard Management
- AI Repair Recommendation Assistant
- MongoDB Atlas Database Integration
- Full MERN Stack Architecture

---

## Technologies Used

### Frontend
- React
- Vite
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

## Installation Instructions

### Backend Setup

cd backend
npm install
npm run dev

### Frontend Setup

cd frontend
npm install
npm run dev

---

## API Routes

### Authentication

- POST /api/auth/register
- POST /api/auth/login

### Services

- GET /api/services

### Bookings

- POST /api/bookings
- GET /api/bookings/my-bookings

### AI Assistant

- POST /api/ai/recommend

---

## AI Feature

The AI Repair Assistant analyzes user-submitted repair issues and generates recommended repair services using keyword-based recommendation logic.

Example:

- Laptop overheating → Computer Repair Service
- Phone screen damage → Phone Screen Replacement

---

## Future Improvements

- OpenAI API integration
- Payment processing
- Technician assignment system
- Email notifications
- Admin dashboard
- Mobile optimization
- Live booking calendar

---

## Author

Your Name
