const renderCompanyHRManagement = ({ renderTableHeader, renderActionButton, fetchHRsFromAPI, loadingHRs, loadingHRDetails, loadingJobApproval, realHRs, renderHRDetailModal, renderJobApprovalModal }) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
    const primaryButtonClass = "bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    return (
        <div className={cardBaseClass}>
            <h2 className={sectionTitleClass}>Company & HR Management</h2>
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">Registered Companies & HRs:</h3>
                    <button
                        onClick={fetchHRsFromAPI}
                        disabled={loadingHRs}
                        className={`${primaryButtonClass} ${loadingHRs ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loadingHRs ? 'Loading...' : 'Refresh'}
                    </button>
                </div>

                {loadingHRs ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <span className="ml-2 text-gray-600">Loading HRs...</span>
                    </div>
                ) : (
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                            {renderTableHeader(["Company Name", "HR Name", "Email", "Jobs Posted", "Total Applicants", "Active Jobs", "Actions"])}
                            <tbody>
                                {realHRs.map((hr) => (
                                    <tr key={hr._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="border border-gray-200 px-4 py-3 text-gray-800">{hr.companyName}</td>
                                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{hr.name}</td>
                                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{hr.email}</td>
                                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{hr.totalJobs}</td>
                                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{hr.totalApplicants}</td>
                                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{hr.activeJobs}</td>
                                        <td className="border border-gray-200 px-4 py-3">
                                            <div className="flex flex-wrap gap-2">
                                                {renderActionButton(
                                                    loadingHRDetails ? "Loading..." : "View",
                                                    () => handleViewHR(hr._id),
                                                    `bg-blue-500 text-white ${loadingHRDetails ? 'opacity-50 cursor-not-allowed' : ''}`
                                                )}
                                                {renderActionButton(
                                                    loadingJobApproval ? "Loading..." : "Approve Jobs",
                                                    () => handleApproveJobs(hr._id),
                                                    `bg-green-500 text-white ${loadingJobApproval ? 'opacity-50 cursor-not-allowed' : ''}`
                                                )}
                                                {renderActionButton("Block", () => console.log(`Block HR ${hr.name}`), "bg-red-500 text-white")}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loadingHRs && realHRs.length === 0 && (
                    <p className="text-gray-600 italic text-center py-4">No HRs found.</p>
                )}
            </div>

            {/* Render both modals */}
            {renderHRDetailModal()}
            {renderJobApprovalModal()}
        </div>
    )
};

export default renderCompanyHRManagement;