import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RenderOverview from "./RenderOverview";
import RenderProfile from "./RenderProfile";
import RenderStudentManagement from "./RenderStudentManagement";
import RenderCompanyHrManagement from "./RenderCompanyHrManagement";
// No axios needed for this local mock data version, but keeping for potential future API integration.
// import axios from "axios"; 

const TPODashboard = () => {
  // Common Tailwind CSS classes for consistent styling

  const navigate = useNavigate();

  const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
  const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
  const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
  const primaryButtonClass = "bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";


  // Enhanced Dummy data to cover all features
  const [tpoData, setTpoData] = useState({
    profile: {
      name: "Dr. Rajesh Kumar",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHwyfHxtYWxlJTIwcHJvZmVzc29yJTIwYXZhdGFyfGVufDB8fHx8MTcxNzg4Mzg3NXww&ixlib=rb-4.0.3&q=80&w=1080",
      collegeName: "ABC Institute of Technology",
      collegeLogo: "https://placehold.co/80x80/6366F1/FFFFFF?text=ABC+IT",
      designation: "Training & Placement Officer",
      department: "Placement Cell",
      email: "rajesh.kumar@abc.edu.in",
      phone: "+91-9876543210"
    },
    students: [
      { id: 1, name: "Amit Sharma", department: "CSE", year: "2024", placementStatus: "Placed", company: "TechCorp", cgpa: 8.5, email: "amit@student.abc.edu", isActive: true, resume: "https://www.africau.edu/images/default/sample.pdf", certifications: ["React Dev", "AWS Cloud"], skills: ["React", "Node.js"] },
      { id: 2, name: "Priya Singh", department: "ECE", year: "2024", placementStatus: "Applied", company: "N/A", cgpa: 9.1, email: "priya@student.abc.edu", isActive: true, resume: "", certifications: ["IoT Basics"], skills: ["Python", "Embedded"] },
      { id: 3, name: "Rohit Verma", department: "IT", year: "2024", placementStatus: "Shortlisted", company: "DataSoft", cgpa: 8.8, email: "rohit@student.abc.edu", isActive: true, resume: "https://www.africau.edu/images/default/sample.pdf", certifications: ["Cybersecurity"], skills: ["Java", "SQL"] },
      { id: 4, name: "Sneha Reddy", department: "CSE", year: "2025", placementStatus: "Not Applied", company: "N/A", cgpa: 9.0, email: "sneha@student.abc.edu", isActive: true, resume: "", certifications: [], skills: ["Machine Learning"] }
    ],
    companies: [
      { id: 1, name: "TechCorp Solutions", hrName: "John Smith", status: "Approved", jobsPosted: 3, studentsHired: 5, registrationDate: "2024-01-15", isActive: true, profile: "Leading software development firm.", jobHistory: [{ role: "SWE", year: 2023, hired: 3 }] },
      { id: 2, name: "DataSoft Industries", hrName: "Sarah Johnson", status: "Pending", jobsPosted: 1, studentsHired: 0, registrationDate: "2024-01-20", isActive: true, profile: "Data analytics and AI solutions.", jobHistory: [] },
      { id: 3, name: "Global Innovations", hrName: "Emily White", status: "Approved", jobsPosted: 2, studentsHired: 2, registrationDate: "2023-10-01", isActive: true, profile: "Diversified tech conglomerate.", jobHistory: [{ role: "Product", year: 2023, hired: 2 }] }
    ],
    jobPostings: [
      { id: 1, role: "Software Engineer", company: "TechCorp Solutions", status: "Active", applicants: 25, deadline: "2024-07-15", ctc: "8-12 LPA", location: "Bangalore", description: "Develop and maintain web applications.", eligibility: "2024, CSE/IT, >8.0 CGPA" },
      { id: 2, role: "Data Analyst", company: "DataSoft Industries", status: "Closed", applicants: 18, deadline: "2024-06-30", ctc: "6-10 LPA", location: "Mumbai", description: "Analyze large datasets for insights.", eligibility: "2024, Any, >7.5 CGPA" },
      { id: 3, role: "UI/UX Designer", company: "Global Innovations", status: "Active", applicants: 10, deadline: "2024-08-01", ctc: "7-11 LPA", location: "Remote", description: "Design intuitive user interfaces.", eligibility: "2024, Any, creative portfolio" }
    ],
    applications: [
      { id: 1, studentName: "Amit Sharma", company: "TechCorp Solutions", role: "Software Engineer", status: "Placed", appliedDate: "2024-01-10", studentId: 1, resume: "https://www.africau.edu/images/default/sample.pdf" },
      { id: 2, studentName: "Priya Singh", company: "DataSoft Industries", role: "Data Analyst", status: "Applied", appliedDate: "2024-01-12", studentId: 2, resume: "https://www.africau.edu/images/default/sample.pdf" },
      { id: 3, studentName: "Rohit Verma", company: "TechCorp Solutions", role: "Software Engineer", status: "Shortlisted", appliedDate: "2024-01-11", studentId: 3, resume: "https://www.africau.edu/images/default/sample.pdf" },
      { id: 4, studentName: "Sneha Reddy", company: "Global Innovations", role: "UI/UX Designer", status: "Applied", appliedDate: "2024-07-01", studentId: 4, resume: "https://www.africau.edu/images/default/sample.pdf" }
    ],
    interviews: [
      { id: 1, studentName: "Rohit Verma", studentId: 3, company: "TechCorp Solutions", role: "Software Engineer", date: "2024-02-10", time: "10:00 AM", mode: "Online", status: "Scheduled", panel: "Technical Panel", meetingLink: "https://meet.google.com/xyz", attendance: false, feedback: "" },
      { id: 2, studentName: "Priya Singh", studentId: 2, company: "DataSoft Industries", role: "Data Analyst", date: "2024-02-12", time: "02:00 PM", mode: "Offline", status: "Completed", panel: "HR Round", meetingLink: "", attendance: true, feedback: "Good communication, strong SQL skills. Recommended for final round." }
    ],
    announcements: [
      { id: 1, message: "Reminder: Resume review workshop tomorrow at 10 AM in Auditorium A.", target: "Students", date: "2024-07-04" },
      { id: 2, message: "New job posting from Global Innovations for UI/UX Designer role.", target: "Students", date: "2024-07-01" },
      { id: 3, message: "Please review pending company registrations by Friday.", target: "HRs", date: "2024-06-28" }
    ],
    events: [
      { id: 1, name: "Placement Drive - TechCorp Solutions", type: "Placement Drive", date: "2024-08-10", time: "09:00 AM", location: "College Auditorium", registeredStudents: 50, resources: [], photos: [] },
      { id: 2, name: "Mock Interview Session", type: "Workshop", date: "2024-07-20", time: "03:00 PM", location: "Online (Zoom)", registeredStudents: 30, resources: ["MockInterviewTips.pdf"], photos: [] }
    ],
    analytics: {
      totalStudents: 150,
      placedStudents: 45,
      activeJobs: 8,
      totalCompanies: 15,
      placementPercentage: 30,
      departmentWisePlacement: {
        CSE: 15,
        ECE: 12,
        IT: 10,
        MECH: 8,
        CIVIL: 0 // Added for completeness
      },
      jobApplicationSummary: {
        "Software Engineer": { applied: 60, shortlisted: 30, selected: 10 },
        "Data Analyst": { applied: 40, shortlisted: 15, selected: 5 },
        "UI/UX Designer": { applied: 20, shortlisted: 5, selected: 2 }
      },
      interviewStatistics: {
        scheduled: 10,
        completed: 7,
        feedbackPending: 3,
        attendanceRate: "70%"
      },
      selectionRatio: {
        "Applied to Shortlisted": "50%",
        "Shortlisted to Selected": "30%"
      },
      placementGraphData: [
        { year: "2021", placed: 60 },
        { year: "2022", placed: 75 },
        { year: "2023", placed: 90 },
        { year: "2024", placed: 45 } // Mock current year data
      ]
    },
    // Mock for certifications/skills data (linking to students by ID)
    studentSkillsCertifications: {
      1: { skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"], certifications: ["MERN Stack Certification", "Google Cloud Associate"] },
      2: { skills: ["Python", "Data Analysis", "SQL"], certifications: ["IBM Data Analyst", "Azure Data Fundamentals"] },
      3: { skills: ["Java", "Spring Boot", "REST APIs"], certifications: ["Oracle Certified Java Programmer"] },
      4: { skills: ["Machine Learning", "Deep Learning", "Python"], certifications: ["Deep Learning Specialization"] }
    }
  });

  const [activeSection, setActiveSection] = useState('overview'); // State to manage active dashboard section
  const [realHRs, setRealHRs] = useState([]);
  const [loadingHRs, setLoadingHRs] = useState(false);

  //Hr details
  const [selectedHRDetails, setSelectedHRDetails] = useState(null);
  const [showHRDetailModal, setShowHRDetailModal] = useState(false);
  const [loadingHRDetails, setLoadingHRDetails] = useState(false);

  //Job Approval
  const [showJobApprovalModal, setShowJobApprovalModal] = useState(false);
  const [selectedHRForApproval, setSelectedHRForApproval] = useState(null);
  const [jobsForApproval, setJobsForApproval] = useState([]);
  const [loadingJobApproval, setLoadingJobApproval] = useState(false);
  const [selectedJobsForApproval, setSelectedJobsForApproval] = useState([]);
  const [approvingJobs, setApprovingJobs] = useState(false);

  const fetchJobsForApproval = async (hrId) => {
    setLoadingJobApproval(true);
    try {
      const response = await axios.get(`http://localhost:5100/hr/profile/${hrId}`);
      if (response.data.success) {
        const pendingJobs = response.data.data.jobPosts.filter(job => !job.hasApproved);
        setJobsForApproval(pendingJobs);
        setSelectedHRForApproval(response.data.data);
        setShowJobApprovalModal(true);
      }
    } catch (error) {
      console.error('Error fetching jobs for approval:', error);
    } finally {
      setLoadingJobApproval(false);
    }
  };

  // Add this function to handle approve jobs button click
  const handleApproveJobs = (hrId) => {
    fetchJobsForApproval(hrId);
  };

  // Add this function to handle individual job approval
  const handleIndividualJobApproval = async (hrId, jobId, hasApproved) => {
    try {
      const response = await axios.put(`http://localhost:5100/hr/${hrId}/job-post/${jobId}/approval`, {
        hasApproved: hasApproved
      });

      if (response.data.success) {
        // Update the jobs list
        setJobsForApproval(prev =>
          prev.map(job =>
            job._id === jobId ? { ...job, hasApproved: hasApproved } : job
          )
        );
        // Refresh the HR list
        fetchHRsFromAPI();
      }
    } catch (error) {
      console.error('Error updating job approval:', error);
    }
  };

  // Add this function to handle bulk approval
  const handleBulkApproval = async () => {
    if (selectedJobsForApproval.length === 0) return;

    setApprovingJobs(true);
    try {
      const promises = selectedJobsForApproval.map(jobId =>
        axios.put(`http://localhost:5100/hr/${selectedHRForApproval._id}/job-post/${jobId}/approval`, {
          hasApproved: true
        })
      );

      await Promise.all(promises);

      // Update the jobs list
      setJobsForApproval(prev =>
        prev.map(job =>
          selectedJobsForApproval.includes(job._id) ? { ...job, hasApproved: true } : job
        )
      );

      // Clear selections
      setSelectedJobsForApproval([]);

      // Refresh the HR list
      fetchHRsFromAPI();
    } catch (error) {
      console.error('Error bulk approving jobs:', error);
    } finally {
      setApprovingJobs(false);
    }
  };

  // Add this function to handle job selection for bulk approval
  const handleJobSelection = (jobId) => {
    setSelectedJobsForApproval(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  // Add this modal component for job approval
  const renderJobApprovalModal = () => {
    if (!showJobApprovalModal || !selectedHRForApproval) return null;

    const pendingJobs = jobsForApproval.filter(job => !job.hasApproved);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Job Approval</h2>
              <p className="text-gray-600">{selectedHRForApproval.hrProfile.companyName} - {selectedHRForApproval.hrProfile.name}</p>
            </div>
            <button
              onClick={() => {
                setShowJobApprovalModal(false);
                setSelectedJobsForApproval([]);
              }}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {loadingJobApproval ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-2 text-gray-600">Loading jobs...</span>
              </div>
            ) : (
              <>
                {/* Bulk Actions */}
                {pendingJobs.length > 0 && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">Bulk Actions</h3>
                        <p className="text-sm text-gray-600">
                          {selectedJobsForApproval.length} of {pendingJobs.length} jobs selected
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedJobsForApproval(pendingJobs.map(job => job._id))}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          Select All
                        </button>
                        <button
                          onClick={() => setSelectedJobsForApproval([])}
                          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                        >
                          Clear All
                        </button>
                        <button
                          onClick={handleBulkApproval}
                          disabled={selectedJobsForApproval.length === 0 || approvingJobs}
                          className={`px-4 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 
                            ${(selectedJobsForApproval.length === 0 || approvingJobs) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {approvingJobs ? 'Approving...' : `Approve Selected (${selectedJobsForApproval.length})`}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Jobs List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Pending Jobs for Approval ({pendingJobs.length})
                  </h3>

                  {pendingJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No pending jobs for approval</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {pendingJobs.map((job) => (
                        <div key={job._id} className="border border-gray-200 p-4 rounded-lg bg-white">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedJobsForApproval.includes(job._id)}
                                onChange={() => handleJobSelection(job._id)}
                                className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-800">{job.role}</h4>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">CTC:</span> {job.ctc} |
                                  <span className="font-medium"> Location:</span> {job.location}
                                </p>
                              </div>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full
                              ${job.status === 'Active' ? 'bg-green-200 text-green-800' :
                                job.status === 'Draft' ? 'bg-yellow-200 text-yellow-800' :
                                  'bg-red-200 text-red-800'}
                            `}>
                              {job.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Skills:</span> {job.requiredSkills.join(', ')}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Eligibility:</span>
                                Year: {job.eligibilityCriteria.passingYear} |
                                Branches: {job.eligibilityCriteria.branch?.join(', ') || 'N/A'}
                              </p>
                            </div>
                            <div>
                              {job.applicationDeadline && (
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Deadline:</span> {new Date(job.applicationDeadline).toLocaleDateString()}
                                </p>
                              )}
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Applicants:</span> {job.applicants?.length || 0}
                              </p>
                            </div>
                          </div>

                          {/* Individual Job Actions */}
                          <div className="flex gap-2 pt-3 border-t border-gray-100">
                            <button
                              onClick={() => handleIndividualJobApproval(selectedHRForApproval._id, job._id, true)}
                              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleIndividualJobApproval(selectedHRForApproval._id, job._id, false)}
                              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => console.log('Request changes for job:', job._id)}
                              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                            >
                              Request Changes
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={() => {
                setShowJobApprovalModal(false);
                setSelectedJobsForApproval([]);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add this function to fetch HR details
  const fetchHRDetails = async (hrId) => {
    setLoadingHRDetails(true);
    try {
      const response = await axios.get(`http://localhost:5100/hr/profile/${hrId}`);
      if (response.data.success) {
        setSelectedHRDetails(response.data.data);
        setShowHRDetailModal(true);
      }
    } catch (error) {
      console.error('Error fetching HR details:', error);
    } finally {
      setLoadingHRDetails(false);
    }
  };

  // Add this function to handle view button click
  const handleViewHR = (hrId) => {
    fetchHRDetails(hrId);
  };

  // Add this modal component for HR details
  const renderHRDetailModal = () => {
    if (!showHRDetailModal || !selectedHRDetails) return null;

    const { hrProfile, summary, jobPosts } = selectedHRDetails;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">HR Profile Details</h2>
            <button
              onClick={() => setShowHRDetailModal(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* HR Profile Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src={hrProfile.companyLogo || "https://placehold.co/80x80/6D28D9/FFFFFF?text=CO"}
                  alt="Company Logo"
                  className="w-20 h-20 rounded-full object-cover border-2 border-indigo-300 mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{hrProfile.companyName}</h3>
                  <p className="text-lg text-gray-700">{hrProfile.name}</p>
                  <p className="text-sm text-gray-600">{hrProfile.designation}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {hrProfile.email}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Contact:</span> {hrProfile.contactNumber}</p>
                </div>
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{summary.totalJobs}</div>
                <p className="text-sm text-gray-600">Total Jobs</p>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{summary.totalApplicants}</div>
                <p className="text-sm text-gray-600">Total Applicants</p>
              </div>
              <div className="text-center p-4 bg-yellow-100 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">{summary.shortlistedCount}</div>
                <p className="text-sm text-gray-600">Shortlisted</p>
              </div>
              <div className="text-center p-4 bg-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">{summary.selectedCount}</div>
                <p className="text-sm text-gray-600">Selected</p>
              </div>
            </div>

            {/* Job Posts Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Job Posts ({jobPosts.length})</h4>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {jobPosts.map((job) => (
                  <div key={job._id} className="border border-gray-200 p-4 rounded-lg bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-gray-800">{job.role}</h5>
                      <div className="flex gap-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full
                        ${job.status === 'Active' ? 'bg-green-200 text-green-800' :
                            job.status === 'Draft' ? 'bg-yellow-200 text-yellow-800' :
                              'bg-red-200 text-red-800'}
                      `}>
                          {job.status}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full
                        ${job.hasApproved ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}
                      `}>
                          {job.hasApproved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Skills:</span> {job.requiredSkills.join(', ')}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">CTC:</span> {job.ctc} |
                      <span className="font-medium"> Location:</span> {job.location}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Eligibility:</span>
                      Year: {job.eligibilityCriteria.passingYear} |
                      Branches: {job.eligibilityCriteria.branch?.join(', ') || 'N/A'}
                    </p>
                    {job.applicationDeadline && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Deadline:</span> {new Date(job.applicationDeadline).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={() => setShowHRDetailModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => console.log('Approve all jobs for HR:', selectedHRDetails._id)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Approve All Jobs
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // --- Section Render Functions ---

  const fetchHRsFromAPI = async () => {
    setLoadingHRs(true);
    try {
      const response = await fetch('http://localhost:5100/hr/all');
      const result = await response.json();

      if (response.ok && result.success) {
        setRealHRs(result.data.hrs || []);
      } else {
        console.error('Failed to fetch HRs:', result.message);
      }
    } catch (error) {
      console.error('Error fetching HRs:', error);
    } finally {
      setLoadingHRs(false);
    }
  };

  // Add useEffect to fetch HRs when section changes
  useEffect(() => {
    if (activeSection === 'company-hr-management') {
      fetchHRsFromAPI();
    }
  }, [activeSection]);

  const renderTableHeader = (headers) => (
    <thead>
        <tr className="bg-indigo-600 text-white text-left">
            {headers.map((header, index) => (
                <th key={index} className="px-4 py-3 font-semibold text-lg">{header}</th>
            ))}
        </tr>
    </thead>
);

  const renderActionButton = (text, onClick, colorClass, iconPath = null) => (
    <button onClick={onClick} className={`${colorClass} px-3 py-1 rounded-full text-xs hover:scale-105 transition-transform duration-200 flex items-center gap-1`}>
      {iconPath && <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">{iconPath}</svg>}
      {text}
    </button>
  );

  // 3. Company & HR Management

  // 4. Job Postings Overview
  const renderJobPostings = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Job Postings Overview</h2>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <select className={inputClass + " w-auto flex-grow"}>
          <option>All Status</option>
          <option>Active</option>
          <option>Closed</option>
        </select>
        <select className={inputClass + " w-auto flex-grow"}>
          <option>All Companies</option>
          {Array.from(new Set(tpoData.jobPostings.map(job => job.company))).map(company => <option key={company}>{company}</option>)}
        </select>
        <select className={inputClass + " w-auto flex-grow"}>
          <option>All Roles</option>
          {Array.from(new Set(tpoData.jobPostings.map(job => job.role))).map(role => <option key={role}>{role}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          {renderTableHeader(["Role", "Company", "Status", "Applicants", "Deadline", "CTC", "Location", "Actions"])}
          <tbody>
            {tpoData.jobPostings.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                <td className="border border-gray-200 px-4 py-3 text-gray-800">{job.role}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{job.company}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {job.status}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{job.applicants}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{job.deadline}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{job.ctc}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{job.location}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {renderActionButton("View", () => console.log(`View job ${job.role}`), "bg-blue-500 text-white")}
                    {job.status === 'Active' ? (
                      renderActionButton("Close", () => console.log(`Close job ${job.role}`), "bg-red-500 text-white")
                    ) : (
                      renderActionButton("Reopen", () => console.log(`Reopen job ${job.role}`), "bg-green-500 text-white")
                    )}
                    {renderActionButton("Extend", () => console.log(`Extend deadline for ${job.role}`), "bg-orange-500 text-white")}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 5. Application Monitoring
  const renderApplicationMonitoring = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Application Monitoring</h2>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <select className={inputClass + " w-auto flex-grow"}>
          <option>All Companies</option>
          {Array.from(new Set(tpoData.applications.map(app => app.company))).map(company => <option key={company}>{company}</option>)}
        </select>
        <select className={inputClass + " w-auto flex-grow"}>
          <option>All Roles</option>
          {Array.from(new Set(tpoData.applications.map(app => app.role))).map(role => <option key={role}>{role}</option>)}
        </select>
        <select className={inputClass + " w-auto flex-grow"}>
          <option>All Status</option>
          <option>Applied</option>
          <option>Shortlisted</option>
          <option>Placed</option>
          <option>Rejected</option>
        </select>
        <button className={secondaryButtonClass + " w-auto"}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          Export Excel
        </button>
        <button className={secondaryButtonClass + " w-auto"}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L16.586 7A2 2 0 0117 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-3a1 1 0 100 2h.01a1 1 0 100-2H7zm-.01 8a1 1 0 00.01 0H7a1 1 0 00-.01 0zm7-5a1 1 0 01-1 1H7a1 1 0 110-2h5a1 1 0 011 1z" clipRule="evenodd" /></svg>
          Export PDF
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          {renderTableHeader(["Student Name", "Company", "Role", "Status", "Applied Date", "Actions"])}
          <tbody>
            {tpoData.applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                <td className="border border-gray-200 px-4 py-3 text-gray-800">{app.studentName}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{app.company}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{app.role}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'Placed' ? 'bg-green-100 text-green-800' :
                      app.status === 'Shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                    }`}>
                    {app.status}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{app.appliedDate}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {renderActionButton("View Resume", () => window.open(app.resume, '_blank'), "bg-blue-500 text-white", <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L16.586 7A2 2 0 0117 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />)}
                    {renderActionButton("View Details", () => console.log(`View details for ${app.studentName}`), "bg-indigo-500 text-white")}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 6. Interview Schedule Management
  const renderInterviewScheduleManagement = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Interview Schedule Management</h2>
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-700 mb-3">Schedule New Interview:</h3>
        <form className="space-y-4 mb-6">
          <input type="text" placeholder="Student Name / ID" className={inputClass} />
          <input type="text" placeholder="Company" className={inputClass} />
          <input type="text" placeholder="Role" className={inputClass} />
          <input type="date" className={inputClass} />
          <input type="time" className={inputClass} />
          <select className={inputClass}>
            <option>Mode</option>
            <option>Online</option>
            <option>Offline</option>
          </select>
          <input type="text" placeholder="Interview Panel (e.g., 'Technical Panel 1')" className={inputClass} />
          <input type="url" placeholder="Meeting Link (if online)" className={inputClass} />
          <button type="submit" className={primaryButtonClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
            Schedule Interview
          </button>
        </form>
      </div>

      <h3 className="font-semibold text-lg text-gray-700 mb-3">All Interviews:</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          {renderTableHeader(["Student", "Company", "Role", "Date", "Time", "Mode", "Panel", "Status", "Actions"])}
          <tbody>
            {tpoData.interviews.map((interview) => (
              <tr key={interview.id} className="hover:bg-gray-50 transition-colors">
                <td className="border border-gray-200 px-4 py-3 text-gray-800">{interview.studentName}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{interview.company}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{interview.role}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{interview.date}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{interview.time}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{interview.mode}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{interview.panel}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      interview.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {interview.status}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {renderActionButton("Edit", () => console.log(`Edit interview ${interview.id}`), "bg-indigo-500 text-white")}
                    {renderActionButton("Feedback", () => console.log(`Add feedback for ${interview.id}`), "bg-yellow-500 text-white")}
                    {renderActionButton("Cancel", () => console.log(`Cancel interview ${interview.id}`), "bg-red-500 text-white")}
                    {interview.mode === 'Online' && interview.meetingLink && (
                      renderActionButton("Join", () => window.open(interview.meetingLink, '_blank'), "bg-teal-500 text-white", <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-2 2a1 1 0 00-1 1v3a1 1 0 001 1h2a1 1 0 001-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />)
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="font-semibold text-lg text-gray-700 mt-6 mb-3">Interview Statistics:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm text-center">
          <p className="text-xl font-bold text-blue-700">{tpoData.analytics.interviewStatistics.scheduled}</p>
          <p className="text-gray-600">Scheduled Interviews</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm text-center">
          <p className="text-xl font-bold text-green-700">{tpoData.analytics.interviewStatistics.completed}</p>
          <p className="text-gray-600">Completed Interviews</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm text-center">
          <p className="text-xl font-bold text-yellow-700">{tpoData.analytics.interviewStatistics.feedbackPending}</p>
          <p className="text-gray-600">Feedback Pending</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow-sm text-center">
          <p className="text-xl font-bold text-purple-700">{tpoData.analytics.interviewStatistics.attendanceRate}</p>
          <p className="text-gray-600">Attendance Rate</p>
        </div>
      </div>
    </div>
  );

  // 7. Announcements / Notifications
  const renderAnnouncementsNotifications = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Announcements / Notifications</h2>
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-700 mb-3">Compose New Announcement:</h3>
        <form className="space-y-4">
          <textarea
            className={`${inputClass} min-h-[100px]`}
            placeholder="Write your announcement or message here..."
            rows="4"
          ></textarea>
          <select className={inputClass}>
            <option value="">Target Audience</option>
            <option value="All Students">All Students</option>
            <option value="All HRs">All HRs</option>
            {/* Could add options for specific departments, years, companies etc. */}
          </select>
          <button type="submit" className={primaryButtonClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
            Send Announcement
          </button>
        </form>
      </div>

      <h3 className="font-semibold text-lg text-gray-700 mb-3">Recent Announcements:</h3>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {tpoData.announcements.length > 0 ? (
          tpoData.announcements.map(announcement => (
            <div key={announcement.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Date:</span> {announcement.date} | <span className="font-medium">To:</span> {announcement.target}
              </p>
              <p className="text-gray-800">{announcement.message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No recent announcements.</p>
        )}
      </div>
    </div>
  );

  // 8. Events & Drives
  const renderEventsDrives = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Events & Drives</h2>
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-700 mb-3">Schedule New Event/Drive:</h3>
        <form className="space-y-4 mb-6">
          <input type="text" placeholder="Event Name (e.g., TechCorp Placement Drive)" className={inputClass} />
          <select className={inputClass}>
            <option value="">Event Type</option>
            <option value="Placement Drive">Placement Drive</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
            <option value="Mock Interview">Mock Interview</option>
          </select>
          <input type="date" className={inputClass} />
          <input type="time" className={inputClass} />
          <input type="text" placeholder="Location (e.g., Online / Auditorium A)" className={inputClass} />
          <textarea
            className={`${inputClass} min-h-[80px]`}
            placeholder="Event Description..."
            rows="3"
          ></textarea>
          <button type="submit" className={primaryButtonClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
            Schedule Event
          </button>
        </form>
      </div>
      <h3 className="font-semibold text-lg text-gray-700 mb-3">Upcoming Events & Drives:</h3>
      <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {tpoData.events.length > 0 ? (
          tpoData.events.map(event => (
            <div key={event.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-indigo-700">{event.name}</h4>
              <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Type:</span> {event.type}</p>
              <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Date & Time:</span> {event.date} at {event.time}</p>
              <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Location:</span> {event.location}</p>
              <p className="text-sm text-gray-700 mb-3"><span className="font-medium">Registered Students:</span> {event.registeredStudents}</p>
              <div className="flex flex-wrap gap-2">
                {renderActionButton("View Details", () => console.log(`View ${event.name}`), "bg-blue-500 text-white")}
                {renderActionButton("Track Attendance", () => console.log(`Track attendance for ${event.name}`), "bg-teal-500 text-white")}
                {renderActionButton("Upload Resources", () => console.log(`Upload resources for ${event.name}`), "bg-yellow-500 text-white")}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No upcoming events or drives.</p>
        )}
      </div>
    </div>
  );

  // 9. Reports & Analytics (Overview handled above)
  const renderReportsAnalytics = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Detailed Reports & Analytics</h2>
      <h3 className="font-semibold text-lg text-gray-700 mb-3">Job-wise Application Summary:</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          {renderTableHeader(["Role", "Applied", "Shortlisted", "Selected"])}
          <tbody>
            {Object.entries(tpoData.analytics.jobApplicationSummary).map(([role, data]) => (
              <tr key={role} className="hover:bg-gray-50 transition-colors">
                <td className="border border-gray-200 px-4 py-3 text-gray-800">{role}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{data.applied}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{data.shortlisted}</td>
                <td className="border border-gray-200 px-4 py-3 text-gray-700">{data.selected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Other reports would go here, e.g., graphs for placement by department */}
    </div>
  );

  // 10. Resume Bank
  const renderResumeBank = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Resume Bank</h2>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <select className={inputClass + " w-auto flex-grow"}>
          <option>Filter by Department</option>
          {Array.from(new Set(tpoData.students.map(s => s.department))).map(dept => <option key={dept}>{dept}</option>)}
        </select>
        <select className={inputClass + " w-auto flex-grow"}>
          <option>Filter by Year</option>
          {Array.from(new Set(tpoData.students.map(s => s.year))).map(year => <option key={year}>{year}</option>)}
        </select>
        <input type="text" placeholder="Filter by Skill (e.g., React)" className={inputClass + " w-auto flex-grow"} />
        <button className={primaryButtonClass + " w-auto"}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          Download All Resumes (Filtered)
        </button>
      </div>
      <h3 className="font-semibold text-lg text-gray-700 mb-3">Auto-Generated Resume Folders (Mock):</h3>
      <div className="space-y-3">
        <p className="text-gray-700">Folders would be organized by Department/Year:</p>
        <ul className="list-disc pl-5 text-gray-700">
          <li><span className="font-medium">CSE / 2024</span> (2 resumes) - <a href="#" className="text-blue-600 hover:underline">Download</a></li>
          <li><span className="font-medium">ECE / 2024</span> (1 resume) - <a href="#" className="text-blue-600 hover:underline">Download</a></li>
          <li><span className="font-medium">IT / 2024</span> (1 resume) - <a href="#" className="text-blue-600 hover:underline">Download</a></li>
          {/* Dynamically generated based on filters */}
        </ul>
      </div>
    </div>
  );

  // 11. Certification & Skill Tracking
  const renderCertificationSkillTracking = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Certification & Skill Tracking</h2>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <select className={inputClass + " w-auto flex-grow"}>
          <option>All Departments</option>
          {Array.from(new Set(tpoData.students.map(s => s.department))).map(dept => <option key={dept}>{dept}</option>)}
        </select>
        <select className={inputClass + " w-auto flex-grow"}>
          <option>All Domains</option>
          {/* Assuming domains from skills/certifications */}
          <option>Web Development</option>
          <option>Cloud</option>
          <option>Data Science</option>
          <option>Cybersecurity</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          {renderTableHeader(["Student Name", "Skills", "Certifications", "Recommendations", "Actions"])}
          <tbody>
            {tpoData.students.map(student => {
              const studentDetail = tpoData.studentSkillsCertifications[student.id] || { skills: [], certifications: [] };
              return (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-200 px-4 py-3 text-gray-800">{student.name}</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {studentDetail.skills.length > 0 ? (
                        studentDetail.skills.map((skill, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{skill}</span>
                        ))
                      ) : <span className="italic text-gray-500">N/A</span>}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <ul className="list-disc list-inside space-y-0.5">
                      {studentDetail.certifications.length > 0 ? (
                        studentDetail.certifications.map((cert, idx) => (
                          <li key={idx} className="text-gray-700 text-sm">{cert}</li>
                        ))
                      ) : <span className="italic text-gray-500">N/A</span>}
                    </ul>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">
                    {/* Mock for recommendations */}
                    {student.id === 1 ? "Consider full-stack MERN projects." : "N/A"}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {renderActionButton("Add/Edit Rec.", () => console.log(`Add recommendation for ${student.name}`), "bg-purple-500 text-white")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 12. Admin Controls
  const renderAdminControls = () => (
    <div className={cardBaseClass}>
      <h2 className={sectionTitleClass}>Admin Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add/Remove TPOs or Admins */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Manage TPO/Admin Accounts</h3>
          <form className="space-y-3">
            <input type="email" placeholder="User Email" className={inputClass} />
            <select className={inputClass}>
              <option value="">Select Role</option>
              <option value="TPO">TPO</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="flex gap-2">
              <button type="submit" className={primaryButtonClass + " flex-grow"}>Add User</button>
              <button type="button" className={dangerButtonClass + " flex-grow"}>Remove User</button>
            </div>
          </form>
        </div>

        {/* Backup Data */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Data Backup</h3>
          <p className="text-gray-700 mb-4">Click to perform a full backup of all dashboard data.</p>
          <button className={secondaryButtonClass + " w-full"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v4a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h8v4H6V4z" clipRule="evenodd" /><path d="M4 14a2 2 0 00-2 2v2h16v-2a2 2 0 00-2-2H4zm2 2h8v2H6v-2z" /></svg>
            Perform Backup
          </button>
        </div>

        {/* Reset Passwords */}
        <div className="bg-red-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Reset Passwords</h3>
          <form className="space-y-3">
            <input type="email" placeholder="Student/HR Email or ID" className={inputClass} />
            <button type="submit" className={dangerButtonClass + " w-full"}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Reset Password
            </button>
          </form>
        </div>

        {/* Manage Roles and Permissions (Mock) */}
        <div className="bg-green-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Manage Roles & Permissions</h3>
          <p className="text-gray-700 mb-4">Admin can modify user roles (e.g., TPO, Data Entry) and module access.</p>
          <button className={secondaryButtonClass + " w-full"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            Edit Permissions
          </button>
        </div>
      </div>
    </div>
  );


  // --- Main Dashboard Layout ---
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <RenderOverview tpoData={tpoData}/>;
      case 'profile':
        return <RenderProfile tpoData={tpoData}/>;
      case 'student-management':
        return <RenderStudentManagement tpoData={tpoData}/>;
      case 'company-hr-management':
        return <RenderCompanyHrManagement 
          renderTableHeader = {renderTableHeader} 
          renderActionButton = {renderActionButton}
          fetchHRsFromAPI = {fetchHRsFromAPI}
          loadingHRs = {loadingHRs}
          realHRs = {realHRs}
          renderHRDetailModal = {renderHRDetailModal}
          renderJobApprovalModal = {renderJobApprovalModal}
          loadingHRDetails = {loadingHRDetails}
          renderJobPostings = {renderJobPostings}
          loadingJobApproval = {loadingJobApproval}
        />;
      case 'job-postings':
        return renderJobPostings();
      case 'application-monitoring':
        return renderApplicationMonitoring();
      case 'interview-management':
        return renderInterviewScheduleManagement();
      case 'announcements-notifications':
        return renderAnnouncementsNotifications();
      case 'events-drives':
        return renderEventsDrives();
      case 'reports-analytics':
        return renderReportsAnalytics();
      case 'resume-bank':
        return renderResumeBank();
      case 'certification-skill-tracking':
        return renderCertificationSkillTracking();
      case 'admin-controls':
        return renderAdminControls();
      default:
        return renderOverview();
    }
  };

  const handelLogout = () => {
    localStorage.removeItem("tpoData");
    localStorage.removeItem("tpoToken");

    navigate('/TpoLogin');
  }

  const menuItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-9v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'profile', name: 'My Profile', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { id: 'student-management', name: 'Student Management', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm-6-9a4 4 0 100 5.292M7 13H3a4 4 0 00-4 4v2H7v-1z" /></svg> },
    { id: 'company-hr-management', name: 'Company & HR Management', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m0 0h2M9 20h6M9 8h6m-3 4h.01M9 12h.01" /></svg> },
    { id: 'job-postings', name: 'Job Postings Overview', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
    { id: 'application-monitoring', name: 'Application Monitoring', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    { id: 'interview-management', name: 'Interview Management', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M7 15h.01M17 12h.01M17 15h.01M12 17h.01M12 21V3" /></svg> },
    { id: 'announcements-notifications', name: 'Announcements & Notifications', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
    { id: 'events-drives', name: 'Events & Drives', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M7 15h.01M17 12h.01M17 15h.01M12 21V3" /></svg> },
    { id: 'reports-analytics', name: 'Reports & Analytics', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg> },
    { id: 'resume-bank', name: 'Resume Bank', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { id: 'certification-skill-tracking', name: 'Certification & Skill Tracking', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c.045 4.106 1.948 7.72 4.766 10.053l4.566-4.566c.112-.112.28-.112.392 0l4.566 4.566A12.001 12.001 0 0021.056 12c0-2.818-1.903-5.385-4.618-7.016z" /></svg> },
    { id: 'admin-controls', name: 'Admin Controls', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.333.9 2.409 2.409a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.942 1.543-.9 3.333-2.409 2.409a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.942-3.333-.9-2.409-2.409a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.942-1.543.9-3.333 2.409-2.409a1.724 1.724 0 002.573-1.066z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-900">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-indigo-800 text-white p-6 lg:p-8 shadow-2xl flex-shrink-0">
          <div className="flex items-center justify-between lg:justify-start mb-8">
            <img
              src={tpoData.profile.collegeLogo}
              alt="College Logo"
              className="w-12 h-12 rounded-full border-2 border-white mr-3"
            />
            <h2 className="text-2xl font-bold text-white hidden lg:block">TPO Portal</h2>
            {/* Hamburger for mobile, if needed */}
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200
                  ${activeSection === item.id ? 'bg-indigo-700 text-white shadow-md' : 'hover:bg-indigo-700 hover:bg-opacity-75 text-indigo-200'}
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
                onClick={handelLogout} // Implement actual logout logic here
                className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>

            {/* Render the active section content */}
            {renderActiveSection()}
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
          background: #cbd5e1; /* gray-300 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0; /* gray-400 */
        }
      `}</style>
    </div>
  );
};

export default TPODashboard;
