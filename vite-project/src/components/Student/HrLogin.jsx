import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import axios from "axios";

const HrLogin = () => {
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
            const response = await axios.post("http://localhost:5100/hr/login", form);

            const data = response.data;

            if (data.success) {
                // Store token and HR data in localStorage
                localStorage.setItem("hrToken", data.data.token);
                localStorage.setItem("hrData", JSON.stringify(data.data.hr));

                // Show success message
                alert("Login successful!");

                // Redirect to HR Dashboard
                navigate("/HRDashboard");

                console.log("HR logged in:", data.data.hr);

            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">HR Login</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <Input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            disabled={loading}
                        />
                        <Input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    <p className="text-sm text-gray-600 text-center mt-4">
                        Don't have an account? Contact Admin to register.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default HrLogin;
