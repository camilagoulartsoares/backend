import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { StartupController } from './startup.controller'
import { StartupService } from './startup.service'
import { PrismaService } from '../../prisma.service'

@Module({
  imports: [HttpModule],
  controllers: [StartupController],
  providers: [StartupService, PrismaService],
})
export class StartupModule {}
