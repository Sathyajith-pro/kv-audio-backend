import Review from "../models/review.js";

export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Please login try  again"
        });
        return;
    }

    const data = req.body;

    //console.log("req.user",req.user);

    data.name = req.user.firstName + " " +req.user.lastName;
    data.email = req.user.email;
    data.profilePicture = req.user.profilePicture;

    const newReview = new Review(data);

    newReview.save().then(()=>{
        res.json({message:"Review successfully added"});
    }).catch(()=>{

       // console.error("error saving review",error)

        res.status(500).json({
            error: "Review addition failed "
        })
       
    });
}

//Create preview  reviews(cruad)

 export function getReviews(req,res){

    const user = req.user;

    if(user==null || user.role != "admin"){
        Review.find({isApproved : true}).then((reviews)=>{
            res.json(reviews);
        })
        return
    }
    if(user.role=="admin"){
        Review.find().then((reviews)=>{
            res.json(reviews);
        })
    }
 }

 
 //create delete

 export function deleteReview(req,res){

    const email = req.params.email;

    Review.deleteOne({email:email}).then(()=>{
        res.json({message : "Review delete successfully" });
    }).catch(()=>{
        res.status(500).json({
            error : "review deletion failed"
        })
    });
 }
