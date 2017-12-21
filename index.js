const Joi = require('joi')

const getContract = require('./src/get_contract')
const ResponseHelpers = require('./src/response_helpers')

module.exports = {
  getContractByEmployee({ pathParameters }, context, callback) {
    const schema = {
      'id': Joi.string()
    }

    const result = Joi.validate(pathParameters, schema)
                      .then(id => getContract(id))

    ResponseHelpers.buildResponse(result, callback)
  }
}