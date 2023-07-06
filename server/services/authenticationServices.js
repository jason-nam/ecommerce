const UserModel = require("../models/user");
const UserModelInstance = new UserModel();

module.exports = class AuthenticationService {

    async register(data) {
        
        const { email } = data;

        try {

            const existingUser = await UserModelInstance.getUserByEmail(email);

            if (existingUser != null) {
                throw createError(409, "Email already in use"); // 409 create error
            }

            const user = await UserModelInstance.createUser(data);

            const { passwordhash, ...censoredUser } = user;

            return user;

        } catch(err) {
            throw createError(500, err); // 500 internal service error
        }

    }

    async login(data) {
        
        const { email, passwordhash: inputPasswordHash } = data;

        try {

            let user = await UserModelInstance.getUserByEmail(email);

            if (!user) {
                console.log("User does not exist");
                throw createError(401, "Incorrect email or password");
            }

            if (user[0].passwordhash !== inputPasswordHash) {
                console.log("Wrong password");
                throw createError(401, "Incorrect email or password");
            }

            const { passwordhash, ...censoredUser } = user[0];

            return censoredUser; 

        } catch(err) {
            throw createError(500, err); // 500 internal service error
        }
    }

}