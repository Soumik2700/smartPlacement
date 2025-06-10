import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true }, // College code/ID
    location: {
        city: String,
        state: String,
        country: String
    },
    establishedYear: Number,
    type: { 
        type: String, 
        enum: ['Government', 'Private', 'Autonomous', 'Deemed'], 
        default: 'Private' 
    },
    courses: [{
        name: String, // e.g., "B.Tech", "M.Tech", "BCA"
        branches: [String] // e.g., ["CSE", "ECE", "ME", "CE"]
    }],
    contactInfo: {
        email: String,
        phone: String,
        website: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
    
    // Valid student IDs for this college
    validStudentIds: [{
        studentId: { type: String, required: true }, // College student ID
        name: { type: String, required: true },
        course: String,
        branch: String,
        passingYear: Number,
        isRegistered: { type: Boolean, default: false }, // Track if student has registered on portal
        registeredAt: Date,
        email: String // Optional: pre-filled email if available
    }],
    
    registrationPattern: String, // Regex pattern for student IDs (optional validation)
    isActive: { type: Boolean, default: true },
    
    // Portal settings
    portalSettings: {
        allowRegistration: { type: Boolean, default: true },
        registrationDeadline: Date,
        academicYear: String
    }
}, { timestamps: true });

// Index for faster student ID lookups
collegeSchema.index({ 'validStudentIds.studentId': 1 });

export default mongoose.model('College', collegeSchema);