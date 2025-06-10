import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importing Framer Motion
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-800">
            {/* Navbar with Animation */}
            
            <Header/>
            {/* Hero Section with Animation */}
            
            <main className='min-h-screen overflow-auto'>
                <Outlet />
            </main>

            <motion.footer
                className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 text-white py-8"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
            >
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                        {/* College Info */}
                        <motion.div 
                            className="text-center md:text-left"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                College Placement Cell
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Dedicated to connecting our students with top recruiters and ensuring successful career placements through streamlined processes.
                            </p>
                            <div className="mt-3 text-xs text-gray-400">
                                <p>🎓 For College Students Only</p>
                                <p>🔒 Secure Internal Portal</p>
                            </div>
                        </motion.div>

                        {/* Quick Access */}
                        <motion.div 
                            className="text-center"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <h4 className="text-lg font-semibold mb-3 text-blue-400">Quick Access</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">📋 Placement Guidelines</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">📊 Placement Statistics</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">📅 Upcoming Drives</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">❓ Help & Support</a></li>
                            </ul>
                        </motion.div>

                        {/* Contact Placement Cell */}
                        <motion.div 
                            className="text-center md:text-right"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <h4 className="text-lg font-semibold mb-3 text-blue-400">Placement Cell</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p className="flex items-center justify-center md:justify-end">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                    </svg>
                                    placement@college.edu
                                </p>
                                <p className="flex items-center justify-center md:justify-end">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                                    </svg>
                                    +91-XXX-XXX-XXXX
                                </p>
                                <p className="flex items-center justify-center md:justify-end">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                                    </svg>
                                    Room 201, Admin Block
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Office Hours: 9:00 AM - 5:00 PM
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Important Notice */}
                    <motion.div 
                        className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-4 mb-6 border border-blue-500/20"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center text-center">
                            <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            <p className="text-sm text-gray-300">
                                <span className="text-yellow-400 font-semibold">Notice:</span> This portal is exclusively for registered college students. 
                                Use your college email ID for authentication. For registration issues, contact the Placement Cell.
                            </p>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div 
                        className="border-t border-gray-600 opacity-50 my-6"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    />

                    {/* Bottom Section */}
                    <motion.div 
                        className="flex flex-col md:flex-row justify-between items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <p className="text-gray-400 text-sm">
                                © 2025 College Placement Portal — Internal Use Only
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Developed by College IT Department
                            </p>
                        </div>
                        
                        {/* College Links */}
                        <div className="flex space-x-6 text-sm">
                            <motion.a 
                                href="#" 
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                                </svg>
                                College Website
                            </motion.a>
                            <motion.a 
                                href="#" 
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                </svg>
                                Student Portal
                            </motion.a>
                            <motion.a 
                                href="#" 
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                </svg>
                                Academic Portal
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </motion.footer>        </div>
    );
}