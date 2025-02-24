const express = require('express');
const router = express.Router();
const candidates = require('./candidates');

router.use('/candidates', candidates);

module.exports = router;
