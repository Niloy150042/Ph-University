import { model, Schema } from 'mongoose';
import { Tadmin, Tusername } from './admin.interface';

const usernameschema = new Schema<Tusername>({
  firstname: {
    Type: String,
  },
  lastname: {
    Type: String,
  },
});
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
      required: [true, 'Id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'userid must be requried'],
      unique: true,
      ref: 'user',
    },
    name: usernameschema,
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: [true, 'gencer is required'],
    },
    designation: {
        Type:String
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

export const adminmodel = model <Tadmin>('admin',adminschema)
