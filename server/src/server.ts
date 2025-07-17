import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  logger.error(`Server error: ${err.message}`);
});

// Handle uncaught exceptions & rejections
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (err: any) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
