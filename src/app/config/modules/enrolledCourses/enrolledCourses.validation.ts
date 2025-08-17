import { z } from 'zod';

const cerateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredcourse: z.string(),
  }),
});

const updateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    offeredcourse: z.string(),
    student: z.string(),
    courseMarks: z.object({
      classTest1: z.number().optional(),
      midTerm: z.number().optional(),
      classTest2: z.number().optional(),
      finalTerm: z.number().optional(),
    }),
  }),
});

export const enrolledCourseValidation = {
  cerateEnrolledCourseValidationSchema,
  updateEnrolledCourseValidationSchema,
};
