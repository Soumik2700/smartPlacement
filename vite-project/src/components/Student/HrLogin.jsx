import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const HrLogin = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic (API call, auth, etc.)
        console.log("Logging in:", form);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">HR Login</h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                        <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
                        <Button type="submit" className="w-full">
                            Login
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