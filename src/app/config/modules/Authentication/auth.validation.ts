import { z } from "zod";

const loginvalidationschema = z.object({
    id:z.string({required_error:'id is required'}),
    password:z.string({required_error:'password is required'})
})
export const Authvalidation = {
    loginvalidationschema
}