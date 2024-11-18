import User from "../models/user.model.js"
import express from "express";


const router = express.Router();
router.get("/", async (req,res) => {
    try{
        console.log("session data:", req.session)
        if(req.session && req.session.userId){
            const user = await User.findById(req.session.userId).select("-password")
            if(user){
                return res.json({ loggedIn :true, user});
            }
            res.json({loggedIn:false})
        }} catch (error){
            console.error("Error checking session:", error)
            res.status(500).json({message: "Server error"})
        
    }
   
})


export default router