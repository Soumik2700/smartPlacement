import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import{collageRoutes, hrRoutes, studentRoutes, tpoRoutes} from './routes/router.js';

dotenv.config();

// MongoDB connection
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.grlrl2e.mongodb.net/smartPlacement`);

const db = mongoose.connection;
const app = express();

// Database connection events
db.on("open", () => {
    console.log("Database connected!");
});

db.on("error", (error) => {
    console.log("Connection unsuccessful!", error);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Routes
collageRoutes(app);
studentRoutes(app);
hrRoutes(app);
tpoRoutes(app)

// Start server
app.listen(5100, () => {
    console.log("Server is running on port 5100!");
});