import mongoose , {Schema} from "mongoose";

const orderSCHEMA = new Schema({
    userId : {
        type :  mongoose.Schema.ObjectId , 
        ref : "USER"
    } ,
    
    product : [
        {
            productID : {
                type : mongoose.Schema.ObjectId ,
                ref : "PRODUCT"
            } ,
            quantity : Number , 
            price : Number ,

        }

    ] ,
    
    // orderDate : {
    //     type : Date , 
    //     default : Date.now , 
    // } ,
   

} , {
    timestamps : true
})

export const ORDER = mongoose.model("ORDER" , orderSCHEMA)