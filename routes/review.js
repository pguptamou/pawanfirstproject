const express= require("express");
const router= express.Router({mergeParams: true});

const wrapAsync= require("../utils/wrapAsync.js");
//const {listingSchema, reviewSchema}= require("../schema.js");
const  {reviewSchema}= require("../schema.js");
const ExpressError= require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const Review= require("../models/review.js");
const {isLoggedIn, isOwner, validateReview,isReviewAuthor}= require("../middleware.js");
const reviewController= require("../controllers/reviews.js");


router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));
module.exports= router;

// const validateReview= (req, res, next)=>{
//     let {error}= reviewSchema.validate(req.body);
//     if(error){
//         throw new ExpressError(400, error);
//     } else
//     next();
// }


// //new review route

// router.post("/",isLoggedIn,validateReview, wrapAsync(async(req, res)=>{
//     console.log(req.params.id);
//         let listing= await Listing.findById(req.params.id);
//         let newReview= new Review(req.body.review);
//         newReview.author= req.user._id;
//         //console.log(newReview);
//         listing.reviews.push(newReview);
        
//         await newReview.save();
//         await listing.save();
//         //res.send("new review saved");
//         req.flash("success", "new review created");
//         res.redirect(`/listings/${listing._id}`);

//     }));
//     //delete route of review

//    router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(async(req, res)=>{
//         let {id, reviewId}=req.params;
//            await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
//         await Review.findByIdAndDelete(reviewId);
//         req.flash("success","Review deleted");
     

//         res.redirect(`/listings/${id}`);
//     }));

   // module.exports= router;

