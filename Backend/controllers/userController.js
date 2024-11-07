import User from "../models/UserSchema.js";
import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const updateUser = async (req, res) => {
    const id = req.params.id; 

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, message: "Successfully Updated", data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update" }); 
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" }); 
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select('-password'); 
        if (user) {
            res.status(200).json({ success: true, message: "User Found!", data: user });
        }
    } catch (err) {
        res.status(404).json({ success: false, message: "no user found" }); 
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, message: "Users Found!", data: users });
    } catch (err) {
        res.status(404).json({ success: false, message: "not found" }); 
    }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is missing in the request' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({ success: true, message: 'Profile info retrieved successfully', data: { ...rest } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong, couldn't get profile info" });
  }
};

export const getMyAppointments = async(req,res) =>{
    try{

        //Step - 1  retrieve appoinetments from booking for specific user
        const bookings = await Booking.find({user:req.userId})

         //Step - 2  extract doctor ids from appointment bookings
         const doctorIds = bookings.map(el=>el.doctor.id)

        //Step - 3 retrieve docots from doctors ids
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-passoword')

        res.status(200).json({success:true, message: "Appointments are getting", data: doctors})

    } catch(err){
        res.status(500).json({ success: false, message: "Something went wrong, couldn't get profile info" });
    }
}
