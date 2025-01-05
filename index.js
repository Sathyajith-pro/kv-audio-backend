import bodyParser from "body-parser";
import express from "express"
import mongoose from "mongoose";  
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";




const app = express()

app.use(bodyParser.json()); //middleware parser library 

app.use((req,res,next)=>{   //create middleware
    
    let token= req.header
    ("Authorization");
    
    if(token!=null){
        token = token.replace("Bearer ","");

        jwt.verify(token, "kv-secret-89!",
        (err, decoded) => {
            console.log(err);
            if(!err){
                req.user = decoded;
                
            }
        });
    }
    next()

    
});


let mongoUrl = "mongodb+srv://admin:123@cluster0.5jwx6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUrl)               //methanin thamai kiyanne mongo url ekath ekka connect wenna kiyala

const connection = mongoose.connection   //me mongoose kiyana library eke thiyena connection eka araganna kiyanawa
connection.once("open",()=>{
    console.log("MongoDB Connection established sucessfully")
})

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)


app.listen(3002,()=>{
    console.log("Server is running on port 3002")
});

