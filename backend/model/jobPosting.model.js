import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HR',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  eligibilityCriteria: {
    departments: [{
      type: String,
      enum: ['CSE', 'ECE', 'IT', 'MECH', 'CIVIL', 'EEE', 'ALL']
    }],
    minimumCGPA: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    graduationYears: [String],
    maxBacklogs: {
      type: Number,
      default: 0
    }
  },
  package: {
    ctc: {
      min: Number,
      max: Number
    },
    baseSalary: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  jobDetails: {
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
      default: 'Full-time'
    },
    mode: {
      type: String,
      enum: ['On-site', 'Remote', 'Hybrid'],
      default: 'On-site'
    },
    location: String,
    experience: {
      min: Number,
      max: Number
    }
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Active', 'Closed', 'Cancelled'],
    default: 'Draft'
  },
  applicationCount: {
    type: Number,
    default: 0
  },
  selectionProcess: [{
    stage: String,
    description: String,
    duration: String
  }],
  skills: [String],
  benefits: [String]
}, {
  timestamps: true
});

const JobPost = mongoose.model('JobPosting', jobPostingSchema);

export default JobPost;