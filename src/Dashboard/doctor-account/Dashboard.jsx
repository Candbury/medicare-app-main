import React, { useContext, useState } from 'react'; 
import userImg from '../../assets/images/hero-img02.png';
import { authContext } from './../../context/AuthContext';
import Appointments from './Appointments'
import Profile from '../user-account/Profile';
import useGetProfile from '../../Hooks/UseFetchData';
import { BASE_URL } from '../../config';
import Loading   from '../../Components/Loading';
import Error from '../../Components/Error/Error';
import ProfileSettings from './ProfileSettings';

const MyAccount = () => {
  const { dispatch } = useContext(authContext); 
  const [tab, setTab] = useState('bookings');
  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`);
  console.log(userData, 'userData');
  console.log(error, 'error');

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
 
  return (
    <section>
      <div className='max-w-[1170] px-5 mx-auto'>
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error}/>}
    {
      !loading && !error && <div className='grid md:grid-cols-3 gap-10'> 
        <div className='pb-[50px] px-[30px] rounded-md'>
          <div className='flex items-center justify-center'>
            <figure className='w-[100px] h-[100px] rounded-full bottom-2 border-solid border-primaryColor'>
              <img src={userImg} alt='User Image' className='w-full h-full rounded-full' /> 
            </figure>
          </div>
          <div className='text-center mt-4'>
            <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
             {userData.name}
            </h3>
            <p className='text-textColor text-[15px] leading-6 font-medium'> 
              {userData.email}
            </p>
            <p className='text-textColor text-[15px] leading-6 font-medium'>
              Blood Type:
              <span className='ml-2 text-headingColor text-[22px] leading-8'>
              {userData.bloodType}
              </span>
            </p>
            <div className='mt-[50px] md:mt-[100px]'>
              <button onClick={handleLogout} className='w-full bg-[#a9b1c2] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button><br /> 
              <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>Delete Account</button> 
            </div>
          </div>
        </div>
        <div className='col-span-2 md:px-[20px]'>
          <div>
            <button onClick={() => setTab('Appointments')} className={`w-auto p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor ${tab === 'bookings' ? 'bg-primaryColor text-white font-normal' : ''}`}>Appointments</button>
            <button onClick={() => setTab('settings')} className={`w-auto py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor ${tab === 'settings' ? 'bg-primaryColor text-white font-normal' : ''}`}>Profile Settings</button>
          </div>
          {tab === 'Appointments' && <Appointments />}
          {tab === 'settings' && <ProfileSettings user={userData} />}
        </div>
      </div>
}
      </div>
    </section>
  );
};

export default MyAccount;