import mongoose from 'mongoose';
import User from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    const userId = req.session?.userId; // Access user._id directly from session object

    console.log("Session userId:", userId); // Debugging session data

    try {
        // Check if the userId is not set or user object is missing
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized, user not authenticated' });
        }

        // Check if the userId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }

        // Fetch the user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Attach user to the request object for use in route handlers
        req.user = {
            _id: user._id,
            role: user.role,
            name: user.name,
        };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export default isAuthenticated;
