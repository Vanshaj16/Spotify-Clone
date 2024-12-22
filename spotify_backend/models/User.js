const mongoose = require("mongoose");
// How to create a model
// Step 1 : require mongoose
// Step 2 : Create a mongoose schema(structure of a user)
// Step 3 : Create a model from the schema
const User= new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{           // Generally the lastName is by default false, if not written
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    likedSongs:{
        //we will change this to array later
        type: String,
        default: "",
    },
    likedPlaylists:{
        //we will change this to array later
        type: String,
        default: "",
    },
    subscribedArtists:{
        //we will change this to array later
        type: String,
        default: "",
    },
});

const UserModel = mongoose.model("User",User);

module.exports = UserModel;