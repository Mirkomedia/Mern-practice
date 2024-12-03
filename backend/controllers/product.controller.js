import Product from "../models/product.model.js";
import mongoose from "mongoose";
//GET
 export const getProducts =  async (req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data: products});
    } catch (error) {
        console.log("error in fetching products");
        res.status(500).json({success:false, message: "Server Error"});
    }
};
//GET Single
export const getProduct = async (req,res, next) =>{
    const { id } = req.params;
    const product = req.body ;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message: "Invalid Product Id" })
    }
    try {
        const singleProduct = await Product.findById(id);

       res.status(200).json({ success:true, data: singleProduct })
    } catch (error) {
        res.status(500).json({ success:false, message:"Server error" })
       
    }
};
//Create a new product
export const createProduct = async (req, res) => {
    const product = req.body; // User will send this data
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProduct =   async (req, res) =>{
   
    const { id } = req.params;
    const product = req.body ;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message: "Invalid Product Id" })
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new:true });

       res.status(200).json({ success:true, data: updatedProduct })
    } catch (error) {
        res.status(500).json({ success:false, message:"Server error" })
       
    }
};
//update unlocked product 
export const updateUnlockedProduct =   async (req, res) =>{
   
    const { id } = req.params;
    const product = req.body ;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message: "Invalid Product Id" })
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new:true });

       res.status(200).json({ success:true, data: updatedProduct })
    } catch (error) {
        res.status(500).json({ success:false, message:"Server error" })
       
    }
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    // Check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product Id" });
    }

    try {
        // Ensure the user is authenticated
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized, user not authenticated" });
        }

        // Fetch the product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Check if user is admin or the owner of the product
        if (req.user.role === 'admin' || product.user.toString() === req.user._id.toString()) {
            await Product.findByIdAndDelete(id);
            return res.status(200).json({ success: true, message: "Product deleted" });
        } else {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
