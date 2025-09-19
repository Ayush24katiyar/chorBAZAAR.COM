import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose, { Schema } from "mongoose";
const userSCHEMA = new Schema(
    {
        username : {
            type : String,
            required : true ,
            index : true
        } ,

        email : {
            type : String , 
            required : true ,
            unique : true ,
        } ,

        password : {
            type : String , 
            required : true ,
        } ,
        address : {
            type : String , 
            required : true ,

        } , 
        role : {
            type : String ,
            enum : ['customer' , 'seller'] , default : 'customer'
        } ,

        refreshtoken : {
            type : String
        }


    } , {
        timestamps : true
    }
)

userSCHEMA.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})



userSCHEMA.methods.ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password , this.password)

}

userSCHEMA.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // <-- use env value
        }
    );
};

userSCHEMA.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // <-- use env value
        }
    );
};



export  const USER = mongoose.model("USER" , userSCHEMA)