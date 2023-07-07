const UserModel = require("../models/user");
const UserModelInstance = new UserModel();

module.exports = class UserService {

    async get(id) {

        try {

            const user = await UserModelInstance.getUserById(id);

            if (!user) {
                throw createError(404, "Not Found");
            }

            return user;

        } catch(err) {
            throw new Error(err);
        }
    }

    async update(data) {

        const { userid, ...newData } = data;

        try {

            // TODO
        
            const user = await UserModelInstance.updateUser(userid, newData);

            return user;

        } catch(err) {
            throw new Error(err);
        }

    }

}