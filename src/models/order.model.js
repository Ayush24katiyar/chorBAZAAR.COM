import mongoose , {Schema} from "mongoose";

const orderSCHEMA = new Schema({
    userId : {
        type :  mongoose.Schema.ObjectId , 
        ref : "USER"
    } , 
    orderDate : {
        type : String
    } ,
    amount : {
        type :  Number
    }

})

export default ORDER = mongoose.model("ORDER" , orderSCHEMA)