import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StartupModule } from './startup/startup.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [AuthModule, StartupModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
