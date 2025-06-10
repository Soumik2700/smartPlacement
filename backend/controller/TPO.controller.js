import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import TPO from "../model/tpo.model.js";

// Register TPO (Admin only)
export const registerTPO = async (req, res) => {
    try {
        const {
            // Basic details
            name,
            email,
            password,
            phone,
            photo,

            // TPO specific details (optional, will use defaults)
            employeeId,
            designation,
            department,

            // College details (optional)
            collegeName,
            collegeLogo,
            collegeAddress,
            collegeWebsite,
            collegeEstablishedYear,

            // Working hours (optional)
            workingHoursStart,
            workingHoursEnd,
            workingDays,

            // Experience (optional)
            totalYears,
            previousRoles,

            // Permissions (optional)
            permissions
        } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required'
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

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if TPO with email already exists
        const existingTPO = await TPO.findOne({ email: email.toLowerCase() });
        if (existingTPO) {
            return res.status(400).json({
                success: false,
                message: 'TPO with this email already exists'
            });
        }

        // Check if employee ID already exists (if provided)
        if (employeeId) {
            const existingEmployeeId = await TPO.findOne({ employeeId });
            if (existingEmployeeId) {
                return res.status(400).json({
                    success: false,
                    message: 'TPO with this employee ID already exists'
                });
            }
        }

        // Prepare TPO permissions
        const defaultPermissions = {
            canManageStudents: true,
            canManageCompanies: true,
            canManageJobs: true,
            canScheduleInterviews: true,
            canCreateEvents: true,
            canSendAnnouncements: true,
            canViewReports: true,
            canManageAdmins: false
        };

        const tpoPermissions = permissions ? { ...defaultPermissions, ...permissions } : defaultPermissions;

        // Prepare working days
        const defaultWorkingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const tpoWorkingDays = workingDays && Array.isArray(workingDays) ? workingDays : defaultWorkingDays;

        // Generate employee ID if not provided
        const generatedEmployeeId = employeeId || `TPO${Date.now()}`;

        // Create TPO document - DON'T hash password here, let the model handle it
        const newTPO = new TPO({
            // Basic user fields
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password, // Don't hash here - let pre-save middleware handle it
            role: 'tpo',
            phone: phone?.trim() || null,
            photo: photo || null,
            isActive: true,

            // TPO specific fields
            employeeId: generatedEmployeeId,
            designation: designation?.trim() || 'Training & Placement Officer',
            department: department?.trim() || 'Placement Cell',

            // College details
            college: {
                name: collegeName?.trim() || 'Default College',
                logo: collegeLogo || null,
                address: collegeAddress ? {
                    street: collegeAddress.street?.trim() || '',
                    city: collegeAddress.city?.trim() || '',
                    state: collegeAddress.state?.trim() || '',
                    pincode: collegeAddress.pincode?.trim() || ''
                } : {},
                website: collegeWebsite?.trim() || null,
                establishedYear: collegeEstablishedYear || null
            },

            // Permissions
            permissions: tpoPermissions,

            // Working hours
            workingHours: {
                start: workingHoursStart || '09:00',
                end: workingHoursEnd || '17:00',
                workingDays: tpoWorkingDays
            },

            // Experience
            experience: {
                totalYears: totalYears || 0,
                previousRoles: previousRoles && Array.isArray(previousRoles) ? previousRoles.map(role => ({
                    title: role.title?.trim() || '',
                    organization: role.organization?.trim() || '',
                    duration: role.duration?.trim() || '',
                    description: role.description?.trim() || ''
                })) : []
            }
        });

        // Save TPO
        const savedTPO = await newTPO.save();

        // Prepare response data (exclude sensitive information)
        const responseData = {
            id: savedTPO._id,
            name: savedTPO.name,
            email: savedTPO.email,
            phone: savedTPO.phone,
            photo: savedTPO.photo,
            role: savedTPO.role,
            isActive: savedTPO.isActive,
            employeeId: savedTPO.employeeId,
            designation: savedTPO.designation,
            department: savedTPO.department,
            college: savedTPO.college,
            permissions: savedTPO.permissions,
            workingHours: savedTPO.workingHours,
            experience: savedTPO.experience,
            createdAt: savedTPO.createdAt
        };

        res.status(201).json({
            success: true,
            message: 'TPO registered successfully',
            data: responseData
        });

    } catch (error) {
        console.error('TPO registration error:', error);

        // Handle specific MongoDB errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                success: false,
                message: `${field} already exists. Please use a different ${field}.`
            });
        }

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Login TPO
export const loginTPO = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt for:', email); // Debug log

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find TPO
        const tpo = await TPO.findOne({
            email: email.toLowerCase().trim(),
            role: 'tpo',
            isActive: true
        });

        console.log('TPO found:', tpo ? 'Yes' : 'No'); // Debug log

        if (!tpo) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials or account not found'
            });
        }

        // Check password using the model's comparePassword method
        const isPasswordValid = await tpo.comparePassword(password);

        console.log('Password valid:', isPasswordValid); // Debug log

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login
        tpo.lastLogin = new Date();
        await tpo.save();

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: tpo._id,
                role: 'tpo',
                email: tpo.email
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        // Prepare response data (exclude password)
        const responseData = {
            tpo: {
                id: tpo._id,
                name: tpo.name,
                email: tpo.email,
                phone: tpo.phone,
                photo: tpo.photo,
                role: tpo.role,
                isActive: tpo.isActive,
                lastLogin: tpo.lastLogin,
                employeeId: tpo.employeeId,
                designation: tpo.designation,
                department: tpo.department,
                college: tpo.college,
                permissions: tpo.permissions,
                workingHours: tpo.workingHours,
                experience: tpo.experience
            },
            token
        };

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: responseData
        });

    } catch (error) {
        console.error('TPO login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get TPO Profile
export const getTPOProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // From auth middleware

        const tpo = await TPO.findById(userId).select('-password');
        if (!tpo) {
            return res.status(404).json({
                success: false,
                message: 'TPO profile not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: {
                tpo: {
                    id: tpo._id,
                    name: tpo.name,
                    email: tpo.email,
                    phone: tpo.phone,
                    photo: tpo.photo,
                    role: tpo.role,
                    isActive: tpo.isActive,
                    lastLogin: tpo.lastLogin,
                    employeeId: tpo.employeeId,
                    designation: tpo.designation,
                    department: tpo.department,
                    college: tpo.college,
                    permissions: tpo.permissions,
                    workingHours: tpo.workingHours,
                    experience: tpo.experience,
                    createdAt: tpo.createdAt,
                    updatedAt: tpo.updatedAt
                }
            }
        });

    } catch (error) {
        console.error('Get TPO profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get All TPOs (Admin only)
export const getAllTPOs = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, isActive } = req.query;

        // Build filter
        let filter = { role: 'tpo' };

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { employeeId: { $regex: search, $options: 'i' } }
            ];
        }

        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const tpos = await TPO.find(filter)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await TPO.countDocuments(filter);

        res.status(200).json({
            success: true,
            message: 'TPOs retrieved successfully',
            data: {
                tpos,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / parseInt(limit)),
                    totalItems: total,
                    itemsPerPage: parseInt(limit)
                }
            }
        });

    } catch (error) {
        console.error('Get all TPOs error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
