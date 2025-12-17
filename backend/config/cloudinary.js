import {  v2 as cloudinary } from 'cloudinary'


import fs from 'fs';



const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

try{
        if(!filePath) {
            return null;
        }
        const uploadResult = await cloudinary.uploader.upload(filePath, 
        {resource_type: "auto"});
        fs.unlinkSync(filePath); //deleting file from local storage after uploading to cloudinary
        return uploadResult.secure_url;

    }catch(error){
     fs.unlinkSync(filePath); //deleting file from local storage if any error occurs
    console.log("Error while uploading on cloudinary ", error);
}
}

export default uploadOnCloudinary;