const AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4');

AWS.config.update({
  region: "eu-central-1",
  endpoint: "https://dynamodb.eu-central-1.amazonaws.com"
  // endpoint: "http://docker.for.mac.localhost:8000"
})

const docClient = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true}) // todo set timeout on connect

const table = "Fis_2_0_Contract"

module.exports = {
  getContractsByEmployeeId(employeeId) {
    const params = { // TODO implement query
      TableName: table,
      FilterExpression: "employeeId = :employeeId",
      ExpressionAttributeValues: {
         ":employeeId": employeeId
      }
    }
    return docClient.scan(params)
                    .promise()
                    .then(data => data.Items)
                    .catch(e => {
                      return Promise.reject(e)
                    })
  },
  init() {
    const contracts = require('./contracts').contracts

    const inserts = contracts.map(contract => {
      contract.id = uuidv4()
      console.log('Inserting contract', contract)

      const params = {
        TableName: table,
        Item: contract
      }
      return docClient.put(params).promise()
    })

    Promise.all(inserts)
      .then(res => console.log('Contracts inserted'))
      .catch(e => console.error(e))
  }
}