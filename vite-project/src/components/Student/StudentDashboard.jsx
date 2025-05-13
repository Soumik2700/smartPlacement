import React from "react";

const StudentDashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome, Soumik Sinha</h1>

            {/* Profile Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Profile Information</h2>
                        <p className="text-gray-600">B.Tech CSE, XYZ College</p>
                        <p className="text-gray-500">Registration ID: 2025CSE1234</p>
                    </div>
                    <img
                        src="https://via.placeholder.com/80"
                        alt="Profile"
                        className="rounded-full border-4 border-indigo-500"
                    />
                </div>
                <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    Edit Profile
                </button>
            </section>

            {/* Resume & Documents */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Resume & Documents</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <a
                        href="/path/to/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-4 py-2 rounded text-center"
                    >
                        View Resume
                    </a>
                    <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                        Upload New Resume
                        <input type="file" className="hidden" />
                    </label>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded">Edit Certificates</button>
                </div>
            </section>

            {/* Placement Status */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Placement Status</h2>
                <p><strong>Status:</strong> Shortlisted</p>
                <p><strong>Company:</strong> DeltaX</p>
                <p><strong>Role:</strong> Frontend Developer</p>
                <p><strong>CTC:</strong> 6 LPA</p>
                <p><strong>Interview Date:</strong> May 25, 2025</p>
            </section>

            {/* Job Opportunities */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Job Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {["Google", "Infosys", "Wipro"].map((company) => (
                        <div key={company} className="p-4 border rounded shadow-sm bg-blue-50">
                            <h3 className="font-bold">{company}</h3>
                            <p>Role: Software Engineer</p>
                            <p>CTC: 8 LPA</p>
                            <button className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Notifications */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li>Resume Review workshop on May 20</li>
                    <li>Last date to apply for Wipro: May 18</li>
                </ul>
            </section>

            {/* Upcoming Events */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li>Mock Interviews: May 22</li>
                    <li>Placement Drive - Infosys: May 28</li>
                </ul>
            </section>

            {/* Application History */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Application History</h2>
                <table className="w-full table-auto border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Company</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Infosys</td>
                            <td className="border px-4 py-2">May 10</td>
                            <td className="border px-4 py-2">Applied</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Wipro</td>
                            <td className="border px-4 py-2">May 12</td>
                            <td className="border px-4 py-2">Shortlisted</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Skills & Certifications */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Skills & Certifications</h2>
                <div className="mb-4">
                    <h3 className="font-medium">Skills:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full">React</span>
                        <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full">Node.js</span>
                        <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full">Tailwind CSS</span>
                    </div>
                </div>
                <div>
                    <h3 className="font-medium">Certifications:</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                        <li>Coursera - Full Stack Development</li>
                        <li>Internshala - Web Development Training</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default StudentDashboard;
