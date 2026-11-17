import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiInvalidInput, ApiProtected } from '../common/api-docs.js';
import { ErrorResponseDto } from '../common/dto/common.dto.js';
import { UserResponseDto } from '../users/users.dto.js';
import { LoginDto, RegisterDto, TokenResponseDto } from './auth.dto.js';
import { AuthService } from './auth.service.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Inscription (le premier utilisateur devient Admin, les suivants Viewer)' })
  @ApiCreatedResponse({ type: TokenResponseDto })
  @ApiConflictResponse({ description: 'Email déjà utilisé', type: ErrorResponseDto })
  @ApiInvalidInput()
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Connexion : retourne un JWT' })
  @ApiOkResponse({ type: TokenResponseDto })
  @ApiUnauthorizedResponse({ description: 'Identifiants invalides', type: ErrorResponseDto })
  @ApiInvalidInput()
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('me')
  @ApiProtected()
  @ApiOperation({ summary: 'Profil de l’utilisateur connecté' })
  @ApiOkResponse({ type: UserResponseDto })
  me() {
    return this.auth.me();
  }
}
