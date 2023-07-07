const UserModel = require("../models/user");
const UserModelInstance = new UserModel();

var bcrypt = require('bcryptjs');
const saltRounds = 10

module.exports = class AuthenticationService {

    async register(data) {
        
        const { email, password: pw } = data;
        bcrypt.genSalt(saltRounds)
                .then(salt => bcrypt.hash(pw, salt))
                .then(hash => {data.password = hash})
                .catch(err => console.error(err.message))

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

            let user = await UserModelInstance.getUserByEmail(email);

            if (!user) {
                console.log("User does not exist");
                throw createError(401, "Incorrect email or password");
            }

            if (bcrypt.compareSync(password, user[0].password)) {
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