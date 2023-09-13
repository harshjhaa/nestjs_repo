import { FastifyRequest, FastifyReply } from 'fastify';

const loggerGlobalMiddleware = (
  req: FastifyRequest,
  res: FastifyReply,
  next: () => void,
) => {
  console.log('xx Request: ', req);
  next();
};

export { loggerGlobalMiddleware };
