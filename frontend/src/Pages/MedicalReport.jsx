import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import PDFViewer from './PDFViewer';

const reports = [
  {
    id: 1,
    title: 'Fasting Blood Sugar',
    date: '02.04.2025',
    file: assets.report,
    doctor: 'Dr. Sathushan',
    status: 'Verified',
  },
];

const MedicalReport = () => {

  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="min-h-screen sm:min-h-[80vh] p-6 m-6 border rounded-lg border-blue-500 bg-gray-50">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Medical Reports</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {reports.map((report) => (
        <div
          key={report.id}
          onClick={() => setSelectedReport(report)}
          className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition"
        >
          <h2 className="text-xl font-semibold text-gray-700">{report.title}</h2>
          <p className="text-sm text-gray-500">Date: {report.date}</p>
          <p className="text-sm text-gray-500">Doctor: {report.doctor}</p>
          <span className="text-green-600 font-medium text-sm">{report.status}</span>
        </div>
      ))}
    </div>

    {selectedReport && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-4xl h-[80vh] rounded-lg shadow-lg p-4 relative">
          <button
            onClick={() => setSelectedReport(null)}
            className="absolute top-2 right-4 text-lg font-bold text-red-500"
          >
            ✖
          </button>
          <PDFViewer file={selectedReport.file} />
        </div>
      </div>
    )}
  </div>
  )
}

export default MedicalReport