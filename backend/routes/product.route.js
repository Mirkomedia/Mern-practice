import express from "express";
import mongoose from "mongoose";
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../controllers/product.controller.js";



const router = express.Router();
//GET
router.get("/", getProducts);
//GET single 
router.get("/:id", getProduct)
//POST
router.post("/", createProduct);
//PUT
router.put("/:id", updateProduct)
//DELETE
router.delete("/:id", deleteProduct)

export default router;