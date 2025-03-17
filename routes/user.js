const express= require("express");
const router= express.Router();
const User= require("../models/user.js")

const wrapAsync= require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl}= require("../middleware.js");
const userController= require("../controllers/users.js");



router.route("/signup")
.get( userController.renderSignupForm)
.post( wrapAsync(userController.signup));

router.route("/login")
.get(userController.redirectLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", 
    {failureRedirect:"/login", failureFlash:true}) ,userController.login);

    router.get("/logout",userController.logout);
    module.exports=router;


//get signup

//router.get("/signup", userController.renderSignupForm);
// router.get("/signup", (req, res)=>{
//     res.render("users/signup.ejs");
// })
//post signup
//router.post("/signup", wrapAsync(userController.signup));

// router.post("/signup", wrapAsync(async(req, res)=>{
//     try{
//         let {username, email, password}= req.body;
//         const newUser= new User({email, username});
//         //console.log(newUser);
//      const registeredUser= await User.register(newUser, password);
//      console.log(registeredUser);
//      req.login(registeredUser, (err)=>{
//         if(err){
//             return next(err);
//         }
//         req.flash("success", "Welcome to WanderLust");
//      res.redirect("/listings");
    

//      });
//     //  req.flash("success", "Welcome to WanderLust");
//     //  res.redirect("/listings");

//     } catch(err){
//         //console.log(err);
//         req.flash("error", err.message);
//         res.redirect("/signup");


//     }
   
    
// }))

//get login
//router.get("/login",userController.redirectLoginForm);
// router.get("/login", (req, res)=>{
//     res.render("users/login.ejs");
// })
//post login
//router.post("/login",saveRedirectUrl, passport.authenticate("local", 
   // {failureRedirect:"/login", failureFlash:true}) ,userController.login);

// router.post("/login",saveRedirectUrl, passport.authenticate("local", 
//     {failureRedirect:"/login", failureFlash:true}) ,
//     async(req, res)=>{
//     //.send("welcome to WonderLust! you are logged in !")
//     req.flash("success", "Welcome back to WanderLust !");
//    // res.redirect("/listings");
//    //res.redirect(req.session.redirectUrl);
//    //res.redirect(res.locals.redirectUrl);
//    let redirectUrl=res.locals.redirectUrl||"/listings";
//    res.redirect(redirectUrl);
// })

//GET logout
//router.get("/logout",userController.logout);

// router.get("/logout", (req, res, next)=>{
//     req.logout((err)=>{
//         if(err){
//             return next(err);
//         }
//         req.flash("success", "you are logedout!");
//         res.redirect("/listings");
//     });
// })


//module.exports=router;