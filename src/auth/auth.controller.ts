import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

interface RegisterDTO {
  name: string
  email: string
  password: string
}

interface LoginDTO {
  email: string
  password: string
}

interface OAuthRegisterDTO {
  name: string
  email: string
  provider: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body)
  }

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body)
  }

  @Post('oauth-register')
  oauthRegister(@Body() body: OAuthRegisterDTO) {
    return this.authService.oauthRegister(body)
  }
}
