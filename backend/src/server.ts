import { createApp } from './app';
import { ENV_CONFIG } from './config/env.config';

const app = createApp();
const PORT = ENV_CONFIG.PORT;

const server = app.listen(PORT, () => {
  console.log('================================================================');
  console.log(`🚀 IELTS Master AI API Backend is running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`🤖 AI Engine: Active (Model: ${ENV_CONFIG.AI_MODEL_NAME})`);
  console.log(`🎯 Environment: ${ENV_CONFIG.NODE_ENV}`);
  console.log('================================================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});
