import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const TPOSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['student', 'hr', 'admin', 'tpo'],
        required: true,
        default: 'tpo'
    },
    phone: {
        type: String,
        trim: true
    },
    photo: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    },

    // TPO specific fields
    employeeId: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        default: 'Training & Placement Officer',
        trim: true
    },
    department: {
        type: String,
        required: true,
        default: 'Placement Cell',
        trim: true
    },

    // College information
    college: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        logo: {
            type: String,
            default: null
        },
        address: {
            street: {
                type: String,
                trim: true,
                default: ''
            },
            city: {
                type: String,
                trim: true,
                default: ''
            },
            state: {
                type: String,
                trim: true,
                default: ''
            },
            pincode: {
                type: String,
                trim: true,
                default: ''
            }
        },
        website: {
            type: String,
            trim: true,
            default: null
        },
        establishedYear: {
            type: Number,
            min: 1800,
            max: new Date().getFullYear(),
            default: null
        }
    },

    // Permissions
    permissions: {
        canManageStudents: {
            type: Boolean,
            default: true
        },
        canManageCompanies: {
            type: Boolean,
            default: true
        },
        canManageJobs: {
            type: Boolean,
            default: true
        },
        canScheduleInterviews: {
            type: Boolean,
            default: true
        },
        canCreateEvents: {
            type: Boolean,
            default: true
        },
        canSendAnnouncements: {
            type: Boolean,
            default: true
        },
        canViewReports: {
            type: Boolean,
            default: true
        },
        canManageAdmins: {
            type: Boolean,
            default: false
        }
    },

    // Working hours
    workingHours: {
        start: {
            type: String,
            default: '09:00'
        },
        end: {
            type: String,
            default: '17:00'
        },
        workingDays: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }]
    },

    // Experience details
    experience: {
        totalYears: {
            type: Number,
            min: 0,
            max: 50,
            default: 0
        },
        previousRoles: [{
            title: {
                type: String,
                trim: true,
                default: ''
            },
            organization: {
                type: String,
                trim: true,
                default: ''
            },
            duration: {
                type: String,
                trim: true,
                default: ''
            },
            description: {
                type: String,
                trim: true,
                default: ''
            }
        }]
    },

    // Professional details
    qualifications: [{
        degree: {
            type: String,
            trim: true
        },
        institution: {
            type: String,
            trim: true
        },
        year: {
            type: Number,
            min: 1950,
            max: new Date().getFullYear()
        },
        percentage: {
            type: Number,
            min: 0,
            max: 100
        }
    }],

    // Specializations
    specializations: [{
        type: String,
        trim: true,
        enum: [
            'Campus Recruitment',
            'Industry Relations',
            'Career Counseling',
            'Training & Development',
            'Alumni Relations',
            'Entrepreneurship Development',
            'Skill Development',
            'Corporate Communications'
        ]
    }],

    // Contact preferences
    contactPreferences: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        smsNotifications: {
            type: Boolean,
            default: false
        },
        pushNotifications: {
            type: Boolean,
            default: true
        },
        weeklyReports: {
            type: Boolean,
            default: true
        },
        monthlyReports: {
            type: Boolean,
            default: true
        }
    },

    // Emergency contact
    emergencyContact: {
        name: {
            type: String,
            trim: true,
            default: null
        },
        relationship: {
            type: String,
            trim: true,
            default: null
        },
        phone: {
            type: String,
            trim: true,
            default: null
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: null
        }
    },

    // Social media links
    socialMedia: {
        linkedin: {
            type: String,
            trim: true,
            default: null
        },
        twitter: {
            type: String,
            trim: true,
            default: null
        },
        facebook: {
            type: String,
            trim: true,
            default: null
        }
    },

    // Statistics tracking
    stats: {
        totalStudentsManaged: {
            type: Number,
            default: 0
        },
        totalCompaniesManaged: {
            type: Number,
            default: 0
        },
        totalJobsPosted: {
            type: Number,
            default: 0
        },
        totalEventsOrganized: {
            type: Number,
            default: 0
        },
        totalPlacementsAchieved: {
            type: Number,
            default: 0
        },
        averagePlacementPackage: {
            type: Number,
            default: 0
        }
    },

    // Account status
    accountStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended', 'Pending Approval'],
        default: 'Active'
    },

    // Verification status
    isVerified: {
        type: Boolean,
        default: false
    },

    verificationDetails: {
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TPO',
            default: null
        },
        verifiedAt: {
            type: Date,
            default: null
        },
        verificationDocuments: [{
            name: String,
            url: String,
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }]
    },

    // Login tracking
    loginHistory: [{
        loginTime: {
            type: Date,
            default: Date.now
        },
        ipAddress: {
            type: String,
            default: 'unknown'
        },
        userAgent: {
            type: String,
            default: 'unknown'
        },
        location: {
            type: String,
            default: null
        },
        deviceType: {
            type: String,
            enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
            default: 'Unknown'
        }
    }],

    // Password reset
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    },

    // Two-factor authentication
    twoFactorAuth: {
        enabled: {
            type: Boolean,
            default: false
        },
        secret: {
            type: String,
            default: null
        },
        backupCodes: [{
            type: String
        }]
    },

    // Preferences
    preferences: {
        theme: {
            type: String,
            enum: ['light', 'dark', 'auto'],
            default: 'light'
        },
        language: {
            type: String,
            default: 'en'
        },
        timezone: {
            type: String,
            default: 'Asia/Kolkata'
        },
        dateFormat: {
            type: String,
            enum: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'],
            default: 'DD/MM/YYYY'
        },
        timeFormat: {
            type: String,
            enum: ['12h', '24h'],
            default: '12h'
        }
    },

    // Notes (for admin use)
    adminNotes: {
        type: String,
        default: null
    },

    // Deactivation details
    deactivationReason: {
        type: String,
        default: null
    },
    deactivatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TPO',
        default: null
    },
    deactivatedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create unique indexes using schema.index() method
TPOSchema.index({ email: 1 }, { unique: true });
TPOSchema.index({ employeeId: 1 }, { unique: true });
TPOSchema.index({ isActive: 1 });
TPOSchema.index({ 'college.name': 1 });
TPOSchema.index({ createdAt: -1 });
TPOSchema.index({ lastLogin: -1 });

// Virtual for full name with designation
TPOSchema.virtual('fullTitle').get(function() {
    return `${this.name} - ${this.designation}`;
});

// Virtual for college full address
TPOSchema.virtual('college.fullAddress').get(function() {
    const addr = this.college.address;
    const parts = [addr.street, addr.city, addr.state, addr.pincode].filter(Boolean);
    return parts.join(', ');
});

// Pre-save middleware to hash password if modified
TPOSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    try {
        // Hash password with cost of 12
        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error) {
        next(error);
    }
});

// Pre-save middleware to set default working days
TPOSchema.pre('save', function(next) {
    if (this.isNew && (!this.workingHours.workingDays || this.workingHours.workingDays.length === 0)) {
        this.workingHours.workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    }
    next();
});

// Instance method to check password
TPOSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        console.error('Password comparison error:', error);
        return false;
    }
};

// Instance method to generate password reset token
TPOSchema.methods.createPasswordResetToken = function() {
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    return resetToken;
};

// Instance method to add login history
TPOSchema.methods.addLoginHistory = function(req) {
    const loginEntry = {
        loginTime: new Date(),
        ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        deviceType: this.getDeviceType(req.get('User-Agent'))
    };

    this.loginHistory.unshift(loginEntry);

    // Keep only last 10 login entries
    if (this.loginHistory.length > 10) {
        this.loginHistory = this.loginHistory.slice(0, 10);
    }
};

// Helper method to determine device type
TPOSchema.methods.getDeviceType = function(userAgent) {
    if (!userAgent) return 'Unknown';

    if (/mobile/i.test(userAgent)) return 'Mobile';
    if (/tablet/i.test(userAgent)) return 'Tablet';
    if (/desktop/i.test(userAgent)) return 'Desktop';

    return 'Unknown';
};

// Static method to find active TPOs
TPOSchema.statics.findActive = function() {
    return this.find({ isActive: true, accountStatus: 'Active' });
};

// Static method to find by college
TPOSchema.statics.findByCollege = function(collegeName) {
    return this.find({
        'college.name': new RegExp(collegeName, 'i'),
        isActive: true
    });
};

// Static method to find by employee ID
TPOSchema.statics.findByEmployeeId = function(employeeId) {
    return this.findOne({ employeeId: employeeId.trim() });
};

// Static method to get TPO statistics
TPOSchema.statics.getStatistics = async function() {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalTPOs: { $sum: 1 },
                activeTPOs: {
                    $sum: {
                        $cond: [{ $eq: ['$isActive', true] }, 1, 0]
                    }
                },
                verifiedTPOs: {
                    $sum: {
                        $cond: [{ $eq: ['$isVerified', true] }, 1, 0]
                    }
                },
                totalStudentsManaged: { $sum: '$stats.totalStudentsManaged' },
                totalCompaniesManaged: { $sum: '$stats.totalCompaniesManaged' },
                totalPlacementsAchieved: { $sum: '$stats.totalPlacementsAchieved' }
            }
        }
    ]);

    return stats[0] || {
        totalTPOs: 0,
        activeTPOs: 0,
        verifiedTPOs: 0,
        totalStudentsManaged: 0,
        totalCompaniesManaged: 0,
        totalPlacementsAchieved: 0
    };
};

const TPO = mongoose.model('TPO', TPOSchema);

export default TPO;