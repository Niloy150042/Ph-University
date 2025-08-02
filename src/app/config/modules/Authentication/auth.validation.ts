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
    refreshToken: z.string({ required_error: 'refresh token is necessary' }).optional(),
  }),
});
export const Authvalidation = {
  loginvalidationschema,
  changepasswordvalidationschema,
  refreshtokenvalidationschema,
};
