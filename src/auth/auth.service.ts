import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from '../common/enums.js';
import { UsersService } from '../users/users.service.js';
import { LoginDto, RegisterDto, TokenResponseDto } from './auth.dto.js';

/** TODO semaine 3 : hash bcrypt du mot de passe + vrai JWT (@nestjs/jwt) + guards. */
@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService) {}

  register(dto: RegisterDto): TokenResponseDto {
    if (this.users.all().some((u) => u.email === dto.email)) {
      throw new ConflictException('Email déjà utilisé');
    }
    const role = this.users.all().length === 0 ? Role.ADMIN : Role.VIEWER; // 1er inscrit = Admin
    const user = this.users.create({ email: dto.email, fullName: dto.fullName, role });
    return { accessToken: 'TODO-jwt', user };
  }

  login(dto: LoginDto): TokenResponseDto {
    const user = this.users.all().find((u) => u.email === dto.email);
    if (!user) throw new UnauthorizedException('Identifiants invalides');
    return { accessToken: 'TODO-jwt', user };
  }

  me() {
    const user = this.users.all()[0];
    if (!user) throw new UnauthorizedException('Non authentifié');
    return user;
  }
}
