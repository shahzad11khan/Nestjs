// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
//   });
//     await app.listen(process.env.PORT ?? 3000, () => {
//     console.log(`http://localhost:${process.env.PORT ?? 3000}`);
//   });
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // 👉 Required for static assets
import { join } from 'path';

async function bootstrap() {
  // 👉 Create app as NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 👉 Serve static assets correctly
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Accessible via http://localhost:3000/uploads/filename
  });

  // 👉 Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 👉 Start server
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`http://localhost:${process.env.PORT ?? 3000}`);
  });
}

bootstrap();
