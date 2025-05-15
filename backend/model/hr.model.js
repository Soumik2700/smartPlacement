
const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema({
    role: String,
    requiredSkills: [String],
    ctc: String,
    location: String,
    eligibilityCriteria: {
        passingYear: Number,
        branch: [String]
    },
    applicationDeadline: Date,
    status: {
        type: String,
        enum: ['Active', 'Expired', 'Draft'],
        default: 'Draft'
    },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const InterviewSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    jobPost: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost' },
    date: Date,
    time: String,
    mode: {
        type: String,
        enum: ['Online', 'Offline']
    },
    meetingLink: String,
    feedback: String,
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled']
    }
});

const NotificationSchema = new mongoose.Schema({
    message: String,
    toStudents: [String], // could be 'all' or specific student IDs
    date: {
        type: Date,
        default: Date.now
    }
});

const HRSummarySchema = new mongoose.Schema({
    totalJobs: Number,
    totalApplicants: Number,
    shortlistedCount: Number,
    selectedCount: Number
});
   
const HRSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    designation: String,
    companyName: String,
    companyLogo: String,
    contactNumber: String,
    jobPosts: [JobPostSchema],
    interviews: [InterviewSchema],
    notifications: [NotificationSchema],
    summary: HRSummarySchema
});

module.exports = mongoose.model('HR', HRSchema);
