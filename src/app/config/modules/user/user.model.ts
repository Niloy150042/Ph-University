import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";

const userschema = new Schema<Tuser>({
    id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    needpasswordchange:{
        type:Boolean,
        default:true
    },
    isdeleted:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','student','faculty']
    },
    status:{
        type:String,
        enum:['in-progress','blocked'],
        default:'in-progress'
    }

} , {
    timestamps:true
} )

const usermodel = model<Tuser>('User',userschema)

export default usermodel