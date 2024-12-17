const { Op } = require('sequelize');
const Profiles = require('../models/profile');
const Payments = require('../models/payment');
const createService = async (data) => {
    try {
        const {
            name, address, email, phone, kra, signature,
            equityAccount, equityName, paybill, paybillAccount,
            sendMoneyNumber, sendMoneyName
        } = data;

        const profileData = {
            ...(name && { name }),
            ...(address && { address }),
            ...(email && { email }),
            ...(phone && { phone }),
            ...(kra && { kra }),
            ...(signature && { signature }),
        };

        const profileExists = await Profiles.findOne();

        if (!profileExists) {
            if (Object.keys(profileData).length > 0) {
                await Profiles.create(profileData);
            }
        } else {
            if (Object.keys(profileData).length > 0) {
                console.log(profileExists.id);
                await Profiles.update(profileData, { where: { id: profileExists.id } });
            }
        }

        const paymentData = {
            ...(equityAccount && { equityAccount }),
            ...(equityName && { equityName }),
            ...(paybill && { paybill }),
            ...(paybillAccount && { paybillAccount }),
            ...(sendMoneyNumber && { sendMoneyNumber }),
            ...(sendMoneyName && { sendMoneyName }),
        };

        const paymentExists = await Payments.findOne();

        if (!paymentExists) {
            if (Object.keys(paymentData).length > 0) {
                await Payments.create(paymentData);
            }
        } else {
            if (Object.keys(paymentData).length > 0) {
                await Payments.update(paymentData, { where: { id: paymentExists.id } });
            }
        }

        return { success: true, message: 'Company information processed successfully.' };
    } catch (error) {
        throw error;
    }
};

const getService = async () => {
    try {
        const profile = await Profiles.findOne();
        const payment = await Payments.findOne();

        if (!profile && !payment) {
            return [];
        }

        const profileData = profile
            ? [
                { title: 'Company Name', value: profile.name || '' },
                { title: 'Address', value: profile.address || '' },
                { title: 'Email Address', value: profile.email || '' },
                { title: 'Phone Number', value: profile.phone || '' },
                { title: 'KRA', value: profile.kra || '' },
                { title: 'Signature', value: profile.signature || '' },
            ]
            : [];

        const paymentData = payment
            ? [
                { title: 'Equity Account', value: payment.equityAccount || '' },
                { title: 'Equity Name', value: payment.equityName || '' },
                { title: 'Paybill', value: payment.paybill || '' },
                { title: 'Paybill Account', value: payment.paybillAccount || '' },
                { title: 'Send Money Number', value: payment.sendMoneyNumber || '' },
                { title: 'Send Money Name', value: payment.sendMoneyName || '' },
            ]
            : [];

        const combinedData = [...profileData, ...paymentData];

        return combinedData;
    } catch (error) {
        throw error;
    }
};

module.exports = { createService, getService };
