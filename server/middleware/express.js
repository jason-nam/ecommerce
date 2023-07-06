const bodyParser = require('body-parser');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');

const cors=require('cors');

module.exports = (app) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // create proxy
    app.set('trust proxy', 1);
    app.use(cors())

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