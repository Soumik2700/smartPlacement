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
                className="text-center py-4 bg-white border-t"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
                © 2025 Smart Placement Portal — All Rights Reserved
            </motion.footer>
        </div>
    );
}
