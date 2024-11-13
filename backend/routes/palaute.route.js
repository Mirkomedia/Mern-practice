import express from "express";
import { createPalaute } from "../controllers/palaute.controller.js";

const router = express.Router();


//POST
router.post("/", createPalaute);



export default router