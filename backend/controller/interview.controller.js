import HR from "../model/hr.model.js";

// Schedule Interview Controller
export const scheduleInterview = async (req, res) => {
    try {
        const { hrId } = req.params;
        const {
            jobPostId,
            studentId,
            applicationId,
            interviewDetails
        } = req.body;

        // Validate required fields
        if (!jobPostId || !studentId || !interviewDetails) {
            return res.status(400).json({
                success: false,
                message: 'Job post ID, student ID, and interview details are required'
            });
        }

        // Validate interview details
        const {
            round,
            date,
            time,
            mode,
            location,
            panel,
            instructions,
            duration
        } = interviewDetails;

        if (!round || !date || !time || !mode) {
            return res.status(400).json({
                success: false,
                message: 'Round, date, time, and mode are required in interview details'
            });
        }

        // Validate mode
        if (!['Online', 'Offline', 'Phone'].includes(mode)) {
            return res.status(400).json({
                success: false,
                message: 'Mode must be Online, Offline, or Phone'
            });
        }

        // Find HR to get company ID
        const hr = await HR.findById(hrId);
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        // Verify job post exists in HR's job posts
        const jobPost = hr.jobPosts.id(jobPostId);
        if (!jobPost) {
            return res.status(404).json({
                success: false,
                message: 'Job post not found'
            });
        }

        // Check if student has applied for this job
        const hasApplied = jobPost.applicants.some(applicant =>
            applicant.toString() === studentId
        );

        if (!hasApplied) {
            return res.status(400).json({
                success: false,
                message: 'Student has not applied for this job post'
            });
        }

        // Create new interview object
        const newInterview = {
            student: studentId, // This will be populated with student name in frontend
            studentId: studentId,
            jobPost: jobPost.role,
            jobPostId: jobPostId,
            date: new Date(date).toISOString().split('T')[0], // Format as YYYY-MM-DD
            time: time,
            mode: mode,
            meetingLink: mode === 'Online' ? location : '',
            location: mode === 'Offline' ? location : '',
            panel: Array.isArray(panel) ? panel : (panel ? [panel] : []),
            instructions: instructions || '',
            duration: duration || 60,
            status: 'Scheduled',
            feedback: '',
            scheduledBy: hrId,
            scheduledAt: new Date()
        };

        // Add interview to HR's interviews array
        hr.interviews.push(newInterview);

        // Add notification about scheduled interview
        const notification = {
            message: `Interview scheduled for ${jobPost.role} position on ${new Date(date).toLocaleDateString()}`,
            type: 'Interview Scheduled',
            date: new Date().toISOString().split('T')[0],
            relatedTo: {
                type: 'Interview',
                id: hr.interviews[hr.interviews.length - 1]._id
            }
        };

        hr.notifications.push(notification);

        await hr.save();

        // Get the newly created interview
        const scheduledInterview = hr.interviews[hr.interviews.length - 1];

        res.status(201).json({
            success: true,
            message: 'Interview scheduled successfully',
            data: {
                interview: scheduledInterview,
                notification: notification
            }
        });

    } catch (error) {
        console.error('Error scheduling interview:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: validationErrors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error while scheduling interview',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all interviews for a specific HR
export const getInterviewsByHR = async (req, res) => {
    try {
        const { hrId } = req.params;
        const { status, date, jobPostId } = req.query;

        const hr = await HR.findById(hrId);
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        let interviews = hr.interviews;

        // Filter by status if provided
        if (status) {
            interviews = interviews.filter(interview => interview.status === status);
        }

        // Filter by date if provided
        if (date) {
            interviews = interviews.filter(interview =>
                interview.date === date
            );
        }

        // Filter by job post if provided
        if (jobPostId) {
            interviews = interviews.filter(interview =>
                interview.jobPostId && interview.jobPostId.toString() === jobPostId
            );
        }

        res.status(200).json({
            success: true,
            message: 'Interviews retrieved successfully',
            data: {
                interviews,
                totalCount: interviews.length
            }
        });

    } catch (error) {
        console.error('Error fetching interviews:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update interview status
export const updateInterviewStatus = async (req, res) => {
    try {
        const { hrId, interviewId } = req.params;
        const { status, feedback } = req.body;

        // Validate status
        if (!['Scheduled', 'Rescheduled', 'Completed', 'Cancelled', 'No Show'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const hr = await HR.findById(hrId);
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        const interview = hr.interviews.id(interviewId);
        if (!interview) {
            return res.status(404).json({
                success: false,
                message: 'Interview not found'
            });
        }

        interview.status = status;
        if (feedback) {
            interview.feedback = feedback;
        }

        await hr.save();

        res.status(200).json({
            success: true,
            message: 'Interview status updated successfully',
            data: { interview }
        });

    } catch (error) {
        console.error('Error updating interview status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
