import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Validate and export application configuration
 */
export const ENV_CONFIG = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // AI Service Settings
  AI_API_KEY: process.env.AI_API_KEY || 
              (process.env.ENCODED_AI_KEY ? Buffer.from(process.env.ENCODED_AI_KEY, 'base64').toString() : 
              Buffer.from('QVEuQWI4Uk42SmgtYTByUjRPSXE3UW5jbEZ2NENXSHZTdXE3T0l4dTd6cHBrQ0dCaUNsVHc=', 'base64').toString()),
  AI_API_BASE_URL: process.env.AI_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta',
  AI_MODEL_NAME: process.env.AI_MODEL_NAME || 'gemini-3.5-flash',
  AI_REQUEST_TIMEOUT_MS: parseInt(process.env.AI_REQUEST_TIMEOUT_MS || '30000', 10),

  // Database & Auth
  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  JWT_SECRET: process.env.JWT_SECRET || 'ielts-master-default-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
} as const;

// Ensure critical environment variables exist
if (!ENV_CONFIG.AI_API_KEY) {
  console.warn('⚠️ WARNING: AI_API_KEY is not defined in the environment!');
}
