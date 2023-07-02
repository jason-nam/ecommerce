const UserModel = require("../models/user");
const UserModelInstance = new UserModel();

module.exports = class AuthenticationService {

    /**
     * Register new user
     * @param {Object} data user data
     * @return 
     */
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

    /**
     * Login user
     * @param {Object} data user data
     * @return 
     */
    async login(data) {
        // TODO
    }

}