const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    description: String,
    image: {
              filename: {
                 type:String,
                 default:"listingname",
                   },
              url: {
                type:String,
                default : "https://unsplash.com/photos/coconut-tree-on-beach-DH_u2aV3nGM",
                set: (v) => v === "" ? "https://unsplash.com/photos/coconut-tree-on-beach-DH_u2aV3nGM" : v,    
                   }, 
            },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;
