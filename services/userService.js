const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');


const registerUser = async (firstName, secondName, email, password) => {
    try {
        if (!firstName || !secondName || !email || !password) {
            throw new Error(' all the fields are required !');
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            secondName,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: newUser.id, email: newUser.email, firstName: newUser.firstName, secondName: newUser.secondName }, 'secretkey', { expiresIn: '2h' });
        return { token, user: newUser };
    } catch (error) {
        throw error;
    }

};

const oneUser = async (userId) => {
    try {
        const user = await User.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            where: { id: userId }
        });
        if (!user) {
            throw new Error('User not found in our records');
        }
        return user;
    } catch (err) {
        throw err;
    }
};

const editService = async (userId, fieldsToUpdate) => {
    try {
        const { prevPassword, password, ...otherFields } = fieldsToUpdate;

        if (!userId || Object.keys(otherFields).length === 0 && !password) {
            throw new Error('No valid fields provided for update');
        }

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        if (password) {
            if (!prevPassword) {
                throw new Error('Previous password is required to update the password');
            }

            const isMatch = await bcrypt.compare(prevPassword, user.password);
            if (!isMatch) {
                throw new Error('Previous password is incorrect');
            }

            otherFields.password = await bcrypt.hash(password, 10);
        }

        const [updated] = await User.update(otherFields, { where: { id: userId } });
        return updated > 0;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    oneUser,
    editService
};
