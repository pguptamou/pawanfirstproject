
const User= require("../models/user.js")

module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async(req, res)=>{
    try{
        let {username, email, password}= req.body;
        const newUser= new User({email, username});
        //console.log(newUser);
     const registeredUser= await User.register(newUser, password);
     console.log(registeredUser);
     req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to WanderLust");
     res.redirect("/listings");
    

     });
    //  req.flash("success", "Welcome to WanderLust");
    //  res.redirect("/listings");

    } catch(err){
        //console.log(err);
        req.flash("error", err.message);
        res.redirect("/signup");


    }
   
    
}
module.exports.redirectLoginForm = (req, res)=>{
    res.render("users/login.ejs");
}

module.exports.login =  async(req, res)=>{
    //.send("welcome to WonderLust! you are logged in !")
    req.flash("success", "Welcome back to WanderLust !");
   // res.redirect("/listings");
   //res.redirect(req.session.redirectUrl);
   //res.redirect(res.locals.redirectUrl);
   let redirectUrl=res.locals.redirectUrl||"/listings";
   res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logedout!");
        res.redirect("/listings");
    });
}