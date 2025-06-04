import { model, Schema } from 'mongoose';
import { Tadmin } from './admin.interface';
import bcrypt from 'bcrypt';

// const usernameschema = new Schema<Tusername>({
//   firstname: {
//     type: String,
//   },
//   lastname: {
//     type: String,
//   },
// });
const adminname = {
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
};

const bloodGroupValues = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;

const adminschema = new Schema<Tadmin>(
  {
    id: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: [true, 'this password is already exist'],
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   required: [true,'userid must be requried'],
    //   unique: true,
    //   ref: 'user',
    // },
    name: adminname,
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      // required: [true, 'gender is required'],
    },
    designation: {
      type: String,
    },
    dateofbirth: {
      type: Date,
    },
    email: {
      type: String,
    },
    contactno: {
      type: String,
    },
    emergencycontactno: {
      type: String,
    },
    bloodgroup: {
      type: String,
      enum: bloodGroupValues,
    },
    presentaddress: {
      type: String,
    },
    permanentaddress: {
      type: String,
    },
    isdeleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

adminschema.pre('save', async function (next) {
  const saltround = 10;
  const hashpassword = await bcrypt.hash(this.password, saltround);
  this.password = hashpassword;
  next();
});

adminschema.post('save', async function () {
  this.password = '';
});
export const adminmodel = model<Tadmin>('admin', adminschema);
