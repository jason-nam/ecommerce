const bcrypt = require('bcryptjs');

const saltRounds = 10;

// Middleware function to hash the password
const hashPasswordRoute = async (req, res, next) => {
    try {

        const { password } = req.body;

        // Generate a salt for hashing
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Replace the original password with the hashed password
        req.body.password = hashedPassword;

        next(); // Call the next middleware or route handler

    } catch (err) {
        // Handle the error
        res.status(500).json({ error: 'Internal server error' });
    }
};

const hashPassword = async (password) => {
    try {
        // Generate a salt for hashing
        const salt = await bcrypt.genSalt(10);
    
        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);
    
        return hashedPassword;
    } catch (err) {
        throw new Error('Password hashing failed');
    }
};

// Middleware function to verify the password
const verifyPassword = async (password, hashedPassword) => {
    try {

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        return isPasswordValid;

    } catch (err) {
        throw new Error('Password verification failed');
    }
};

module.exports = {
    hashPasswordRoute,
    hashPassword,
    verifyPassword
}