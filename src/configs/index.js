import dotenv from 'dotenv';

dotenv.config();

export default {
  ENVIRONMENT: process.env.ENVIRONMENT || 'DEVELOPMENT',
  PORT: process.env.PORT || 3003,
  CORS: process.env.CORS || '*',
};
