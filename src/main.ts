import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './common/all-exceptions.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('CloudOps Manager API')
    .setDescription(
      'API REST de gestion des projets, serveurs, applications, monitoring et alertes cloud.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Token JWT obtenu via POST /auth/login' },
      'access-token',
    )
    .addTag('Auth', 'Inscription, connexion et profil')
    .addTag('Users', 'Gestion des utilisateurs et des rôles (Admin / DevOps / Viewer)')
    .addTag('Projects', 'Projets, environnements et équipes')
    .addTag('Servers', 'Serveurs VPS / VM')
    .addTag('Monitoring', 'Mesures CPU/RAM, historique et disponibilité')
    .addTag('Applications', 'Applications déployées sur les serveurs')
    .addTag('Alert Rules', 'Seuils d’alerte configurables')
    .addTag('Alerts', 'Incidents et historique')
    .addTag('Dashboard', 'Indicateurs globaux')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true, tagsSorter: 'alpha' },
    jsonDocumentUrl: 'api/docs-json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
