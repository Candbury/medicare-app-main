import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from './../../utils/uploadCloudinary';
import{ BASE_URL, token} from './../../config';
import { toast } from "react-toastify";

const ProfileSettings = ({doctorData}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password:'',
        phone: "",
        bio: "",
        gender: "",
        Specialization: "",
        ticketPrice: 0,
        qualification:[{startingDate:'', endingDate:'', degree:'', university:''}],
        experiences:[{startingDate:'', endingDate:'', position:'', hospital:''}],
        timeSlot:[{ day:'', startingTime:'', endingTime:''}],
        about:'',
        photo:"",
    });

    const handleInputChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
       
    };

    const handleFileInputchange = async event=>{
        const file= event.target.files[0];
        const data= await uploadImageToCloudinary(file);
        setFormData({...formData,photo: data?.url});

    }
    
    const updateProfileHandler = async e=>{
        e.preventDefault();
        try {
            const res = await fetch (`${BASE_URL}/doctors/${doctorData._id}`,{
                method:'PUT',
                headers:{
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),

            });
            const data = await res.json();
            if(res.ok){
                toast.success(data.message);
            }

            toast.success(result.message);

        } catch(err) {
            toast.error(err.message)
        }
            
        }


    // reuseable function for adding items
    const addItem= (key,item) =>{
        setFormData(prevFormData => ({...prevFormData,[key]:[...prevFormData[key], item]}))
    }

    //Reusable input change funcation 
    const handleReuseableInputChangeFunc = (key, index, event)=> {
        const { name, value } = event.target;

        setFormData(prevFormData => {
            const updateItems=[...prevFormData[key]]

            updateItems[index][name] = value 

            return{
                ...prevFormData,
                [key]:updateItems,
            }
        })
    }

    //reuseable function for deleting item
    const deleteItem=(key, index) =>{
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: prevFormData[key].filter((_,i)=> i !== index),
        }))
    }

    const addQualification= e=>{
        e.preventDefault();

        addItem("qualification",{ startingDate:'', endingDate:'', degree:'', university:''

        })
        
    };

    const handleQualificationChange = (event,index) =>{
        handleReuseableInputChangeFunc('qualification', index, event)
    };

    const deleteQualification = (e,index) =>{
        e.preventDefault();
        deleteItem('qualification', index)
    }


    const addExperience= e=>{
        e.preventDefault();

        addItem("experiences",{ startingDate:'', endingDate:'', position:'', hospital:''

        })
        
    };

    const handleExperienceChange = (event,index) =>{
        handleReuseableInputChangeFunc('experiences', index, event)
    };

    const deleteExperience = (e,index) =>{
        e.preventDefault();
        deleteItem('experiences', index)
    }


    const addTimeSlot= e=>{
        e.preventDefault();

        addItem("timeSlot",{  day:'', startingTime:'', endingTime:''

        })
        
    };

    const handleTimeSlotChange = (event,index) =>{
        handleReuseableInputChangeFunc('timeSlot', index, event)
    };

    const deleteTimeSlot = (e,index) =>{
        e.preventDefault();
        deleteItem('timeSlot', index)
    }



    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Profile Information
            </h2>
            <form onSubmit={updateProfileHandler}>
                <div className="mb-5">
                    <p className="form__label">Name*</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="form__input"
                    />
                </div>

                <div className="mb-5">
                    <p className="form__label">Email*</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Example@gmail.com"
                        className="form__input"
                        readOnly
                        aria-readOnly
                        disabled={true}
                    />
                </div>

                <div className="mb-5">
                    <p className="form__label">Phone*</p>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="form__input"
                    />
                </div>

                <div className="mb-5">
                    <p className="form__label">Bio</p>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Bio"
                        className="form__input"
                        maxLength={100}
                    />
                </div>

                <div className="mb-5">
                    <p className="form__label">Gender</p>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form__input py-3.5"
                    >
                        <option value="select">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-5">
                    <p className="form__label">Specialization</p>
                    <select
                        name="Specialization"
                        value={formData.Specialization}
                        onChange={handleInputChange}
                        className="form__input py-3.5"
                    >
                        <option value="select">Select</option>
                        <option value="surgeon">Surgeon</option>
                        <option value="neurologist">Neurologist</option>
                        <option value="dentist">Dentist</option>
                    </select>
                </div>

                <div className="mb-5">
                    <p className="form__label">Ticket Price</p>
                    <input
                        type="number"
                        placeholder="100"
                        name="ticketPrice"
                        value={formData.ticketPrice}
                        onChange={handleInputChange}
                        className="form__input"
                    />
                </div>
                <div className="mb-5">
                <p className="form__label">Qualifications</p>
                 {formData.qualification?.map((item, index) => (
                      <div key={index}>
                         <div className="grid grid-cols-2 gap-5">
                        <div>
                       <p className="form__label">Starting Date</p>
                        <input
                          type="date"
                         name="startingDate" 
                         value={item.startingDate} 
                          className="form__input"
                          onChange={e=> handleQualificationChange(e, index)}
                         />
                     </div>
                     <div>
                       <p className="form__label">Ending Date</p>
                        <input
                          type="date"
                         name="endingDate" 
                         value={item.endingDate} 
                          className="form__input"
                          onChange={e=> handleQualificationChange(e, index)}
                         />
                     </div>
                     </div>
                     <div className="grid grid-cols-2 gap-5 mt-5">
                        <div>
                       <p className="form__label">Degree</p>
                        <input
                          type="text"
                         name="degree" 
                         value={item.degree} 
                          className="form__input"
                          onChange={e=> handleQualificationChange(e, index)}
                         />
                     </div>
                     <div>
                       <p className="form__label">University</p>
                        <input
                          type="text"
                         name="university" 
                         value={item.university} 
                          className="form__input"
                          onChange={e=> handleQualificationChange(e, index)}
                         />
                     </div>
                     <button onClick={e=>deleteQualification(e, index)} className="bg-red-600 p-2 rounded-full text-white mt-2 mb-2 cursor-pointer flex items-center justify-center">
                        <AiOutlineDelete className="text-sm" />
                        </button>
                     </div> 
                  </div>
                     ))}

                     <button onClick={addQualification} className=" bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add Qualification</button>
            </div>

            <div className="mb-5">
                <p className="form__label">Experiences</p>
                 {formData.experiences?.map((item, index) => (
                      <div key={index}>
                         <div className="grid grid-cols-2 gap-5">
                        <div>
                       <p className="form__label">Starting Date</p>
                        <input
                          type="date"
                         name="startingDate" 
                         value={item.startingDate} 
                          className="form__input"
                          onChange={e=> handleExperienceChange(e, index)}
                         />
                     </div>
                     <div>
                       <p className="form__label">Ending Date</p>
                        <input
                          type="date"
                         name="endingDate" 
                         value={item.endingDate} 
                          className="form__input"
                          onChange={e=> handleExperienceChange(e, index)}
                         />
                     </div>
                     </div>
                     <div className="grid grid-cols-2 gap-5 mt-5">
                        <div>
                       <p className="form__label">Position</p>
                        <input
                          type="text"
                         name="position" 
                         value={item.position} 
                          className="form__input"
                          onChange={e=> handleExperienceChange(e, index)}
                         />
                     </div>
                     <div>
                       <p className="form__label">Hospital</p>
                        <input
                          type="text"
                         name="hospital" 
                         value={item.hospital} 
                          className="form__input"
                          onChange={e=> handleExperienceChange(e, index)}
                          o
                         />
                     </div>
                     <button onClick={e=>deleteExperience(e, index)} className="bg-red-600 p-2 rounded-full text-white mt-2 mb-2 cursor-pointer flex items-center justify-center">
                        <AiOutlineDelete className="text-sm" />
                        </button>
                     </div> 
                  </div>
                     ))}

                     <button onClick={addExperience} className=" bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add Experience</button>
            </div>


            <div className="mb-5">
  <p className="form__label">Time Slot</p>
  {formData.timeSlot?.map((item, index) => (
    <div key={index} className="mb-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div>
          <p className="form__label">Day</p>
          <select
            name='day'
            value={item.day}
            className="form__input py-3.5"
            onChange={e=> handleTimeSlotChange(e, index)}
            
          >
            <option value=''>Select</option>
            <option value='saturday'>Saturday</option>
            <option value='sunday'>Sunday</option>
            <option value='monday'>Monday</option>
            <option value='tuesday'>Tuesday</option>
            <option value='wednesday'>Wednesday</option>
            <option value='thursday'>Thursday</option>
            <option value='friday'>Friday</option>
          </select>
        </div>
        <div>
          <p className="form__label">Starting time</p>
          <input
            type="time"
            name="startingTime"
            value={item.startingTime}
            className="form__input"
            onChange={e=> handleTimeSlotChange(e, index)}
          />
        </div>
        <div>
          <p className="form__label">Ending time</p>
          <input
            type="time"
            name="endingTime"
            value={item.endingTime}
            className="form__input"
            onChange={e=> handleTimeSlotChange(e, index)}
          />
        </div>
            </div>
                 <button onClick={e=>deleteTimeSlot(e, index)} className="bg-red-600 p-2 rounded-full text-white cursor-pointer flex items-center justify-center mt-6">
                        <AiOutlineDelete className="text-sm" />
                  </button>
         </div>
                 ))}
                <button onClick={addTimeSlot} className=" bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add TimeSlot</button>
                     
            </div>

            <div className="mb-5"></div>
            <p className="form__label">About</p>
            <textarea name="about"  cols={100} rows={5} value={formData.about} placeholder="Write About Yourself" onChange={handleInputChange} className="form__input"></textarea>

         <div className="mb-5">
                    <p className="form__label">Upload Image</p>
                    <input
                    type="file"
                    name="photo"
                    onChange={handleFileInputchange}
                    id="customFile"
                    accept=".jpg, .png"
                  />
                </div>
                <div className="mt-7">
                    <button type="submit" className="bg-primaryColor text-white text-[18px] leading-[20[x] w-full py-3 px-4 rounded-lg">Update Profile</button>

                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;
