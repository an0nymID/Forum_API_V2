/* istanbul ignore file */
const container = require('../src/Infrastructures/container');
const createServer = require('../src/Infrastructures/http/createServer');

// INFO : Hack so i can deploy it to vercel, though it will be slower
module.exports = async function (request, response) {
  const server = await createServer(container);

  const {
    body, headers, method, url,
  } = request;

  const result = await server.inject({
    method,
    url,
    payload: body,
    headers,
  });

  response.status(result.statusCode);
  return response.json(result.result);
}
