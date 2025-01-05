import Review from "../models/review.js";

export function addreview(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Please login try  again"
        });
        return;
    }

    const data = req.body;

    data.name = req.user.firstName + "" +lastName;
    data.email = req.user.email;
    data.profilePicture = req.user.profilePicture;

    const newReview = new Review(data)

    newReview.save().then(()=>{
        res.json({message:"Review successfully added"});
    }).catch(()=>{
        res.status(500).json({
            error: "Review addition failed "
        })
    });
}