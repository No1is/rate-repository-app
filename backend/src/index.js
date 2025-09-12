import http from 'http';

import logger from './utils/logger.js';
import { API_PORT } from './config.js';
import createApolloServer from './apolloServer.js';
import app from './app.js';

const startServer = async () => {

  const apolloServer = createApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' })

  const httpServer = http.createServer(app.callback());

  httpServer.listen(API_PORT, '0.0.0.0', () => {
    logger.info(`server ready at ${API_PORT}`)
    logger.info(`Apollo Server ready at ${API_PORT}/graphql`);
  })
};

startServer();
