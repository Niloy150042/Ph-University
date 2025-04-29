import { z } from 'zod';

 const AcademicSemesterZodSchema = z.object({
  name: z.enum(['Autum', 'Summer', 'Fall']),
  code: z.enum(['01', '02', '03']),
  year: z.string(),
  startMonth: z.enum(
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    {
      required_error: 'Start month is required',
    },
  ),
  endMonth: z.enum(
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    {
      required_error: 'end month is required',
    },
  ),
});

const updatevalidationacademicsemester = z.object({
  name: z.enum(['Autum', 'Summer', 'Fall']).optional(),
  code: z.enum(['01', '02', '03']) .optional(),
  year: z.string().optional(),
  startMonth: z.enum(
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    {
      required_error: 'Start month is required',
    },
  ) .optional(),
  endMonth: z.enum(
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    {
      required_error: 'end month is required',
    },
  ).optional(),
});

export const academicvalidation = {
  AcademicSemesterZodSchema,
  updatevalidationacademicsemester
};
