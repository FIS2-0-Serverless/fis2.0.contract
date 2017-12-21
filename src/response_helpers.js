const prepareErrorResponse = (error) => {
  if (error) {
    console.warn(error)
  }

  const devMessage = error.message ? error.message : 'Check logs for details'
  return {
    statusCode: 500,
    body: JSON.stringify({ devMessage })
  }
}

const buildResponse = (result, callback) => {
  return result
          .then(data => {
            console.log('Building response for', data)
            callback(null, {
              headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : "true" // Required for cookies, authorization headers with HTTPS
              },
              statusCode: data ? 200 : 404,
              body: data ? JSON.stringify(data) : ''
            })
          })
          .catch(e => {
            console.warn('Error while handling employees', e)
            callback(null, prepareErrorResponse(e))
          })
}

module.exports = {
  buildResponse
}