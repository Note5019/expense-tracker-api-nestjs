import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guades/local-auth.guade';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    description: 'Login',
    type: LoginDTO,
  })
  @ApiResponse({
    status: 201,
    description:
      'Successfully logged in, access token generated for next request',
  })
  async login(@Request() req) {
    console.log('req', req.user);
    return this.authService.login(req.user);
  }
}
