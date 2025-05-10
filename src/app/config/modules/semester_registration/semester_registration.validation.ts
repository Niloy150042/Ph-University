import mongoose from "mongoose";
import { z } from "zod";

const semesterregistrationvalidation = z.object({
  academicsemester: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid academicsemester ObjectId',
    }),
  status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(), // optional since default is UPCOMING
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  mincredit: z.number().min(0).default(3), // can't be negative
  maxcredit: z.number().min(0).default(15),
});