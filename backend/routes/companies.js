require('module-alias/register')
const express = require('express')
const router = express.Router();
const companiesController = require("@controllers/companies");
const Validation = require("@validation");
const Responder =  require("@service/responder");
// const userMiddleware = require('../middleware/userMiddleware');

router.post('/signup', 
  Validation.companySignup(), 
  Responder.validate.bind(Responder),
  companiesController.signup.bind(companiesController)
);

router.post('/editProfile',
  Validation.companyEditProfile(),
  Responder.validate.bind(Responder),
  companiesController.editProfile.bind(companiesController)
)



module.exports = router;