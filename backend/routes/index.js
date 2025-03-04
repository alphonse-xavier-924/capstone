const express = require('express');
const router = express.Router();
const candidates = require('./candidates');
const companies = require('./companies');

router.use('/candidates', candidates);
router.use('/companies', companies);


module.exports = router;
