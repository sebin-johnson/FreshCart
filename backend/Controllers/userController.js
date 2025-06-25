import User from "../Models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(409).json("Missing details!");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json("User already exists!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: "30d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            user: newUser,
            message: "User registered successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Registration failed", error });
    }
};

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing details!" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password!" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "30d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ success: true, message: "Login successful", user: existingUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// authentication
export const isAuth = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = req.user.id;
        console.log('userId from token:', userId);

        const existingUser = await User.findById(userId).select('-password');
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({
            message: "Authorized user",
            user: existingUser,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });

        res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
