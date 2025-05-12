import { motion } from "framer-motion";
import { Button } from '@mui/material';
import {useNavigate} from "react-router-dom";
const Header =()=>{
    const navigate = useNavigate();

    return(
        <>
            <motion.header
                className="flex justify-between items-center p-6 shadow-md bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-2xl font-bold text-indigo-600">Smart Placement Portal</h1>
                <div className="space-x-4">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </Button>
                </div>
            </motion.header>
        </>
    );
}

export default Header;