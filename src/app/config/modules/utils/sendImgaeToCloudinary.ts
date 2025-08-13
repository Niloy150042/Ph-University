import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
export const sendImageToCloudinary = async (imagename:string,path:string) => {
  try {
    cloudinary.config({
      cloud_name: 'djxof3774',
      api_key: '446939873695837',
      api_secret: 'PM9uwmvaawzMwe6KX-nEdx24Kes',
    });

    const uploadResult = await cloudinary.uploader.upload(
      path,
      {
        public_id: imagename,
      },

 
    );
     await fs.unlink(path);
 
          return uploadResult
    
    
  }

  catch (err) {
    console.log(err);
  }

};


// // Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'upload/'); // local folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
export const upload = multer({ storage });

