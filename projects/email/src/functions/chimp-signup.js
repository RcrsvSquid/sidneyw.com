const { bodyParser, response } = require('../modules/common');

async function signup({ chimpClient, list }, event) {
  try {
    bodyParser(event);

    if (event.httpMethod !== 'POST' || !event.body || !event.body.email) {
      console.error('Invalid Request Body', event.body);

      return response({
        statusCode: 400,
        body: ''
      });
    }

    await chimpClient.subscribeToList(list, event.body.email);

    return response({
      statusCode: 200,
      body: 'User Signed Up'
    });
  } catch (err) {
    console.error('Chimp Error', err.message);

    return response({
      statusCode: err.statusCode || 500,
      body: err.details || 'Internal Server Error'
    });
  }
}

module.exports = signup;
