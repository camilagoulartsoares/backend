import { Module } from '@nestjs/common'
import { ChatbotController } from './chatbot.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [ChatbotController],
})
export class ChatbotModule {}
