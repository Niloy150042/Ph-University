import { userservice } from './user.service';
import sendresponse from '../utils/sendresponse';
import status from 'http-status';
import asynccatch from '../utils/catchasync';



// following dry principle 


const createstudent = asynccatch (async (req, res) => {
  const { student, password } = req.body;
    const result = await userservice.createstudentintodb(student, password);

    sendresponse(res, {
      statuscode: status.OK,
      success: true,
      message: 'student creatd successfuly',
      data: result,
    });
  
})

const deletestudent = asynccatch(async (req, res) => {
  const id = req.params.id
  const result = await userservice.deleteuserfromdb(id);
 if(result){
  res.status(status.OK).send({
    success:true,
    message:'user and student deleted successfuly',
    data:result 
  })
 }
 else{
  throw new Error('data is not deleted')
 }
});

const getme =(asynccatch(async(req,res)=>{
  
  
  const result = await userservice.getmeservice(req.user)
    res.status(status.OK).send({
    success:true,
    message:'this users information is retrived successfully',
    data:result 
  })
}))


export const usercontroller = {
  createstudent,deletestudent,getme
};
