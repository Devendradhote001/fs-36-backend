require('dotenv').config()
const express = require('express')
const passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const app = express()
app.use(express.json())


app.use(passport.initialize())


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile)
  }
));


app.get('/google', passport.authenticate('google', {scope:['email', 'profile'], session:false}))


app.get('/api/auth/google/callback',
passport.authenticate('google', {failureRedirect:"/", session:false}),
 (req, res) => {
    console.log(req.profile)
    return res.send("ok get it")
} )


app.get('/', (req, res) => {
    return res.send("nahi ho paya...")
})











app.listen(3000, () => {
    console.log("server is running on port 3000")
})