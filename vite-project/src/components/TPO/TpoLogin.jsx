import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import axios from "axios";
import { clearAllAuthData } from "../../utils/auth";

const TpoLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5100/tpo/login", form);
            const data = response.data;

            if (data.success) {
                // Clear any existing authentication data first
                clearAllAuthData();

                // Store TPO token and data in localStorage
                localStorage.setItem("tpoToken", data.data.token);
                localStorage.setItem("tpoData", JSON.stringify(data.data.tpo));

                // Show success message
                alert("Login successful!");

                // Redirect to TPO Dashboard
                navigate("/TPODashboard", { replace: true });

                console.log("TPO logged in:", data.data.tpo);
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("TPO Login error:", error);
            
            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || "Login failed. Please check your credentials.";
                setError(errorMessage);
                
                // Log specific error details for debugging
                console.error("Response error:", {
                    status: error.response.status,
                    data: error.response.data
                });
            } else if (error.request) {
                // Request was made but no response received
                setError("Network error. Please check your connection and try again.");
                console.error("Network error:", error.request);
            } else {
                // Something else happened
                setError("An unexpected error occurred. Please try again.");
                console.error("Unexpected error:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white px-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardContent className="p-6">
                    <div className="text-center mb-6">
                        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <svg 
                                className="w-8 h-8 text-purple-600" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-purple-700 mb-2">TPO Login</h2>
                        <p className="text-gray-600 text-sm">Training & Placement Officer Portal</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            <div className="flex items-center">
                                <svg 
                                    className="w-5 h-5 mr-2" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                >
                                    <path 
                                        fillRule="evenodd" 
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                                        clipRule="evenodd" 
                                    />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                                disabled={loading}
                                className="w-full"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                                className="w-full"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
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
                                    Logging in...
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
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Login
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Access restricted to verified TPO accounts only.
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                                Need help? Contact your system administrator.
                            </p>
                        </div>
                    </div>

                    {/* Demo credentials for testing */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs text-blue-700 font-medium mb-2">Demo Credentials:</p>
                            <div className="text-xs text-blue-600 space-y-1">
                                <p><strong>Email:</strong> rajesh.sharma@abctech.edu.in</p>
                                <p><strong>Password:</strong> SecurePass123!</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setForm({
                                        email: "rajesh.sharma@abctech.edu.in",
                                        password: "SecurePass123!"
                                    });
                                }}
                                className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                                disabled={loading}
                            >
                                Fill Demo Credentials
                            </button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default TpoLogin;