const ROLE = {
    ADMIN: "admin",
    USER: "user"
}

const checkAuth = (req, res, next) => {    
    if (req.isAUthenticated())
        next();
    else
        res.status(403).send( { message: "Not Authenticated"} )
}

module.exports = {
    ROLE: ROLE,
    users: [

    ],

    checkAuth
}