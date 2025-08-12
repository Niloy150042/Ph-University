import { z } from 'zod';

const loginvalidationschema = z.object({
  id: z.string({ required_error: 'id is required' }),
  password: z.string({ required_error: 'password is required' }),
});
const changepasswordvalidationschema = z.object({
  oldpassword: z.string({ required_error: 'old password is required' }),
  newpassword: z.string({ required_error: 'newpassword is required' }),
});

const refreshtokenvalidationschema = z.object({
  cookies: z.object({
    refreshToken: z
      .string({ required_error: 'refresh token is necessary' })
      .optional(),
  }),
});

const forgetPasswordValidationschema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User_id is required' }),
  }),
});
const resetpasswordvalidationschema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User_id is required' }),
    newPassword:z.string({required_error:"new Password is required"})
  }),
});

export const Authvalidation = {
  loginvalidationschema,
  changepasswordvalidationschema,
  refreshtokenvalidationschema,
  forgetPasswordValidationschema,
  resetpasswordvalidationschema
};
