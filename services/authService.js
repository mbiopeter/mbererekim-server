const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (email, password) => {
    try {
        email = email?.trim();
        if (!email || !password) {
            throw new Error('Email and password are required!');
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password!');
        }
        const token = jwt.sign({ id: user.id, firstName: user.firstName, secondName: user.secondName }, 'secretkey', { expiresIn: '2h' });
        return { token };
    } catch (error) {
        throw new Error(error.message || 'An error occurred during login');
    }
};

module.exports = {
    login
};
