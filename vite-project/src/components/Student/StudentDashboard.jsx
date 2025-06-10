import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Keeping axios import for potential future API integration

const StudentDashboard = () => {
    const { id } = useParams(); // Extracting the student ID from the URL parameters
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    // State for LLM features
    const [llmLoading, setLlmLoading] = useState(false);
    const [llmError, setLlmError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");

    // Common Tailwind CSS classes for consistent styling
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200"; // Changed focus ring color to cyan
    const primaryButtonClass = "w-full bg-cyan-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center"; // Changed button color to cyan
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";

    // Dummy data (expanded for more sections and LLM integration)
    const [mockStudentData] = useState({
        profile: {
            name: "Harshil Patel",
            photo: "https://images.unsplash.com/photo-1535713875002-d1d0cfd293ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHx8fHwxNzE3NTc2NTc3fDA&ixlib=rb-4.0.3&q=80&w=1080",
            college: {
                course: "B.Tech Computer Science",
                name: "Innovate Institute of Technology",
                registrationId: "IIT2021CSE007",
                logo: "https://placehold.co/80x80/2DD4BF/FFFFFF?text=IIT" // Teal-ish logo
            },
            email: "harshil.patel@example.edu",
            phone: "+91-9876543210"
        },
        resume: "https://www.africau.edu/images/default/sample.pdf", // Example PDF link
        experience: [ // Added mock experience for better resume suggestions
            { title: "Software Development Intern", company: "TechCorp", duration: "Jan 2024 - Present", description: "Developed user interfaces using React and Tailwind CSS. Implemented RESTful APIs with Node.js." },
            { title: "Data Analysis Project", company: "College Project", duration: "Oct 2023", description: "Analyzed sales data using Python and SQL, creating dashboards with Tableau." }
        ],
        placementStatus: {
            status: "Eligible",
            company: "N/A",
            role: "N/A",
            ctc: "N/A",
            interviewDate: "N/A"
        },
        jobOpportunities: [
            { id: 1, company: "Google", role: "Software Engineer Intern", ctc: "50k/month stipend", location: "Bangalore", deadline: "2024-08-01", description: "Develop and maintain web applications for Google's core products. Collaborate with cross-functional teams. Strong understanding of data structures and algorithms is required. Experience with distributed systems a plus." },
            { id: 2, company: "Microsoft", role: "Data Scientist Intern", ctc: "45k/month stipend", location: "Hyderabad", deadline: "2024-07-25", description: "Work on large datasets to extract insights. Build predictive models using machine learning techniques. Proficiency in Python and SQL is essential. Experience with cloud platforms like Azure is beneficial." },
            { id: 3, company: "Amazon", role: "Cloud Support Associate", ctc: "7 LPA", location: "Remote", deadline: "2024-07-30", description: "Provide technical support to AWS customers. Troubleshoot cloud-related issues. Basic understanding of networking and Linux is required." },
            { id: 4, company: "TCS", role: "Associate Developer", ctc: "3.5 LPA", location: "Pune", deadline: "2024-07-20", description: "Participate in software development lifecycle. Write clean, efficient code. Familiarity with Java or Python preferred." },
        ],
        appliedJobs: [
            { id: 1, company: "Google", date: "2024-06-20", status: "Pending", role: "Software Engineer Intern" },
            { id: 2, company: "Microsoft", date: "2024-06-15", status: "Interview Scheduled", role: "Data Scientist Intern" },
            { id: 3, company: "Amazon", date: "2024-06-10", status: "Rejected", role: "Cloud Support Associate" }
        ],
        skills: ["React", "Node.js", "Python", "SQL", "Tailwind CSS", "JavaScript", "AWS", "Machine Learning", "Data Structures", "Algorithms"],
        certifications: ["AWS Certified Cloud Practitioner", "Google IT Support Professional", "IBM Data Science Professional Certificate"],
        notifications: [
            { id: 1, message: "New job alert: 'Cloud Support Associate' at Amazon!", date: "2024-07-01" },
            { id: 2, message: "Reminder: Interview for Microsoft on 2024-06-25.", date: "2024-06-23" },
            { id: 3, message: "Resume Review workshop on 2024-07-10.", date: "2024-06-28" }
        ],
        upcomingEvents: [
            { id: 1, name: "Mock Interview Session", date: "2024-07-15", time: "10:00 AM", location: "Virtual (Google Meet)" },
            { id: 2, name: "Infosys Placement Drive", date: "2024-08-05", time: "09:00 AM", location: "College Auditorium" }
        ]
    });


    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                // In a real application, you'd fetch from an API like this:
                // const response = await axios.get(`http://localhost:5100/students/profile/${id}`);
                // setStudentData(response.data.student);

                // For now, we'll just use the mock data after a delay to simulate loading
                setTimeout(() => {
                    setStudentData(mockStudentData);
                    setLoading(false);
                }, 1000); // Simulate API call delay
            } catch (err) {
                // setError(err.response?.data?.message || "Failed to fetch student data");
                // Fallback to mock data on error as well for demonstration
                setStudentData(mockStudentData);
                setLoading(false);
                console.error("Error fetching data, using mock data:", err);
            }
        };

        fetchStudentData();
    }, [id, mockStudentData]); // Added mockStudentData to dependencies to ensure it's available

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentData");
        console.log("User logged out!");
        navigate("/StudentLogin"); // Redirect to login page after logout
    };

    // State for active section in the sidebar
    const [activeSection, setActiveSection] = useState('overview');

    // Utility function for consistent table headers
    const renderTableHeader = (headers) => (
        <thead>
            <tr className="bg-cyan-700 text-white text-left"> {/* Changed color to cyan */}
                {headers.map((header, index) => (
                    <th key={index} className="px-4 py-3 font-semibold text-lg">{header}</th>
                ))}
            </tr>
        </thead>
    );

    // Helper function to render action buttons
    const renderActionButton = (text, onClick, colorClass, iconPath = null) => (
        <button onClick={onClick} className={`${colorClass} px-3 py-1 rounded-full text-xs hover:scale-105 transition-transform duration-200 flex items-center gap-1`}>
            {iconPath && <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">{iconPath}</svg>}
            {text}
        </button>
    );

    // --- LLM Integration Functions ---

    const generateLlmResponse = async (prompt, title) => {
        setLlmLoading(true);
        setLlmError(null);
        setModalTitle(title);
        setModalContent("Generating response...");
        setShowModal(true);

        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

        const payload = { contents: chatHistory };
        const apiKey = ""; // Keep this empty, Canvas will inject the key at runtime
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setModalContent(text);
            } else {
                setModalContent("Sorry, I couldn't generate a response. Please try again.");
                setLlmError("Unexpected API response structure.");
            }
        } catch (err) {
            setModalContent("An error occurred while connecting to the AI. Please try again.");
            setLlmError(err.message || "Failed to fetch from Gemini API.");
            console.error("Gemini API Error:", err);
        } finally {
            setLlmLoading(false);
        }
    };

    const handleResumeImprovement = () => {
        if (!studentData) return;

        const skillsList = studentData.skills.join(', ');
        const certificationsList = studentData.certifications.length > 0 ? studentData.certifications.join(', ') : 'None';
        const experienceSummary = studentData.experience.map(exp => `${exp.title} at ${exp.company} (${exp.duration}): ${exp.description}`).join('\n');

        const prompt = `I am a student with the following skills: ${skillsList}. My certifications include: ${certificationsList}. Here's a summary of my experience:\n${experienceSummary}\n\nBased on this information, provide actionable suggestions to improve my resume for a Software Engineer Intern role. Focus on keywords, highlighting achievements, and structural improvements. Provide a concise bulleted list of 5-7 suggestions.`;

        generateLlmResponse(prompt, "✨ Resume Improvement Suggestions");
    };

    const handleGenerateInterviewQuestions = (jobRole, skills) => {
        if (!jobRole || !skills || skills.length === 0) {
            setModalTitle("Cannot Generate Questions");
            setModalContent("Please select a job opportunity with defined skills to generate interview questions.");
            setShowModal(true);
            return;
        }
        const skillsList = skills.join(', ');
        const prompt = `Generate 5 common technical interview questions for a ${jobRole} role, considering my skills are: ${skillsList}. Also, include 2 behavioral questions relevant to this role. Format as a numbered list.`;

        generateLlmResponse(prompt, `✨ Mock Interview Questions for ${jobRole}`);
    };


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

    // --- Section Render Functions ---

    // Overview / Analytics Section (Simple for student)
    const renderOverview = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg text-center shadow-md">
                <h3 className="text-4xl font-extrabold text-blue-700">Applied</h3>
                <p className="text-gray-700 text-lg">{studentData.appliedJobs.length} Jobs</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg text-center shadow-md">
                <h3 className="text-4xl font-extrabold text-green-700">Placed</h3>
                <p className="text-gray-700 text-lg">{studentData.placementStatus.status === "Placed" ? 1 : 0} Job</p> {/* Simplified for mock */}
            </div>
            <div className="bg-purple-100 p-6 rounded-lg text-center shadow-md">
                <h3 className="text-4xl font-extrabold text-purple-700">Opportunities</h3>
                <p className="text-gray-700 text-lg">{studentData.jobOpportunities.length} Available</p>
            </div>
        </div>
    );

    // Profile Section
    const renderProfileSection = () => (
        <section className={`${cardBaseClass} col-span-full`}>
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 mb-6">
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Information</h2>
                    <p className="text-lg text-gray-700 mb-1">
                        <span className="font-semibold">{studentData.profile.college?.course || "Course N/A"}</span> at{" "}
                        <span className="font-semibold">{studentData.profile.college?.name || "College N/A"}</span>
                    </p>
                    <p className="text-md text-gray-500">
                        Registration ID: <span className="font-mono">{studentData.profile.college?.registrationId || "N/A"}</span>
                    </p>
                    <p className="text-md text-gray-500">
                        Email: <span className="font-medium">{studentData.profile.email}</span>
                    </p>
                    <p className="text-md text-gray-500">
                        Phone: <span className="font-medium">{studentData.profile.phone}</span>
                    </p>
                </div>
                <img
                    src={studentData.profile.photo || "https://placehold.co/100/6366F1/FFFFFF?text=Student"}
                    alt="Profile"
                    className="rounded-full w-28 h-28 object-cover border-4 border-cyan-500 shadow-md transform hover:scale-105 transition-transform duration-300"
                />
            </div>
            <button className={primaryButtonClass.replace('w-full', 'w-auto')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                Edit Profile
            </button>
        </section>
    );

    // Resume & Documents
    const renderResumeDocuments = () => (
        <section className={cardBaseClass}>
            <h2 className={sectionTitleClass}>Resume & Documents</h2>
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
            </div>
            <button
                onClick={handleResumeImprovement}
                className={`${primaryButtonClass.replace('w-full', 'w-auto')} mt-6`}
                disabled={llmLoading}
            >
                {llmLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                    <span className="mr-2">✨</span>
                )}
                Get Resume Tips
            </button>
        </section>
    );

    // Placement Status
    const renderPlacementStatus = () => (
        <section className={cardBaseClass}>
            <h2 className={sectionTitleClass}>Placement Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
                <p><strong>Status:</strong> <span className="font-medium text-cyan-700">{studentData.placementStatus?.status || "N/A"}</span></p> {/* Changed text color */}
                <p><strong>Company:</strong> <span className="font-medium">{studentData.placementStatus?.company || "N/A"}</span></p>
                <p><strong>Role:</strong> <span className="font-medium">{studentData.placementStatus?.role || "N/A"}</span></p>
                <p><strong>CTC:</strong> <span className="font-medium">{studentData.placementStatus?.ctc || "N/A"}</span></p>
                <p className="md:col-span-2"><strong>Interview Date:</strong> <span className="font-medium">{studentData.placementStatus?.interviewDate || "N/A"}</span></p>
            </div>
        </section>
    );

    // Job Opportunities
    const renderJobOpportunities = () => (
        <section className={cardBaseClass}>
            <h2 className={sectionTitleClass}>Job Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentData.jobOpportunities.length > 0 ? (
                    studentData.jobOpportunities.map((job) => (
                        <div key={job.id} className="p-5 border border-cyan-200 rounded-lg shadow-sm bg-cyan-50 hover:bg-cyan-100 transition-colors duration-200 flex flex-col justify-between"> {/* Changed border and background colors */}
                            <div>
                                <h3 className="font-bold text-xl text-cyan-700 mb-1">{job.company}</h3> {/* Changed text color */}
                                <p className="text-gray-700">Role: <span className="font-medium">{job.role}</span></p>
                                <p className="text-gray-600 text-sm">CTC: <span className="font-medium">{job.ctc}</span></p>
                                <p className="text-gray-600 text-sm">Location: <span className="font-medium">{job.location}</span></p>
                                <p className="text-gray-600 text-sm">Deadline: <span className="font-medium">{job.deadline}</span></p>
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                <button className={`${primaryButtonClass.replace('w-full', 'w-auto')} self-start`}> {/* Replaced w-full with w-auto and added self-start */}
                                    Apply Now
                                </button>
                                <button
                                    onClick={() => handleGenerateInterviewQuestions(job.role, studentData.skills)}
                                    className={`${secondaryButtonClass.replace('w-full', 'w-auto')} self-start`}
                                    disabled={llmLoading}
                                >
                                    {llmLoading ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-gray-700" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        <span className="mr-2">✨</span>
                                    )}
                                    Generate Interview Qs
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic col-span-full">No new job opportunities at the moment.</p>
                )}
            </div>
        </section>
    );

    // Application History
    const renderApplicationHistory = () => (
        <section className={cardBaseClass}>
            <h2 className={sectionTitleClass}>Application History</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    {renderTableHeader(["Company", "Role", "Date Applied", "Status"])}
                    <tbody>
                        {studentData.appliedJobs && studentData.appliedJobs.length > 0 ? (
                            studentData.appliedJobs.map((job) => (
                                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-200 px-4 py-3 text-gray-800">{job.company}</td>
                                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{job.role}</td>
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
                                <td className="border border-gray-200 px-4 py-3 text-gray-500 italic text-center" colSpan="4">No applications yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );

    // Skills & Certifications
    const renderSkillsCertifications = () => (
        <section className={cardBaseClass}>
            <h2 className={sectionTitleClass}>Skills & Certifications</h2>
            <div className="mb-6">
                <h3 className="font-semibold text-lg text-gray-700 mb-3">Skills:</h3>
                <div className="flex flex-wrap gap-3">
                    {studentData.skills && studentData.skills.length > 0 ? (
                        studentData.skills.map((skill, index) => (
                            <span key={index} className="bg-cyan-100 text-cyan-800 text-md px-4 py-2 rounded-full shadow-sm hover:bg-cyan-200 transition-colors duration-200"> {/* Changed colors to cyan */}
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
                            <li key={index} className="hover:text-cyan-700 transition-colors duration-200">{certification}</li>
                        ))
                    ) : (
                        <li className="text-gray-500 italic">No certifications listed</li>
                    )}
                </ul>
                <button className={`${secondaryButtonClass.replace('w-full', 'w-auto')} mt-4`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 00-1.414 0L3.293 6.586A1 1 0 004 8h12a1 1 0 00.707-1.707L10.707 2.293a1 1 0 00-1.414 0zM10 12a1 1 0 100-2 1 1 0 000 2zM4 16a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Edit Certificates
                </button>
            </div>
        </section>
    );

    // Notifications
    const renderNotifications = () => (
        <section className={cardBaseClass}>
            <h2 className={sectionTitleClass}>Notifications</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {studentData.notifications.length > 0 ? (
                    studentData.notifications.map((notification) => (
                        <li key={notification.id} className="hover:text-cyan-700 transition-colors duration-200"> {/* Changed hover color to cyan */}
                            <span className="font-medium">{notification.date}:</span> {notification.message}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500 italic">No new notifications.</li>
                )}
            </ul>
        </section>
    );

    // Upcoming Events
    const renderUpcomingEvents = () => (
        <section className={cardBaseClass}>
            <h2 className={sectionTitleClass}>Upcoming Events</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {studentData.upcomingEvents.length > 0 ? (
                    studentData.upcomingEvents.map((event) => (
                        <li key={event.id} className="hover:text-cyan-700 transition-colors duration-200"> {/* Changed hover color to cyan */}
                            <span className="font-medium">{event.name}:</span> {event.date}, {event.time} ({event.location})
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500 italic">No upcoming events.</li>
                )}
            </ul>
        </section>
    );

    // Determine which section to render
    const renderActiveSectionContent = () => {
        switch (activeSection) {
            case 'overview':
                return renderOverview();
            case 'profile':
                return renderProfileSection();
            case 'resume-documents':
                return renderResumeDocuments();
            case 'placement-status':
                return renderPlacementStatus();
            case 'job-opportunities':
                return renderJobOpportunities();
            case 'application-history':
                return renderApplicationHistory();
            case 'skills-certifications':
                return renderSkillsCertifications();
            case 'notifications':
                return renderNotifications();
            case 'upcoming-events':
                return renderUpcomingEvents();
            default:
                return renderOverview();
        }
    };

    const menuItems = [
        { id: 'overview', name: 'Dashboard Overview', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-9v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
        { id: 'profile', name: 'My Profile', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
        { id: 'resume-documents', name: 'Resume & Documents', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { id: 'placement-status', name: 'Placement Status', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c.045 4.106 1.948 7.72 4.766 10.053l4.566-4.566c.112-.112.28-.112.392 0l4.566 4.566A12.001 12.001 0 0021.056 12c0-2.818-1.903-5.385-4.618-7.016z" /></svg> },
        { id: 'job-opportunities', name: 'Job Opportunities', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.565 23.565 0 0112 15c-1.637 0-3.21-.059-4.755-.172m.002 0c-.822-.447-1.424-1.28-1.424-2.204v-2.003c0-.86.602-1.633 1.424-2.046a23.565 23.565 0 014.755-.172m0 0a2.502 2.502 0 012.506 2.506V12a2.502 2.502 0 01-2.506 2.506zm-1.414-2.506v1.92m0 2.5v1.92m0 1.92V21m-1.92-2.5H6.5m2.5-1.92h-1.92m-1.92-1.92H3.5" /></svg> },
        { id: 'application-history', name: 'Application History', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
        { id: 'skills-certifications', name: 'Skills & Certifications', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.205 5 7.5 5A2.5 2.5 0 005 7.5c0 1.362.83 2.625 2.123 3.122m-1.233 1.5l.829 2.5A2.5 2.5 0 007.5 17c1.362 0 2.625-.83 3.122-2.123m-1.233-1.5H12m8.75-8.753A9.001 9.001 0 0012 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.62-.07-1.22-.207-1.793z" /></svg> },
        { id: 'notifications', name: 'Notifications', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
        { id: 'upcoming-events', name: 'Upcoming Events', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M7 15h.01M17 12h.01M17 15h.01M12 17h.01M12 21V3" /></svg> },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-900">
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar Navigation - Student Specific Color */}
                <aside className="w-full lg:w-64 bg-cyan-800 text-white p-6 lg:p-8 shadow-2xl flex-shrink-0"> {/* Changed to cyan-800 */}
                    <div className="flex items-center justify-between lg:justify-start mb-8">
                        <img
                            src={studentData.profile.college.logo}
                            alt="College Logo"
                            className="w-12 h-12 rounded-full border-2 border-white mr-3"
                        />
                        <h2 className="text-2xl font-bold text-white hidden lg:block">Student Portal</h2>
                    </div>
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200
                  ${activeSection === item.id ? 'bg-cyan-700 text-white shadow-md' : 'hover:bg-cyan-700 hover:bg-opacity-75 text-cyan-200'} {/* Changed to cyan */}
                `}
                            >
                                {item.icon}
                                <span className="font-medium text-lg">{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-grow p-6 sm:p-10">
                    <div className="max-w-full lg:max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight">
                                Welcome, {studentData.profile.name || "Student"}!
                            </h1>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>

                        {/* Render the active section content */}
                        {renderActiveSectionContent()}
                    </div>
                </main>
            </div>

            {/* Modal for LLM Responses */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{modalTitle}</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        {llmLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <svg className="animate-spin h-8 w-8 text-cyan-600 mr-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <p className="text-lg text-gray-700">Generating...</p>
                            </div>
                        ) : (
                            <div className="prose max-w-none text-gray-700">
                                {modalContent.split('\n').map((line, index) => (
                                    <p key={index} className="mb-2">{line}</p>
                                ))}
                                {llmError && <p className="text-red-500 mt-4">Error: {llmError}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* Custom scrollbar style for better overflow appearance */}
            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6DABD1; /* Slightly lighter cyan for scrollbar */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4A90B2; /* Slightly darker on hover */
        }
      `}</style>
        </div>
    );
};

export default StudentDashboard;
