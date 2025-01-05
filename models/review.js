import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    email :{
        type : String,
        required : true,
        unique : true
    },
    name :{
        type : String,
        required : true,
    },
    rating :{
        type : String,
        required : true,
    },
    Comment:{
        type : String,
        required : true,
    },
    date :{
        type : String,
        required : true,
        default : Date.now()
    },
    isApproved : {
        type : Boolean,
        required : true,
        default : false
    }
})

const Review = mongoose.model("Review",reviewSchema);

export default Review;