import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview);
reviewRouter.get("/",getReviews);
/*reviewRouter.get("/:name",
    (req,res)=>{
        console.log(req.params.name)
    }
)*/

export default reviewRouter;