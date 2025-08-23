import React from 'react'

const ViewApplications = ({ hrData, renderActionButton , renderTableHeader}) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
    const primaryButtonClass = "w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  return (
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
  )
}

export default ViewApplications
