import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email:  {
        type : String,
        requred :true,
        unique : true
    },
    password: {
        type : String,
        required : true 
    },
    role :{
        type : String,
        required : true,
        defult : "customer"
    },
    firstName :{
        type : String,
        requred : true,
    },
    lastName :{
        type : String,
        requred : true,
    },
    address: {
        type : String,
        requred : true
    },
    phone: {
        type : String,
        requred :true 
    }    
});

const User = mongoose.model("User",userSchema);

export default User;