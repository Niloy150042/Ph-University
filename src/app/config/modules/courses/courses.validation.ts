import { z } from 'zod';

// Validate a single prerequisite course object
export const prerequisiteCoursevalidationSchema = z.object({
  course: z.string().min(1), // ObjectId will be a string
  isdeleted: z.boolean().optional().default(false),
});

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;
export const facultyvalidationschema = z.object({
  
  faculty: z.array(z.string().regex(ObjectIdRegex,'Invalid ObjectId')).nonempty('Faculty list cannot be empty'),
})


// Main course schema
export const coursevalidationshcema = z.object({
  body:z.object({
    title: z.string().min(1),
  prefix: z.string().min(1),
  code: z.number(),
  credits: z.number(),
  isdeleted: z.boolean().optional(),
  preRequisitecourse: z.array(prerequisiteCoursevalidationSchema).optional(),
  })
});

const updatevalidationschema = coursevalidationshcema.partial()

export default updatevalidationschema
