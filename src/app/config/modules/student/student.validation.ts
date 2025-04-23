import Joi from "joi";

const nameSchema = Joi.object({
            firstname: Joi.string().required(),
            middlename: Joi.string().required(),
            lastname: Joi.string().required(),
          });
          
          const guardianSchema = Joi.object({
            fathername: Joi.string().required(),
            fatheroccupation: Joi.string().required(),
            fathercontactno: Joi.string().required(),
            mothername: Joi.string().required(),
            motheroccupation: Joi.string().required(),
            mothercontactno: Joi.string().required(),
          });
          
          const localGuardianSchema = Joi.object({
            name: Joi.string().required(),
            occupation: Joi.string().required(),
            contactno: Joi.string().required(),
            address: Joi.string().required(),
          });
          
          const studentSchema = Joi.object({
            id: Joi.string().required().messages({
              'any.required': 'Student ID is required'
            }),
            name: nameSchema.required().messages({
              'any.required': 'Student name is required'
            }),
            gender: Joi.string().valid('male', 'female', 'other').required().messages({
              'any.required': 'Gender is required'
            }),
            datofbirth: Joi.string().required(),
            email: Joi.string().email().required().messages({
              'any.required': 'Email is required'
            }),
            avatar: Joi.string().required(),
            contactnumber: Joi.string().required().messages({
              'any.required': 'Contact number is required'
            }),
            emergencycontactnumber: Joi.string().required().messages({
              'any.required': 'Emergency contact number is required'
            }),
            bloodgroup: Joi.string().valid('A+', 'A-', 'o+', 'o-', 'AB+', 'AB-').required().messages({
              'any.required': 'Blood group is required'
            }),
            presenaddress: Joi.string().required(),
            permanenetaddress: Joi.string().required(),
            guardian: guardianSchema.required().messages({
              'any.required': 'Guardian information is required'
            }),
            localguardian: localGuardianSchema.required().messages({
              'any.required': 'Local guardian information is required'
            }),
            profileimage: Joi.string().required(),
            isactive: Joi.string().valid('active', 'blocked').default('active'),
          });
export default studentSchema