import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";

const DoctorDashboard = () => {
  const {
    dashData,
    setDashData,
    getDashData,
    dToken,
    CancleAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
      console.log(dashData);
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Dashboard Cards */}
        <div className="flex flex-wrap gap-3">
          {/* Total Appointments */}
          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          {/* Total Patients */}
          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>

          {/* Completed Appointments Today */}
          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-green-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.completed_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.completedAppointmentsToday}
              </p>
              <p className="text-gray-400">Completed Today</p>
            </div>
          </div>

          {/* Cancelled Appointments */}
          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-red-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointment_Cancel} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.cancelledAppointments}
              </p>
              <p className="text-gray-400">Cancelled</p>
            </div>
          </div>

          {/* Pending Appointments */}
          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-yellow-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.pending_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.pendingAppointments}
              </p>
              <p className="text-gray-400">Pending</p>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-teal-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.today_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.todayAppointments}
              </p>
              <p className="text-gray-400">Today's Appointments</p>
            </div>
          </div>

          {/* Average Rating */}
          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-yellow-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.star_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.averageRating} / 5
              </p>
              <p className="text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-blue-500">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold text-gray-600">Latest Appointment Bookings</p>
          </div>

          <div className="py-4 border border-blue-500 border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center px-4 py-3 gap-3 hover:bg-blue-50"
              >
                <img className="rounded-full w-12" src={item.userData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800">{item.userData.name}</p>
                  <p className="text-gray-500">{slotDateFormat(item.slotDate)}</p>
                </div>

                {item.cancelled ? (
                  item.isCompleted ? (
                    <p className="text-red-500 text-sm font-medium">
                      Appointment Cancelled by patient
                    </p>
                  ) : (
                    <p className="text-red-500 text-sm font-medium">
                      Appointment Cancelled by doctor
                    </p>
                  )
                ) : item.isCompleted ? (
                  <button
                    className="px-3 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => handleWriteReport(item._id)}
                  >
                    Write Report
                  </button>
                ) : (
                  <>
                    <img
                      onClick={() => CancleAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
