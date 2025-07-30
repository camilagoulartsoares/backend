import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common'
import { StartupService } from './startup.service'
import { Prisma } from '@prisma/client'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Controller('startup')
export class StartupController {
  constructor(
    private readonly service: StartupService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  create(@Body() body: Prisma.StartupCreateInput) {
    return this.service.create(body)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: Partial<{
      nome_da_startup: string
      descricao: string
      imagem_de_capa: string
      vertical: string
      localizacao: string
      cresimento_mom: number
    }>,
  ) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }

  @Get('publicas')
  async getPublicas(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get('https://make.investidores.vc/webhook/startup', {
        headers: {
          'Content-Type': 'application/json',
          api_key: 'alkj239j9csdociva-av98n2vsdoia-asoijf20as',
        },
      }),
    )
    return response.data
  }
}
