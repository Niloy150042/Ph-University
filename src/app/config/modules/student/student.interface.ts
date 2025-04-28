import {  Types } from "mongoose";


export type username = {
  firstname: string;
  middlename: string;
  lastname: string;
};
export type guardian = {
  fathername: string;
  fatheroccupation: string;
  fathercontactno: string;
  mothername: string;
  motheroccupation: string;
  mothercontactno: string;
};

export type Localguardian = {
  name: string;
  occupation: string;
  contactno: string;
  address: string;
};
export type student = {
  id: string;
  user:Types.ObjectId
  name: username;
  gender: 'male' | 'female'|'other';
  datofbirth: Date;
  email: string;
  avatar: string;
  contactnumber: string;
  emergencycontactnumber: string;
  bloodgroup: 'A+' | 'A-' | 'o+' | 'o-' | 'AB+' | 'AB-';
  presenaddress: string;
  permanenetaddress: string;
  guardian: guardian;
  localguardian: Localguardian;
  profileimage?: string;
  admissionsemester:Types.ObjectId

  
};

