const getContractsByEmployeeId = require('./db').getContractsByEmployeeId

const getContract = ({ id }) => {
  return getContractsByEmployeeId(id)
}

module.exports = getContract