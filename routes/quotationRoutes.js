const express = require('express');
const {
    addController,
    allController,
    deleteController,
    oneController,
    editController

} = require('../controller/quotationController');

const router = express.Router();
router.post('/create', addController);
router.get('/all', allController);
router.delete('/remove', deleteController);
router.get('/one', oneController);
router.post('/update', editController);


module.exports = router;
