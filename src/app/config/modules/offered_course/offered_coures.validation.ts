import { z } from 'zod';

// Define the enum for days (you must define `days` array first)
const daysEnum = z.enum(['SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']); // replace with your actual values

export const offercoursezodshape = z.object({
  semesterregistration: z.string().min(1, 'Semester registration is required'),
  academic_faculty: z.string().min(1, 'Academic faculty is required'),
  academic_department: z.string().min(1, 'Academic department is required'),
  course: z.string().min(1, 'Course is required'),
  maxcapacity: z.number().min(1, 'Max capacity must be at least 1'),
  section: z.string().min(1, 'Section is required'),
  days: daysEnum,

  startTime: z.string().min(1, 'Start time is required').refine((time)=>{
    const regex =/^(0?[1-9]|1[0-2]):[0-5][0-9]$/i

    return regex.test(time)
  },{message:"ivalid starttime format"}),

  endTime:  z.string().min(1, 'Start time is required').refine((time)=>{
    const regex =/^(0?[1-9]|1[0-2]):[0-5][0-9]$/i
    return regex.test(time)
  },{message:"ivalid endtime format"})
})

offercoursezodshape.refine((body)=>{
  const start = new Date(`1970-01-01T${body.startTime}:00`)
  const end  = new Date(`1970-01-01T${body.endTime}:00`)
  return end>start
},{
  message:"End time cannot held before starttime"
}) ;
