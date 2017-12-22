const Joi = require('joi')

const getContract = require('./src/getContract')
const dismissContract = require('./src/dismissContract')
const ResponseHelpers = require('./src/responseHelpers')

module.exports = {
  getContractByEmployee({ pathParameters }, context, callback) {
    const schema = {
      'id': Joi.string()
    }

    Joi.validate(pathParameters, schema)
       .then(id => getContract(id))
       .then(result => callback(null, ResponseHelpers.buildResponse(result)))
       .catch(e => callback(e))
  },
  dismiss({ pathParameters }, context, callback) {
    const schema = {
      'employeeId': Joi.string(),
      'id': Joi.string()
    }

    Joi.validate(pathParameters, schema)
       .then(({id, employeeId}) => dismissContract({ id, employeeId }))
       .then(result => callback(null, ResponseHelpers.buildResponse(result)))
       .catch(e => {
          callback(null, ResponseHelpers.prepareErrorResponse(e))
      })
  }
}