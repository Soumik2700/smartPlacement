import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the combined HR schema
const HRSchema = new Schema({
    hrProfile: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }, // Store hashed password
        designation: { type: String, required: true },
        companyName: { type: String, required: true },
        companyLogo: { type: String },
        contactNumber: { type: String },
    },
    jobPosts: [
        {
            role: { type: String, required: true },
            requiredSkills: { type: [String], required: true },
            ctc: { type: String, required: true },
            location: { type: String, required: true },
            eligibilityCriteria: {
                passingYear: { type: Number },
                branch: { type: [String] },
            },
            applicationDeadline: { type: Date },
            status: { type: String, enum: ['Active', 'Expired', 'Draft'], default: 'Draft' },
            hasApproved: { type: Boolean, default: false }, // TPO/Admin approval status
            applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
        },
    ],
    interviews: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
            jobPost: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost' },
            date: { type: Date },
            time: { type: String },
            mode: { type: String, enum: ['Online', 'Offline'] },
            meetingLink: { type: String },
            feedback: { type: String },
            status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'] },
        },
    ],
    notifications: [
        {
            message: { type: String },
            toStudents: { type: [String] }, // could be 'all' or specific student IDs
            date: { type: Date, default: Date.now },
        },
    ],
    summary: {
        totalJobs: { type: Number, default: 0 },
        totalApplicants: { type: Number, default: 0 },
        shortlistedCount: { type: Number, default: 0 },
        selectedCount: { type: Number, default: 0 },
    },
});

// Create the model
const HR = mongoose.model('HR', HRSchema);

export default HR;
