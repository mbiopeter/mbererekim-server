const Quotations = require('../models/quotations');
const Items = require('../models/items');
const sequelize = require('../config/database');

const dashboardService = async () => {
    try {
        // 1. Total quotations count
        const totalQuotations = await Quotations.count();

        // 2. Total amount for all items in quotations
        const totalAmountResult = await Items.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.literal('quantity * rate')), 'totalAmount']
            ],
        });
        const totalAmount = parseFloat(totalAmountResult?.dataValues.totalAmount || 0);

        // 3. Monthly data: total quotations and average items per quotation
        const monthlyData = await Quotations.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'totalQuotations'],
            ],
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
            order: [sequelize.literal('month ASC')],
        });

        // Get the total number of items across all quotations for the month
        const totalItems = await Items.count({
            where: sequelize.where(
                sequelize.fn('MONTH', sequelize.col('createdAt')), sequelize.fn('MONTH', sequelize.col('createdAt'))
            ),
        });

        // Calculate average items per quotation for each month
        const chartData = {
            labels: monthlyData.map(row => `Month ${row.dataValues.month}`),
            datasets: [
                {
                    label: 'Total Quotations',
                    data: monthlyData.map(row => row.dataValues.totalQuotations),
                    fill: false,
                    borderColor: '#4285F4', // Blue for React chart color
                    tension: 0.4,
                },
                {
                    label: 'Average Items',
                    data: monthlyData.map(row => {
                        const totalQuotations = parseFloat(row.dataValues.totalQuotations || 1); // Avoid division by zero
                        return totalItems / totalQuotations; // Correctly calculate average items per quotation
                    }),
                    fill: false,
                    borderColor: '#DB4437', // Pink for React chart color
                    tension: 0.4,
                },
            ],
        };

        // 4. Average Monthly Quotation Total Amount & Count
        const avgMonthlyData = await Quotations.findAll({
            attributes: [
                [
                    sequelize.fn('AVG', sequelize.literal(`
                (
                    SELECT SUM(quantity * rate)
                    FROM Items
                    WHERE Items.quoteId = Quotations.id
                )
            `)),
                    'avgMonthlyQuotationsTotal',
                ],
            ],
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
        });

        // Get the average count of quotations per month
        const avgMonthlyQuotationsCount = await Quotations.findAll({
            attributes: [
                [
                    sequelize.fn('COUNT', sequelize.col('id')),
                    'monthlyQuotationsCount',
                ],
            ],
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
        });

        const avgMonthlyQuotationsTotal = parseFloat(avgMonthlyData[0]?.dataValues.avgMonthlyQuotationsTotal || 0);
        const avgMonthlyQuotationsCountValue = parseFloat(avgMonthlyQuotationsCount[0]?.dataValues.monthlyQuotationsCount || 0);

        // 5. Recent quotations (limit 10, most recent first)
        const recentQuotations = await Quotations.findAll({
            attributes: [
                'id',
                'name',
                [
                    sequelize.literal(`
                (
                    SELECT SUM(quantity * rate)
                    FROM Items
                    WHERE Items.quoteId = Quotations.id
                )
            `),
                    'totalAmount',
                ],
            ],
            limit: 10,
            order: [['createdAt', 'DESC']],
        });

        return {
            totalQuotations,
            totalAmount,
            avgMonthlyQuotationsTotal,
            avgMonthlyQuotationsCount: avgMonthlyQuotationsCountValue,
            chartData,
            recentQuotations,
        };
    } catch (error) {
        console.error('Error in dashboardService:', error);
        throw error;
    }
};

module.exports = dashboardService;
