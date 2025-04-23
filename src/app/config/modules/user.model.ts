import { model, Schema } from 'mongoose';
import { Tuser } from './user.interface';

const userSchema = new Schema<Tuser>({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  needspasswordchange: {
    type: Boolean,
  },
  role: {
    type: String,
    enum: ['admin , student,faculty'],
    required: true,
  },
  status: {
    type: String,
    enum: ['in-progress ,blocked'],
    default:'in-progress'
  },
  isDeleted: {
    type: Boolean,
    default:false
  },
} ,{
    timestamps:true
});

 export const user = model <Tuser>('user',userSchema)