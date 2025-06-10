import Student from '../model/student.model.js';
import College from '../model/college.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerStudent = async (req, res) => {
    try {
        const { name, email, password, studentId, skills } = req.body;

        // Validate required fields
        if (!name || !email || !password || !studentId) {
            return res.status(400).json({ 
                message: 'Name, email, password, and student ID are required' 
            });
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({
            $or: [{ email }, { 'college.registrationId': studentId }]
        });
        if (existingStudent) {
            return res.status(400).json({ 
                message: 'Student already exists with this email or student ID' 
            });
        }

        // Get the single college document
        const college = await College.findOne();
        if (!college) {
            return res.status(404).json({ 
                message: 'College not found. Please contact administrator.' 
            });
        }

        // Check if registration is allowed
        if (!college.portalSettings.allowRegistration) {
            return res.status(403).json({
                message: 'Registration is currently closed'
            });
        }

        // Check registration deadline
        if (college.portalSettings.registrationDeadline && 
            new Date() > college.portalSettings.registrationDeadline) {
            return res.status(403).json({
                message: 'Registration deadline has passed'
            });
        }

        // Find student in valid student IDs
        const validStudent = college.validStudentIds.find(
            student => student.studentId === studentId
        );

        if (!validStudent) {
            return res.status(404).json({
                message: 'Invalid student ID. You are not authorized to register on this portal.'
            });
        }

        // Check if student has already registered
        if (validStudent.isRegistered) {
            return res.status(400).json({
                message: 'This student ID has already been used for registration'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new student
        const student = new Student({
            name,
            email,
            password: hashedPassword,
            college: {
                name: college.name,
                course: validStudent.course,
                branch: validStudent.branch,
                registrationId: studentId,
            },
            skills: skills || []
        });

        await student.save();

        // Mark student as registered in college document
        const studentIndex = college.validStudentIds.findIndex(
            s => s.studentId === studentId
        );
        college.validStudentIds[studentIndex].isRegistered = true;
        college.validStudentIds[studentIndex].registeredAt = new Date();
        college.validStudentIds[studentIndex].email = email;
        await college.save();

        res.status(201).json({
            message: 'Student registered successfully',
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                college: student.college
            }
        });
    } catch (error) {
        console.error('Register student error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { studentId: student._id },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                college: student.college
            }
        });
    } catch (error) {
        console.error('Login student error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

export const getStudentProfile = async (req, res) => {
    try {
        const { id } = req.params;
        
        const student = await Student.findById(id).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ 
            success: true,
            student 
        });
    } catch (error) {
        console.error('Get student profile error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

export const updateStudentProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Remove sensitive fields that shouldn't be updated
        delete updates.password;
        delete updates.email;
        delete updates.college;

        const student = await Student.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            student
        });
    } catch (error) {
        console.error('Update student profile error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            branch, 
            course, 
            placementStatus 
        } = req.query;

        const filter = {};
        if (branch) filter['college.branch'] = branch;
        if (course) filter['college.course'] = course;
        if (placementStatus) filter['placementStatus.status'] = placementStatus;

        const students = await Student.find(filter)
            .select('-password')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Student.countDocuments(filter);

        res.json({
            success: true,
            students,
            pagination: {
                totalPages: Math.ceil(total / limit),
                currentPage: parseInt(page),
                total
            }
        });
    } catch (error) {
        console.error('Get all students error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Placeholder functions for other routes (implement as needed)
export const applyForJob = async (req, res) => {
    res.json({ message: 'Apply for job endpoint - to be implemented' });
};

export const getAppliedJobs = async (req, res) => {
    res.json({ message: 'Get applied jobs endpoint - to be implemented' });
};

export const updatePlacementStatus = async (req, res) => {
    res.json({ message: 'Update placement status endpoint - to be implemented' });
};

export const addNotification = async (req, res) => {
    res.json({ message: 'Add notification endpoint - to be implemented' });
};

export const getNotifications = async (req, res) => {
    res.json({ message: 'Get notifications endpoint - to be implemented' });
};

export const addEvent = async (req, res) => {
    res.json({ message: 'Add event endpoint - to be implemented' });
};

export const getEvents = async (req, res) => {
    res.json({ message: 'Get events endpoint - to be implemented' });
};

export const addCertification = async (req, res) => {
    res.json({ message: 'Add certification endpoint - to be implemented' });
};

export const uploadDocument = async (req, res) => {
    res.json({ message: 'Upload document endpoint - to be implemented' });
};