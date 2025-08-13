import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import path from 'path';
export const sendImageToCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: 'djxof3774',
      api_key: '446939873695837',
      api_secret: 'PM9uwmvaawzMwe6KX-nEdx24Kes',
    });

    const uploadResult = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
      },
    );
    // console.log(uploadResult);
  } catch (err) {
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

