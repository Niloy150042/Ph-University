import { z } from 'zod';

const adminusernamevalidation = z.object({
  firstname: z.string({ required_error: 'firstname is required' }),
  lastname: z.string({ required_error: 'lastname is required' }),
});

const gendervalues = ['male', 'female', 'others'] as const;

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
const adminvalidationschema = z.object({
  id: z.string({ required_error: 'id is required' }).optional()
//   user: z.string({ required_error: 'id is required' }),
  name: adminusernamevalidation,
  gender: z.enum(gendervalues, { required_error: 'gender is required' }),
  designation: z.string({ required_error: 'designation  is required' }),
  dateofbirth: z.optional(z.coerce.date()),
  email: z.string({ required_error: 'email is required' }),
  contactno: z.string({ required_error: 'contact no is required' }),
  emergencycontactno: z.string({
    required_error: ' emergency contact no is required',
  }),
  bloodgroup: z.enum(bloodGroupValues, {
    required_error: 'blood group is requried',
  }),
  presentaddress: z.string({ required_error: 'present address is required' }),
  permanentaddress: z.string({
    required_error: 'permanent  address is required',
  }),
  isdeleted: z.boolean().default(false),
});

export default adminvalidationschema;
