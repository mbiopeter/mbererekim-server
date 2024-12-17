const { login } = require('../services/authService');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token } = await login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginController
};
