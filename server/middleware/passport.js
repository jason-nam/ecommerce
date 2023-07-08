const passport = require("passport");
const LocalStrategy = require("passport-local");

const AuthenticationService = require("../services/authenticationServices");
const AuthenticationServiceInstance = new AuthenticationService();

module.exports = (app) => {

    // init passport
    app.use(passport.initialize());
    app.use(passport.session());

    // method to serialize data to store in cookie
    passport.serializeUser((user, done) => { done(null, user.id) });

    // method to deserialize data stored in cookie and attach to req.user
    passport.deserializeUser((id, done) => { done(null, { id }) });

    // local strategy to be use for local login
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await AuthenticationServiceInstance.login({ email: username, password });
                return done(null, user);
            } catch(err) {
                return done(err);
            }
        }
    ));

    return passport;

}