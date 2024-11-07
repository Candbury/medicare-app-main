import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import hashPassword from '../../utils/bcrypt'; // Import the hashPassword function

const ProfileSettings = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    bloodType: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      // Create a new form data object
      const updatedFormData = { ...formData };
  
      // Check if the password field is not empty
      if (updatedFormData.password) {
        // Hash the new password
        const hashedPassword = await hashPassword(updatedFormData.password);
        updatedFormData.password = hashedPassword;
      } else {
        // Remove the password field if it's empty to avoid updating it in the database
        delete updatedFormData.password;
      }
  
      // Make the PUT request with the updated form data
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });
  
      const { message } = await res.json();
  
      if (!res.ok) {
        throw new Error(message);
      }
  
      setLoading(false);
      toast.success(message);
      navigate('/users/profile/me');
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <label htmlFor="name" className="text-headingColor font-bold text-[16px] leading-7">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-headingColor font-bold text-[16px] leading-7">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="text-headingColor font-bold text-[16px] leading-7">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="bloodType" className="text-headingColor font-bold text-[16px] leading-7">
            Blood Type:
          </label>
          <input
            type="text"
            id="bloodType"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full py-4 border-b border-solid border-[#006ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            
          />
        </div>

        <div className="mb-5">
          <label htmlFor="gender" className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        

        <div className="mt-7">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
