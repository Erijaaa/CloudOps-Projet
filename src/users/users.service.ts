import { Injectable } from '@nestjs/common';
import { MemoryService } from '../common/memory.service.js';
import { UserResponseDto } from './users.dto.js';

@Injectable()
export class UsersService extends MemoryService<UserResponseDto> {
  protected readonly searchFields = ['email', 'fullName'];
}
