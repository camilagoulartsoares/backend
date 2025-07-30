import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../prisma.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    })

    if (userExists) {
      throw new UnauthorizedException('E-mail já cadastrado')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        provider: 'credentials',
      },
    })

    const token = this.jwtService.sign({ sub: user.id })
    return { token }
  }

  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const passwordValid = await bcrypt.compare(data.password, user.password)

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const token = this.jwtService.sign({ sub: user.id })
    return { token }
  }

  async oauthRegister(data: { name: string; email: string; provider: string }) {
    let user = await this.prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          provider: data.provider,
        },
      })
    }

    const token = this.jwtService.sign({ sub: user.id })
    return { token }
  }
}
