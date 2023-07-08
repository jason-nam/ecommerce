const createError = require('http-errors');
const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
const { verifyPassword } = require("../middleware/bcrypt") 

module.exports = class AuthenticationService {

    async register(data) {
        
        const { email } = data;

        try {
            
            const existingUser = await UserModelInstance.getUserByEmail(email);

            if (existingUser != null) {
                console.log("Email already in use")
                throw createError(409, "Email already in use"); // 409 create error
            }

            const user = await UserModelInstance.createUser(data);

            const { password, ...censoredUser } = user;

            return censoredUser;

        } catch(err) {
            throw createError(500, err); // 500 internal service error
        }

    }

    async login(data) { 

        const { email, password } = data;

        try {

            const user = await UserModelInstance.getUserByEmail(email);

            if (!user) {
                console.log("User does not exist");
                // return cb(null, false)
                throw createError(401, "Incorrect email or password");
            }

            if (await verifyPassword(password, user[0].password)) {
                const { password, ...censoredUser } = user[0];
                // return cb(null, censoredUser)
                return censoredUser;         
            } else {
                console.log("Wrong password");
                // return cb(null, false)
                throw createError(401, "Incorrect email or password");
            }
            
        } catch(err) {
            // return cb(err)
            throw createError(500, err); // 500 internal service error
        }
    }

}