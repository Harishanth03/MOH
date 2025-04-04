import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';

const MyProfile = () => {
  const [edit, setEdit] = useState(false);
  const { userData, setUserData, token, backendUrl, loadUserProfileData, updateUserProfile } = useContext(AppContext);
  const [image , setImage] = useState(false);

  const handleUpdateProfile = async () => {
    await updateUserProfile(userData, image);
    await loadUserProfileData();
    setEdit(false);
  };
  

  // Show loader until userData is fetched
  if (!userData) return <div className="text-center py-20 text-gray-600">Loading profile...</div>;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="w-full min-h-screen">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2 items-start my-4">
          <h2 className="text-xl font-medium text-gray-700">Welcome, {userData.name}</h2>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>

        <div className="bg-linear-to-r from-cyan-500 to-blue-500">
          <div>
            <div className="w-full bg-white mt-20 flex justify-between items-center p-5">
              <div className="w-full flex justify-start items-center gap-2">
                {
                  edit ? (
                    <input
                      type="file"
                      className="w-24"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                  ) : (
                    <img
                      className='w-24 rounded-full object-cover'
                      src={userData.image || assets.user}
                      alt="Profile"
                    />

                  )
                }

                <div className="text-gray-700">
                  <p className="text-lg font-medium">{userData.name}</p>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              </div>

              <button
                onClick={edit ? handleUpdateProfile : () => setEdit(true)}
                className={`${edit ? 'bg-green-600' : 'bg-[#0D6EFD]'} px-10 py-2.5 rounded-sm text-white cursor-pointer`}
              >
                {edit ? 'Save' : 'Edit'}
              </button>

            </div>

            <div className="w-full bg-white flex p-5">
              <div className="w-full flex flex-col md:grid grid-cols-4 gap-y-8 gap-4">

                {/* Username */}
                <div className="w-full flex flex-col md:col-span-2 gap-3">
                  <label className="block text-gray-600">User name:</label>
                  {
                    edit ? (
                      <input
                        value={userData.name}
                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]"
                        type="text"
                      />
                    ) : <p>{userData.name}</p>
                  }
                </div>

                {/* Email */}
                <div className="w-full flex flex-col md:col-span-2 gap-3">
                  <label className="block text-gray-600">Email:</label>
                  {
                    edit ? (
                      <input
                        value={userData.email}
                        onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]"
                        type="email"
                      />
                    ) : <p>{userData.email}</p>
                  }
                </div>

                {/* Phone */}
                <div className="w-full flex flex-col md:col-span-2 gap-3">
                  <label className="block text-gray-600">Phone:</label>
                  {
                    edit ? (
                      <input
                        value={userData.phone_number || ''}
                        onChange={(e) => setUserData(prev => ({ ...prev, phone_number: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]"
                        type="text"
                      />
                    ) : <p>{userData.phone_number}</p>
                  }
                </div>

                {/* Gender */}
                <div className="w-full flex flex-col md:col-span-2 gap-3">
                  <label className="block text-gray-600">Gender:</label>
                  {
                    edit ? (
                      <select
                        value={userData.gender}
                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : <p>{userData.gender}</p>
                  }
                </div>

                {/* Date of Birth */}
                <div className="w-full flex flex-col md:col-span-2 gap-3">
                  <label className="block text-gray-600">Date Of Birth:</label>
                  {
                    edit ? (
                      <input
                        value={userData.dob || ''}
                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]"
                        type="date"
                      />
                    ) : <p>{userData.dob}</p>
                  }
                </div>

                {/* Address */}
                <div className="w-full flex flex-col md:col-span-2 gap-3">
                  <label className="block text-gray-600">Address:</label>
                  <div className="flex flex-col md:flex-row w-full gap-2">
                    {
                      edit ? (
                        <>
                          <input
                            value={userData.address?.line1 || ''}
                            onChange={(e) => setUserData(prev => ({
                              ...prev,
                              address: {
                                ...(prev.address || {}),
                                line1: e.target.value
                              }
                            }))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]"
                            type="text"
                          />
                          <input
                            value={userData.address?.line2 || ''}
                            onChange={(e) => setUserData(prev => ({
                              ...prev,
                              address: {
                                ...(prev.address || {}),
                                line2: e.target.value
                              }
                            }))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0D6EFD]"
                            type="text"
                          />
                        </>
                      ) : (
                        <>
                          <p>{userData.address?.line1 || ''},</p>
                          <p>{userData.address?.line2 || ''}</p>
                        </>
                      )
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MyProfile;
