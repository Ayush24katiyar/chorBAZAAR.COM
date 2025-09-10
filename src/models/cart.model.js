import mongoose , {Schema } from "mongoose";

const cartSCHEMA = new Schema ({
    userID : {
        type : mongoose.Schema.ObjectId , 
        ref : "USER" , 
        required : true  ,
    } , 
    productID : [{
        type : mongoose.Schema.ObjectId , 
        ref : "PRODUCT" ,
    } ], 

    quantity : {
        type : Number ,
    }
    

} ,
{
    timestamps : true
}
)

export default CART =  mongoose.model("CART" , cartSCHEMA)