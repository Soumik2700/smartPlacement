import { useState } from "react";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        resume: null,
        role: "",
        college: "",
        department: "",
        passingYear: "",
        company: "",
        designation: "",
        phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm(prev => ({ ...prev, resume: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        // Submit logic here
    };

    const commonInputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold text-center text-indigo-700">Register</h2>

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
                        <input
                            type="text"
                            name="college"
                            value={form.college}
                            onChange={handleChange}
                            placeholder="College Name"
                            className={commonInputClass}
                            required
                        />
                        <input
                            type="text"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            placeholder="Department"
                            className={commonInputClass}
                            required
                        />
                        <input
                            type="text"
                            name="passingYear"
                            value={form.passingYear}
                            onChange={handleChange}
                            placeholder="Passing Year"
                            className={commonInputClass}
                            required
                        />
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md file:bg-indigo-600 file:text-white file:rounded-md file:px-4 file:py-1"
                            required
                        />
                    </>
                )}

                {form.role === "hr" && (
                    <>
                        <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className={commonInputClass}
                            required
                        />
                        <input
                            type="text"
                            name="designation"
                            value={form.designation}
                            onChange={handleChange}
                            placeholder="Designation"
                            className={commonInputClass}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className={commonInputClass}
                            required
                        />
                    </>
                )}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
