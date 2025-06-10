import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected', 'Withdrawn'],
    default: 'Applied'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  resumeVersion: {
    type: String, // URL to the resume used for this application
    required: true
  },
  coverLetter: {
    type: String,
    default: null
  },
  applicationData: {
    answers: [{
      question: String,
      answer: String
    }],
    additionalDocuments: [String] // URLs to additional documents
  },
  statusHistory: [{
    status: String,
    date: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    remarks: String
  }],
  feedback: {
    type: String,
    default: null
  },
  finalPackage: {
    ctc: Number,
    joiningDate: Date,
    location: String
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate applications
applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;