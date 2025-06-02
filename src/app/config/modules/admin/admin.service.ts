import { Tuser } from "../user/user.interface";
import usermodel from "../user/user.model";
import { Tadmin } from "./admin.interface";
import { adminmodel } from "./admin.model";

const craeteadminintodb = async(payload:Tadmin,password:string)=>{
    const userdata:Partial<Tuser> = {}
    userdata.password = password || (process.env.DEFAULT_PASS as string);
    userdata.role='admin'
    userdata.id=payload.id
    const result = await adminmodel.create(payload)
    await usermodel.create(userdata)
    return result
    
}

export const adminservices = {
    craeteadminintodb
}