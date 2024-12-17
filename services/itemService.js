const Items = require("../models/items");
const Quotations = require("../models/quotations");

const addService = async (
    quoteId,
    description,
    quantity,
    unit,
    rate,
    cts
) => {
    try {
        const response = await Items.create({
            quoteId,
            description,
            quantity,
            unit,
            rate,
            cts
        });
        if (!response) {
            return null;
        } else {
            return response;
        }

    } catch (error) {
        throw error;
    }
}

const allService = async (quoteId) => {
    try {
        const allItems = await Items.findAll({
            attributes: ['id', 'description', 'quantity', 'unit', 'rate', 'cts'],
            where: { quoteId }
        });

        const formattedItems = allItems.map(item => ({
            id: item.id,
            ItemNo: `Item-${item.id}`,
            desc: item.description,
            quantity: item.quantity,
            unit: item.unit,
            rate: item.rate,
            total: item.quantity * item.rate,
            cts: item.cts,
        }));

        return formattedItems;
    } catch (error) {
        throw error;
    }
}

const checkService = async (
    quoteId,
    description,
    quantity,
    unit,
    rate,
    cts

) => {
    try {
        const existingItem = await Items.findOne({
            where: {
                quoteId,
                description,
                quantity,
                unit,
                rate,
                cts
            }
        });

        return existingItem;
    } catch (error) {
        throw error;
    }
}

const oneService = async (itemId) => {
    try {
        const oneItems = await Items.findOne({
            attributes: ['id', 'quoteId', 'description', 'quantity', 'unit', 'rate', 'cts'],
            where: { id: itemId }
        });

        const quoteId = oneItems.quoteId;

        const quotationDet = await Quotations.findOne({
            attributes: ['name', 'phone'],
            where: { id: quoteId }
        })

        const formattedItems = {
            id: oneItems.id,
            itemNo: `item-${oneItems.id}`,
            quoteNo: `quote-${oneItems.quoteId}`,
            desc: oneItems.description,
            quantity: oneItems.quantity,
            unit: oneItems.unit,
            rate: oneItems.rate,
            total: oneItems.quantity * oneItems.rate,
            cts: oneItems.cts,
            name: quotationDet.name,
            phone: quotationDet.phone
        };

        return formattedItems;
    } catch (error) {
        throw error;
    }
}

const editService = async (itemId, fieldsToUpdate) => {
    try {

        const updateFields = {};
        for (const [key, value] of Object.entries(fieldsToUpdate)) {
            if (value !== undefined) {
                updateFields[key] = value;
            }
        }

        if (Object.keys(updateFields).length === 0) {
            throw new Error('No valid fields provided for update');
        }

        const response = await Items.update(updateFields, { where: { id: itemId } });

        return response[0] > 0;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    addService,
    allService,
    checkService,
    oneService,
    editService
}