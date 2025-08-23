import React from 'react'

const ScheduleInterview = ({hrData}) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
    const primaryButtonClass = "w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  return (
    
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
  )
}

export default ScheduleInterview