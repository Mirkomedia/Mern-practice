import express from "express";
import { createPalaute, getPalaute } from "../controllers/palaute.controller.js";

const router = express.Router();


//POST
router.post("/", createPalaute);
//GET 
router.get("/", getPalaute);



export default router