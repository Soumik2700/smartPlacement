import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {

    const navigate = useNavigate();
    return (
        <>
            <motion.section
                className="text-center py-20 px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <h2 className="text-4xl font-bold mb-4">Bridging Students & Recruiters</h2>
                <p className="text-lg text-gray-600 mb-6">
                    A modern college placement portal to simplify hiring, applying, and tracking.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/StudentLogin")}
                    >
                        Student Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate("/HrLogin")}
                    >
                        HR Login
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/TpoLogin")}
                    >
                        TPO Login
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => navigate("/AdminLogin")}
                    >
                        Admin Login
                    </Button>
                </div>
            </motion.section>

            <motion.section
                className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 pb-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                {[
                    { title: "👨‍🎓 Students", desc: "Apply to jobs, upload resume, and track your placement journey." },
                    { title: "🧑‍💼 HRs", desc: "Post job offers, filter candidates, and schedule interviews." },
                    { title: "🎓 TPOs", desc: "Manage placement drives, filter students, and approve applications." },
                    { title: "🔐 Admin", desc: "Control access, approve users, and monitor system health." },
                ].map((role, index) => (
                    <motion.div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:scale-105"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.3, duration: 0.7 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                        <p className="text-sm text-gray-600">{role.desc}</p>
                    </motion.div>
                ))}
            </motion.section>
        </>
    );
}

export default HeroSection;