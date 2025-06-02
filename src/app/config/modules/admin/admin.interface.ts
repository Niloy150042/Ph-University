import { Types } from "mongoose"

type Tusername ={
    firstname :string,
    lastname :string
}
type Tgender = 'male'|'female'|'other'

export type  Tadmin ={
    id :string,
    user:Types.ObjectId
    name:Tusername
    gender : Tgender
}

// export type student = {
//   id: string;
//   user:Types.ObjectId
//   name: username;
//   gender: 'male' | 'female'|'other';
//   datofbirth: Date;
//   email: string;
//   avatar: string;
//   contactnumber: string;
//   emergencycontactnumber: string;
//   bloodgroup: 'A+' | 'A-' | 'o+' | 'o-' | 'AB+' | 'AB-';
//   presenaddress: string;
//   permanenetaddress: string;
//   guardian: guardian;
//   localguardian: Localguardian;
//   profileimage?: string;
//   admissionsemester:Types.ObjectId;
//   academicdepartment:Types.ObjectId;
//   isdeleted:boolean

  
};