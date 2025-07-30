import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { Prisma, Startup } from '@prisma/client'

@Injectable()
export class StartupService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.StartupCreateInput): Promise<Startup> {
    return this.prisma.startup.create({ data })
  }

  async findAll(): Promise<
    Array<{
      id: string
      nome_da_startup: string
      imagem_de_capa: string
      descricao: string
      vertical: string
      localizacao: string
      cresimento_mom: number
    }>
  > {
    const startups = await this.prisma.startup.findMany()
    return startups.map((startup) => ({
      id: startup.id,
      nome_da_startup: startup.nome_da_startup,
      imagem_de_capa: startup.imagem_de_capa || '/placeholder.svg',
      descricao: startup.descricao,
      vertical: startup.vertical || 'Outro',
      localizacao: startup.localizacao || 'Não informada',
      cresimento_mom: startup.cresimento_mom ?? 0,
    }))
  }

  async findOne(id: string): Promise<{
    id: string
    nome_da_startup: string
    imagem_de_capa: string
    descricao: string
    vertical: string
    localizacao: string
    cresimento_mom: number
  }> {
    const startup = await this.prisma.startup.findUnique({ where: { id } })
    if (!startup) throw new NotFoundException('Startup não encontrada')

    return {
      id: startup.id,
      nome_da_startup: startup.nome_da_startup,
      imagem_de_capa: startup.imagem_de_capa || '/placeholder.svg',
      descricao: startup.descricao,
      vertical: startup.vertical || 'Outro',
      localizacao: startup.localizacao || 'Não informada',
      cresimento_mom: startup.cresimento_mom ?? 0,
    }
  }

  async update(
    id: string,
    data: Partial<{
      nome_da_startup: string
      descricao: string
      imagem_de_capa: string
      vertical: string
      localizacao: string
      cresimento_mom: number
    }>
  ): Promise<Startup> {
    const exists = await this.prisma.startup.findUnique({ where: { id } })
    if (!exists) throw new NotFoundException('Startup não encontrada')

    return this.prisma.startup.update({
      where: { id },
      data,
    })
  }

  async remove(id: string): Promise<Startup> {
    const exists = await this.prisma.startup.findUnique({ where: { id } })
    if (!exists) throw new NotFoundException('Startup não encontrada')

    return this.prisma.startup.delete({ where: { id } })
  }
}
