import nodemailer from 'nodemailer'
export const sendEmail= async(to:string,html:string)=>{
     const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "mehedislam150042@gmail.com",
    pass: "prnt ryyc sjim emlg",
  },
});
 await transporter.sendMail({
    from: 'mehedislam150042@gmail.com',
    to,
    subject: "password reset koro ",
    text: "taratari reset kore felo ", // plain‑text body
    html, // HTML body
  });


}