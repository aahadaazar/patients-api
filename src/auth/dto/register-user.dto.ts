// src/auth/dto/register-user.dto.ts
import { IsString, IsNotEmpty, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/user-role.enum';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Unique username for the user',
    example: 'newuser',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Password for the user (min 6 characters)',
    example: 'Password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: UserRole,
    example: UserRole.EMPLOYEE,
    default: UserRole.EMPLOYEE,
  })
  @IsEnum(UserRole, {
    message: 'Role must be a valid UserRole (ADMIN or EMPLOYEE)',
  })
  @IsNotEmpty()
  role: UserRole;
}
