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
      Type: String,
      required: [true, 'Id is required'],
      unique: true,
    },
    user: {
      Type: Schema.Types.ObjectId,
      required: [true, 'userid must be requried'],
      unique: true,
      ref: 'user',
    },
    name: usernameschema,
    gender: {
      Type: String,
      enum: ['male', 'female', 'others'],
      required: [true, 'gencer is required'],
    },
    designation: String,
    dateofbirth: {
      Type: Date,
    },
    email: {
      Type: String,
    },
    contactno: {
      Type: String,
    },
    emergencycontactno: {
      Type: String,
    },
    bloodgroup: {
      Type: String,
      enum: bloodGroupValues,
    },
    presentaddress: {
      Type: String,
    },
    permanentaddress: {
      Type: String,
    },
    isdeleted: {
      Type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export const adminmodel = model <Tadmin>('admin',adminschema)
