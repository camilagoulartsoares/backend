import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication } from '@nestjs/common'

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })

  await app.listen(process.env.PORT || 3001)
}
bootstrap()
