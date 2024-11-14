import Palaute from "../models/palaute.model.js";
import mongoose from "mongoose";

// POST Create palaute
export const createPalaute = async (req, res) => {
    const palauteData = req.body;
  
    if (!palauteData) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }
  
    const newpalaute = new Palaute(palauteData);
  
    try {
      await newpalaute.save();
      res.status(201).json({ success: true, data: newpalaute });
    } catch (error) {
      console.error("Error in creating palaute", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  //GET All palaute
  //GET
 export const getPalaute =  async (req, res) =>{
    try {
        const palaute = await Palaute.find({});
        res.status(200).json({success:true, data: palaute});
    } catch (error) {
        console.log("error in fetching Palaute");
        res.status(500).json({success:false, message: "Server Error"});
    }
};