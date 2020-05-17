var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy;
var db = require("../models");

passport.use("local", new LocalStrategy(
    // User signs in with a username and a password
    {
      username: "username",
    },
    function(username, password, done) {
      console.log("passport obtaining from db");
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          username: username
        }
      }).then(function(dbUser) {
        console.log(dbUser);
        // If there's no user with the given username
        if (!dbUser) {
          console.log("no user in db");
          return done(null, false, {
            message: "Incorrect Username!"
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          console.log("not a valid password");
          return done(null, false, {
            message: "Incorrect Password!"
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;