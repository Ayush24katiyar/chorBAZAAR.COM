import mongoose , { Schema } from "mongoose";

const productSCHEMA = new Schema (
    {
    productNAME : {
        type : String , 
        required : true , 
        trim : true , 
        index : true ,        
    } , 
    productQUANTITY : {
        type : Number ,
        required : true
    } , 
    productPRICE : {
        type : Number ,
        required : true , 
        
    } ,
    productDESCRIPTION : {
        type : String , 
        required : true ,
    } ,
    productCATEGORY : {
        type : String , 
        required  : true , 
    } ,
    productIMAGE : {
        type : String , 
        required : true ,
    }

   }, {
    timestamps :  true
   })

   export const PRODUCT = mongoose.model("PRODUCT" , productSCHEMA)