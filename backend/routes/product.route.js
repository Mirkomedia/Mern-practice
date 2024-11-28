import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../controllers/product.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const router = express.Router();
//GET
router.get("/", getProducts);
//GET single 
router.get("/:id", getProduct)
//POST
router.post("/", createProduct);
//PUT
router.put("/:id", isAuthenticated, updateProduct)
//DELETE
router.delete("/:id",isAuthenticated, deleteProduct)

export default router;