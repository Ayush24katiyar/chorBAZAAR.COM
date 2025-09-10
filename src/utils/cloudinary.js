import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; 
import dotenv from "dotenv";
import { log } from "console";
// configure cloudinary

dotenv.config()


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath)  return null
        const response =  await cloudinary.uploader.upload (
            localFilePath , {
                resource_type : "auto"
            }
        )
        console.log("file upload on cloudinary. file src : " + response.url);

        //once the file is uploaded we would like to delete it from our server
        fs.unlinkSync(localFilePath)
        return response
        
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async (publicID) => {
    try {
        const result = await cloudinary.uploader.destroy(publicID)
        console.log("deleted from cloudinary . public id " ,  publicID);
        
    } catch (error) {
        console.log("error deleting form clodinary" ,  error);
        return null
        
    }
}


 export {uploadOnCloudinary , deleteFromCloudinary }