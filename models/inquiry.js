import mongoose, { Types } from "mongoose";

const inquirySchema = new mongoose.Schema({
    
    id :{
        type : Number,
        required : true,
        unique : true
    },
    email :{
        type : String,
        required:true
    },
    message :{
        type :String,
        required : true
    },
    phone :{
        type :String,
        required: true
    },
    date :{
        type :Date,
        required : true,
        default : Date.now()
    },
    response : {
        type : String,
        required: false,  //aniwarya na
        default: ""
    },
    isresolved :{
        type : Boolean,
        required : true,
        default :false //mulinma daddima resolve wela nane
    }
})

const Inquiry = mongoose.model("Inquiry",inquirySchema);
export default Inquiry;