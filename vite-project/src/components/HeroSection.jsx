import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Main Hero Section */}
            <motion.section
                className="relative text-center py-24 px-6 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-2xl"></div>
                </div>

                {/* Floating Icons */}
                <motion.div 
                    className="absolute top-20 left-10 text-blue-400/30"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </motion.div>
                
                <motion.div 
                    className="absolute top-32 right-16 text-purple-400/30"
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                </motion.div>

                <motion.div 
                    className="absolute bottom-40 left-20 text-cyan-400/30"
                    animate={{ y: [-5, 15, -5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                </motion.div>

                {/* Main Content */}
                <div className="relative z-10 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4 border border-blue-200">
                            🚀 Next-Gen Placement Platform
                        </span>
                    </motion.div>

                    <motion.h2 
                        className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        Bridging Students
                        <br />
                        <span className="text-4xl md:text-6xl">& Recruiters</span>
                    </motion.h2>

                    <motion.p 
                        className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                    >
                        A modern college placement portal powered by AI to simplify hiring, 
                        streamline applications, and accelerate career growth.
                    </motion.p>

                    {/* Enhanced Login Buttons */}
                    <motion.div 
                        className="flex flex-wrap justify-center gap-6 mb-12"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate("/StudentLogin")}
                                className="group relative overflow-hidden"
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '50px',
                                    padding: '16px 32px',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                                        boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                                    },
                                }}
                            >
                                <span className="flex items-center">
                                    👨‍🎓 Student Login
                                </span>
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate("/HrLogin")}
                                sx={{
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    borderRadius: '50px',
                                    padding: '16px 32px',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #ec4899 0%, #ef4444 100%)',
                                        boxShadow: '0 12px 40px rgba(240, 147, 251, 0.4)',
                                    },
                                }}
                            >
                                <span className="flex items-center">
                                    🧑‍💼 HR Login
                                </span>
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate("/TpoLogin")}
                                sx={{
                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                    borderRadius: '50px',
                                    padding: '16px 32px',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                                        boxShadow: '0 12px 40px rgba(79, 172, 254, 0.4)',
                                    },
                                }}
                            >
                                <span className="flex items-center">
                                    🎓 TPO Login
                                </span>
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate("/AdminLogin")}
                                sx={{
                                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                    borderRadius: '50px',
                                    padding: '16px 32px',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 8px 32px rgba(250, 112, 154, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #f43f5e 0%, #fbbf24 100%)',
                                        boxShadow: '0 12px 40px rgba(250, 112, 154, 0.4)',
                                    },
                                }}
                            >
                                <span className="flex items-center">
                                    🔐 Admin Login
                                </span>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div 
                        className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                    >
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Secure & Trusted
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            AI-Powered Matching
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Real-time Analytics
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Enhanced Features Section */}
            <motion.section
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 pb-20 bg-white/70 backdrop-blur-sm shadow-inner"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
            >
                {/* Feature Card 1: Student Dashboard */}
                <motion.div
                    className="flex flex-col items-center p-8 rounded-2xl shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white transform hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="w-20 h-20 mb-4 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Personalized Student Dashboards</h3>
                    <p className="text-center text-blue-100">
                        Students get a tailored view of opportunities, application statuses, and interview schedules.
                    </p>
                </motion.div>

                {/* Feature Card 2: Recruiter Tools */}
                <motion.div
                    className="flex flex-col items-center p-8 rounded-2xl shadow-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white transform hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="w-20 h-20 mb-4 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-6 6a3 3 0 11-6 0 3 3 0 016 0zm11 0a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Robust Recruiter Tools</h3>
                    <p className="text-center text-purple-100">
                        Empower recruiters with powerful search filters, applicant tracking, and direct communication.
                    </p>
                </motion.div>

                {/* Feature Card 3: TPO Management */}
                <motion.div
                    className="flex flex-col items-center p-8 rounded-2xl shadow-xl bg-gradient-to-br from-green-500 to-teal-600 text-white transform hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="w-20 h-20 mb-4 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 1H4a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M10 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Streamlined TPO Management</h3>
                    <p className="text-center text-green-100">
                        Effortlessly manage drives, student data, and generate detailed placement reports.
                    </p>
                </motion.div>

                {/* Feature Card 4: Admin Control */}
                <motion.div
                    className="flex flex-col items-center p-8 rounded-2xl shadow-xl bg-gradient-to-br from-red-500 to-orange-600 text-white transform hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="w-20 h-20 mb-4 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Comprehensive Admin Control</h3>
                    <p className="text-center text-red-100">
                        Full oversight and customization of portal settings, user roles, and data security.
                    </p>
                </motion.div>
            </motion.section>
        </>
    );
};

export default HeroSection;