import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Uncomment if you have react-router-dom set up 
// for navigation
import Profile from "./Profile";
import AnalyticsSummary from "./AnalyticsSummary";
import PostJobOpenings from "./PostJobOpenings";
import ManageJobPosts from "./ManageJobPosts";
import ViewApplications from "./ViewApplications";
import ScheduleInterview from "./ScheduleInterview";
import InterviewManagement from "./InterviewManagement";
import SendNotifications from "./SendNotifications";

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

  const [jobFormData, setJobFormData] = useState({
    role: "",
    requiredSkills: "",
    ctc: "",
    location: "",
    eligibilityCriteria: {
      passingYear: "",
      branch: ""
    },
    applicationDeadline: ""
  });

  const [activeSection, setActiveSection] = useState('overview');
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    // Add other fields as needed
  });
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);

  //job posts
  const [jobPosts, setJobPosts] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState(null);

  // Replace with actual HR id (from auth, context, etc.)
  const hrId = useParams().id;

  const fetchJobPosts = async () => {
    setLoadingJobs(true);
    setJobsError(null);
    
    try {
      const response = await fetch(`http://localhost:5100/hr/job-posts/${hrId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        setJobPosts(result.data.jobPosts || []);
      } else {
        setJobsError(result.message || 'Failed to fetch job posts');
      }
    } catch (error) {
      console.error('Error fetching job posts:', error);
      setJobsError('Network error. Please try again.');
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    if (activeSection === 'manage-jobs') {
      fetchJobPosts();
    }
  }, [activeSection, hrId]);
  

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

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // --- Section Render Functions ---

  // HR Profile Section

  // Analytics/Summary

  // Post Job Opening
  // Post Job Opening - Updated with API integration
  const handleJobFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'passingYear') {
      setJobFormData(prev => ({
        ...prev,
        eligibilityCriteria: {
          ...prev.eligibilityCriteria,
          passingYear: value
        }
      }));
    } else if (name === 'branch') {
      setJobFormData(prev => ({
        ...prev,
        eligibilityCriteria: {
          ...prev.eligibilityCriteria,
          branch: value
        }
      }));
    } else {
      setJobFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleJobPostSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    setPostError(null);
    setPostSuccess(false);

    try {
      const jobPostData = {
        role: jobFormData.role,
        requiredSkills: jobFormData.requiredSkills.split(',').map(skill => skill.trim()),
        ctc: jobFormData.ctc,
        location: jobFormData.location,
        eligibilityCriteria: {
          passingYear: parseInt(jobFormData.eligibilityCriteria.passingYear),
          branch: jobFormData.eligibilityCriteria.branch.split(',').map(branch => branch.trim())
        },
        applicationDeadline: jobFormData.applicationDeadline ? new Date(jobFormData.applicationDeadline).toISOString() : null
      };

      const response = await fetch(`http://localhost:5100/hr/job-post/${hrId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobPostData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPostSuccess(true);
        setJobFormData({
          role: "",
          requiredSkills: "",
          ctc: "",
          location: "",
          eligibilityCriteria: {
            passingYear: "",
            branch: ""
          },
          applicationDeadline: ""
        });

        setTimeout(() => {
          setPostSuccess(false);
        }, 3000);
      } else {
        setPostError(result.message || 'Failed to post job');
      }

    } catch (error) {
      console.error('Error posting job:', error);
      setPostError('Network error. Please try again.');
    } finally {
      setPosting(false);
    }
  };



  // Manage Job Posts

  // View Applications
  

  // Schedule Interviews (Form)

  // Interview Management (Table)


  // Send Notifications
  
  // Determine which section to render
  const renderActiveSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile hrData={hrData}/>;
      case 'overview':
        return <AnalyticsSummary hrData={hrData} />;
      case 'post-job':
        return <PostJobOpenings 
                  postSuccess = {postSuccess} 
                  postError = {postError} 
                  handleJobPostSubmit = {handleJobPostSubmit}
                  jobFormData = {jobFormData}
                  handleJobFormChange = {handleJobFormChange}
                  posting = {posting}
                />;
      case 'manage-jobs':
        return <ManageJobPosts 
                  fetchJobPosts={fetchJobPosts}
                  jobPosts={jobPosts}
                  jobsError={jobsError}
                  loadingJobs={loadingJobs}
                  renderActionButton = {renderActionButton}
                />;
      case 'view-applications':
        return <ViewApplications 
                  hrData={hrData} 
                  renderTableHeader={renderTableHeader} 
                  renderActionButton={renderActionButton} 
                /> ;
      case 'schedule-interviews':
        return <ScheduleInterview hrData={hrData} />;
      case 'manage-interviews':
        return <InterviewManagement 
                  hrData={hrData} 
                  renderActionButton={renderActionButton} 
                />;
      case 'notifications':
        return <SendNotifications hrData={hrData} />;
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
