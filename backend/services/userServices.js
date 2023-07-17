const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
const CartModel = require("../models/cart");
const CartItemModel = require("../models/cartItem");
const OrderModel = require("../models/order");
const OrderItemModel = require("../models/orderItem");
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

    async deleteUser(data) {

        const { userid } = data;

        try {

            /**
             * TODO
             * - check if cart exists
             * - check if cart item(s) exists
             * - delete cart items
             * - delete cart
             * - check if order(s) exists
             * - check if order item(s) exists
             * - either:
             *  1. delete order(s) and order item(s)
             *  2. update order(s) userid fk to null
             */

            const deletedUser = await UserModelInstance.deleteUser(userid);

            return deletedUser;

        } catch(err) {
            throw new Error(err);
        }
 
    }

    async deactivateUser(data) {

        const { userid } = data;
        const isActive = false;

        try {

            const existingUser = await UserModelInstance.getUserById(userid);
            if (!existingUser[0].isactive) {
                console.log("User Account is Already Deactivated");
                return existingUser;
            } else {
                const deactivatedUser = await UserModelInstance.updateUserActiveStatus(userid, isActive);
                console.log("User Account Successfully Deactivated");
                return deactivatedUser;
            }

        } catch(err) {
            throw new Error(err);
        }
    }

    async reactivateUser(data) {

        const { userid } = data;
        const isActive = true;

        try {

            const existingUser = await UserModelInstance.getUserById(userid);
            if (existingUser[0].isactive) {
                console.log("User Account is Already Active");
                return existingUser;
            } else {
                const reactivateUser = await UserModelInstance.updateUserActiveStatus(userid, isActive);
                console.log("User Account Successfully Reactivated");
                return reactivateUser;
            }

        } catch(err) {
            throw new Error(err);
        }
    }

}