import { z } from 'zod';

// ekhane data postman theke jaooar age validate hoyei jabe
const nameSchema = z.object({
  firstname: z.string(),
  middlename: z.string(),
  lastname: z.string(),
});

const guardianSchema = z.object({
  fathername: z.string(),
  fatheroccupation: z.string(),
  fathercontactno: z.string(),
  mothername: z.string(),
  motheroccupation: z.string(),
  mothercontactno: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactno: z.string(),
  address: z.string(),
});

const studentvalidationSchema = z.object({
  
  password:z.string().max(20,"password cant exceed 20 "),
  student:z.object({
    name: nameSchema,
    gender: z.enum(['male', 'female', 'other'], {
      required_error: 'Gender is required',
    }),
    password:z.string(),
    datofbirth: z.string(),
    email: z.string().email('Invalid email address'),
    avatar: z.string(),
    contactnumber: z.string().min(1, 'Contact number is required'),
    emergencycontactnumber: z.string().min(1, 'Emergency contact number is required'),
    bloodgroup:z.enum(['A+', 'A-', 'o+', 'o-', 'AB+', 'AB-'], {
      required_error: 'Blood group is required',
    }),
    presenaddress: z.string(),
    permanenetaddress: z.string(),
    guardian: guardianSchema,
    localguardian: localGuardianSchema,
    profileimage: z.string(),
    isactive: z.enum(['active', 'blocked']).default('active'),
  })

  
});

export default studentvalidationSchema
