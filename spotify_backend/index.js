// npm init : package.json -- This is a node project.
// npm install express : install expressJs package. -- project came to know that we are using express
// We finally use express

const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
require('dotenv').config();
const app = express();
const port = 8000;

app.use(express.json());

// connect mongodb to our node app
// mongoose.connect() takes 2 arguments : 1. which db to connect to (db url), 2. connection options
mongoose
    .connect(
        "mongodb+srv://vanshajsen:"+
            process.env.MONGO_PASSWORD +
            "@cluster0.099is.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        }
    )
    .then((x)=>{
        console.log("Connected to Mongo!");
    })
    .catch((err) =>{
        console.log("Error while connecting to Mongo");
    });

// setup passport-jwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({id: jwt_payload.sub});
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));


// API : GET type : / : return text "Hello World"
app.get("/", (req,res) =>{
    //req contains all data for the request
    //res contains all data for the response
    res.send("Hello World");
});
app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist", playlistRoutes);

// Now we want to tell express that our server will run on localhost:8000
app.listen(port,() =>{
    console.log("App is running on port " + port);
});
