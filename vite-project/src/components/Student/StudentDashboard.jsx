import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
    const { id } = useParams(); // Extracting the student ID from the URL parameters
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:5100/students/profile/${id}`);
                // Mock data for demonstration if API call fails or returns null
                setStudentData(response.data.student || {
                    name: "Harshil",
                    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cfd293ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHx8fHwxNzE3NTc2NTc3fDA&ixlib=rb-4.0.3&q=80&w=1080",
                    college: {
                        course: "B.Tech Computer Science",
                        name: "Example Institute of Technology",
                        registrationId: "REG123456"
                    },
                    resume: "https://www.africau.edu/images/default/sample.pdf", // Example PDF link
                    placementStatus: {
                        status: "Eligible",
                        company: "N/A",
                        role: "N/A",
                        ctc: "N/A",
                        interviewDate: "N/A"
                    },
                    appliedJobs: [
                        { company: "Google", date: "2025-05-01", status: "Pending" },
                        { company: "Microsoft", date: "2025-04-15", status: "Interview Scheduled" },
                        { company: "Amazon", date: "2025-03-20", status: "Rejected" }
                    ],
                    skills: ["React", "Node.js", "MongoDB", "Tailwind CSS", "JavaScript"],
                    certifications: ["AWS Certified Developer", "Google IT Support Professional"]
                });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch student data");
                // Fallback to mock data on error as well for demonstration
                setStudentData({
                    name: "Harshil",
                    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cfd293ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHx8fHwxNzE3NTc2NTc3fDA&ixlib=rb-4.0.3&q=80&w=1080",
                    college: {
                        course: "B.Tech Computer Science",
                        name: "Example Institute of Technology",
                        registrationId: "REG123456"
                    },
                    resume: "https://www.africau.edu/images/default/sample.pdf", // Example PDF link
                    placementStatus: {
                        status: "Eligible",
                        company: "N/A",
                        role: "N/A",
                        ctc: "N/A",
                        interviewDate: "N/A"
                    },
                    appliedJobs: [
                        { company: "Google", date: "2025-05-01", status: "Pending" },
                        { company: "Microsoft", date: "2025-04-15", status: "Interview Scheduled" },
                        { company: "Amazon", date: "2025-03-20", status: "Rejected" }
                    ],
                    skills: ["React", "Node.js", "MongoDB", "Tailwind CSS", "JavaScript"],
                    certifications: ["AWS Certified Developer", "Google IT Support Professional"]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex items-center text-indigo-600 text-lg">
                    <svg className="animate-spin h-5 w-5 mr-3 text-indigo-500" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading student data...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="text-red-600 text-lg p-4 bg-red-100 rounded-lg shadow-md">
                    <p className="font-semibold mb-2">Error:</p>
                    <p>{error}</p>
                    <p className="mt-4 text-gray-700">Please try refreshing the page or contact support.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight">
                    Welcome, {studentData.name || "Student"}!
                </h1>

                {/* Profile Section */}
                <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8 border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Information</h2>
                            <p className="text-lg text-gray-700 mb-1">
                                <span className="font-semibold">{studentData.college?.course || "Course N/A"}</span> at{" "}
                                <span className="font-semibold">{studentData.college?.name || "College N/A"}</span>
                            </p>
                            <p className="text-md text-gray-500">
                                Registration ID: <span className="font-mono">{studentData.college?.registrationId || "N/A"}</span>
                            </p>
                        </div>
                        <img
                            src={studentData.photo || "https://via.placeholder.com/100/6366F1/FFFFFF?text=Student"}
                            alt="Profile"
                            className="rounded-full w-28 h-28 object-cover border-4 border-indigo-500 shadow-md transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300">
                        Edit Profile
                    </button>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Resume & Documents */}
                        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resume & Documents</h2>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                {studentData.resume ? (
                                    <a
                                        href={studentData.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center bg-green-600 text-white px-5 py-2 rounded-lg text-center font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300 w-full sm:w-auto"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L16.586 7A2 2 0 0117 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-3a1 1 0 100 2h.01a1 1 0 100-2H7zm-.01 8a1 1 0 00.01 0H7a1 1 0 00-.01 0zm7-5a1 1 0 01-1 1H7a1 1 0 110-2h5a1 1 0 011 1z" clipRule="evenodd" />
                                        </svg>
                                        View Resume
                                    </a>
                                ) : (
                                    <span className="text-gray-500 italic p-2 border border-gray-300 rounded-lg w-full sm:w-auto text-center">Resume not yet uploaded</span>
                                )}
                                <label className="flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 w-full sm:w-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M5.5 13a.5.5 0 01.5-.5h2a.5.5 0 010 1H6a.5.5 0 00-.5.5V15a2 2 0 104 0v-.5a.5.5 0 011 0v.5a3 3 0 11-6 0v-2.5a.5.5 0 01.5-.5z" />
                                        <path d="M12.707 3.293a1 1 0 00-1.414 0L9 5.586 7.707 4.293a1 1 0 00-1.414 0l-2 2a1 1 0 000 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 000-1.414l-2-2z" />
                                    </svg>
                                    Upload New Resume
                                    <input type="file" className="hidden" />
                                </label>
                                <button className="flex items-center justify-center bg-gray-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 w-full sm:w-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 00-1.414 0L3.293 6.586A1 1 0 004 8h12a1 1 0 00.707-1.707L10.707 2.293a1 1 0 00-1.414 0zM10 12a1 1 0 100-2 1 1 0 000 2zM4 16a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    Edit Certificates
                                </button>
                            </div>
                        </section>

                        {/* Placement Status */}
                        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Placement Status</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
                                <p><strong>Status:</strong> <span className="font-medium text-indigo-700">{studentData.placementStatus?.status || "N/A"}</span></p>
                                <p><strong>Company:</strong> <span className="font-medium">{studentData.placementStatus?.company || "N/A"}</span></p>
                                <p><strong>Role:</strong> <span className="font-medium">{studentData.placementStatus?.role || "N/A"}</span></p>
                                <p><strong>CTC:</strong> <span className="font-medium">{studentData.placementStatus?.ctc || "N/A"}</span></p>
                                <p className="md:col-span-2"><strong>Interview Date:</strong> <span className="font-medium">{studentData.placementStatus?.interviewDate || "N/A"}</span></p>
                            </div>
                        </section>

                        {/* Job Opportunities */}
                        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Opportunities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {["Google", "Infosys", "Wipro"].map((company) => (
                                    <div key={company} className="p-5 border border-blue-200 rounded-lg shadow-sm bg-blue-50 hover:bg-blue-100 transition-colors duration-200 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-xl text-indigo-700 mb-1">{company}</h3>
                                            <p className="text-gray-700">Role: <span className="font-medium">Software Engineer</span></p>
                                            <p className="text-gray-600 text-sm">CTC: <span className="font-medium">8 LPA</span></p>
                                        </div>
                                        <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 self-start">
                                            Apply Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        {/* Notifications */}
                        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li className="hover:text-indigo-700 transition-colors duration-200">Resume Review workshop on May 20</li>
                                <li className="hover:text-indigo-700 transition-colors duration-200">Last date to apply for Wipro: May 18</li>
                                <li className="hover:text-indigo-700 transition-colors duration-200">New job posting from TCS!</li>
                            </ul>
                        </section>

                        {/* Upcoming Events */}
                        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li className="hover:text-indigo-700 transition-colors duration-200">Mock Interviews: May 22, 10 AM (Virtual)</li>
                                <li className="hover:text-indigo-700 transition-colors duration-200">Placement Drive - Infosys: May 28, 9 AM (Campus)</li>
                                <li className="hover:text-indigo-700 transition-colors duration-200">Career Counseling Session: June 5</li>
                            </ul>
                        </section>
                    </div>
                </div>

                {/* Application History */}
                <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Application History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-indigo-600 text-white text-left">
                                    <th className="px-4 py-3 font-semibold text-lg">Company</th>
                                    <th className="px-4 py-3 font-semibold text-lg">Date Applied</th>
                                    <th className="px-4 py-3 font-semibold text-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.appliedJobs && studentData.appliedJobs.length > 0 ? (
                                    studentData.appliedJobs.map((job, index) => (
                                        <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition-colors duration-150`}>
                                            <td className="border border-gray-200 px-4 py-3 text-gray-800">{job.company}</td>
                                            <td className="border border-gray-200 px-4 py-3 text-gray-700">{job.date}</td>
                                            <td className="border border-gray-200 px-4 py-3">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                                    ${job.status === "Pending" ? "bg-yellow-200 text-yellow-800" : ""}
                                                    ${job.status === "Interview Scheduled" ? "bg-blue-200 text-blue-800" : ""}
                                                    ${job.status === "Rejected" ? "bg-red-200 text-red-800" : ""}
                                                    ${job.status === "Hired" ? "bg-green-200 text-green-800" : ""}
                                                `}>
                                                    {job.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="border border-gray-200 px-4 py-3 text-gray-500 italic text-center" colSpan="3">No applications yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Skills & Certifications */}
                <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills & Certifications</h2>
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg text-gray-700 mb-3">Skills:</h3>
                        <div className="flex flex-wrap gap-3">
                            {studentData.skills && studentData.skills.length > 0 ? (
                                studentData.skills.map((skill, index) => (
                                    <span key={index} className="bg-indigo-100 text-indigo-800 text-md px-4 py-2 rounded-full shadow-sm hover:bg-indigo-200 transition-colors duration-200">
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500 italic">No skills listed</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700 mb-3">Certifications:</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                            {studentData.certifications && studentData.certifications.length > 0 ? (
                                studentData.certifications.map((certification, index) => (
                                    <li key={index} className="hover:text-indigo-700 transition-colors duration-200">{certification}</li>
                                ))
                            ) : (
                                <li className="text-gray-500 italic">No certifications listed</li>
                            )}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StudentDashboard;