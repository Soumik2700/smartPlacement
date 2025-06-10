import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Uncomment if you have react-router-dom set up for navigation

const HRDashboard = () => {
  // Uncomment and initialize if using react-router-dom
  const navigate = useNavigate();

  // Common Tailwind CSS classes for consistent styling
  const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
  const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
  const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
  const primaryButtonClass = "w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";

  // Mock data structure based on HR model
  const [hrData, setHrData] = useState({
    hrProfile: {
      name: "Jane Doe",
      email: "jane.doe@company.com",
      designation: "Senior HR Manager",
      companyName: "Innovate Solutions Ltd.",
      companyLogo: "https://placehold.co/80x80/6D28D9/FFFFFF?text=ISL", // Slightly different logo color
      contactNumber: "+1-555-123-4567",
      profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHw3fHxhdmF0YXJ8ZW58MHx8fHwxNzE3NTc2NTc3fDA&ixlib=rb-4.0.3&q=80&w=1080"
    },
    jobPosts: [
      {
        _id: "1",
        role: "Software Engineer",
        requiredSkills: ["React", "Node.js", "MongoDB", "AWS"],
        ctc: "8-12 LPA",
        location: "Bangalore",
        eligibilityCriteria: {
          passingYear: 2024,
          branch: ["CSE", "IT"]
        },
        applicationDeadline: "2024-08-15", // Future date for active status
        status: "Active",
        applicants: [
          { id: "A1", name: "Alice Smith", status: "Applied", resume: "https://www.africau.edu/images/default/sample.pdf" },
          { id: "A2", name: "Bob Johnson", status: "Shortlisted", resume: "https://www.africau.edu/images/default/sample.pdf" }
        ]
      },
      {
        _id: "2",
        role: "Data Analyst",
        requiredSkills: ["Python", "SQL", "Tableau"],
        ctc: "6-10 LPA",
        location: "Mumbai",
        eligibilityCriteria: {
          passingYear: 2024,
          branch: ["CSE", "IT", "ECE"]
        },
        applicationDeadline: "2024-01-30", // Past date for expired status
        status: "Expired",
        applicants: [
          { id: "A3", name: "Charlie Brown", status: "Applied", resume: "https://www.africau.edu/images/default/sample.pdf" }
        ]
      },
      {
        _id: "3",
        role: "Product Manager",
        requiredSkills: ["Product Management", "Market Research", "Agile"],
        ctc: "15-20 LPA",
        location: "Hyderabad",
        eligibilityCriteria: {
          passingYear: 2023,
          branch: ["Any"]
        },
        applicationDeadline: "2024-09-20",
        status: "Active",
        applicants: [
          { id: "A4", name: "Diana Prince", status: "Applied", resume: "https://www.africau.edu/images/default/sample.pdf" }
        ]
      }
    ],
    interviews: [
      {
        _id: "1",
        student: "Alice Smith",
        studentId: "A1",
        jobPost: "Software Engineer",
        date: "2024-08-01",
        time: "10:00 AM",
        mode: "Online",
        meetingLink: "https://meet.google.com/xyz",
        feedback: "",
        status: "Scheduled"
      },
      {
        _id: "2",
        student: "Bob Johnson",
        studentId: "A2",
        jobPost: "Software Engineer",
        date: "2024-07-28",
        time: "02:00 PM",
        mode: "Offline",
        meetingLink: "",
        feedback: "Strong technical skills, good cultural fit. Recommended.",
        status: "Completed"
      }
    ],
    notifications: [
      {
        _id: "1",
        message: "Your job post for 'Software Engineer' is performing well.",
        type: "System",
        date: "2024-07-10"
      },
      {
        _id: "2",
        message: "New application for 'Product Manager' role received.",
        type: "Application Update",
        date: "2024-07-05"
      },
      {
        _id: "3",
        message: "Upcoming interview for Alice Smith on Aug 1st.",
        type: "Reminder",
        date: "2024-07-25"
      }
    ],
    summary: {
      totalJobs: 3,
      totalApplicants: 25,
      shortlistedCount: 12,
      selectedCount: 5
    }
  });

  const [activeSection, setActiveSection] = useState('overview');

  // Utility function for consistent table headers
  const renderTableHeader = (headers) => (
    <thead>
      <tr className="bg-purple-700 text-white text-left"> {/* Changed color to purple */}
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

  // Logout function
  const handleLogout = () => {

    localStorage.removeItem("hrData");
    localStorage.removeItem("hrToken");
    console.log("HR User logged out!");
    // In a real application, you would:
    // localStorage.removeItem('hrAuthToken');
    navigate('/HrLogin'); // Redirect to HR login page
  };


  // --- Section Render Functions ---

  // HR Profile Section
  const renderHRProfileSection = () => (
    <div className={`${cardBaseClass} col-span-full md:col-span-2 lg:col-span-1`}>
      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={hrData.hrProfile.profilePhoto || "https://placehold.co/100x100/A78BFA/FFFFFF?text=HR"}
          alt="HR Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-md mb-4"
        />
        <img
          src={hrData.hrProfile.companyLogo || "https://placehold.co/80x80/6D28D9/FFFFFF?text=Company"}
          alt="Company Logo"
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-300 mb-4"
        />
        <h2 className="text-3xl font-extrabold text-purple-800 mb-2">Welcome, {hrData.hrProfile.name}!</h2>
        <p className="text-lg text-gray-700">{hrData.hrProfile.designation}</p>
        <p className="text-md text-gray-600">at {hrData.hrProfile.companyName}</p>
      </div>
      <div className="text-center space-y-2 text-gray-700 mb-6">
        <p><span className="font-semibold">Email:</span> {hrData.hrProfile.email}</p>
        <p><span className="font-semibold">Contact:</span> {hrData.hrProfile.contactNumber}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button className={primaryButtonClass.replace('w-full', 'w-auto')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
          Edit Profile
        </button>
        <button className={secondaryButtonClass.replace('w-full', 'w-auto')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
          Change Password
        </button>
      </div>
    </div>
  );

  // Analytics/Summary
  const renderAnalyticsSummary = () => (
    <div className={`${cardBaseClass} col-span-1 md:col-span-2 lg:col-span-2`}>
      <h2 className={sectionTitleClass}>Analytics Summary</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-purple-100 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-purple-700 mb-1">{hrData.summary.totalJobs}</div>
          <p className="text-gray-700 text-sm">Total Jobs Posted</p>
        </div>
        <div className="text-center p-4 bg-green-100 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-green-700 mb-1">{hrData.summary.totalApplicants}</div>
          <p className="text-gray-700 text-sm">Total Applicants</p>
        </div>
        <div className="text-center p-4 bg-yellow-100 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-yellow-700 mb-1">{hrData.summary.shortlistedCount}</div>
          <p className="text-gray-700 text-sm">Shortlisted</p>
        </div>
        <div className="text-center p-4 bg-blue-100 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-blue-700 mb-1">{hrData.summary.selectedCount}</div>
          <p className="text-gray-700 text-sm">Selected Candidates</p>
        </div>
      </div>
    </div>
  );

  // Post Job Opening
  const renderPostJobOpening = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Post New Job Opening</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Job Role (e.g., Software Engineer)"
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Required Skills (e.g., React, Node.js, MongoDB)"
          className={inputClass}
        />
        <input
          type="text"
          placeholder="CTC (e.g., 8-12 LPA)"
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Location (e.g., Bangalore)"
          className={inputClass}
        />
        <input
          type="number"
          placeholder="Min Passing Year (e.g., 2024)"
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Eligible Branches (e.g., CSE, IT, ECE)"
          className={inputClass}
        />
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Application Deadline:</label>
        <input
          id="deadline"
          type="date"
          className={inputClass}
        />
        <button
          type="submit"
          className={primaryButtonClass}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Post Job
        </button>
      </form>
    </div>
  );

  // Manage Job Posts
  const renderManageJobPosts = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Manage Job Posts</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {hrData.jobPosts.map((job) => (
          <div key={job._id} className="border border-gray-200 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-gray-800">{job.role}</h3>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full
                ${job.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}
              `}>
                {job.status}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Skills:</span> {job.requiredSkills.join(', ')}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">CTC:</span> {job.ctc} | <span className="font-medium">Location:</span> {job.location}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              <span className="font-medium">Applicants:</span> {job.applicants.length}
            </p>
            <div className="flex flex-wrap gap-2">
              {renderActionButton("Edit", () => console.log(`Edit job ${job.role}`), "bg-purple-500 text-white")} {/* Changed to purple */}
              {renderActionButton("Delete", () => console.log(`Delete job ${job.role}`), "bg-red-500 text-white")}
              {renderActionButton("View Applicants", () => console.log(`View applicants for ${job.role}`), "bg-blue-500 text-white")}
              {job.status === 'Active' ? (
                renderActionButton("Close", () => console.log(`Close job ${job.role}`), "bg-gray-500 text-white")
              ) : (
                renderActionButton("Reopen", () => console.log(`Reopen job ${job.role}`), "bg-green-500 text-white")
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // View Applications
  const renderViewApplications = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>View Applications</h2>
      <div className="space-y-4">
        <select className={inputClass}>
          <option value="">Filter by Role</option>
          {hrData.jobPosts.map((job) => (
            <option key={job._id} value={job._id}>{job.role}</option>
          ))}
        </select>
        <select className={inputClass}>
          <option value="">Filter by Status</option>
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button className={primaryButtonClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          View Applications
        </button>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          {renderTableHeader(["Applicant Name", "Job Role", "Status", "Resume", "Actions"])}
          <tbody>
            {/* Flatten applicants from all job posts for display */}
            {hrData.jobPosts.flatMap(job => job.applicants.map(applicant => ({
              ...applicant,
              jobRole: job.role,
              jobId: job._id
            }))).length > 0 ? (
              hrData.jobPosts.flatMap(job => job.applicants.map(applicant => ({
                ...applicant,
                jobRole: job.role,
                jobId: job._id
              }))).map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-200 px-4 py-3 text-gray-800">{applicant.name}</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">{applicant.jobRole}</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${applicant.status === 'Applied' ? 'bg-blue-100 text-blue-800' : ''}
                        ${applicant.status === 'Shortlisted' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${applicant.status === 'Placed' ? 'bg-green-100 text-green-800' : ''}
                        ${applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {applicant.resume ? (
                      <a href={applicant.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View Resume</a>
                    ) : (
                      <span className="text-gray-500 italic text-sm">N/A</span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {renderActionButton("Shortlist", () => console.log(`Shortlist ${applicant.name}`), "bg-green-500 text-white")}
                      {renderActionButton("Reject", () => console.log(`Reject ${applicant.name}`), "bg-red-500 text-white")}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-200 px-4 py-3 text-center text-gray-500 italic">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Schedule Interviews (Form)
  const renderScheduleInterviews = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Schedule Interviews</h2>
      <form className="space-y-4">
        <select className={inputClass}>
          <option value="">Select Job Post</option>
          {hrData.jobPosts.map((job) => (
            <option key={job._id} value={job._id}>{job.role}</option>
          ))}
        </select>
        <input type="text" placeholder="Student Name/ID" className={inputClass} />
        <input
          type="date"
          className={inputClass}
        />
        <input
          type="time"
          className={inputClass}
        />
        <select className={inputClass}>
          <option value="">Select Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
        <input
          type="url"
          placeholder="Meeting Link (for online interviews)"
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Interview Panel (e.g., Technical Round 1)"
          className={inputClass}
        />
        <button
          type="submit"
          className={primaryButtonClass}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Schedule Interview
        </button>
      </form>
    </div>
  );

  // Interview Management (Table)
  const renderInterviewManagement = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Interview Management</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {hrData.interviews.map((interview) => (
          <div key={interview._id} className="border border-gray-200 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-gray-800">Interview for: {interview.jobPost}</h3>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full
                ${interview.status === 'Scheduled' ? 'bg-blue-200 text-blue-800' :
                  interview.status === 'Completed' ? 'bg-green-200 text-green-800' :
                    'bg-red-200 text-red-800'}
              `}>
                {interview.status}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Student:</span> {interview.student}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Date & Time:</span> {interview.date} at {interview.time}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Mode:</span> {interview.mode}
            </p>
            {interview.meetingLink && (
              <p className="text-sm text-gray-700 mb-3">
                <span className="font-medium">Meeting Link:</span>
                <a href={interview.meetingLink} className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  Join Meeting
                </a>
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {renderActionButton("Edit", () => console.log(`Edit interview ${interview._id}`), "bg-purple-500 text-white")} {/* Changed to purple */}
              {renderActionButton("Add Feedback", () => console.log(`Add feedback for ${interview._id}`), "bg-yellow-500 text-white")}
              {renderActionButton("Cancel", () => console.log(`Cancel interview ${interview._id}`), "bg-red-500 text-white")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Send Notifications
  const renderSendNotifications = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Send Notifications</h2>
      <div className="space-y-4">
        <textarea
          className={`${inputClass} min-h-[100px]`}
          rows="3"
          placeholder="Write message or announcement to students/TPOs..."
        />
        <select className={inputClass}>
          <option value="">Target Audience</option>
          <option value="All Students">All Students</option>
          <option value="TPOs">TPOs</option>
          <option value="Specific Job Applicants">Specific Job Applicants</option>
        </select>
        <button className={primaryButtonClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          Send Notification
        </button>
      </div>
      <h3 className="font-semibold text-lg text-gray-700 mt-6 mb-3">Recent Notifications:</h3>
      <ul className="list-disc pl-5 text-gray-700 space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
        {hrData.notifications.length > 0 ? (
          hrData.notifications.map((notification) => (
            <li key={notification._id} className="text-sm hover:text-indigo-700 transition-colors duration-200">
              <span className="font-medium">{notification.date}:</span> {notification.message}
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">No recent notifications.</li>
        )}
      </ul>
    </div>
  );

  // Determine which section to render
  const renderActiveSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderHRProfileSection();
      case 'overview':
        return renderAnalyticsSummary();
      case 'post-job':
        return renderPostJobOpening();
      case 'manage-jobs':
        return renderManageJobPosts();
      case 'view-applications':
        return renderViewApplications();
      case 'schedule-interviews':
        return renderScheduleInterviews();
      case 'manage-interviews':
        return renderInterviewManagement();
      case 'notifications':
        return renderSendNotifications();
      default:
        return renderAnalyticsSummary(); // Default to overview
    }
  };

  const menuItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-9v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'profile', name: 'My Profile', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { id: 'post-job', name: 'Post New Job', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
    { id: 'manage-jobs', name: 'Manage Job Posts', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
    { id: 'view-applications', name: 'View Applications', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    { id: 'schedule-interviews', name: 'Schedule Interview', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M7 15h.01M17 12h.01M17 15h.01M12 17h.01M12 21V3" /></svg> },
    { id: 'manage-interviews', name: 'Manage Interviews', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
    { id: 'notifications', name: 'Send Notifications', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-900">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Navigation - Adjusted color for subtle difference */}
        <aside className="w-full lg:w-64 bg-purple-800 text-white p-6 lg:p-8 shadow-2xl flex-shrink-0"> {/* Changed to purple-800 */}
          <div className="flex items-center justify-between lg:justify-start mb-8">
            <img
              src={hrData.hrProfile.companyLogo}
              alt="Company Logo"
              className="w-12 h-12 rounded-full border-2 border-white mr-3"
            />
            <h2 className="text-2xl font-bold text-white hidden lg:block">HR Portal</h2>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200
                  ${activeSection === item.id ? 'bg-purple-700 text-white shadow-md' : 'hover:bg-purple-700 hover:bg-opacity-75 text-purple-200'} {/* Changed to purple */}
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
                {menuItems.find(item => item.id === activeSection)?.name}
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
          background: #d1baff; /* Lighter purple for scrollbar */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b197ed; /* Slightly darker on hover */
        }
      `}</style>
    </div>
  );
};

export default HRDashboard;
