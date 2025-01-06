import express from "express";
import { addReview, deleteReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview);
reviewRouter.get("/",getReviews);
/*reviewRouter.get("/:name",
    (req,res)=>{
        console.log(req.params.name)
    }
)*/
reviewRouter.delete("/:email",deleteReview)

export default reviewRouter;