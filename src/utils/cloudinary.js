import {v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_SECRET_KEY 
});


const uploadCloudnary=  async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        //upload file on cloudninady
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"

        })

        //file uploaded success
        console.log("uploded on cloudninary");
        console.log(response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove the local saved temp file 
        return null;
        
    }

}


export {uploadCloudnary}