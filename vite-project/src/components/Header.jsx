import { motion } from "framer-motion";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  Menu, 
  X, 
  ChevronDown,
  Star,
  Award,
  TrendingUp
} from "lucide-react";

const Header = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', path: '/', icon: null },
        { name: 'About', path: '/about', icon: null },
        { name: 'Services', path: '/services', icon: ChevronDown, hasDropdown: true },
        { name: 'Contact', path: '/contact', icon: null }
    ];

    const serviceDropdownItems = [
        { name: 'For Students', path: '/students', icon: GraduationCap },
        { name: 'For Companies', path: '/companies', icon: Briefcase },
        { name: 'For TPOs', path: '/tpos', icon: Users }
    ];

    const stats = [
        { icon: Users, value: '10K+', label: 'Students Placed' },
        { icon: Briefcase, value: '500+', label: 'Companies' },
        { icon: Award, value: '95%', label: 'Success Rate' }
    ];

    return (
        <>
            {/* Main Header */}
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
                        : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600'
                }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-20">
                        {/* Logo Section */}
                        <motion.div 
                            className="flex items-center space-x-3 cursor-pointer"
                            onClick={() => navigate('/')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className={`p-2 rounded-xl ${
                                isScrolled 
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
                                    : 'bg-white/20 backdrop-blur-sm'
                            }`}>
                                <GraduationCap className={`w-6 h-6 lg:w-8 lg:h-8 ${
                                    isScrolled ? 'text-white' : 'text-white'
                                }`} />
                            </div>
                            <div>
                                <h1 className={`text-xl lg:text-2xl font-bold ${
                                    isScrolled ? 'text-gray-800' : 'text-white'
                                }`}>
                                    Smart Placement
                                </h1>
                                <p className={`text-xs lg:text-sm ${
                                    isScrolled ? 'text-gray-600' : 'text-white/80'
                                }`}>
                                    Your Career Gateway
                                </p>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {navItems.map((item, index) => (
                                <div key={item.name} className="relative">
                                    <motion.button
                                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                                            isScrolled 
                                                ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                                                : 'text-white hover:text-white hover:bg-white/20'
                                        }`}
                                        onClick={() => {
                                            if (item.hasDropdown) {
                                                setIsDropdownOpen(!isDropdownOpen);
                                            } else {
                                                navigate(item.path);
                                            }
                                        }}
                                        whileHover={{ y: -2 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span>{item.name}</span>
                                        {item.icon && <item.icon className="w-4 h-4" />}
                                    </motion.button>

                                    {/* Dropdown Menu */}
                                    {item.hasDropdown && isDropdownOpen && (
                                        <motion.div
                                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                        >
                                            {serviceDropdownItems.map((dropdownItem) => (
                                                <button
                                                    key={dropdownItem.name}
                                                    className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                    onClick={() => {
                                                        navigate(dropdownItem.path);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    <dropdownItem.icon className="w-4 h-4" />
                                                    <span>{dropdownItem.name}</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Action Buttons */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/login")}
                                    sx={{
                                        color: isScrolled ? '#4f46e5' : 'white',
                                        borderColor: isScrolled ? '#4f46e5' : 'white',
                                        '&:hover': {
                                            borderColor: isScrolled ? '#4338ca' : 'white',
                                            backgroundColor: isScrolled ? '#f0f9ff' : 'rgba(255,255,255,0.1)',
                                        },
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: 3,
                                        py: 1
                                    }}
                                >
                                    Login
                                </Button>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => navigate("/register")}
                                    sx={{
                                        background: isScrolled 
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                            : 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        '&:hover': {
                                            background: isScrolled 
                                                ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' 
                                                : 'rgba(255,255,255,0.3)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                                        },
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: 3,
                                        py: 1,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Get Started
                                </Button>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className={`lg:hidden p-2 rounded-lg ${
                                isScrolled ? 'text-gray-700' : 'text-white'
                            }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {item.name}
                                </button>
                            ))}
                            <div className="pt-4 border-t border-gray-200 space-y-3">
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => {
                                        navigate("/login");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    sx={{
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => {
                                        navigate("/register");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.header>

            {/* Hero Stats Bar */}
            <motion.div
                className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : -50 }}
                transition={{ duration: 0.3 }}
            >
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <div className="flex justify-center items-center space-x-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="flex items-center space-x-2 text-sm"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <stat.icon className="w-4 h-4 text-indigo-600" />
                                <span className="font-bold text-gray-800">{stat.value}</span>
                                <span className="text-gray-600 hidden sm:inline">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Spacer for fixed header */}
            <div className="h-16 lg:h-20"></div>
        </>
    );
}

export default Header;