const express = require('express');
const dashboarCdontroller = require('../controller/dashboardController');

const router = express.Router();

router.get('/details', dashboarCdontroller);


module.exports = router;
