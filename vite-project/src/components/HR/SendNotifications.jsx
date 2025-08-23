import React from 'react'

const SendNotifications = ({hrData}) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
    const primaryButtonClass = "w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
  return (
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
  )
}

export default SendNotifications