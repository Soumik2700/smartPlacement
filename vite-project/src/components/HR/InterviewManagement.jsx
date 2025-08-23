import React from 'react'

const InterviewManagement = ({ hrData, renderActionButton }) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
    const primaryButtonClass = "w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  return (
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
  )
}

export default InterviewManagement
