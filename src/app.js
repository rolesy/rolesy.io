import express from 'express';
import http from 'http';
import { Server as WebSocketServer } from 'socket.io';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import Cors from './configs/cors';
import env from './configs/index';
import { handledFatalException, normalizePort } from './utils/libs/utils';
import { notFoundHandler, wrapErrors, errorHandler } from './utils/middlewares/errorHandler';

// Express instance
const app = express();

// Server initializations
const server = http.createServer(app);
const io = new WebSocketServer(server);

// Global middleares
app.use(cors(Cors.setCorsConfiguration()));
app.use(compression);
app.use(helmet());
app.use(express.json({ limit: '50 mb' }));
app.use(express.urlencoded({ extended: true, limit: '50 mb', parameterLimit: 50000 }));
app.use(morgan(env.ENVIRONMENT === 'DEVELOPMENT' ? 'dev' : 'combined'));

// Socket instance
io.on('connection', (socket) => {
  console.log(`New socket connection ${socket.id}`);
});

// Routes

// Not found resource error handler
app.use(notFoundHandler);

// Error Handlers
app.use(wrapErrors);
app.use(errorHandler);

const startServer = async (port) => {
  try {
    const normalizedPort = normalizePort(port);

    if (!normalizedPort) throw new Error('No valid PORT configuration. Please check');

    app.listen(env.PORT, () => {
      console.log(`Running on http://localhost:${port}`);
    });
  } catch (error) {
    process.on('uncaughtException', handledFatalException(error));
    process.on('unhandledRejection', handledFatalException(error));

    console.log(error);
  }
};

// Handled process exceptions

export default startServer;
