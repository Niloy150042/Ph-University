import { model, Schema } from 'mongoose';
import { Tuser } from './user.interface';
import bcrypt from 'bcrypt';

const userschema = new Schema<Tuser>(
  {
    id: {
      type: String,
      // required:true
    },
     email:{
      type: String,
      required:true
    },
    password: {
      type: String,
      required: true,
     // query korle jate password ta na paooa jay 
    },
    needpasswordchange: {
      type: Boolean,
      default: true,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty','super-admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    
  },
  {
    timestamps: true,
  },
);

userschema.pre('save', async function (next) {
  const saltround = 10;
  const hashpassword = await bcrypt.hash(this.password as string, saltround);
  this.password = hashpassword;
  next();
});

userschema.post('save', async function () {
  // console.log( 'userpassword hashed successfully');
  this.password = '';
});

const usermodel = model<Tuser>('User', userschema);

export default usermodel;
