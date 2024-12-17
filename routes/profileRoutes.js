const express = require('express');
const { createController, getController } = require('../controller/profileController');

const router = express.Router();

router.post('/update', createController);
router.get('/all', getController);


module.exports = router;
