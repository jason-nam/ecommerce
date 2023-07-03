const UserModel = require("../models/user");
const UserModelInstance = new UserModel();

module.exports = class AuthenticationService {

    async register(data) {

        const { email } = data;

        try {

            const user = await UserModelInstance.getUserByEmail(email);

            if (user) {
                throw createError(409, "Email already in use"); // 409 create error
            }

            return await UserModelInstance.create(data);

        } catch(err) {
            throw createError(500, err); // 500 internal service error
        }

    }

    async login(data) {
        
        const { email, passwordhash } = data;

        try {

            const user = UserModelInstance.getUserByEmail(email);

            if (!user) {
                throw createError(401, "Incorrect email or password");
            }

            if (user.passwordhash !== passwordhash) {
                throw createError(401, "Incorrect email or password");
            }

            return user;

        } catch(err) {
            throw createError(500, err); // 500 internal service error
        }
    }

}