const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

router.post("/create", passport.authenticate("jwt", {session: false}),
 async (req,res) => {
    // req.user gets the user because of passport.authenticate
    const {name,thumbnail,track} = req.body;
    if(!name || !thumbnail || !track) {
        return res.status(301).json({err: "Insufficient details to create song."});
    }
    const artist = req.user._id;
    const songDetails = {name, thumbnail, track, artist};
    const createSong = await Song.create(songDetails);
    return res.status(200).json(createSong);
});

// Get route to get all songs I have published.
router.get("/get/mysongs", passport.authenticate("jwt", {session: false}), 
async (req,res) => {
    // We need to get all songs where artists id == currentUser._id
    const songs = await Song.find({artist: req.user._id});
    return res.status(200).json({data: songs});
});

// Get route to get all songs published by any artists.
// I wil send the artist id and I want to see all songs published by that artist.
router.get("/get/artist/:artistId", passport.authenticate("jwt", {session: false}),
 async (req,res) => {
    const {artistId} = req.params;
    // We can check if the artist does not exist.
    const artist = await User.findOne({_id: artistId});
    // ![] = false
    // !null = true
    // !undefined = true
    if(!artist ) {
        return res.status(301).json({err: "Artist does not exist."});
    }
    const songs = await Song.find({artist: artistId});
    return res.status(200).json({data: songs});
});

// Get route to get a single song by name.
router.get("/get/songname/:songName", passport.authenticate("jwt", {session: false}),
 async (req,res) => {
    const {songName} = req.params;
    // name: songName --> exact name matching. Vanilla, Vanila
    // Pattern Matching instead of direct name matching.[For pattern matching we use req.query instead of req.body]
    const songs = await Song.find({name: songName});
    return res.status(200).json({data: songs});

    // const {songName} = req.query;

    // // Pattern Matching instead of direct name matching.
    // const songs = await Song.find({name: new RegExp(songName, 'i')});
    // return res.status(200).json({data: songs});
});

module.exports = router;