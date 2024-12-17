const Quotations = require('../models/quotations');

const addService = async (
    name,
    phone,
    description,
) => {
    try {
        const newQuotation = await Quotations.create({
            name,
            phone,
            description
        })
        return newQuotation;
    } catch (error) {
        throw error;
    }
}

const allService = async () => {
    try {
        const allQuotations = await Quotations.findAll({
            attributes: ['id', 'name', 'phone', 'description'],
        });

        const formattedQuotations = allQuotations.map(item => ({
            id: item.id,
            QuoteNo: `Quote-${item.id}`,
            desc: item.description,
            toName: item.name,
            toPhone: item.phone,
        }));

        return formattedQuotations;
    } catch (error) {
        console.error("Error fetching quotations:", error);
        throw error;
    }
};

const checkService = async (name, phone, description) => {
    try {
        const response = await Quotations.findOne({
            where: { name, phone, description },
            attributes: ['id', 'name', 'phone', 'description'],
        });

        if (!response) {
            return null;
        }

        const formattedQuotation = {
            id: response.id,
            QuoteNo: `Quote-${response.id}`,
            desc: response.description,
            toName: response.name,
            toPhone: response.phone,
        };

        return formattedQuotation;
    } catch (error) {
        console.error("Error fetching a single quotation:", error);
        throw error;
    }
};
const oneService = async (id) => {
    try {
        const quotation = await Quotations.findOne({
            where: { id },
            attributes: ['id', 'name', 'description', 'phone', 'createdAt'],
        });

        if (!quotation) {
            return null;
        }

        const createdAt = new Date(quotation.createdAt);
        const formattedDate = `${String(createdAt.getDate()).padStart(2, '0')}/${String(createdAt.getMonth() + 1).padStart(2, '0')}/${createdAt.getFullYear()}`;

        const formattedQuotation = {
            QuoteNo: `Quote-${quotation.id}`,
            toName: quotation.name,
            toPhone: quotation.phone,
            description: quotation.description,
            date: formattedDate,
        };

        return formattedQuotation;
    } catch (error) {
        throw error;
    }
};

const editService = async (quoteId, fieldsToUpdate) => {
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

        const response = await Quotations.update(updateFields, { where: { id: quoteId } });

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