require('module-alias/register')
const ValidationRule = require('@service/validation/index')

module.exports = {
  companySignup() {
    return [
      ValidationRule.isEmail('companyEmail'),
      ValidationRule.isStringWithMinLen('companyName', 2),
      ValidationRule.isPassword('password'),
    ]
  },
  companyEditProfile(){
    return[
      ValidationRule.requiredObjectId('companyId'),
      ValidationRule.isStringOptional('companyName', 2),
      ValidationRule.isStringOptional('location', 2),
      ValidationRule.isStringOptional('about'),
      ValidationRule.isNumber('numberOfEmployees'),
      ValidationRule.isStringOptional('website'),
      ValidationRule.isPhoneNumberOptional('contactNumber'),
      ValidationRule.isEmail('contactEmail'),
    ]
  }
}

