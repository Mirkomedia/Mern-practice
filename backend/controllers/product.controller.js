import Product from "../models/product.model.js";
import mongoose from "mongoose";


//GET
 export const getProducts =  async (req, res) =>{
    try {
        const products = await Product.find({}).populate('user', '_id name');
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
        const singleProduct = await Product.findById(id).populate('user'); // Assuming user is a reference to User model


       res.status(200).json({ success:true, data: singleProduct })
    } catch (error) {
        res.status(500).json({ success:false, message:"Server error" })
       
    }
};
export const createProduct = async (req, res) => {
    const { name, price, image, description, locked } = req.body;

    // Ensure the necessary fields are provided
    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // Get the current logged-in user's ID from the session (req.user is populated by the middleware)
    const userId = req.session.userId;  // Make sure req.session contains user data with _id

    // Check if the user ID is valid
    if (!userId) {
        return res.status(401).json({ success: false, message: "User is not authenticated" });
    }

    // Create new product with the user's ID
    const newProduct = new Product({
        name,
        price,
        image,
        description,
        locked,
        user: userId,  // Set the logged-in user's ObjectId as the user reference
    });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product:", error);
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
        console.log(req.session.userId)
        // Fetch the product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Check if user is admin or the owner of the product
        if (req.session.userRole === 'admin' || product?.user.toString() === req.session.userId.toString()) {
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
