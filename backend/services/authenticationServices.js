const createError = require('http-errors');
const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
const CartModel = require("../models/cart");
const CartModelInstance = new CartModel();
const { verifyPassword } = require("../middleware/bcrypt") 

module.exports = class AuthenticationService {

    async register(data) {
        
        const { email } = data;
        data.isactive = true;

        try {
            const existingUser = await UserModelInstance.getUserByEmail(email);

            if (existingUser != null && existingUser[0].isactive) {
                console.log("Email already in use")
                throw createError(409, "Email already in use"); // 409 create error
            } else if (existingUser != null && !existingUser[0].isactive) {
                console.log("Email already in use, but account deactivated");
                throw createError(409, "Email already in use, restore account");
            }

            const user = await UserModelInstance.createUser(data);

            // delete user if cart is null or return error
            let cart;
            try {
                cart = await CartModelInstance.createCart(user.id);
                if (cart === null) {
                    await UserModel.deleteUser(user.id);
                    throw createError(500, "Cart creation failed");
                }
            } catch(err) {
                console.log("Cart Creation Error");
                await UserModel.deleteUser(user.id);
                throw createError(500, err);
            }
            const { password, ...censoredUser } = user;
            censoredUser.cart = cart;
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
                throw createError(401, "Incorrect email or password");
            }

            if (await verifyPassword(password, user[0].password)) {
                const { password, ...censoredUser } = user[0];
                return censoredUser;         
            } else {
                console.log("Wrong password");
                throw createError(401, "Incorrect email or password");
            }
            
        } catch(err) {
            throw createError(500, err); // 500 internal service error
        }
    }

}