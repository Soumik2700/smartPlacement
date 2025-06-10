import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String, // URL to company logo
    default: null
  },
  profile: {
    type: String, // Company description
    required: true
  },
  website: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    required: true
  },
  location: {
    headquarters: String,
    offices: [String]
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Blocked'],
    default: 'Pending'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  hrContacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HR'
  }],
  jobHistory: [{
    year: Number,
    role: String,
    studentsHired: Number,
    package: {
      min: Number,
      max: Number
    }
  }],
  placementStats: {
    totalJobsPosted: {
      type: Number,
      default: 0
    },
    totalStudentsHired: {
      type: Number,
      default: 0
    },
    averagePackage: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

const Company = mongoose.model('Company', companySchema);

export default Company;