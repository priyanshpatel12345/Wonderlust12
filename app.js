

const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const app = express();
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL = ("mongodb://127.0.0.1:27017/wonderlust");

main().then(() => {
    console.log("connect to DB");
})
.catch((err) => {
    console.log(err);
}); 

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.listen(8080 , () => {
    console.log("Server is ready");
});



app.get("/" , (req,res) => {
    res.send("Working");
});

// app.get("/testListing" , async(req,res) => {
//     let sampleListing = new Listing ({
//         title: "My new Villa",
//         description: "By the Beach",
//         price: 1200,
//         location: "Calangute Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("SuccessFul Testing");
// });

//Index Route
app.get("/Listings" , async (req,res) => {
    const allListnings = await Listing.find({});
    res.render("listings/index.ejs" , {allListnings});
});

//New Route
app.get("/Listings/new" , (req,res) => {
    res.render("listings/new.ejs");
});

//Show Route
app.get("/Listings/:id" , async (req,res) => {
    let { id} = req.params;
     const listing = await Listing.findById(id);
    res.render("listings/show.ejs" , {listing});
});

//Create Route
app.post("/Listings", async(req,res) => {
    const newListing = new Listing(req.body.listing);
    try {
    await newListing.save();
     res.redirect("/Listings");
             
} catch (error) {
    console.log(error);
}});

//Edit Route
app.get("/Listings/:id/edit" , async(req,res) => {
    let { id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
});

//Update Route
app.put("/Listings/:id" , async(req,res) => {
    let { id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/Listings/${id}`);
});

//Delete Route
app.delete("/Listings/:id" , async(req,res) => {
    let { id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/Listings");
});