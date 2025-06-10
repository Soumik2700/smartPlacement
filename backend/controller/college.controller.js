import College from '../model/college.model.js';

// Initialize college (Admin setup - run once)
export const initializeCollege = async (req, res) => {
    try {
        const collegeData = req.body;
        
        // Check if college already exists
        const existingCollege = await College.findOne();
        if (existingCollege) {
            return res.status(400).json({ 
                message: 'College already initialized. Use update endpoint to modify.' 
            });
        }

        const college = new College(collegeData);
        await college.save();

        res.status(201).json({
            message: 'College initialized successfully',
            college: {
                id: college._id,
                name: college.name,
                code: college.code,
                totalValidStudents: college.validStudentIds.length
            }
        });
    } catch (error) {
        console.error('Initialize college error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Get college information
export const getCollegeInfo = async (req, res) => {
    try {
        const college = await College.findOne().select('-validStudentIds');
        
        if (!college) {
            return res.status(404).json({ 
                message: 'College not found. Please initialize college first.' 
            });
        }

        const totalStudents = await College.aggregate([
            { $unwind: '$validStudentIds' },
            { $group: { 
                _id: null, 
                total: { $sum: 1 },
                registered: { $sum: { $cond: ['$validStudentIds.isRegistered', 1, 0] } }
            }}
        ]);

        const stats = totalStudents[0] || { total: 0, registered: 0 };

        res.json({
            success: true,
            college: {
                ...college.toObject(),
                studentStats: {
                    totalValidStudents: stats.total,
                    registeredStudents: stats.registered,
                    pendingRegistrations: stats.total - stats.registered
                }
            }
        });
    } catch (error) {
        console.error('Get college info error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Validate student ID for registration
export const validateStudentId = async (req, res) => {
    try {
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({
                message: 'Student ID is required',
                isValid: false
            });
        }

        const college = await College.findOne();
        if (!college) {
            return res.status(404).json({
                message: 'College not found',
                isValid: false
            });
        }

        // Check if registration is allowed
        if (!college.portalSettings.allowRegistration) {
            return res.status(403).json({
                message: 'Registration is currently closed',
                isValid: false
            });
        }

        // Check registration deadline
        if (college.portalSettings.registrationDeadline && 
            new Date() > college.portalSettings.registrationDeadline) {
            return res.status(403).json({
                message: 'Registration deadline has passed',
                isValid: false
            });
        }

        // Find student in valid student IDs
        const validStudent = college.validStudentIds.find(
            student => student.studentId === studentId
        );

        if (!validStudent) {
            return res.status(404).json({
                message: 'Invalid student ID. You are not authorized to register.',
                isValid: false
            });
        }

        // Check if student has already registered
        if (validStudent.isRegistered) {
            return res.status(400).json({
                message: 'Student has already registered on the portal',
                isValid: false
            });
        }

        res.json({
            message: 'Valid student ID',
            isValid: true,
            studentInfo: {
                name: validStudent.name,
                course: validStudent.course,
                branch: validStudent.branch,
                passingYear: validStudent.passingYear,
                email: validStudent.email || ''
            },
            collegeInfo: {
                name: college.name,
                code: college.code
            }
        });
    } catch (error) {
        console.error('Validate student ID error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Mark student as registered (called after successful registration)
export const markStudentRegistered = async (req, res) => {
    try {
        const { studentId, email } = req.body;

        const college = await College.findOne();
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        const studentIndex = college.validStudentIds.findIndex(
            student => student.studentId === studentId
        );

        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Mark as registered
        college.validStudentIds[studentIndex].isRegistered = true;
        college.validStudentIds[studentIndex].registeredAt = new Date();
        if (email) {
            college.validStudentIds[studentIndex].email = email;
        }

        await college.save();

        res.json({
            message: 'Student marked as registered successfully'
        });
    } catch (error) {
        console.error('Mark student registered error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Add valid student IDs (Bulk upload)
export const addValidStudentIds = async (req, res) => {
    try {
        const { students } = req.body; // Array of student objects

        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({
                message: 'Students array is required'
            });
        }

        const college = await College.findOne();
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        const results = {
            added: [],
            duplicates: [],
            errors: []
        };

        for (let i = 0; i < students.length; i++) {
            try {
                const studentData = students[i];
                
                // Validate required fields
                if (!studentData.studentId || !studentData.name) {
                    results.errors.push({
                        index: i,
                        data: studentData,
                        error: 'Student ID and name are required'
                    });
                    continue;
                }

                // Check for duplicates
                const existingStudent = college.validStudentIds.find(
                    s => s.studentId === studentData.studentId
                );

                if (existingStudent) {
                    results.duplicates.push({
                        index: i,
                        studentId: studentData.studentId,
                        name: studentData.name
                    });
                    continue;
                }

                // Add student
                college.validStudentIds.push({
                    studentId: studentData.studentId,
                    name: studentData.name,
                    course: studentData.course || '',
                    branch: studentData.branch || '',
                    passingYear: studentData.passingYear || new Date().getFullYear(),
                    email: studentData.email || ''
                });

                results.added.push(studentData);
            } catch (error) {
                results.errors.push({
                    index: i,
                    data: students[i],
                    error: error.message
                });
            }
        }

        await college.save();

        res.json({
            message: 'Student IDs processing completed',
            results: {
                totalProcessed: students.length,
                added: results.added.length,
                duplicates: results.duplicates.length,
                errors: results.errors.length,
                details: results
            }
        });
    } catch (error) {
        console.error('Add valid student IDs error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Get all valid students (Admin)
export const getAllValidStudents = async (req, res) => {
    try {
        const { page = 1, limit = 50, registered, course, branch } = req.query;

        const college = await College.findOne();
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        let students = college.validStudentIds;

        // Apply filters
        if (registered !== undefined) {
            const isRegistered = registered === 'true';
            students = students.filter(s => s.isRegistered === isRegistered);
        }

        if (course) {
            students = students.filter(s => s.course === course);
        }

        if (branch) {
            students = students.filter(s => s.branch === branch);
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedStudents = students.slice(startIndex, endIndex);

        res.json({
            success: true,
            students: paginatedStudents,
            pagination: {
                total: students.length,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(students.length / limit)
            }
        });
    } catch (error) {
        console.error('Get all valid students error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Update college settings
export const updateCollegeSettings = async (req, res) => {
    try {
        const updates = req.body;

        const college = await College.findOneAndUpdate(
            {},
            updates,
            { new: true, runValidators: true }
        );

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.json({
            message: 'College settings updated successfully',
            college
        });
    } catch (error) {
        console.error('Update college settings error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Toggle registration status
export const toggleRegistration = async (req, res) => {
    try {
        const { allowRegistration } = req.body;

        const college = await College.findOneAndUpdate(
            {},
            { 'portalSettings.allowRegistration': allowRegistration },
            { new: true }
        );

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.json({
            message: `Registration ${allowRegistration ? 'enabled' : 'disabled'} successfully`,
            allowRegistration: college.portalSettings.allowRegistration
        });
    } catch (error) {
        console.error('Toggle registration error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Remove student ID (Admin)
export const removeStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        const college = await College.findOne();
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        const studentIndex = college.validStudentIds.findIndex(
            s => s.studentId === studentId
        );

        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student ID not found' });
        }

        const removedStudent = college.validStudentIds[studentIndex];
        college.validStudentIds.splice(studentIndex, 1);
        await college.save();

        res.json({
            message: 'Student ID removed successfully',
            removedStudent: {
                studentId: removedStudent.studentId,
                name: removedStudent.name
            }
        });
    } catch (error) {
        console.error('Remove student ID error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Update registration deadline
export const updateRegistrationDeadline = async (req, res) => {
    try {
        const { registrationDeadline } = req.body;

        // Validate the deadline
        if (!registrationDeadline) {
            return res.status(400).json({
                message: 'Registration deadline is required'
            });
        }

        // Validate date format
        const deadlineDate = new Date(registrationDeadline);
        if (isNaN(deadlineDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid date format. Please use ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)'
            });
        }

        // Check if deadline is in the future
        if (deadlineDate <= new Date()) {
            return res.status(400).json({
                message: 'Registration deadline must be in the future'
            });
        }

        // Find and update the college
        const college = await College.findOneAndUpdate(
            {},
            { 'portalSettings.registrationDeadline': deadlineDate },
            { new: true }
        );

        if (!college) {
            return res.status(404).json({
                message: 'College not found. Please initialize college first.'
            });
        }

        res.json({
            message: 'Registration deadline updated successfully',
            registrationDeadline: college.portalSettings.registrationDeadline,
            formattedDeadline: deadlineDate.toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        });
    } catch (error) {
        console.error('Update registration deadline error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Get registration deadline (bonus function)
export const getRegistrationDeadline = async (req, res) => {
    try {
        const college = await College.findOne().select('portalSettings.registrationDeadline portalSettings.allowRegistration');
        
        if (!college) {
            return res.status(404).json({
                message: 'College not found'
            });
        }

        const deadline = college.portalSettings.registrationDeadline;
        const isExpired = deadline ? new Date() > deadline : false;
        const timeRemaining = deadline ? deadline.getTime() - new Date().getTime() : null;

        res.json({
            success: true,
            registrationDeadline: deadline,
            allowRegistration: college.portalSettings.allowRegistration,
            isExpired,
            timeRemaining: timeRemaining > 0 ? timeRemaining : 0,
            formattedDeadline: deadline ? deadline.toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : null
        });
    } catch (error) {
        console.error('Get registration deadline error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
