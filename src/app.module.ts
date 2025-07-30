import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StartupModule } from './startup/startup.module';

@Module({
  imports: [AuthModule,StartupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
