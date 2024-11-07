// Import necessary modules
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateToken= user =>{
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY,{
        expiresIn:"15d",
    })
}

// Define the register function
export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;

    try {
        let user = null;

        if (role === "patient") {
            user = await User.findOne({ email });
        } else if (role === "doctor") {
            user = await Doctor.findOne({ email });
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        // Create a new user based on the role
        if (role === "patient") {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        } else if (role === "doctor") {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        await user.save();

        res.status(200).json({ success: true, message: "User successfully created" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error, try again" });
    }
};

// Define the login function
export const login = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });
        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid password" });
        }

        // Generate and return a JWT token
        const token = generateToken(user);

        const { password, role, appointments, ...rest } = user._doc;

        res.status(200).json({ status: true, message: "Successfully logged in", token, data: { ...rest }, role });

    } catch (err) {
        res.status(500).json({ status: false, message: "Failed to login" });
    }
};
