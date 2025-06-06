import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";


const AdminLogin = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add authentication logic here
        console.log("Admin login submitted:", form);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 px-4">
            <Card className="w-full max-w-md shadow-lg rounded-xl">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
                        Admin Login
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Admin Email" required />
                        <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                    <p className="text-sm text-gray-500 text-center mt-4">
                        Only authorized administrators can access this portal.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;