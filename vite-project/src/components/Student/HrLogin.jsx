import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// --- Inlined Shadcn UI Components for self-containment ---
// In a real project, these would typically be imported from your `ui` directory.

const Card = ({ className, children }) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
        {children}
    </div>
);

const CardContent = ({ className, children }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Input = ({ className, type = "text", ...props }) => (
    <input
        type={type}
        className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
);

const Button = ({ className, variant = "default", size = "default", onClick, children, ...props }) => {
    const baseStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    const variants = {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
    };
    const sizes = {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

// Custom Modal Component (replaces alert())
const CustomModal = ({ title, message, onClose, type }) => {
    let bgColor = "bg-white";
    let borderColor = "border-gray-200";
    let textColor = "text-gray-800";

    if (type === "success") {
        bgColor = "bg-green-50";
        borderColor = "border-green-500";
        textColor = "text-green-800";
    } else if (type === "error") {
        bgColor = "bg-red-50";
        borderColor = "border-red-500";
        textColor = "text-red-800";
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className={`rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-md ${bgColor} border-t-4 ${borderColor}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <p className={`text-base ${textColor}`}>{message}</p>
                <div className="mt-6 text-right">
                    <Button onClick={onClose} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

const HrLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalType, setModalType] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (error) setError("");
    };

    const clearAllAuthData = () => {
        // Clear all possible authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentData");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        localStorage.removeItem("hrToken");
        localStorage.removeItem("hrData");
        localStorage.removeItem("tpoToken");
        localStorage.removeItem("tpoData");
    };

    const showCustomModal = (title, message, type) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalType(type);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalMessage("");
        setModalTitle("");
        setModalType("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5100/hr/login", form);
            const data = response.data;

            if (data.success) {
                // Clear any existing authentication data first
                clearAllAuthData();

                // Store HR token and data in localStorage
                localStorage.setItem("hrToken", data.data.token);
                localStorage.setItem("hrData", JSON.stringify(data.data.hr));

                // Show success message using custom modal
                showCustomModal("Login Successful!", "You have successfully logged in to the HR Portal.", "success");

                // Redirect to HR Dashboard after a short delay for user to see the modal
                setTimeout(() => {
                    navigate("/HRDashboard", { replace: true });
                }, 1500);

                console.log("HR logged in:", data.data.hr);
            } else {
                setError(data.message || "Login failed. Please try again.");
                showCustomModal("Login Failed", data.message || "Login failed. Please try again.", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                setError(error.response.data?.message || "Login failed. Please check your credentials.");
                showCustomModal("Login Error", error.response.data?.message || "Login failed. Please check your credentials.", "error");
            } else if (error.request) {
                setError("Network error. Please check your connection and try again.");
                showCustomModal("Network Error", "Network error. Please check your connection and try again.", "error");
            } else {
                setError("An unexpected error occurred. Please try again.");
                showCustomModal("Error", "An unexpected error occurred. Please try again.", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 font-sans">
            <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <svg
                                className="w-10 h-10 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8"
                                />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                            HR Portal
                        </h2>
                        <p className="text-gray-600 text-lg">Human Resources Management System</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                            <div className="flex items-center">
                                <svg
                                    className="w-6 h-6 text-red-500 mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-red-700 font-medium">{error}</span>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Corporate Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your corporate email"
                                    required
                                    disabled={loading}
                                    className="pl-10 h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    disabled={loading}
                                    className="pl-10 h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Keep me signed in
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                                    Reset password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Authenticating...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c0 4.106 1.948 7.72 4.766 10.053l4.566-4.566c.112-.112.28-.112.392 0l4.566 4.566A12.001 12.001 0 0021.056 12c0-2.818-1.903-5.385-4.618-7.016z"
                                        />
                                    </svg>
                                    Access HR Portal
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Need access?</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center space-y-3">
                            <p className="text-sm text-gray-600">
                                Don't have an HR account?{" "}
                                <span className="font-semibold text-emerald-600">Contact your system administrator</span>
                            </p>
                            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    Secure Access
                                </span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    24/7 Support
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Company branding section */}
                    <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Our Valued Partners</h3>
                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                            {/* Mock Company Logos */}
                            <img
                                src="https://placehold.co/100x40/E6FFFA/2D3748?text=TechCorp"
                                alt="TechCorp Logo"
                                className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity duration-200"
                            />
                            <img
                                src="https://placehold.co/100x40/E6FFFA/2D3748?text=InnovateX"
                                alt="InnovateX Logo"
                                className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity duration-200"
                            />
                            <img
                                src="https://placehold.co/100x40/E6FFFA/2D3748?text=Global+Solutions"
                                alt="Global Solutions Logo"
                                className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity duration-200"
                            />
                            <img
                                src="https://placehold.co/100x40/E6FFFA/2D3748?text=DataSoft"
                                alt="DataSoft Logo"
                                className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity duration-200"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {showModal && (
                <CustomModal
                    title={modalTitle}
                    message={modalMessage}
                    onClose={handleCloseModal}
                    type={modalType}
                />
            )}
        </div>
    );
};

export default HrLogin;
