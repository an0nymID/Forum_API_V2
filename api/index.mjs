/* istanbul ignore file */
import container from '../src/Infrastructures/container';
import createServer from '../src/Infrastructures/http/createServer';

// INFO : Hack so i can deploy it to vercel, though it will be slower
export default async function (request, response) {
  const server = await createServer(container);

  const { body, headers, method, url } = request;

  const result = await server.inject({
    method,
    url,
    payload: body,
    headers,
  });

  response.status(result.statusCode);
  return response.json(result.result);
}
