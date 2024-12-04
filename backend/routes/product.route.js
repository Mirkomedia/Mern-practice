import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct, updateUnlockedProduct } from "../controllers/product.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";


const router = express.Router();
//GET
router.get("/", getProducts);
//GET single 
router.get("/:id", getProduct)
//POST
router.post("/", createProduct);
//PUT
router.put("/:id",(isAuthenticated || isAdmin),  updateProduct)
//Unlocked product 
router.put("/:id/unlocked", updateUnlockedProduct)
//DELETE
router.delete("/:id",(isAuthenticated || isAdmin), deleteProduct)

export default router;