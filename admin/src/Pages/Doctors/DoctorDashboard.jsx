import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";

const DoctorDashboard = () => {
  const { dashData, setDashData, getDashData, dToken } = useContext(DoctorContext);
    const {slotDateFormat} = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
      console.log(dashData);
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />

            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />

            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />

            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.users}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>

          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.donation_icon} alt="" />

            <div>
              <p className="text-xl font-semibold text-gray-600">
                රු.{dashData.totaldonations}
              </p>
              <p className="text-gray-400">Donations</p>
            </div>
          </div>

          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.total_beds} alt="" />

            <div>
              <p className="text-xl font-semibold text-gray-600">230</p>
              <p className="text-gray-400">Beds Available</p>
            </div>
          </div>
        </div>

        <div className="bg-white ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-blue-500">
            <img src={assets.list_icon} alt="" />

            <p className="font-semibold text-gray-600">
              Latest Appointment Bookings
            </p>
          </div>

          <div className="py-4 border border-blue-500 border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center px-4 py-3 gap-3 hover:bg-blue-50"
              >
                <img
                  className="rounded-full w-12"
                  src={item.docData.image}
                  alt=""
                />

                <div className="flex-1 text-sm">
                  <p className="text-gray-800">{item.docData.name}</p>
                  <p className="text-gray-500">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancleAppointment(item._id)}
                    className="w-5"
                    src={assets.delete_icon}
                    alt=""
                  />
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
