const UserModel = require("../models/user");
const UserModelInstance = new UserModel();

module.exports = class AuthenticationService {

    async register(data) {

        const { email } = data;

        try {

            const user = await UserModelInstance.getUserByEmail(email);

            if (user != null) {
                throw createError(409, "Email already in use"); // 409 create error
            }

            return await UserModelInstance.createUser(data);

        } catch(err) {
            throw createError(500, err); // 500 internal service error
        }

    }

    async login(data) {
        
        const { email, passwordhash } = data;

        try {

            let user = await UserModelInstance.getUserByEmail(email);

            if (!user) {
                console.log("User does not exist")
                throw createError(401, "Incorrect email or password");
            }

            if (user[0].passwordhash !== passwordhash) {
                console.log("Wrong password")
                throw createError(401, "Incorrect email or password");
            }

            return user[0];

        } catch(err) {
            throw createError(500, err); // 500 internal service error
        }
    }

}