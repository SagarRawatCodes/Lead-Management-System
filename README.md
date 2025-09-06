Lead Management System
A full-stack lead management system built with the MERN stack (MongoDB, Express, React, Node.js) and Vite, designed to help businesses track and manage potential customers efficiently. The application features a clean, professional, and component-based user interface styled with Tailwind CSS.

Features
Dashboard Overview: At-a-glance analytics of key metrics like total leads, new leads, and conversion rate.

Lead Tracking: A comprehensive table view to see all leads with their status, contact information, and source.

CRUD Operations: Full functionality to Create, Read, Update, and Delete leads through a user-friendly modal interface.

Advanced Filtering: Search and filter leads by name, email, or status to quickly find the information you need.

Component-Based Architecture: The frontend is built with a professional, scalable structure, making it easy to maintain and expand.

RESTful API: A robust backend built with Node.js and Express to handle all data operations securely and efficiently.

Tech Stack
Frontend: React, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

API Communication: Axios

Project Structure
The project is organized into two main directories: frontend and backend, allowing for a clear separation of concerns.

lead-management-system/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   ├── dashboard/
    │   │   ├── layout/
    │   │   ├── leads/
    │   │   └── pages/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

Setup and Installation
To get this project running on your local machine, follow these steps.

Prerequisites
Node.js (v20.19+ or higher recommended, though older versions may work with downgraded packages)

MongoDB installed and running locally.

1. Backend Setup
First, navigate to the backend directory and install the necessary dependencies.

cd backend
npm install

Once the installation is complete, start the backend server.

npm run dev

The server will start on http://localhost:5000 and connect to your local MongoDB instance.

2. Frontend Setup
Next, open a new terminal window, navigate to the frontend directory, and install its dependencies.

cd frontend
npm install

After the installation, start the frontend development server.

npm run dev

The application will be available at http://localhost:5173 (or another port if 5173 is in use).

You can now access the application in your browser and start managing your leads!

This project was developed as part of an assignment from Civil Guruji.