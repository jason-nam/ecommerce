const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
const { hashPassword } = require("../middleware/bcrypt")

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

        const { userid, ...items } = data;

        try {
            const existingUser = await UserModelInstance.getUserById(userid);
            if (!existingUser) {
                throw createError(404, "Not Found");
            }

            const updatedData = { ...existingUser[0] };

            for (let prop in items) {
                if (existingUser[0].hasOwnProperty(prop)) {
                    updatedData[prop] = items[prop];
                }
            }
        
            const user = await UserModelInstance.updateUser(userid, updatedData);

            return user;

        } catch(err) {
            throw new Error(err);
        }

    }

    async updatePassword(data) {

        const { userid, password: unhashedPassword } = data;

        try {
            const existingUser = await UserModelInstance.getUserById(userid);
            if (!existingUser) {
                throw createError(404, "Not Found");
            }

            const updatedData = { ...existingUser[0] };

            const password = await hashPassword(unhashedPassword);
            updatedData["password"] = password;
        
            const user = await UserModelInstance.updateUser(userid, updatedData);

            return user;

        } catch(err) {
            throw new Error(err);
        }

    }

}