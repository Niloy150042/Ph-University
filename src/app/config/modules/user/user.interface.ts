import { USER_ROLE } from "./user.constant";

export type Tuser = {
  id: string;
  email:string;
  password?: string;
  needpasswordchange: boolean;
  isdeleted: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
};

export type Tuserrole = keyof typeof USER_ROLE
