import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: false
    },
    phonenumber: {
      type: String,
      required: false
    },
    alternativeContact: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
