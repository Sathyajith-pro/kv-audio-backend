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
    },
    profilePicture :{
        type: String,
        required : true,
        defualt : "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    }    
})

const Review = mongoose.model("Review",reviewSchema);

export default Review;