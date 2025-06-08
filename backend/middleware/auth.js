import jwt from 'jsonwebtoken';
import Student from '../model/student.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.studentId = decoded.studentId;
        
        // Optional: Verify student still exists
        const student = await Student.findById(decoded.studentId);
        if (!student) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export const adminMiddleware = (req, res, next) => {
    // Add your admin verification logic here
    // For now, just a placeholder
    next();
};