import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// --- Inlined Shadcn UI Components for self-containment ---
// These are duplicated from HrLogin to make this component self-contained.
// In a real project, they would typically be imported from your `ui` directory.

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


const AdminLogin = () => {
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
        if (error) setError(""); // Clear error when user starts typing
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
            // Mock API call for admin login
            // In a real application, replace this with your actual backend endpoint
            const response = await axios.post("http://localhost:5100/admin/login", form);
            const data = response.data;

            if (data.success) {
                // Clear any existing authentication data first
                clearAllAuthData();

                // Store Admin token and data in localStorage
                localStorage.setItem("adminToken", data.data.token);
                localStorage.setItem("adminData", JSON.stringify(data.data.admin));

                // Show success message using custom modal
                showCustomModal("Login Successful!", "You have successfully logged in to the Admin Portal.", "success");

                // Redirect to Admin Dashboard after a short delay for user to see the modal
                setTimeout(() => {
                    navigate("/AdminDashboard", { replace: true });
                }, 1500);

                console.log("Admin logged in:", data.data.admin);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 px-4 font-sans">
            <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mb-6 shadow-lg">
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
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.33.83 2.864 2.334a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.942 1.543-.83 3.33-2.334 2.864a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.942-3.33-.83-2.864-2.334a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.942-1.543.83-3.33 2.334-2.864a1.724 1.724 0 002.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-3">
                            Admin Portal
                        </h2>
                        <p className="text-gray-600 text-lg">Centralized System Administration</p>
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
                                Admin Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 0V7a2 2 0 00-2-2H5a2 2 0 00-2 2v1M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your admin email"
                                    required
                                    disabled={loading}
                                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-200"
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
                                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Keep me signed in
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
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
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Access Admin Portal
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
                                <span className="px-2 bg-white text-gray-500">Need assistance?</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center space-y-3">
                            <p className="text-sm text-gray-600">
                                If you are an authorized administrator and are facing issues,{" "}
                                <span className="font-semibold text-blue-600">contact technical support</span>
                            </p>
                            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    Secure Connection
                                </span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Dedicated Support
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer branding/info section */}
                    <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} Smart Placement Portal. All rights reserved.
                        </p>
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

export default AdminLogin;
