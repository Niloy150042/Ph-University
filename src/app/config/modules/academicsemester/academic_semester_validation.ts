import { z } from 'zod';

export const AcademicSemesterZodSchema = z.object({
  body: z.object({
    name: z.enum(['Autum', 'Summer', 'Fall']),
    code: z.enum(['01', '02', '03']),
    year: z.date(),
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
  }),
});

export const  academicvalidation ={
    AcademicSemesterZodSchema
}
