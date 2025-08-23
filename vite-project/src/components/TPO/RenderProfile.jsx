import React from 'react'

const RenderProfile = ({ tpoData }) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const primaryButtonClass = "bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    return (
        <div className={`${cardBaseClass} col-span-full md:col-span-2 lg:col-span-1`}>
            <div className="flex flex-col items-center text-center mb-6">
                <img
                    src={tpoData.profile.photo}
                    alt="TPO Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-`indigo`-500 shadow-md mb-4"
                />
                <h2 className="text-3xl font-extrabold text-indigo-800 mb-2">{tpoData.profile.name}</h2>
                <p className="text-lg text-gray-700">{tpoData.profile.designation}</p>
                <p className="text-md text-gray-600">{tpoData.profile.department} at {tpoData.profile.collegeName}</p>
            </div>
            <div className="text-center space-y-2 text-gray-700 mb-6">
                <p><span className="font-semibold">Email:</span> {tpoData.profile.email}</p>
                <p><span className="font-semibold">Phone:</span> {tpoData.profile.phone}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                <button className={primaryButtonClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                    Edit Profile
                </button>
                <button className={secondaryButtonClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    Change Password
                </button>
            </div>
        </div>
    )
}

export default RenderProfile
