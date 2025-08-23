import React from 'react'

const PostJobOpenings = ({ postSuccess, postError, handleJobPostSubmit, jobFormData, handleJobFormChange, posting }) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
    const primaryButtonClass = "w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  return (
      <div className={cardBaseClass}>
          <h2 className={sectionTitleClass}>Post New Job Opening</h2>

          {/* Success Message */}
          {postSuccess && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Job posted successfully!
                  </div>
              </div>
          )}

          {/* Error Message */}
          {postError && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {postError}
                  </div>
              </div>
          )}

          <form onSubmit={handleJobPostSubmit} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Role *</label>
                  <input
                      type="text"
                      name="role"
                      value={jobFormData.role}
                      onChange={handleJobFormChange}
                      placeholder="e.g., Full Stack Developer"
                      className={inputClass}
                      required
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills * (comma separated)</label>
                  <input
                      type="text"
                      name="requiredSkills"
                      value={jobFormData.requiredSkills}
                      onChange={handleJobFormChange}
                      placeholder="e.g., JavaScript, React.js, Node.js, MongoDB"
                      className={inputClass}
                      required
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTC *</label>
                  <input
                      type="text"
                      name="ctc"
                      value={jobFormData.ctc}
                      onChange={handleJobFormChange}
                      placeholder="e.g., 6-8 LPA"
                      className={inputClass}
                      required
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                      type="text"
                      name="location"
                      value={jobFormData.location}
                      onChange={handleJobFormChange}
                      placeholder="e.g., Bangalore, Karnataka"
                      className={inputClass}
                      required
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passing Year</label>
                  <input
                      type="number"
                      name="passingYear"
                      value={jobFormData.eligibilityCriteria.passingYear}
                      onChange={handleJobFormChange}
                      placeholder="e.g., 2024"
                      className={inputClass}
                      min="2020"
                      max="2030"
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligible Branches (comma separated)</label>
                  <input
                      type="text"
                      name="branch"
                      value={jobFormData.eligibilityCriteria.branch}
                      onChange={handleJobFormChange}
                      placeholder="e.g., Computer Science Engineering, Information Technology"
                      className={inputClass}
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                  <input
                      type="datetime-local"
                      name="applicationDeadline"
                      value={jobFormData.applicationDeadline}
                      onChange={handleJobFormChange}
                      className={inputClass}
                  />
              </div>

              <button
                  type="submit"
                  disabled={posting}
                  className={`${primaryButtonClass} ${posting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                  {posting ? (
                      <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Posting Job...
                      </>
                  ) : (
                      <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          Post Job
                      </>
                  )}
              </button>
          </form>
      </div>
  )
}

export default PostJobOpenings