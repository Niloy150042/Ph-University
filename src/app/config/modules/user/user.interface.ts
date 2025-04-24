export type Tuser = {
  id: string;
  password: string;
  needpasswordchange: boolean;
  isdeleted: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
};
