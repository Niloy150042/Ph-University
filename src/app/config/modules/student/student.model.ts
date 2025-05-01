import { model, Schema } from 'mongoose';
import {
  guardian,
  Localguardian,
  student,
  username,
} from './student.interface';
import bcrypt from 'bcrypt';

const nameschema = new Schema<username>({
  firstname: { type: String, required: true },

  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
});
const guardianschema = new Schema<guardian>({
  fathername: { type: String },
  fatheroccupation: { type: String },
  fathercontactno: { type: String },
  mothername: { type: String },
  motheroccupation: { type: String },
  mothercontactno: { type: String },
});

const localguardianshcema = new Schema<Localguardian>({
  name: { type: String },
  occupation: { type: String },
  contactno: { type: String },
  address: { type: String },
});

const studentschema = new Schema<student>({
  name: {
    type: nameschema,
    required: [true, 'Student name is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'userid is must be required'],
    unique: true,
  },
  id:{
    type:String
  },
 
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  avatar: {
    type: String,
  },
  contactnumber: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencycontactnumber: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodgroup: {
    type: String,
    enum: ['A+', 'A-', 'o+', 'o-', 'AB+', 'AB-'],
    required: [true, 'Blood group is required'],
  },
  presenaddress: {
    type: String,
  },
  permanenetaddress: {
    type: String,
  },
  guardian: {
    type: guardianschema,
    required: [true, 'Guardian information is required'],
  },

  admissionsemester: {
    type: Schema.Types.ObjectId,
    ref: 'semester',
  },

  localguardian: {
    type: localguardianshcema,
    required: [true, 'Local guardian information is required'],
  },
  profileimage: {
    type: String,
  },

  academicdepartment:{
    type:Schema.Types.ObjectId,
    ref:'academic_department',
    required:true
  }
  
});

export const studentmodel = model<student>('student', studentschema);
