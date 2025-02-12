import bodyParser from "body-parser";
import express from "express"
import mongoose from "mongoose";  
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import reviewRouter from "./routes/reviewRouter.js";
import dotenv from "dotenv"
import inquiryRouter from "./routes/inquiryRouter.js";
import cors from "cors";

dotenv.config()
//.env file eka thibune routes folder eka athule ekai aula. eka root folder ekata danna ona
//e kiyanne project folder eke mulatama dana ona

const app = express()
app.use(cors());

app.use(bodyParser.json()); //middleware parser library 

app.use((req,res,next)=>{   //create middleware
    
    let token= req.header
    ("Authorization");
    
    if(token!=null){
        token = token.replace("Bearer ","");

        jwt.verify(token,process.env.JWT_SECRET,
        (err, decoded) => {
            //console.log(err);
            if(!err){
                req.user = decoded;
                
            }
        });
    }
    next()

    
});


let mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl)               //methanin thamai kiyanne mongo url ekath ekka connect wenna kiyala

const connection = mongoose.connection   //me mongoose kiyana library eke thiyena connection eka araganna kiyanawa
connection.once("open",()=>{
    console.log("MongoDB Connection established sucessfully")
})

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/reviews",reviewRouter);
app.use("/api/inquiries",inquiryRouter);


//testuser@example.com -customer
//testadmin@example.com-admin


app.listen(3002,()=>{
    console.log("Server is running on port 3002")
});

