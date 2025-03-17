
if(process.env.NODE_ENV!= "production"){
    require('dotenv').config();
}



//require('dotenv').config();
//console.log(process.env.SECRET);

const express= require("express");
const app=express();
const mongoose= require("mongoose");
//const Listing = require("./models/listing");
const path= require("path");
const methodOverride= require("method-override");

//const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError= require("./utils/ExpressError.js");
const ejsMate= require("ejs-mate");
//const {listingSchema, reviewSchema}= require("./schema.js");
//const Review= require("./models/review.js");
// const listings= require("./routes/listing.js");
//const reviews= require("./routes/review.js");
const listingRouter= require("./routes/listing.js");
const reviewRouter= require("./routes/review.js");
 const userRouter= require("./routes/user.js");



const session= require("express-session");
const MongoStore = require('connect-mongo');
const flash= require("connect-flash");
const passport= require("passport");
const LocalStrategy= require("passport-local");
const User= require("./models/user.js");

//const MONGO_URL='mongodb://127.0.0.1:27017/mywanderLust';
const dbUrl= process.env.ATLASDB_URL;



async function main(){
    await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
});
// testing for saving data
// app.get("/testlisting", async(req, res)=>{
//     let sampleListing= new Listing({
//         title:"My new Villa",
//         description: "By the beach",
//         price : 1200,
//         location: " clonoycute , Goa",
//         country :"India",
//     });
//     // await Listing.findByIdAndDelete("67c038581fabfa1eed71d1a6");
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing db");
// });
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
const store= MongoStore.create({
    mongoUrl: dbUrl,
    crypto : {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});


const sessionOptions={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveuninitialized: true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};

app.get("/", (req, res)=>{
    res.send("Hi I am root");
});
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next)=>{
    res.locals.success=req.flash("success");
    res.locals.currUser=req.user
    res.locals.error= req.flash("error");
   // console.log(res.locals.success);
    next();
})


//app.use(express.urlencoded({extended: true}));

// app.get("/demouser", async(req, res)=>{
//     let fakeUser= new User({
//         email:"student@gmail.com",
//         username: "delta-student",
//     });
//     let registeredUser= await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// })

// app.get("/signup", (req, res)=>{
//     res.send("form");
// })



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);
//middleware validate listing
// const validateListing= (req, res, next)=>{
//     let {error}=listingSchema.validate(req.body);
//     if(error){
//         throw new ExpressError(400, error);
//     } else
//     next();
// }
// const validateReview= (req, res, next)=>{
//     let {error}= reviewSchema.validate(req.body);
//     if(error){
//         throw new ExpressError(400, error);
//     } else
//     next();
// }



// //index Route
// app.get("/listings", wrapAsync(async(req, res)=>{
//    const allListings= await Listing.find({});//.then((res)=>{
//        // console.log(res);
//        res.render("listings/index.ejs", {allListings});
//     }));
//     //new route
//     app.get("/listings/new", (req, res)=>{
//         res.render("listings/new.ejs");
//     })

//     //Show Route

//     app.get("/listings/:id", wrapAsync(async(req, res)=>{
//        let  {id}= req.params;
//        //console.log(id);
//       const listing=  await Listing.findById(id).populate("reviews");
//       //console.log(listing.title);
//       res.render("listings/show.ejs", {  listing   });
//     }));
//     //create Route
//     app.post("/listings",validateListing, wrapAsync(async (req, res)=>{
//         // if(!req.body.listing)
//         // {
//         //     throw new ExpressError(400, "send valid data for listing");
//         // }
       
        
//             // let {title}=req.body.listing;
//         // let {description}=req.body.listing;
//         // console.log(title);
//         // console.log(description);
//         // let result=listingSchema.validate(req.body);
//         // console.log(result);
//         // if(result.error){
//         //     throw new ExpressError(400, result.error);
//         // }

//         let listing= req.body.listing;
//         // console.log(listing);
//          const newListing= new Listing(listing);
//         //  if(!newListing.description)
//         //     throw new ExpressError(400, "description missing") ;    
        
//          //console.log(newListing);
//          await newListing.save();
//          res.redirect("/listings");
            
       
        

//     }));
//     //Edit Route
//     app.get("/listings/:id/edit" , wrapAsync(async(req, res)=>{
//         let {id}=req.params;
//        const listing= await Listing.findById(id);
//       // console.log(listing);
//        res.render("listings/edit.ejs", {listing});
//        //next();

//     }));
//     //update Route
//     app.put("/listings/:id", validateListing,async(req, res, next)=>{
//         try{
//             // if(!req.body.listing)
//             // {
//             //     throw new ExpressError(400, "send valid data for listing");
//             // }
//             let {id} = req.params;
//             // console.log(id);
             
//             const updatedListing=await Listing.findByIdAndUpdate(id, {...req.body.listing});
//             // console.log(updatedListing);
//              //res.redirect("/listings")
//              res.redirect(`/listings/${id}`);
//         }catch(err){
//             next(err);
//         }
       

//     });
//     //Destroy Route
//     app.delete("/listings/:id", async(req, res, next)=>{
//         try{
//             let {id}= req.params;
//        // console.log(id);
//         const deletedListing= await Listing.findByIdAndDelete(id);
//         //console.log(deletedListing);
//         res.redirect("/listings");

//         }catch(err){
//             next(err);
//         }
        
//     });
    //Review
    //Post route of review
    // app.post("/listings/:id/reviews",validateReview, wrapAsync(async(req, res)=>{
    //     let listing= await Listing.findById(req.params.id);
    //     let newReview= new Review(req.body.review);
    //     listing.reviews.push(newReview);
    //     console.log(newReview);
    //     await newReview.save();
    //     await listing.save();
    //     //res.send("new review saved");
    //     res.redirect(`/listings/${listing._id}`);

    // }));
    // //delete route of review
    // app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req, res)=>{
    //     let {id, reviewId}=req.params;
    //        await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    //     await Review.findByIdAndDelete(reviewId);
     

    //     res.redirect(`/listings/${id}`);
    // }));


    //page not found
    app.all("*", (req, res, next)=>{
        next(new ExpressError(404, "page not found"));
    });
   
//error middleware
app.use((err, req, res, next)=>{
    //res.send("something went wrong !");
    let {statusCode=500, message="some error occured"}=err;
    //res.status(statusCode).send(message);
    //res.render("error.ejs", {message});
    res.render("error.ejs", {err});
})





app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});