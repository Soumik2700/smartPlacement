import React from 'react'

const AnalyticsSummary = ({ hrData }) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
    const primaryButtonClass = "w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  return (
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
  )
}

export default AnalyticsSummary;