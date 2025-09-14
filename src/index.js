import { app } from "./app.js";
import connectDB from "../src/database/db.js"
import express, { urlencoded } from "express"
import dotenv from "dotenv"

dotenv.config({
    path : "./.env"
})

app.use(express.json())
app.use(urlencoded({extended : true}))

const PORT = process.env.PORT || 7001

connectDB().then(() => {
    app.listen(PORT , () => {
        console.log(`server is running at ${PORT}`);
        
    })
}).catch((err) => {
    console.log("server failed to connect" , err);
    
})

app.get("/health" , (req , res) => {
    res.json({
        message : "everything is working fine no need to take tension !"
    })
})


