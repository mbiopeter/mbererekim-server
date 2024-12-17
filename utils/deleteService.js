const remove = async (id, model) => {
    try {
        const result = await model.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No details were found');
        }

        return { message: 'Deletion was successful' };
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = {
    remove
}
