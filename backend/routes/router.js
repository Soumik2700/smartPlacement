import express from "express";
import {
    initializeCollege,
    getCollegeInfo,
    validateStudentId,
    markStudentRegistered,
    addValidStudentIds,
    getAllValidStudents,
    updateCollegeSettings,
    toggleRegistration,
    removeStudentId,
    updateRegistrationDeadline,
    getRegistrationDeadline
} from '../controller/college.controller.js';

import {
    registerStudent,
    loginStudent,
    getStudentProfile,
    updateStudentProfile,
    applyForJob,
    getAppliedJobs,
    updatePlacementStatus,
    addNotification,
    getNotifications,
    addEvent,
    getEvents,
    addCertification,
    uploadDocument,
    getAllStudents
} from '../controller/student.controller.js';
import { loginHR, registerHR } from "../controller/hr.controller.js";

const app = express();

// Health check route
app.get('/health', (req, res) => {
    res.json({
        message: 'Smart Placement API is running',
        timestamp: new Date().toISOString()
    });
});

// ==================== COLLEGE ROUTES ====================
export function collageRoutes(app) {
    // Initialize college (run once during setup)
    app.post('/college/initialize', initializeCollege);

    // Get college information
    app.get('/college', getCollegeInfo);

    // Validate student ID before registration
    app.post('/college/validate-student', validateStudentId);

    // Mark student as registered (called after successful student registration)
    app.post('/college/mark-registered', markStudentRegistered);

    // Add valid student IDs (bulk upload)
    app.post('/college/valid-students', addValidStudentIds);

    // Get all valid students with filters
    app.get('/college/valid-students', getAllValidStudents);

    // Update college settings
    app.put('/college/settings', updateCollegeSettings);

    // Toggle registration on/off
    app.put('/college/registration-toggle', toggleRegistration);

    // Update registration deadline
    app.put('/college/registration-deadline', updateRegistrationDeadline);

    // Get registration deadline
    app.get('/college/registration-deadline', getRegistrationDeadline);

    // Remove a valid student ID
    app.delete('/college/valid-students/:studentId', removeStudentId);
}

// ==================== STUDENT ROUTES ====================
export function studentRoutes(app) {
    app.post('/students/register', registerStudent);
    app.post('/students/login', loginStudent);
    app.get('/students/profile/:id', getStudentProfile);
    app.put('/students/profile', updateStudentProfile);
    app.post('/students/apply-job', applyForJob);
    app.get('/students/applied-jobs', getAppliedJobs);
    app.put('/students/placement-status', updatePlacementStatus);
    app.post('/students/notifications', addNotification);
    app.get('/students/notifications', getNotifications);
    app.post('/students/events', addEvent);
    app.get('/students/events', getEvents);
    app.post('/students/certifications', addCertification);
    app.post('/students/documents', uploadDocument);
    app.get('/students/all', getAllStudents);
}

export function hrRoutes(app) {
    app.post('/hr/register', registerHR);
    app.post("/hr/login", loginHR)
}