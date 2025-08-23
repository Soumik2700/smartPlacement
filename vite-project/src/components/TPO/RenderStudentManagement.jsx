import React from 'react'

const RenderStudentManagement = ({tpoData}) => {
    const cardBaseClass = "bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200";
    const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-4";
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200";
    const primaryButtonClass = "bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const secondaryButtonClass = "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";
    const dangerButtonClass = "bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center";

    const renderTableHeader = (headers) => (
        <thead>
            <tr className="bg-indigo-600 text-white text-left">
                {headers.map((header, index) => (
                    <th key={index} className="px-4 py-3 font-semibold text-lg">{header}</th>
                ))}
            </tr>
        </thead>
    );

    const renderActionButton = (text, onClick, colorClass, iconPath = null) => (
        <button onClick={onClick} className={`${colorClass} px-3 py-1 rounded-full text-xs hover:scale-105 transition-transform duration-200 flex items-center gap-1`}>
            {iconPath && <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">{iconPath}</svg>}
            {text}
        </button>
      );
    
    return (
        <div className={cardBaseClass}>
            <h2 className={sectionTitleClass}>Student Management</h2>
            <div className="mb-6 flex flex-wrap items-center gap-4">
                <select className={inputClass + " w-auto flex-grow"}>
                    <option>All Departments</option>
                    {Array.from(new Set(tpoData.students.map(s => s.department))).map(dept => <option key={dept}>{dept}</option>)}
                </select>
                <select className={inputClass + " w-auto flex-grow"}>
                    <option>All Years</option>
                    {Array.from(new Set(tpoData.students.map(s => s.year))).map(year => <option key={year}>{year}</option>)}
                </select>
                <select className={inputClass + " w-auto flex-grow"}>
                    <option>All Status</option>
                    <option>Placed</option>
                    <option>Applied</option>
                    <option>Shortlisted</option>
                    <option>Not Applied</option>
                </select>
                <button className={primaryButtonClass + " w-auto"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                    View / Edit Profiles
                </button>
                <label className={secondaryButtonClass + " w-auto cursor-pointer"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L16.586 7A2 2 0 0117 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /><path fillRule="evenodd" d="M8 8H6v7a1 1 0 001 1h6a1 1 0 001-1V8h-2V7a1 1 0 00-1-1H9a1 1 0 00-1 1v1z" clipRule="evenodd" /></svg>
                    Bulk Upload CSV
                    <input type="file" className="hidden" accept=".csv" />
                </label>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    {renderTableHeader(["Name", "Department", "Year", "CGPA", "Status", "Active", "Actions"])}
                    <tbody>
                        {tpoData.students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                <td className="border border-gray-200 px-4 py-3 text-gray-800">{student.name}</td>
                                <td className="border border-gray-200 px-4 py-3 text-gray-700">{student.department}</td>
                                <td className="border border-gray-200 px-4 py-3 text-gray-700">{student.year}</td>
                                <td className="border border-gray-200 px-4 py-3 text-gray-700">{student.cgpa}</td>
                                <td className="border border-gray-200 px-4 py-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${student.placementStatus === 'Placed' ? 'bg-green-100 text-green-800' :
                                        student.placementStatus === 'Shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                        {student.placementStatus}
                                    </span>
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {student.isActive ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td className="border border-gray-200 px-4 py-3">
                                    <div className="flex flex-wrap gap-2">
                                        {renderActionButton("View", () => console.log(`View student ${student.name}`), "bg-blue-500 text-white")}
                                        {renderActionButton("Edit", () => console.log(`Edit student ${student.name}`), "bg-indigo-500 text-white")}
                                        {student.isActive ? (
                                            renderActionButton("Deactivate", () => console.log(`Deactivate student ${student.name}`), "bg-red-500 text-white")
                                        ) : (
                                            renderActionButton("Activate", () => console.log(`Activate student ${student.name}`), "bg-green-500 text-white")
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RenderStudentManagement;
