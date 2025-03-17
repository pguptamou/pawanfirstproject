

const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_TOKEN;
const geoCodingclient = mbxGeocoding({ accessToken: mapToken });
module.exports.index = async(req, res)=>{
    const allListings= await Listing.find({});
       
        res.render("listings/index.ejs", {allListings});
     }

module.exports.renderNewForm = (req, res)=>{
    

      res.render("listings/new.ejs");
  }
  module.exports.showListing = async(req, res)=>{
    let  {id}= req.params;
   
   const listing=  await Listing.findById(id).populate({
    path:"reviews", 
    populate:{
        path: "author",
    },
 }).populate("owner");
  
   if(!listing){
    req.flash("error", "Listing you requested for does not exits");
    res.redirect("/listings");
   }
  
   res.render("listings/show.ejs", {  listing   });
 }

 module.exports.createListing = async (req, res)=>{

     let response= await geoCodingclient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();

       // console.log(response.body.features[0].geometry);
        //res.send("done ")

        
    let url= req.file.path;
    let filename= req.file.filename;
    console.log(url, " ", filename);
    

    let listing= req.body.listing;
    
     const newListing= new Listing(listing);
    
     newListing.owner= req.user._id;
     newListing.image={ url, filename};
     newListing.geometry = response.body.features[0].geometry;
   
    let savedListing= await newListing.save();
    console.log(savedListing);
     req.flash("success", "New listing created");
     res.redirect("/listings");
        
   
    

}
module.exports.renderEditForm = async(req, res)=>{
    let {id}=req.params;
   const listing= await Listing.findById(id);
 
  if(!listing){
   req.flash("error", "Listing you requested for does not exits");
   res.redirect("/listings");
  }
  let originalImageUrl= listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","/upload/h_250,w_250");
  req.flash("success", "listing edited");
   res.render("listings/edit.ejs", {listing, originalImageUrl});
 }
 module.exports.updateListing = async(req, res, next)=>{
    try{
        let {id} = req.params;
       
           let updatedListing=await Listing.findByIdAndUpdate(id, {...req.body.listing});
           if(typeof req.file !=="undefined"){
            let url= req.file.path;
            let filename= req.file.filename;
            updatedListing.image= {url, filename};
            await updatedListing.save();
           }
         req.flash("success", "listing updated");
         res.redirect(`/listings/${id}`);
    }catch(err){
        next(err);
    }
   }

   module.exports.destroyListing = async(req, res, next)=>{
    try{
        let {id}= req.params;
   // console.log(id);
    const deletedListing= await Listing.findByIdAndDelete(id);
    //console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");

    }catch(err){
        next(err);
    }
    
}