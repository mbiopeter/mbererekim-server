const Items = require('../models/items');
const {
    addService,
    allService,
    checkService,
    oneService,
    editService
} = require('../services/itemService');
const { remove } = require('../utils/deleteService');

const addController = async (req, res) => {
    try {
        const { quoteId, description, quantity, unit, rate, cts } = req.body;

        if (!description) {
            return res.status(400).json({ message: 'Item description is required!' });
        }
        if (!quantity) {
            return res.status(400).json({ message: 'Item quantity is required!' });
        }
        if (!rate) {
            return res.status(400).json({ message: 'Item rate is required!' });
        }
        if (!quoteId) {
            return res.status(400).json({ message: 'Item quotation ID is required!' });
        }

        const isExisting = await checkService(parseInt(quoteId, 10), description, parseInt(quantity, 10), unit, parseInt(rate, 10), cts);
        if (isExisting) {
            return res.status(400).json({ message: 'Item already exists!' });
        }

        const result = await addService(quoteId, description, quantity, unit, rate, cts);
        if (result) {
            return res.status(201).json({ message: 'Item added successfully!' });
        }

        return res.status(500).json({ message: 'Unable to add the item at the moment. Please try again later.' });
    } catch (error) {
        console.error('Error in addItemController:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.', error });
    }
};

const allController = async (req, res) => {
    try {
        const { quoteId } = req.query;
        const responseData = await allService(quoteId);
        res.status(200).json(responseData);
    } catch (error) {
        res.status(400).json(error);
    }
}
const oneController = async (req, res) => {
    try {
        const id = req.query.id;
        const responseData = await oneService(id);
        res.status(200).json(responseData);
    } catch (error) {
        res.status(400).json(error);
    }
}

const editController = async (req, res) => {
    try {
        const { itemId, description, quantity, unit, rate, cts } = req.body;

        if (!description && !quantity && !unit && !rate && !cts) {
            return res.status(400).json({ message: 'Please provide a field to update!' });
        }
        else {
            const response = await editService(itemId, { description, quantity, unit, rate, cts });

            if (!response) {
                return res.status(400).json({ message: 'Item failed to update!' });
            }

            return res.status(200).json({ message: 'Item updated successfully!' });
        }
    } catch (error) {
        console.error('Error updating item:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

const deleteController = async (req, res) => {
    try {
        const id = req.query.id;
        const response = await remove(id, Items);
        if (!response) {
            res.status(400).json({ message: 'Unable to delete the quotation at the moment!' })
        }
        res.status(200).json({ message: 'Quotation deleted successfully!' });
    } catch (error) {
        res.status(200).json(error.message);
    }
}

module.exports = {
    addController,
    allController,
    oneController,
    deleteController,
    editController
}
