const passport = require("passport");
const LocalStrategy = require("passport-local");

const AuthenticationService = require("../services/authenticationServices");
const AuthenticationServiceInstance = new AuthenticationService();

module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    // serialize data to store in cookie
    passport.serializeUser((user, done) => { done(null, user.id) });

    // deserialize data stored in cookie and attach to req.user
    passport.deserializeUser((id, done) => { done(null, { id }) });

    passport.use(new LocalStrategy( { usernameField: 'email' },

        async (email, password, done) => {
            try {
                const user = await AuthenticationServiceInstance.login({ email, password });
                return done(null, user);
            } catch(err) {
                if (err.status == 401)
                    return done(null, false)
                else 
                    return done(err);
            }
        }
    ));

    return passport;

}