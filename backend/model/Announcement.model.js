import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetAudience: {
    type: String,
    enum: ['All Students', 'All HRs', 'All Companies', 'Specific Department', 'Specific Year', 'All'],
    required: true
  },
  targetFilters: {
    departments: [String],
    years: [String],
    companies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    }]
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  type: {
    type: String,
    enum: ['General', 'Job Alert', 'Event', 'Deadline', 'System'],
    default: 'General'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiryDate: {
    type: Date,
    default: null
  },
  attachments: [String], // URLs to attached files
  readBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;