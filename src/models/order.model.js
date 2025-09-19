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

} , {
    timestamps : true
})

export default ORDER = mongoose.model("ORDER" , orderSCHEMA)