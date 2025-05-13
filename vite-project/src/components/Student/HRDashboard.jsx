
import React from "react";

const HRDashboard = () => {
  const cardClass = "bg-white shadow-md rounded-lg p-6";
  const sectionTitle = "text-xl font-semibold text-indigo-700 mb-4";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-10">HR Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className={cardClass}>
          <h2 className={sectionTitle}>Welcome, [HR Name]</h2>
          <p className="text-gray-700">Designation: HR Manager</p>
          <p className="text-gray-700">Company: ABC Pvt. Ltd</p>
          <button className="mt-2 bg-gray-200 text-sm px-3 py-1 rounded">Edit Profile</button>
          <button className="ml-2 bg-gray-200 text-sm px-3 py-1 rounded">Change Password</button>
        </div>

        {/* Post Job Openings */}
        <div className={cardClass}>
          <h2 className={sectionTitle}>Post Job Openings</h2>
          <form className="space-y-2">
            <input type="text" placeholder="Role" className="w-full border p-2 rounded"/>
            <input type="text" placeholder="Skills" className="w-full border p-2 rounded"/>
            <input type="text" placeholder="CTC" className="w-full border p-2 rounded"/>
            <input type="text" placeholder="Location" className="w-full border p-2 rounded"/>
            <input type="text" placeholder="Eligibility" className="w-full border p-2 rounded"/>
            <input type="date" className="w-full border p-2 rounded"/>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Post Job</button>
          </form>
        </div>

        {/* Manage Job Posts */}
        <div className={cardClass}>
          <h2 className={sectionTitle}>Manage Job Posts</h2>
          <ul className="text-gray-700">
            <li>Software Engineer - Active</li>
            <li>Data Analyst - Expired</li>
          </ul>
          <div className="mt-2 space-x-2">
            <button className="bg-gray-200 px-3 py-1 rounded">Edit</button>
            <button className="bg-gray-200 px-3 py-1 rounded">Delete</button>
            <button className="bg-gray-200 px-3 py-1 rounded">View Applicants</button>
            <button className="bg-gray-200 px-3 py-1 rounded">Close</button>
          </div>
        </div>

        {/* View Applications */}
        <div className={cardClass}>
          <h2 className={sectionTitle}>View Applications</h2>
          <p className="text-gray-700">Filter: Role / Status</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded mt-2">View Profiles</button>
        </div>

        {/* Schedule Interviews */}
        <div className={cardClass}>
          <h2 className={sectionTitle}>Schedule Interviews</h2>
          <p>Select candidates, set date/time & mode</p>
          <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">Schedule</button>
        </div>

        {/* Shortlisted / Selected Students */}
        <div className={cardClass}>
          <h2 className={sectionTitle}>Shortlisted Students</h2>
          <button className="bg-gray-200 text-sm px-3 py-1 rounded">Download Resumes</button>
          <button className="ml-2 bg-gray-200 text-sm px-3 py-1 rounded">Export List</button>
        </div>

        {/* Notifications / Messages */}
        <div className={cardClass}>
          <h2 className={sectionTitle}>Notifications</h2>
          <textarea className="w-full border p-2 rounded mb-2" rows="2" placeholder="Write message or announcement"></textarea>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Send</button>
        </div>

        {/* Interview History */}
        <div className={cardClass}>
          <h2 className={sectionTitle}>Interview History</h2>
          <p className="text-gray-700">Feedback & status for completed interviews</p>
        </div>

        {/* Analytics */}
        <div className={cardClass}>
          <h2 className={sectionTitle}>Analytics</h2>
          <ul className="text-gray-700 list-disc list-inside">
            <li>Applicants per job</li>
            <li>Shortlist vs Selection ratio</li>
            <li>Performance overview</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default HRDashboard;
