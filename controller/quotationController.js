const Quotations = require('../models/quotations');
const {
    addService,
    allService,
    checkService,
    oneService,
    editService
} = require('../services/quotationServices');
const { remove } = require('../utils/deleteService');

const addController = async (req, res) => {
    try {
        const { name, phone, description } = req.body;
        if (!name || !phone || !description) {
            res.status(400).json({ message: 'All the fields are required!' });
        } else {
            const checkExistence = await checkService(name, phone, description);
            if (checkExistence) {
                console.log(checkExistence)
                res.status(400).json({ message: 'Quotation already exist!' });
            }
            else {
                await addService(name, phone, description);
                res.status(200).json({ message: 'Quotation added sucessfully!' });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const allController = async (req, res) => {
    try {
        const responseData = await allService();
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

const deleteController = async (req, res) => {
    try {
        const id = req.query.id;
        const response = await remove(id, Quotations);
        if (!response) {
            res.status(400).json({ message: 'Unable to delete the quotation at the moment!' })
        }
        res.status(200).json({ message: 'Quotation deleted successfully!' });
    } catch (error) {
        res.status(200).json(error.message);
    }
}


const editController = async (req, res) => {
    try {
        const { quoteId, description, phone, name } = req.body;

        if (!description && !phone && !name) {
            return res.status(400).json({ message: 'Please provide a field to update!' });
        }
        else {
            const response = await editService(quoteId, { description, phone, name });

            if (!response) {
                return res.status(400).json({ message: 'Quotations failed to update!' });
            }

            return res.status(200).json({ message: 'Quotations updated successfully!' });
        }
    } catch (error) {
        console.error('Error updating Quotations:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = {
    addController,
    allController,
    deleteController,
    oneController,
    editController
}