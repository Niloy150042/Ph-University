import usermodel from '../modules/user/user.model';

const superAdmin = {
  id: 'S-001',
  email: 'super123@gmail.com',
  password: process.env.SUPER_ADMIN_PASS,
  needpasswordchange: true,
  isdeleted: false,
  role: 'super-admin',
  status: 'in-progress',
};

export const createSuperAdmin = async () => {
  const issuperAdminExists = await usermodel.findOne({ role: superAdmin.role });
  if (!issuperAdminExists) {
    await usermodel.create(superAdmin);
  }
};
