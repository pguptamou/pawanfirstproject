const Listing= require("./models/listing.js");
const Review= require("./models/review.js");
const {listingSchema, reviewSchema}= require("./schema.js");
const ExpressError= require("./utils/ExpressError.js");

module.exports.isLoggedIn= (req, res, next)=>{
    // console.log(req.user);
    //console.log(req.path, "..", req.originalUrl);
    //console.log(req);
       if(!req.isAuthenticated())
       {
        //redirect url save
        req.session.redirectUrl= req.originalUrl;
        req.flash("error", "you must be logged in to create listing!")
        //return res.redirect("/listings");
        return res.redirect("/login");
       }
       next();
}
module.exports.saveRedirectUrl= (req, res, next)=>{
  if(req.session.redirectUrl)
  {
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}
module.exports.isOwner=async(req, res, next)=>{
            let {id} = req.params;
             // console.log(id);
             let listing= await Listing.findById(id);
             if(!listing.owner.equals(res.locals.currUser._id)){
                req.flash("error", "you are not the owner of this listing ");
                return res.redirect(`/listings/${id}`);
             }
             next();
}


//middleware validate listing
module.exports.validateListing= (req, res, next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    } else
    next();
};

module.exports.validateReview= (req, res, next)=>{
      let {error}= reviewSchema.validate(req.body);
      if(error){
          throw new ExpressError(400, error);
      } else
      next();
  };
  
module.exports.isReviewAuthor=async(req, res, next)=>{
  let {id, reviewId} = req.params;
   // console.log(id);
   let review= await Review.findById(reviewId);
 
   if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error", "you are not the author of this review ");
      return res.redirect(`/listings/${id}`);
   }
   next();
}

  