import { z } from "zod";

export const academic_department_validation = z.object({
    name:z.string({required_error:'academic department must be required '}).min(1,'name cannot be empty'),
    academic_faculty:z.string({invalid_type_error:'academic faculty must be in string',required_error:'academic faculty must be provided'},)
})