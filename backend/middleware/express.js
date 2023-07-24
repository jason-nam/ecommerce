const bodyParser = require('body-parser');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser')

module.exports = (app) => {

    // cross origin resource sharing to all origins 
    app.use(cors(
        {  
        origin: 'http://localhost:5173',
        methods: 'GET, HEAD, PUT, POST, DELETE',
        credentials: true
     }
    ));

    // transform raw string of req.body into json format
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));
    
    // create proxy
    app.set('trust proxy', 1);


    app.use(cookieParser());

    // Creates a session
    app.use(
        session({  
            secret: SESSION_SECRET,
            resave: false,
            // store: sessionStore,
            saveUninitialized: false,
            cookie: {
                // secure: false,
                // secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'Lax'
            }
        })
    );

    app.use((req, res, next)=> {
        console.log(req.session)
        next();
    } )


    return app;
    
}