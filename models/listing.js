const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const Review= require("./review.js");
const listingSchema= new Schema({
    title: {
            type: String,
            required: true,
            },
    description: String,
     image: {
                url: String,
                filename: String,
    //         type: String,
            
    //             default: 'https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', // Default value if not provided
    //             set: (v) => v===""? 'https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60' : v,  // Round to nearest integer
              },
            

           
            
    price: Number,
    location: String,
    country: String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:"Review",

    },],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
     geometry: { // Make sure this is correctly formatted
        type: { 
            type: String, 
            enum: ['Point'], 
            required: true 
        },
        coordinates: {
            type: [Number], 
            required: true
        }
    },
});



const Listing= mongoose.model("Listing", listingSchema);

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }

})
module.exports= Listing;