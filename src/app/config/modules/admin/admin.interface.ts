export type Tusername = {
  firstname: string;
  lastname: string;
};
export type Tgender = 'male' | 'female' | 'other';

type Tbloodgroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Tadmin = {
  id: string;
  // user:Types.ObjectId
  name: Tusername;
  gender: Tgender;
  designation: string;
  dateofbirth?: Date;
  email: string;
  contactno: string;
  emergencycontactno: string;
  bloodgroup: Tbloodgroup;
  presentaddress: string;
  permanentaddress: string;
  isdeleted: boolean;
  password:string
};
