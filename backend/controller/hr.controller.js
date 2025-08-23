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

// Get all HRs (for admin/TPO to manage)
export const getAllHRs = async (req, res) => {
    try {
        const { status, companyName, page = 1, limit = 10 } = req.query;

        // Build filter object
        let filter = {};

        if (companyName) {
            filter['hrProfile.companyName'] = { $regex: companyName, $options: 'i' };
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Find HRs with filters and pagination
        const hrs = await HR.find(filter)
            .select('-hrProfile.password') // Exclude password from response
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ 'hrProfile.companyName': 1 }); // Sort by company name

        // Get total count for pagination
        const totalCount = await HR.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / parseInt(limit));

        // Format response data
        const formattedHRs = hrs.map(hr => ({
            _id: hr._id,
            name: hr.hrProfile.name,
            email: hr.hrProfile.email,
            designation: hr.hrProfile.designation,
            companyName: hr.hrProfile.companyName,
            companyLogo: hr.hrProfile.companyLogo,
            contactNumber: hr.hrProfile.contactNumber,
            totalJobs: hr.summary.totalJobs,
            totalApplicants: hr.summary.totalApplicants,
            shortlistedCount: hr.summary.shortlistedCount,
            selectedCount: hr.summary.selectedCount,
            activeJobs: hr.jobPosts.filter(job => job.status === 'Active').length,
            pendingApprovalJobs: hr.jobPosts.filter(job => !job.hasApproved).length
        }));

        res.status(200).json({
            success: true,
            message: 'HRs retrieved successfully',
            data: {
                hrs: formattedHRs,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalCount,
                    hasNextPage: parseInt(page) < totalPages,
                    hasPrevPage: parseInt(page) > 1
                }
            }
        });

    } catch (error) {
        console.error('Error fetching HRs:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


// Create a new job post
export const createJobPost = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(hrId);
        const {
            role,
            requiredSkills,
            ctc,
            location,
            eligibilityCriteria,
            applicationDeadline
        } = req.body;

        // Validate required fields
        if (!role || !requiredSkills || !ctc || !location) {
            return res.status(400).json({
                success: false,
                message: 'Role, required skills, CTC, and location are required'
            });
        }

        // Find HR by ID
        const hr = await HR.findById(id);
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        // Create new job post object
        const newJobPost = {
            role,
            requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [requiredSkills],
            ctc,
            location,
            eligibilityCriteria: eligibilityCriteria || {},
            applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
            status: 'Draft',
            hasApproved: false,
            applicants: []
        };

        // Add job post to HR's jobPosts array
        hr.jobPosts.push(newJobPost);

        // Update summary
        hr.summary.totalJobs = hr.jobPosts.length;

        await hr.save();

        res.status(201).json({
            success: true,
            message: 'Job post created successfully',
            data: {
                jobPost: hr.jobPosts[hr.jobPosts.length - 1],
                totalJobs: hr.summary.totalJobs
            }
        });

    } catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

//Get hr Details
export const getHRDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const hr = await HR.findById(id).select('-hrProfile.password'); // Exclude password from response
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'HR details retrieved successfully',
            data: hr
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        })
    }
}

// Get all job posts for a specific HR
export const getJobPostsByHR = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, hasApproved } = req.query;

        const hr = await HR.findById(id).populate('jobPosts.applicants', 'name email');
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        let jobPosts = hr.jobPosts;

        // Filter by status if provided
        if (status) {
            jobPosts = jobPosts.filter(job => job.status === status);
        }

        // Filter by approval status if provided
        if (hasApproved !== undefined) {
            jobPosts = jobPosts.filter(job => job.hasApproved === (hasApproved === 'true'));
        }

        res.status(200).json({
            success: true,
            message: 'Job posts retrieved successfully',
            data: {
                jobPosts,
                totalCount: jobPosts.length
            }
        });

    } catch (error) {
        console.error('Error fetching job posts:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get a specific job post
export const getJobPostById = async (req, res) => {
    try {
        const { hrId, jobPostId } = req.params;

        const hr = await HR.findById(hrId).populate('jobPosts.applicants', 'name email contactNumber');
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        const jobPost = hr.jobPosts.id(jobPostId);
        if (!jobPost) {
            return res.status(404).json({
                success: false,
                message: 'Job post not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Job post retrieved successfully',
            data: { jobPost }
        });

    } catch (error) {
        console.error('Error fetching job post:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update a job post
export const updateJobPost = async (req, res) => {
    try {
        const { hrId, jobPostId } = req.params;
        const updateData = req.body;

        const hr = await HR.findById(hrId);
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        const jobPost = hr.jobPosts.id(jobPostId);
        if (!jobPost) {
            return res.status(404).json({
                success: false,
                message: 'Job post not found'
            });
        }

        // Update job post fields
        Object.keys(updateData).forEach(key => {
            if (key === 'requiredSkills' && updateData[key]) {
                jobPost[key] = Array.isArray(updateData[key]) ? updateData[key] : [updateData[key]];
            } else if (key === 'applicationDeadline' && updateData[key]) {
                jobPost[key] = new Date(updateData[key]);
            } else if (updateData[key] !== undefined) {
                jobPost[key] = updateData[key];
            }
        });

        await hr.save();

        res.status(200).json({
            success: true,
            message: 'Job post updated successfully',
            data: { jobPost }
        });

    } catch (error) {
        console.error('Error updating job post:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Delete a job post
export const deleteJobPost = async (req, res) => {
    try {
        const { hrId, jobPostId } = req.params;

        const hr = await HR.findById(hrId);
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        const jobPostIndex = hr.jobPosts.findIndex(job => job._id.toString() === jobPostId);
        if (jobPostIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Job post not found'
            });
        }

        // Remove the job post
        hr.jobPosts.splice(jobPostIndex, 1);

        // Update summary
        hr.summary.totalJobs = hr.jobPosts.length;

        await hr.save();

        res.status(200).json({
            success: true,
            message: 'Job post deleted successfully',
            data: { totalJobs: hr.summary.totalJobs }
        });

    } catch (error) {
        console.error('Error deleting job post:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update job post status
export const updateJobPostStatus = async (req, res) => {
    try {
        const { hrId, jobPostId } = req.params;
        const { status } = req.body;

        if (!['Active', 'Expired', 'Draft'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be Active, Expired, or Draft'
            });
        }

        const hr = await HR.findById(hrId);
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        const jobPost = hr.jobPosts.id(jobPostId);
        if (!jobPost) {
            return res.status(404).json({
                success: false,
                message: 'Job post not found'
            });
        }

        jobPost.status = status;
        await hr.save();

        res.status(200).json({
            success: true,
            message: 'Job post status updated successfully',
            data: { jobPost }
        });

    } catch (error) {
        console.error('Error updating job post status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Approve/Disapprove job post (for TPO/Admin)
export const updateJobPostApproval = async (req, res) => {
    try {
        const { hrId, jobPostId } = req.params;
        const { hasApproved } = req.body;

        const hr = await HR.findById(hrId);
        if (!hr) {
            return res.status(404).json({
                success: false,
                message: 'HR not found'
            });
        }

        // More reliable way to find the subdocument
        const jobPost = hr.jobPosts.find(job => job._id.toString() === jobPostId);
        // Alternative: const jobPost = hr.jobPosts.id(jobPostId);
        
        if (!jobPost) {
            return res.status(404).json({
                success: false,
                message: 'Job post not found'
            });
        }

        jobPost.hasApproved = hasApproved;

        // If approved and status is Draft, change to Active
        if (hasApproved && jobPost.status === 'Draft') {
            jobPost.status = 'Active';
        }

        await hr.save();

        res.status(200).json({
            success: true,
            message: `Job post ${hasApproved ? 'approved' : 'disapproved'} successfully`,
            data: { jobPost }
        });

    } catch (error) {
        console.error('Error updating job post approval:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get all approved and active job posts (for students to view)
export const getAllActiveJobPosts = async (req, res) => {
    try {
        const { branch, passingYear, skills } = req.query;

        const hrs = await HR.find({}, 'hrProfile.companyName hrProfile.companyLogo jobPosts');

        let allJobPosts = [];

        hrs.forEach(hr => {
            hr.jobPosts.forEach(jobPost => {
                if (jobPost.status === 'Active' && jobPost.hasApproved) {
                    allJobPosts.push({
                        ...jobPost.toObject(),
                        hrId: hr._id,
                        companyName: hr.hrProfile.companyName,
                        companyLogo: hr.hrProfile.companyLogo
                    });
                }
            });
        });

        // Filter by eligibility criteria if provided
        if (branch || passingYear || skills) {
            allJobPosts = allJobPosts.filter(jobPost => {
                let eligible = true;

                if (branch && jobPost.eligibilityCriteria.branch && jobPost.eligibilityCriteria.branch.length > 0) {
                    eligible = eligible && jobPost.eligibilityCriteria.branch.includes(branch);
                }

                if (passingYear && jobPost.eligibilityCriteria.passingYear) {
                    eligible = eligible && jobPost.eligibilityCriteria.passingYear <= parseInt(passingYear);
                }

                if (skills) {
                    const studentSkills = Array.isArray(skills) ? skills : [skills];
                    const hasMatchingSkill = studentSkills.some(skill =>
                        jobPost.requiredSkills.some(reqSkill =>
                            reqSkill.toLowerCase().includes(skill.toLowerCase())
                        )
                    );
                    eligible = eligible && hasMatchingSkill;
                }

                return eligible;
            });
        }

        res.status(200).json({
            success: true,
            message: 'Active job posts retrieved successfully',
            data: {
                jobPosts: allJobPosts,
                totalCount: allJobPosts.length
            }
        });

    } catch (error) {
        console.error('Error fetching active job posts:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
