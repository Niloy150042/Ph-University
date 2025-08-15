import { z } from 'zod';

const cerateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredcourse: z.string(),
  }),
});

export const enrolledCourseValidation = {
  cerateEnrolledCourseValidationSchema,
};
