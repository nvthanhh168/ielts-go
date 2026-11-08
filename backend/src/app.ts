import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV_CONFIG } from './config/env.config';
import aiRoutes from './modules/ai/ai.routes';
import learningPathRoutes from './modules/learning-path/learning-path.routes';
import userRoutes from './modules/user/user.routes';
import placementTestRoutes from './modules/placement-test/placement-test.routes';
import listeningRoutes from './modules/listening/listening.routes';
import readingRoutes from './modules/reading/reading.routes';
import writingRoutes from './modules/writing/writing.routes';
import speakingRoutes from './modules/speaking/speaking.routes';

export function createApp(): Application {
  const app: Application = express();

  // Security & Utility Middlewares
  app.use(helmet());
  app.use(
    cors({
      origin: ENV_CONFIG.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: ENV_CONFIG.NODE_ENV,
      services: {
        aiHelperConfigured: Boolean(ENV_CONFIG.AI_API_KEY),
        model: ENV_CONFIG.AI_MODEL_NAME,
      },
    });
  });

  // API Routes mount point
  const apiPrefix = ENV_CONFIG.API_PREFIX;
  app.use(`${apiPrefix}/ai`, aiRoutes);
  app.use(`${apiPrefix}/learning-paths`, learningPathRoutes);
  app.use(`${apiPrefix}/users`, userRoutes);
  app.use(`${apiPrefix}/placement-test`, placementTestRoutes);
  app.use(`${apiPrefix}/listening`, listeningRoutes);
  app.use(`${apiPrefix}/reading`, readingRoutes);
  app.use(`${apiPrefix}/writing`, writingRoutes);
  app.use(`${apiPrefix}/speaking`, speakingRoutes);

  // 404 Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
  });

  // Global Error Handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[Unhandled Error]:', err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: ENV_CONFIG.NODE_ENV === 'development' ? err.message : undefined,
    });
  });

  return app;
}
