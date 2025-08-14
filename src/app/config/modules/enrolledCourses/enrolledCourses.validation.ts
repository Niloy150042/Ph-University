import { z } from 'zod';

const cerateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const enrolledCourseValidation = {
  cerateEnrolledCourseValidationSchema,
};
