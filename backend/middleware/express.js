const bodyParser = require('body-parser');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser')


var { Issuer } = require('openid-client');


module.exports = (app) => {

    // cross origin resource sharing to all origins 
    app.use(cors(
        {  
        origin: 'http://localhost:3000',
        credentials: true
     }
    ));

    // transform raw string of req.body into json format
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // create proxy
    app.set('trust proxy', 1);


    app.use(cookieParser());

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

    app.use((req, res, next)=> {
        console.log("session", req.session)
        next();
    } )


    return app;
    
}