const dashboardService = require('../services/dashboardService');

const dashboardController = async (req, res) => {
    try {
        const dashboardData = await dashboardService();
        res.status(200).json(dashboardData);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

module.exports = dashboardController;