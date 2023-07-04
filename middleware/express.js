const bodyParser = require('body-parser');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');

module.exports = (app) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // create proxy
    app.set('trust proxy', 1);

    // Creates a session
    app.use(
        session({  
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            }
        })
    );

    return app;
    
}