const express = require('express');
const {
    register,
    getOne,
    editController
} = require('../controller/userController');

const router = express.Router();
router.post('/create', register);
router.get('/one', getOne);
router.post('/update', editController);


module.exports = router;
