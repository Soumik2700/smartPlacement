import HR from '../model/hr.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// HR Registration Controller
export const registerHR = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            designation,
            companyName,
            companyLogo,
            contactNumber
        } = req.body;

        // Validation
        if (!name || !email || !password || !designation || !companyName) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, email, password, designation, and companyName'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Password validation (minimum 6 characters)
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if HR already exists
        const existingHR = await HR.findOne({ 'hrProfile.email': email });
        if (existingHR) {
            return res.status(409).json({
                success: false,
                message: 'HR with this email already exists'
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new HR document
        const newHR = new HR({
            hrProfile: {
                name,
                email,
                password: hashedPassword,
                designation,
                companyName,
                companyLogo: companyLogo || '',
                contactNumber: contactNumber || ''
            },
            jobPosts: [],
            interviews: [],
            notifications: [],
            summary: {
                totalJobs: 0,
                totalApplicants: 0,
                shortlistedCount: 0,
                selectedCount: 0
            }
        });

        // Save HR to database
        const savedHR = await newHR.save();

        // Remove password from response
        const hrResponse = {
            _id: savedHR._id,
            hrProfile: {
                name: savedHR.hrProfile.name,
                email: savedHR.hrProfile.email,
                designation: savedHR.hrProfile.designation,
                companyName: savedHR.hrProfile.companyName,
                companyLogo: savedHR.hrProfile.companyLogo,
                contactNumber: savedHR.hrProfile.contactNumber
            },
            summary: savedHR.summary
        };

        res.status(201).json({
            success: true,
            message: 'HR registered successfully. Please login to continue.',
            data: {
                hr: hrResponse
            }
        });

    } catch (error) {
        console.error('HR Registration Error:', error);

        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: validationErrors
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'HR with this email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error during HR registration',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// HR Login Controller
export const loginHR = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find HR by email
        const hr = await HR.findOne({ 'hrProfile.email': email });
        if (!hr) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, hr.hrProfile.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                hrId: hr._id,
                email: hr.hrProfile.email,
                role: 'HR'
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        // Remove password from response
        const hrResponse = {
            _id: hr._id,
            hrProfile: {
                name: hr.hrProfile.name,
                email: hr.hrProfile.email,
                designation: hr.hrProfile.designation,
                companyName: hr.hrProfile.companyName,
                companyLogo: hr.hrProfile.companyLogo,
                contactNumber: hr.hrProfile.contactNumber
            },
            summary: hr.summary
        };

        res.status(200).json({
            success: true,
            message: 'HR logged in successfully',
            data: {
                hr: hrResponse,
                token
            }
        });

    } catch (error) {
        console.error('HR Login Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during HR login',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
