import mongoose from 'mongoose';

const palauteSchema = new mongoose.Schema({
    palaute: {
        type: String ,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }
}, {
    timestamps: true

});

const Palaute = mongoose.model('Palaute', palauteSchema);

export default Palaute;