const express= require("express");
const router= express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const {listingSchema}= require("../schema.js");
//const {listingSchema, reviewSchema}= require("../schema.js");
const ExpressError= require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js");
const listingController= require("../controllers/listings.js");
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
//const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage });

// const Review= require("../models/review.js");
// const reviews= require("../routes/review.js");




// //middleware validate listing
// const validateListing= (req, res, next)=>{
//     let {error}=listingSchema.validate(req.body);
//     if(error){
//         throw new ExpressError(400, error);
//     } else
//     next();
// }

//index Route
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

// .post(upload.single('listing[image]'), (req, res)=>{
//      //res.send(req.body);
//      res.send(req.file);
// });

router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing,listingController.updateListing)
.delete(isLoggedIn,isOwner ,listingController.destroyListing);

router.get("/:id/edit" , isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));
module.exports=router;




//router.get("/", wrapAsync(listingController.index));

// router.get("/", wrapAsync(async(req, res)=>{
//     const allListings= await Listing.find({});//.then((res)=>{
//         // console.log(res);
//         res.render("listings/index.ejs", {allListings});
//      }));
     //new route
     // router.get("/new",isLoggedIn, listingController.renderNewForm);

    //  router.get("/new",isLoggedIn, (req, res)=>{
    //    // console.log(req.user);
    // //    if(!req.isAuthenticated())
    // //    {
    // //     req.flash("error", "you must be logged in to create listing!")
    // //     //return res.redirect("/listings");
    // //     return res.redirect("/login");
    // //    }

    //      res.render("listings/new.ejs");
    //  })
 
     //Show Route
     //router.get("/:id", wrapAsync(listingController.showListing));
 
    //  router.get("/:id", wrapAsync(async(req, res)=>{
    //     let  {id}= req.params;
    //     //console.log(id);
    //    const listing=  await Listing.findById(id).populate({
    //     path:"reviews", 
    //     populate:{
    //         path: "author",
    //     },
    //  }).populate("owner");
    //    //console.log(listing.title);
    //    if(!listing){
    //     req.flash("error", "Listing you requested for does not exits");
    //     res.redirect("/listings");
    //    }
    //    //console.log(listing);
    //    res.render("listings/show.ejs", {  listing   });
    //  }));
    //  //create Route
   // router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing));
    //  router.post("/",isLoggedIn, validateListing, wrapAsync(async (req, res)=>{
    //      // if(!req.body.listing)
    //      // {
    //      //     throw new ExpressError(400, "send valid data for listing");
    //      // }
        
         
    //          // let {title}=req.body.listing;
    //      // let {description}=req.body.listing;
    //      // console.log(title);
    //      // console.log(description);
    //      // let result=listingSchema.validate(req.body);
    //      // console.log(result);
    //      // if(result.error){
    //      //     throw new ExpressError(400, result.error);
    //      // }
 
    //      let listing= req.body.listing;
    //      // console.log(listing);
    //       const newListing= new Listing(listing);
    //       //console.log(req.user);
    //       newListing.owner= req.user._id;
    //      //  if(!newListing.description)
    //      //     throw new ExpressError(400, "description missing") ;    
         
    //       //console.log(newListing);
        
    //       await newListing.save();
    //       req.flash("success", "New listing created");
    //       res.redirect("/listings");
             
        
         
 
    //  }));
     //Edit Route
     //router.get("/:id/edit" , isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));
    //  router.get("/:id/edit" , isLoggedIn, isOwner,wrapAsync(async(req, res)=>{
    //      let {id}=req.params;
    //     const listing= await Listing.findById(id);
    //    // console.log(listing);
    //    if(!listing){
    //     req.flash("error", "Listing you requested for does not exits");
    //     res.redirect("/listings");
    //    }
    //    req.flash("success", "listing edited");
    //     res.render("listings/edit.ejs", {listing});
    //     //next();
 
    //  }));
    //  //update Route
    //router.put("/:id", isLoggedIn,isOwner, validateListing,listingController.updateListing);
    //  router.put("/:id", isLoggedIn,isOwner, validateListing,async(req, res, next)=>{
    //      try{
    //          // if(!req.body.listing)
    //          // {
    //          //     throw new ExpressError(400, "send valid data for listing");
    //          // }
    //          let {id} = req.params;
    //          // console.log(id);
    //          //let listing= await Listing.findById(id);
    //         // if(!listing.owner.equals(res.locals.currUser._id)){
    //            // req.flash("error", "you don't have permission to edit");
    //            // return res.redirect(`/listings/${id}`);
    //          //}
              
    //          const updatedListing=await Listing.findByIdAndUpdate(id, {...req.body.listing});
    //          // console.log(updatedListing);
    //           //res.redirect("/listings")
    //           req.flash("success", "listing updated");
    //           res.redirect(`/listings/${id}`);
    //      }catch(err){
    //          next(err);
    //      }
        
 
    //  });
     //Destroy Route
    // router.delete("/:id",isLoggedIn,isOwner ,listingController.destroyListing);
    //  router.delete("/:id",isLoggedIn,isOwner ,async(req, res, next)=>{
    //      try{
    //          let {id}= req.params;
    //     // console.log(id);
    //      const deletedListing= await Listing.findByIdAndDelete(id);
    //      //console.log(deletedListing);
    //      req.flash("success", "Listing Deleted");
    //      res.redirect("/listings");
 
    //      }catch(err){
    //          next(err);
    //      }
         
    //  });
     //module.exports=router;