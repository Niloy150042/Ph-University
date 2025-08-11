import { Tuser } from '../user/user.interface';
import usermodel from '../user/user.model';
import { Tadmin } from './admin.interface';
import { adminmodel } from './admin.model';

const craeteadminintodb = async (payload: Tadmin, password: string) => {
  const userdata: Partial<Tuser> = {};
  userdata.password = password || (process.env.DEFAULT_PASS as string);
  userdata.role = 'admin';
  userdata.id = payload.id;
  const lastadminfromdb = await adminmodel
    .findOne()
    .sort({ createdAt: -1 })
    .select({ id: 1, _id: 0 })
    .lean();
  let adminid = 'A-001';
  const lastadminid = Number(lastadminfromdb?.id?.slice(2, 5));
  if (lastadminid) {
    adminid = `A-${String(lastadminid + 1).padStart(3, '0')}`;
  }
  const result = await adminmodel.create({ ...payload, password, id: adminid });
  // admin email 
  const  email= payload.email
  await usermodel.create({...userdata,email:email,id:adminid});
  return result;
};
export const adminservices = {
  craeteadminintodb,
};
