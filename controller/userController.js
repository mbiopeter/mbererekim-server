const {
    registerUser,
    oneUser,
    editService
} = require('../services/userService');
const register = async (req, res) => {
    const { firstName, secondName, email, password } = req.body;
    try {
        const { token } = await registerUser(firstName, secondName, email, password);
        res.status(200).json({
            message: 'Registration successful',
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getOne = async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await oneUser(userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const editController = async (req, res) => {
    try {
        const { userId, firstName, secondName, email, password, prevPassword } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'UserId is required' });
        }

        if (!firstName && !secondName && !email && !password) {
            return res.status(400).json({ message: 'Please provide a field to update!' });
        }

        const response = await editService(userId, { firstName, secondName, email, password, prevPassword });

        if (!response) {
            return res.status(400).json({ message: 'User update failed!' });
        }

        return res.status(200).json({ message: 'User updated successfully!' });
    } catch (error) {

        if (error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }

        if (error.message === 'Previous password is required to update the password') {
            return res.status(400).json({ message: 'Previous password is required to update the password' });
        }

        if (error.message === 'Previous password is incorrect') {
            return res.status(400).json({ message: 'The previous password is incorrect' });
        }

        if (error.message === 'No valid fields provided for update') {
            return res.status(400).json({ message: 'No valid fields provided for update' });
        }

        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    register,
    getOne,
    editController
};
