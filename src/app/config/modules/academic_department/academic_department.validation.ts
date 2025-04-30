import { z } from "zod";

export const academic_department_validation = z.object({
    name:z.string({required_error:'academic department must be required '}).min(1,'name cannot be empty')
})