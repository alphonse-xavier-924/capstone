require('module-alias/register')
const express = require('express')
const router = express.Router();
const candidateController = require("@controllers/candidates");
const Validation = require("@validation");
const Responder =  require("@service/responder");
// const userMiddleware = require('../middleware/userMiddleware');

router.post('/signup', 
  Validation.signup(), 
  Responder.validate.bind(Responder),
  candidateController.signup.bind(candidateController)
);

router.post('/editProfile',
  Validation.editProfile(),
  Responder.validate.bind(Responder),
  candidateController.editProfile.bind(candidateController)
)



module.exports = router;