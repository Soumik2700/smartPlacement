import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        studentId: "",
        skills: "",
        role: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [validationStep, setValidationStep] = useState(false);
    const [validStudentInfo, setValidStudentInfo] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Clear message when user starts typing
        if (message.text) setMessage({ type: "", text: "" });
    };

    // Validate Student ID first
    const validateStudentId = async () => {
        if (!form.studentId.trim()) {
            setMessage({ type: "error", text: "Please enter your Student ID" });
            return;
        }

        setLoading(true);
        console.log("Validating Student ID:", form.studentId);
        try {
            const response = await axios.post('http://localhost:5100/college/validate-student', {
                studentId: form.studentId.trim()
            });

            const data = response.data;
            console.log("Validation Response:", data);

            if (data.isValid) {
                setValidStudentInfo(data.studentInfo);
                setValidationStep(true);
                setMessage({ type: "success", text: data.message });
                // Pre-fill name if available
                if (data.studentInfo.name) {
                    setForm(prev => ({ ...prev, name: data.studentInfo.name }));
                }
                if (data.studentInfo.email) {
                    setForm(prev => ({ ...prev, email: data.studentInfo.email }));
                }
            } else {
                setMessage({ type: "error", text: data.message });
                setValidationStep(false);
                setValidStudentInfo(null);
            }
        } catch (error) {
            console.error('Validation error:', error);
            const errorMessage = error.response?.data?.message || "Network error. Please try again.";
            setMessage({ type: "error", text: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.role === "student") {
            // Validate password match
            if (form.password !== form.confirmPassword) {
                setMessage({ type: "error", text: "Passwords do not match" });
                return;
            }

            // Validate password strength
            if (form.password.length < 6) {
                setMessage({ type: "error", text: "Password must be at least 6 characters long" });
                return;
            }

            setLoading(true);
            try {
                // Prepare skills array
                const skillsArray = form.skills
                    ? form.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
                    : [];

                const studentData = {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    password: form.password,
                    studentId: form.studentId.trim(),
                    skills: skillsArray
                };

                console.log("Submitting student data:", studentData);

                const response = await axios.post('http://localhost:5100/students/register', studentData);
                const data = response.data;

                console.log("Registration response:", response);

                // Fix: Check response.status instead of response.ok (Axios doesn't have .ok property)
                if (response.status === 200 || response.status === 201) {
                    setMessage({ type: "success", text: data.message || "Student registered successfully!" });

                    // Reset form after successful registration
                    setTimeout(() => {
                        setForm({
                            name: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            studentId: "",
                            skills: "",
                            role: ""
                        });
                        setValidationStep(false);
                        setValidStudentInfo(null);
                        setMessage({ type: "", text: "" });
                        // Redirect to login or dashboard
                        // window.location.href = '/login';
                    }, 3000);
                } else {
                    setMessage({ type: "error", text: data.message || "Registration failed" });
                }
            } catch (error) {
                console.error('Registration error:', error);
                const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
                setMessage({ type: "error", text: errorMessage });
            } finally {
                setLoading(false);
            }
        } else {
            // HR registration logic (placeholder)
            setMessage({ type: "info", text: "HR registration coming soon!" });
        }
    };

    const resetValidation = () => {
        setValidationStep(false);
        setValidStudentInfo(null);
        setForm(prev => ({ ...prev, studentId: "", name: "", email: "" }));
        setMessage({ type: "", text: "" });
    };

    const commonInputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold text-center text-indigo-700">Register</h2>

                {/* Message Display */}
                {message.text && (
                    <div className={`p-3 rounded-md text-sm border ${message.type === 'success'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : message.type === 'error'
                                ? 'bg-red-100 text-red-800 border-red-300'
                                : 'bg-blue-100 text-blue-800 border-blue-300'
                        }`}>
                        {/* Debug info - remove this after testing */}
                        <div className="text-xs opacity-50 mb-1">Type: {message.type}</div>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Selection */}
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className={commonInputClass}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="hr">HR</option>
                    </select>

                    {form.role === "student" && (
                        <>
                            {/* Student ID Validation Step */}
                            {!validationStep ? (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="studentId"
                                        value={form.studentId}
                                        onChange={handleChange}
                                        placeholder="Enter your Student ID (e.g., ABC001CSE001)"
                                        className={commonInputClass}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={validateStudentId}
                                        disabled={loading}
                                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50"
                                    >
                                        {loading ? "Validating..." : "Validate Student ID"}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Valid Student Info Display */}
                                    {validStudentInfo && (
                                        <div className="bg-green-50 p-4 rounded-md border border-green-200">
                                            <h3 className="font-semibold text-green-800 mb-2">Student Information:</h3>
                                            <p className="text-sm text-green-700">
                                                <strong>Student ID:</strong> {form.studentId}<br />
                                                <strong>Course:</strong> {validStudentInfo.course}<br />
                                                <strong>Branch:</strong> {validStudentInfo.branch}<br />
                                                <strong>Passing Year:</strong> {validStudentInfo.passingYear}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={resetValidation}
                                                className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                                            >
                                                Change Student ID
                                            </button>
                                        </div>
                                    )}

                                    {/* Registration Form */}
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className={commonInputClass}
                                        required
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className={commonInputClass}
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Password (min 6 characters)"
                                        className={commonInputClass}
                                        required
                                        minLength="6"
                                    />

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        className={commonInputClass}
                                        required
                                    />

                                    <textarea
                                        name="skills"
                                        value={form.skills}
                                        onChange={handleChange}
                                        placeholder="Skills (comma separated, e.g., JavaScript, React, Node.js)"
                                        className={`${commonInputClass} h-20 resize-none`}
                                        rows="3"
                                    />

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all disabled:opacity-50"
                                    >
                                        {loading ? "Registering..." : "Register"}
                                    </button>
                                </>
                            )}
                        </>
                    )}

                    {form.role === "hr" && (
                        <div className="text-center py-8">
                            <p className="text-gray-600">HR Registration will be available soon!</p>
                        </div>
                    )}
                </form>

                {/* Login Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
