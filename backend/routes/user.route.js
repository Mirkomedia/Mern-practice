import express from "express";
import { createUser, deleteUser, getUsers, updateUser, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
//GET single 
router.get("/:id", getUser)
//POST
router.post("/", createUser);
//PUT
router.put("/:id", updateUser)
//DELETE
router.delete("/:id", deleteUser)


export default router