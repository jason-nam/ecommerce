const LocalStrategy = require('passport-local').Strategy;
const AuthenticationService = require("./services/authenticationServices");
const AuthenticationServiceInstance = new AuthenticationService();
const UserModel = require("./models/user");
const UserModelInstance = new UserModel();


module.exports = async function(passport) {


    passport.use(new LocalStrategy({ usernameField: 'email',passwordField: 'password' },
     AuthenticationServiceInstance.login))
     
    passport.serializeUser( (user, cb) => { console.log(user);  cb(null, user.id);} )
    passport.deserializeUser( async (id, cb) => { console.log("id", id);  return cb(null, await UserModelInstance.getUserById(id))});

    // passport.deserializeUser(async function (id, done) {
    //     console.log("id", id); 
    //     try {
    //       const user = await UserModelInstance.getUserById(id);
    //       done(null, user);
    //     } catch (err) {
    //       done(err);
    //     }
    //   });
      
    

}

