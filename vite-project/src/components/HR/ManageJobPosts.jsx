import React from 'react'

const ManageJobPosts = ({ fetchJobPosts, loadingJobs, jobPosts, jobsError, renderActionButton }) => {

    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
    const primaryButtonClass = "w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  return (
      <div className={cardBaseClass}>
          <div className="flex justify-between items-center mb-4">
              <h2 className={sectionTitleClass}>Manage Job Posts</h2>
              <button
                  onClick={fetchJobPosts}
                  disabled={loadingJobs}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
              >
                  {loadingJobs ? 'Loading...' : 'Refresh'}
              </button>
          </div>

          {/* Error Message */}
          {jobsError && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {jobsError}
              </div>
          )}

          {/* Loading State */}
          {loadingJobs && jobPosts.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-2 text-gray-600">Loading job posts...</span>
              </div>
          ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {jobPosts.length > 0 ? (
                      jobPosts.map((job) => (
                          <div key={job._id} className="border border-gray-200 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                              <div className="flex justify-between items-center mb-2">
                                  <h3 className="font-semibold text-lg text-gray-800">{job.role}</h3>
                                  <div className="flex gap-2">
                                      <span className={`text-xs font-semibold px-3 py-1 rounded-full
                  ${job.status === 'Active' ? 'bg-green-200 text-green-800' :
                                              job.status === 'Draft' ? 'bg-yellow-200 text-yellow-800' :
                                                  'bg-red-200 text-red-800'}
                `}>
                                          {job.status}
                                      </span>
                                      <span className={`text-xs font-semibold px-3 py-1 rounded-full
                  ${job.hasApproved ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}
                `}>
                                          {job.hasApproved ? 'Approved' : 'Pending'}
                                      </span>
                                  </div>
                              </div>

                              <p className="text-sm text-gray-700 mb-1">
                                  <span className="font-medium">Skills:</span> {job.requiredSkills.join(', ')}
                              </p>

                              <p className="text-sm text-gray-700 mb-1">
                                  <span className="font-medium">CTC:</span> {job.ctc} | <span className="font-medium">Location:</span> {job.location}
                              </p>

                              {job.eligibilityCriteria && (
                                  <p className="text-sm text-gray-700 mb-1">
                                      <span className="font-medium">Eligibility:</span>
                                      {job.eligibilityCriteria.passingYear && ` Year: ${job.eligibilityCriteria.passingYear}`}
                                      {job.eligibilityCriteria.branch && job.eligibilityCriteria.branch.length > 0 &&
                                          ` | Branches: ${job.eligibilityCriteria.branch.join(', ')}`
                                      }
                                  </p>
                              )}

                              {job.applicationDeadline && (
                                  <p className="text-sm text-gray-700 mb-1">
                                      <span className="font-medium">Deadline:</span> {new Date(job.applicationDeadline).toLocaleDateString()}
                                  </p>
                              )}

                              <p className="text-sm text-gray-700 mb-3">
                                  <span className="font-medium">Applicants:</span> {job.applicants ? job.applicants.length : 0}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                  {renderActionButton("Edit", () => console.log(`Edit job ${job._id}`), "bg-purple-500 text-white")}
                                  {renderActionButton("Delete", () => console.log(`Delete job ${job._id}`), "bg-red-500 text-white")}
                                  {renderActionButton("View Applicants", () => console.log(`View applicants for ${job._id}`), "bg-blue-500 text-white")}
                                  {job.status === 'Active' ? (
                                      renderActionButton("Close", () => console.log(`Close job ${job._id}`), "bg-gray-500 text-white")
                                  ) : (
                                      renderActionButton("Reopen", () => console.log(`Reopen job ${job._id}`), "bg-green-500 text-white")
                                  )}
                              </div>
                          </div>
                      ))
                  ) : (
                      <div className="text-center py-8">
                          <h3 className="text-lg font-medium text-gray-900">No job posts found</h3>
                          <p className="mt-1 text-sm text-gray-500">Create your first job post to get started.</p>
                          <button
                              onClick={() => setActiveSection('post-job')}
                              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                          >
                              Create Job Post
                          </button>
                      </div>
                  )}
              </div>
          )}
      </div>
  )
}

export default ManageJobPosts