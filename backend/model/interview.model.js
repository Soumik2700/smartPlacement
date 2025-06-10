import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting',
    required: true
  },
  scheduledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  interviewDetails: {
    round: {
      type: String,
      required: true // e.g., "Technical Round 1", "HR Round", "Final Round"
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    duration: {
      type: Number, // in minutes
      default: 60
    },
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Phone'],
      required: true
    },
    location: {
      type: String // Physical address or meeting link
    },
    panel: [String], // Interview panel members
    instructions: String
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Rescheduled', 'Completed', 'Cancelled', 'No Show'],
    default: 'Scheduled'
  },
  attendance: {
    studentAttended: {
      type: Boolean,
      default: null
    },
    attendanceMarkedAt: Date,
    attendanceMarkedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  feedback: {
    technicalSkills: {
      rating: {
        type: Number,
        min: 1,
        max: 10
      },
      comments: String
    },
    communicationSkills: {
      rating: {
        type: Number,
        min: 1,
        max: 10
      },
      comments: String
    },
    overallRating: {
      type: Number,
      min: 1,
      max: 10
    },
    recommendation: {
      type: String,
      enum: ['Strongly Recommend', 'Recommend', 'Maybe', 'Not Recommend', 'Strongly Not Recommend']
    },
    detailedFeedback: String,
    nextRound: {
      type: Boolean,
      default: false
    }
  },
  result: {
    type: String,
    enum: ['Pending', 'Selected', 'Rejected', 'On Hold'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;