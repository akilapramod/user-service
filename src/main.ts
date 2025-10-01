import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// For serverless compatibility (Vercel), export a handler function
let cachedApp: express.Express | null = null;

async function createApp(): Promise<express.Express> {
  dotenv.config({ path: '../../.env' });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(process.env.API_PREFIX || '/api');
  const server = app.getHttpAdapter().getInstance() as express.Express;
  server.use(cookieParser());

  // Dynamic Swagger setup using @nestjs/swagger (no YAML file needed)
  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('eChannelling User Service API')
    .setVersion('1.0')
    .addTag('users', 'User management endpoints')
    .addTag('auth', 'Authentication endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Redirect root to docs for convenience
  server.get('/', (_req, res) => res.redirect('/docs'));
  await app.init();
  console.info('User service app initialized');
  return server;
}

export default async function handler(req: any, res: any): Promise<void> {
  if (!cachedApp) {
    console.log('Cold start: Initializing app...');
    cachedApp = await createApp();
  }
  return cachedApp(req, res);
}

// For local development, keep traditional bootstrap
if (require.main === module) {
  bootstrap().catch(err => console.error('Bootstrap failed:', err));
}

async function bootstrap() {
  const server = await createApp();
  const port = process.env.PORT ? Number(process.env.PORT) : 3002;
  server.listen(port, () => {
    console.info(`User service listening on port ${port}`);
  });
}
