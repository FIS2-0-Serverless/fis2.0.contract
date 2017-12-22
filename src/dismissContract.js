const Db = require('./db')
const uuidv4 = require('uuid/v4');

const publish = (topic, payload) => {
  console.log('Should publish on topic ' + topic, payload)
  return payload
}

const createDismissal = (contract) => {
  const dismissal = {
    createdOn: new Date().toString()
  }
  return Db.dismissContract(contract.id, contract.employeeId, dismissal)
}

const dismissContract = ({ id, employeeId}) => {
  console.log("Dismissing contract " + id + " for employee " + employeeId)
  return Db.getContractById(id, employeeId)
           .then(contract => {
              if (contract.contractState === 'dismissed') {
                return Promise.reject('Already dismissed')
              }
              return contract
           })
           .then(contract => createDismissal(contract))
           .then(dismissal => publish('Dismissal', { contractId: id, employeeId: employeeId }))
           .catch(e => Promise.reject(e))
}

module.exports = dismissContract