# Admin Dashboard

This is an admin dashboard application that manages and views reports for multiple NGOs. The app provides login functionality, a dashboard to view statistics, and support for JWT-based authentication.
- To access admin dashboard use Username:AdminUser, Password: Admin@123
## Features

- **User Authentication**: Admin login and logout functionality using JWT (JSON Web Token).
- **Dashboard**: A summary page with visualizations of data from multiple NGOs.
- **Data Visualizations**: Pie charts to show the distribution of data such as the number of people helped, events conducted, and funds utilized by each NGO.
- **Reports**: Ability to filter and view reports by specific months.
- **Protected Routes**: Only authenticated users can access the dashboard and data.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development experience.
- **Axios**: Promise-based HTTP client for making API requests.
- **Recharts**: A charting library for visualizing data.
- **React Router**: A library for managing navigation in the app.
- **React Toastify**: A library for displaying notifications in the UI.
- **Tailwind CSS**: A utility-first CSS framework for styling the frontend.

### Backend
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: NoSQL database to store user and report data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Tokens)**: Authentication system using signed tokens.
- **Bcryptjs**: A library for hashing passwords.
- **Cookie-parser**: Middleware to parse cookies in Express.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing (CORS) between the frontend and backend.

## Setup Instructions

### 1. Clone the Repository

### 2 Navigate to the `frontend` directory:

   Open your terminal and go to the `frontend` directory where the frontend project is located.

   ```bash
   cd frontend
```
Run the following command to install all the necessary packages and dependencies for the frontend project.
```
npm install
```
In the frontend directory, create a .env file and add the following content:
```
VITE_API_URL=http://localhost:5000/api
```
To start the development server and run the frontend, execute the following command:
```
npm run dev
```
### 3 Navigate to the `backend` directory:
 ```bash
   cd backend
```
Run the following command to install all the necessary packages and dependencies for the frontend project.
```
npm install
```
In the backend directory, create a .env file and add the following content:
```
MONGO_URI=your_mongo_connection_string  //eplace your_mongo_connection_string with your actual MongoDB connection string.
JWT_SECRET=your_jwt_secret              //Replace your_jwt_secret with your secret key for generating JWT tokens.
PORT=5000                               //PORT should match the port that the backend server will run on.
FRONTEND_URL=http://localhost:3000      //Set FRONTEND_URL to the frontend URL (default: http://localhost:3000 for local development).
```
To start the backend server in development mode, execute the following command:
```
npm run dev
```
