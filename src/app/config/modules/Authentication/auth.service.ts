import { Tloginuser } from "./auth.interface";

const loginuser = async(payload:Tloginuser)=>{
    console.log(payload);
    return {}
}
export const Authservices ={
    loginuser
}