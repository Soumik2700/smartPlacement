import React from 'react'



const RenderOverview = ({ tpoData }) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-100 p-6 rounded-lg text-center shadow-md">
                    <h3 className="text-4xl font-extrabold text-blue-700">{tpoData.analytics.totalStudents}</h3>
                    <p className="text-gray-700 text-lg">Total Students</p>
                </div>
                <div className="bg-green-100 p-6 rounded-lg text-center shadow-md">
                    <h3 className="text-4xl font-extrabold text-green-700">{tpoData.analytics.placedStudents}</h3>
                    <p className="text-gray-700 text-lg">Students Placed</p>
                </div>
                <div className="bg-purple-100 p-6 rounded-lg text-center shadow-md">
                    <h3 className="text-4xl font-extrabold text-purple-700">{tpoData.analytics.activeJobs}</h3>
                    <p className="text-gray-700 text-lg">Active Jobs</p>
                </div>
                <div className="bg-orange-100 p-6 rounded-lg text-center shadow-md">
                    <h3 className="text-4xl font-extrabold text-orange-700">{tpoData.analytics.placementPercentage}%</h3>
                    <p className="text-gray-700 text-lg">Placement Rate</p>
                </div>
            </div>
            <section className={`${cardBaseClass} mb-8`}>
                <h2 className={sectionTitleClass}>Placement Trend (Mock Graph)</h2>
                <div className="h-64 bg-gray-100 rounded-lg flex items-end justify-around p-4">
                    {tpoData.analytics.placementGraphData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center" style={{ height: `${data.placed / 100 * 90}%` }}>
                            <span className="text-sm font-semibold text-indigo-700 mb-1">{data.placed}</span>
                            <div className="w-10 bg-indigo-500 rounded-t-lg" style={{ height: `${data.placed / 100 * 100}%` }}></div>
                            <span className="text-sm text-gray-600 mt-2">{data.year}</span>
                        </div>
                    ))}
                </div>
            </section>
            <section className={`${cardBaseClass} mb-8`}>
                <h2 className={sectionTitleClass}>Department-wise Placement</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.entries(tpoData.analytics.departmentWisePlacement).map(([dept, count]) => (
                        <div key={dept} className="bg-gray-100 p-4 rounded-lg flex items-center justify-between shadow-sm">
                            <span className="text-lg font-medium text-gray-700">{dept}</span>
                            <span className="text-xl font-bold text-indigo-600">{count}</span>
                        </div>
                    ))}
                </div>
            </section>
            <section className={`${cardBaseClass} mb-8`}>
                <h2 className={sectionTitleClass}>Shortlisting & Selection Ratio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(tpoData.analytics.selectionRatio).map(([label, ratio]) => (
                        <div key={label} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center shadow-sm">
                            <span className="text-lg font-medium text-gray-700 text-center mb-1">{label}</span>
                            <span className="text-2xl font-bold text-teal-600">{ratio}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default RenderOverview
