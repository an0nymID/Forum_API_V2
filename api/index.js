/* istanbul ignore file */
const container = require('../src/Infrastructures/container');
const createServer = require('../src/Infrastructures/http/createServer');
const { Ratelimit } = require('@upstash/ratelimit');
const { kv } = require('@vercel/kv');
const requestIp = require('request-ip');

// INFO : Hack so i can deploy it to vercel, though it will be slower
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, '1 s'),
});

module.exports = async function (request, response) {
  const server = await createServer(container);
  const ip = requestIp.getClientIp(request);
  const { body, headers, method, url } = request;
  const { success } = await ratelimit.limit(ip);

  if (!success && url.includes('/threads')) {
    response.status(429);
    return response.json({
      status: 'fail',
      message: 'too many request...',
    });
  }

  const result = await server.inject({
    method,
    url,
    payload: body,
    headers,
  });

  response.status(result.statusCode);
  return response.json(result.result);
};

module.exports.config = {
  matcher: '/threads',
};
