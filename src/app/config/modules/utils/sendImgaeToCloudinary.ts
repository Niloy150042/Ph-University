import { v2 as cloudinary } from 'cloudinary';
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
    console.log(uploadResult);
  } catch (err) {
    console.log(err);
  }
};
