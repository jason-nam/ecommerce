const express = require('express');
const oauth2 = require('oauth2-server');
const OAuthModel = require('./oauth-model'); // Your OAuth model implementation

// Initialize OAuth server with your model implementation
const oauthServer = new oauth2({
  model: OAuthModel,
  accessTokenLifetime: 3600, // Set token expiration time as per your requirements
});

// Define a middleware to protect routes that require user authentication
function authenticateUser(req, res, next) {
  const request = new oauth2.Request(req);
  const response = new oauth2.Response(res);

  return oauthServer
    .authenticate(request, response)
    .then((token) => {
      // Attach the authenticated user to the request object
      req.user = token.user;
      next();
    })
    .catch((error) => {
      res.status(error.code || 500).json(error);
    });
}

// Define a middleware to protect routes that require admin authentication
function authenticateAdmin(req, res, next) {
  const request = new oauth2.Request(req);
  const response = new oauth2.Response(res);

  return oauthServer
    .authenticate(request, response)
    .then((token) => {
      // Check if the authenticated user is an admin
      if (token.user.role === 'admin') {
        // Attach the authenticated admin to the request object
        req.admin = token.user;
        next();
      } else {
        res.status(403).json({ error: 'Unauthorized' });
      }
    })
    .catch((error) => {
      res.status(error.code || 500).json(error);
    });
}

// const { auth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'IXigYVLCqyX0zDjkSr9HEu0HCPL8nWBR',
//   issuerBaseURL: 'https://dev-mxet5ycpq013fb22.us.auth0.com'
// };

// module.exports = (app) => {


//   // auth router attaches /login, /logout, and /callback routes to the baseURL
//   app.use(auth(config));

//   // req.isAuthenticated is provided from the auth router
//   app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   });

// }

