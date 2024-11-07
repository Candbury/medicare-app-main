import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
    const id = req.params.id; 

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, message: "Successfully Updated", data: updatedDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update" }); 
    }
};


export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        await Doctor.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" }); 
    }
};

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id).populate('reviews').select('-password');
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({ success: true, message: "Doctor found", data: doctor });
    } catch (err) {
        console.error("Error fetching doctor:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { specialization: { $regex: query, $options: 'i' } }
                ]
            }).select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select('-password');
        }

        res.status(200).json({ success: true, message: "Doctors Found!", data: doctors });
    } catch (err) {
        console.error("Error fetching doctors:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId;

    try {
        if (!doctorId) {
            return res.status(400).json({ success: false, message: 'Doctor ID is missing in the request' });
        }

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        const { password, ...rest } = doctor._doc;
        const appointments = await Booking.find({ doctor: doctorId });

        res.status(200).json({ success: true, message: 'Profile info retrieved successfully', data: { ...rest, appointments } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong, couldn't get profile info" });
    }
};
