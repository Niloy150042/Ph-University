import { model, Schema } from 'mongoose';
import { Tuser } from './user.interface';
import bcrypt from 'bcrypt';

const userschema = new Schema<Tuser>(
  {
    id: {
      type: String,
      // required:true
    },
    password: {
      type: String,
      required: true,
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
      enum: ['admin', 'student', 'faculty'],
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
  const hashpassword = await bcrypt.hash(this.password, saltround);
  this.password = hashpassword;
  next();
});

userschema.post('save', async function () {
  // console.log( 'userpassword hashed successfully');
  this.password = '';
});

const usermodel = model<Tuser>('User', userschema);

export default usermodel;
