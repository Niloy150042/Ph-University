import { z } from 'zod';

// Validate a single prerequisite course object
export const prerequisiteCoursevalidationSchema = z.object({
  course: z.string().min(1), // ObjectId will be a string
  isdeleted: z.boolean().optional().default(false),
});

// Main course schema
export const coursevalidationshcema = z.object({
  title: z.string().min(1),
  prefix: z.string().min(1),
  code: z.number(),
  credits: z.number(),
  isdeleted: z.boolean().optional(),
  preRequisitecourse: z.array(prerequisiteCoursevalidationSchema).optional(),
});

export default coursevalidationshcema
