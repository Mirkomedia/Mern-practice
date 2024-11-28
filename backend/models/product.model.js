import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    user: {
        type: String,
        required: false,
    },
    locked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true

});

const Product = mongoose.model('Product', productSchema);

export default Product;