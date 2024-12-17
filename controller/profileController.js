const {
    createService,
    getService
} = require('../services/profileService');

const createController = async (req, res) => {
    try {
        const data = req.body;

        const result = await createService(data);

        result && res.status(200).json({ message: 'Profile sucessfully created!' });
    } catch (error) {
        res.status(400).json({ success: false, error: error });
    }
};

const getController = async (req, res) => {
    try {

        const result = await getService();

        result && res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error });
    }
};

module.exports = { createController, getController };
