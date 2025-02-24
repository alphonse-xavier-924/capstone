require('module-alias/register')
const ValidationRule = require('@service/validation/index')

module.exports = {
  signup() {
    return [
      ValidationRule.isEmail('email'),
      ValidationRule.isStringWithMinLen('name', 2),
      ValidationRule.isPassword('password'),
      // ValidationRule.isStringWithMinLen('currentJobTitle', 2),
      // ValidationRule.isStringWithMinLen('location', 2),
      // ValidationRule.isStringOptional('about'),
      // ValidationRule.requiredArray('experience'),
      // ValidationRule.isObject('experience.*'),
      // ValidationRule.isStringWithMinLen('experience.*.companyName', 2),
      // ValidationRule.isStringWithMinLen('experience.*.position', 2),
      // ValidationRule.isDate('experience.*.startDate'),
      // ValidationRule.isDate('experience.*.endDate'),
      // ValidationRule.isStringOptional('experience.*.description'),
      // ValidationRule.requiredArray('education'),
      // ValidationRule.isObject('education.*'),
      // ValidationRule.isStringWithMinLen('education.*.school', 2), 
      // ValidationRule.isStringWithMinLen('education.*.degree', 2),
      // ValidationRule.isDate('education.*.startDate'),
      // ValidationRule.isDate('education.*.endDate'),
      // ValidationRule.isStringOptional('education.*.description'),
      // ValidationRule.requiredArrayofString('rpaSkills'),
      // ValidationRule.requiredArrayofString('otherSkills'),
      // ValidationRule.isStringOptional('githubLink'),
      // ValidationRule.isStringOptional('mediumLink'),
      // ValidationRule.isStringOptional('otherLink'),

    ]
  },

  editProfile(){
    return[
      ValidationRule.requiredObjectId('candidateId'),
      ValidationRule.isStringWithMinLen('currentJobTitle', 2),
      ValidationRule.isStringWithMinLen('location', 2),
      ValidationRule.isStringOptional('about'),
      ValidationRule.requiredArray('experience'),
      ValidationRule.requiredArray('education'),
      ValidationRule.requiredArrayofString('rpaSkills'),
      ValidationRule.requiredArrayofString('otherSkills'),
      ValidationRule.isStringOptional('githubLink'),
      ValidationRule.isStringOptional('mediumLink'),
      ValidationRule.isStringOptional('otherLink'),
    ]
  }
}