import React, { useState } from 'react';
import Loader from '../../Components/Loading';
import Error from '../../Components/Error/Error';
import useGetProfile from '../../Hooks/UseFetchData';
import { BASE_URL } from '../../config';
import Tabs from '../doctor-account/Tabs';

const Dashboard = () => {
  const {data, loading, error} = useGetProfile(`${BASE_URL}/doctors/profile/me`) ;
  const [tab, setTab]= useState('overview');


  return<section>
    <div className='max-w-[1170px] px-5 mx-auto'>
    {loading && !error && <Loader />}
        {error && !loading && <Error />} 
        {!loading && !error && (
        <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
          
          
          </div>
        )}
        <Tabs tab={tab} setTab={setTab} />
        <div className='lg:col-span-2'>
          {data.isApproved === 'pending' && (
          <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
            <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
            </div>

          </div>
          )};
        </div>
        

    </div>
  </section>
}

export default Dashboard;












import React from 'react';
import { BiMenu } from 'react-icons/bi';
import {authContext} from '../../context/AuthContext'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const Tabs = ({ tab, setTab }) => {

  const {dispatch} = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch ({type:'LOGOUT'});
    navigate('/');
  };

  const handleDeleteAccount = () => {
    // Implement your delete account logic here
    console.log('Account deleted');
  };

  return (
    <div className='flex justify-start'>
      <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
        <button
          onClick={() => setTab('overview')}
          className={`${
            tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab('appointments')}
          className={`${
            tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>
        <button
          onClick={() => setTab('settings')}
          className={`${
            tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className='w-full btn mt-4 bg-red-500 hover:bg-red-600 text-white rounded-md'
        >
          Logout
        </button>
        <button
          onClick={handleDeleteAccount}
          className='w-full btn mt-4 bg-red-500 hover:bg-red-600 text-white rounded-md'
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Tabs;




import { useEffect, useState } from "react";
import { token } from "../config";

const useFetchData = (url)=>{
    
    const [data,setData]= useState([])
    const [loading, setLoading]= useState(false)
    const [error, setError]= useState(null)

    useEffect(()=>{
        const fetchData= async ()=>{
            setLoading(true)

            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const result = await res.json()
    
                if(!res.ok){
                    throw new Error (result.message+ '😒')
                }
                setData(result.data)
                setLoading(false)
            } catch (err) {
                setLoading(false)
                setError(err.message)
                
            }
        }
        fetchData()
    },[url])
    return {
       data, loading, error,
    };
};


export default useFetchData;











import React, { useState } from "react";

const ProfileSettings = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        bio: "",
        gender: "",
        specialization: "",
        ticketPrice: "",
        timeSlots: [{ startingDate: "", endingDate: "" }],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTimeSlotChange = (index, fieldName, value) => {
        const updatedTimeSlots = [...formData.timeSlots];
        updatedTimeSlots[index][fieldName] = value;
        setFormData((prevData) => ({
            ...prevData,
            timeSlots: updatedTimeSlots,
        }));
    };

    const addTimeSlot = () => {
        setFormData((prevData) => ({
            ...prevData,
            timeSlots: [...prevData.timeSlots, { startingDate: "", endingDate: "" }],
        }));
    };

    const removeTimeSlot = (index) => {
        const updatedTimeSlots = [...formData.timeSlots];
        updatedTimeSlots.splice(index, 1);
        setFormData((prevData) => ({
            ...prevData,
            timeSlots: updatedTimeSlots,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData); // For demonstration, log form data to console
    };

    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9bm-10">
                Profile Information
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <p className="form_label">Name*</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Email*</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@gmail.com"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Phone*</p>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Bio*</p>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Bio"
                        className="form_input"
                        maxLength={100}
                    />
                </div>
                <div className="mb-5 flex flex-col">
                    <div className="flex mb-2">
                        <div className="w-1/2 mr-2">
                            <p className="form_label">Gender</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="form_select"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <p className="form_label">Specialization</p>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="form_select"
                            >
                                <option value="">Select Specialization</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="manager">Manager</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex mb-2">
                        <div className="w-1/2 mr-2">
                            <p className="form_label">Ticket Price</p>
                            <input
                                type="number"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                onChange={handleInputChange}
                                placeholder="Ticket Price"
                                className="form_input"
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <p className="form_label">Time Slots</p>
                    {formData.timeSlots.map((timeSlot, index) => (
                        <div key={index} className="grid grid-cols-2 gap-5">
                            <div>
                                <p className="form_label">Starting Date</p>
                                <input
                                    type="date"
                                    name="startingDate"
                                    value={timeSlot.startingDate}
                                    onChange={(e) => handleTimeSlotChange(index, "startingDate", e.target.value)}
                                    className="form_input"
                                />
                            </div>
                            <div>
                                <p className="form_label">Ending Date</p>
                                <input
                                    type="date"
                                    name="endingDate"
                                    value={timeSlot.endingDate}
                                    onChange={(e) => handleTimeSlotChange(index, "endingDate", e.target.value)}
                                    className="form_input"
                                />
                            </div>
                            <button type="button" onClick={() => removeTimeSlot(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addTimeSlot}>Add Time Slot</button>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProfileSettings;
