import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String }, // URL of profile photo
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed password

    college: {
        collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College'},
        name: String, // Stored for quick access
        code: String, // College code
        course: String,
        branch: String,
        registrationId: { type: String, required: true },
        passingYear: Number
    },

    resume: { type: String }, // resume file URL
    documents: [
        {
            name: String,
            url: String,
            type: String, // e.g., "certificate", "marksheet"
        }
    ],

    placementStatus: {
        status: { type: String, enum: ['Applied', 'Shortlisted', 'Rejected', 'Placed'], default: 'Applied' },
        company: String,
        role: String,
        ctc: String,
        interviewDate: Date,
    },

    appliedJobs: [
        {
            company: String,
            role: String,
            ctc: String,
            date: { type: Date, default: Date.now },
            status: { type: String, enum: ['Applied', 'Shortlisted', 'Rejected', 'Placed'], default: 'Applied' },
        }
    ],

    notifications: [
        {
            message: String,
            date: { type: Date, default: Date.now },
        }
    ],

    events: [
        {
            title: String,
            date: Date,
            type: { type: String }, // e.g., "drive", "webinar", "mock interview"
        }
    ],

    skills: [String],

    certifications: [
        {
            title: String,
            platform: String,
            url: String,
            date: Date,
        }
    ],

}, { timestamps: true });

// Index for faster queries
studentSchema.index({ 'college.registrationId': 1, 'college.collegeId': 1 }, { unique: true });

export default mongoose.model('Student', studentSchema);