import { z } from 'zod';

const academic_faculty_validationschema = z.object({
  name: z
    .string({ required_error: 'faculty name must be in string' })
    .min(1, 'faculty name is required '),
});
export const faculty_validation = {
  academic_faculty_validationschema,
};
