import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_');
    const monthIndex = Number(month) - 1;
    const validMonth = months[monthIndex] || "Invalid";
    return `${day} ${validMonth} ${year}`;
  };

  // Fetch User Appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Cancel Appointment
  const cancleAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Open Rate Modal
  const openRateDoctorModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
    setRatingValue(0); // Reset rating
    setHoverValue(undefined);
  };

  const closeRateDoctorModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className='text-2xl my-3 font-bold text-start border-b pb-3 text-zinc-700 border-gray-300 sm:text-4xl'>My Appointment</p>

      <div>
        {appointments.slice(0, 10).map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-gray-300 py-2 border-b' key={index}>
            {/* Doctor Image */}
            <div>
              <img className='w-32 rounded-lg' src={item.docData.image} alt="" />
            </div>

            {/* Doctor Details */}
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>
                <span> {slotDateFormat(item.slotDate)} | {item.slotTime}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-2 justify-center'>
              {/* Rate Doctor Button */}
              <button
                onClick={() => openRateDoctorModal(item)}
                disabled={item.cancelled || !item.isCompleted}
                className={`text-sm text-center sm:min-w-48 py-2 border rounded transition-all duration-300 ${
                  item.cancelled || !item.isCompleted
                    ? 'bg-gray-300 text-white-500 cursor-not-allowed' 
                    : 'text-stone-500 hover:bg-[#fcdb35] hover:text-white cursor-pointer'
                }`}
              >
                Rate Doctor
              </button>

              {/* Cancel or Completed Status */}
              {item.isCompleted ? (
                <div className="text-green-500 font-semibold text-sm text-center">
                  Appointment Completed
                </div>
              ) : (
                <button
                  onClick={() => cancleAppointment(item._id)}
                  disabled={item.cancelled}
                  className={`text-sm text-center sm:min-w-48 py-2 border rounded cursor-pointer transition-all duration-300 ${
                    item.cancelled 
                      ? 'bg-gray-300 text-red-500 cursor-not-allowed' 
                      : 'text-stone-500 hover:bg-[#0D6EFD] hover:text-white'
                  }`}
                >
                  {item.cancelled ? 'Cancelled' : 'Cancel Doctor'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rating Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Rate Dr. {selectedAppointment.docData.name}</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const comment = e.target.comment.value;
                const anonymous = e.target.anonymous.checked;

                if (ratingValue === 0) {
                  toast.error("Please select a star rating!");
                  return;
                }

                try {
                  const { data } = await axios.post(
                    backendUrl + "/api/user/submit-feedback",
                    {
                      doctorId: selectedAppointment.docId,
                      appointmentId: selectedAppointment._id,
                      rating: ratingValue,
                      comment,
                      anonymous
                    },
                    { headers: { token } }
                  );

                  if (data.success) {
                    toast.success(data.message);
                    closeRateDoctorModal();
                    getUserAppointments();
                  } else {
                    toast.error(data.message);
                  }
                } catch (error) {
                  console.log(error);
                  toast.error(error.message);
                }
              }}
              className="flex flex-col gap-4"
            >
              {/* Star Rating */}
              <div className="flex justify-center gap-1 text-3xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingValue(star)}
                    onMouseEnter={() => setHoverValue(star)}
                    onMouseLeave={() => setHoverValue(undefined)}
                    className={`transition-all ${
                      (hoverValue || ratingValue) >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Comment */}
              <textarea
                name="comment"
                placeholder="Write your feedback (optional)"
                className="border border-blue-500 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:border-none focus:ring-blue-400"
              ></textarea>

              {/* Anonymous */}
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="anonymous" />
                Submit Anonymously
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all"
              >
                Submit Feedback
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={closeRateDoctorModal}
                className="text-gray-500 text-center mt-2 underline"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
