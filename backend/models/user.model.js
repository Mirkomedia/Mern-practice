import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: [true, 'Please pick another name']
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
      required: [true, 'Please add a password'],
      minlength: [8, 'Minimun password length is 8 characters']
    },
  },
  {
    timestamps: true
  }
);
//use a function before doc saved to database
userSchema.pre('save', async function (next){
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

const User = mongoose.model('User', userSchema);

export default User;
 