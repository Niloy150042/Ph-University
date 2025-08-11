import { z } from "zod";

const userzodvalidation = z.object({

  body:z.object({
      password:z.string({
        invalid_type_error:'password must be in string'
    }).max(20,{message:'password can be bigger then 20'}
    ).optional(),
  })

    
})

export default userzodvalidation