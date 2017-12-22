const prepareErrorResponse = (error) => {
  if (!error) {
    return {
      statusCode: 500
    }
  }

  console.warn(error)

  if (error instanceof Error) {
    const devMessage = (error && error.message) ? error.message : 'Check logs for details'
    return {
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : "true" // Required for cookies, authorization headers with HTTPS
      },
      statusCode: 500,
      body: JSON.stringify({ devMessage })
    }
  }

  return {
    statusCode: 404
  }
}

const buildResponse = (result) => {
  console.log('Building response for', result)
  return {
            headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : "true" // Required for cookies, authorization headers with HTTPS
            },
            statusCode: result ? 200 : 404,
            body: result ? JSON.stringify(result) : ''
          }
}

module.exports = {
  buildResponse,
  prepareErrorResponse
}