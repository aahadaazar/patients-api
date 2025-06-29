import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { FileDbService } from '../../common/utils/file-db';
import { User } from '../../users/interfaces/user.interface';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly fileDbService: FileDbService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user.
   * Hashes the password and saves the user to the file database.
   * @param registerUserDto DTO containing user registration details.
   * @returns A success message or throws an error if user already exists.
   */
  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<{ message: string }> {
    const users = await this.fileDbService.readUsers<User>();
    const existingUser = users.find(
      (u) => u.id.toLowerCase() === registerUserDto.id.toLowerCase(),
    );

    if (existingUser) {
      throw new ConflictException('User with this ID already exists'); // Use ConflictException for existing resource
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10); // Hash password with 10 salt rounds

    const newUser: User = {
      id: registerUserDto.id,
      password: hashedPassword,
      role: registerUserDto.role,
    };

    users.push(newUser);
    await this.fileDbService.writeUsers(users); // Use writeUsers for strong typing
    return { message: 'User registered successfully' };
  }

  /**
   * Validates user credentials (id and password).
   * @param id The user's ID (username).
   * @param pass The plain text password.
   * @returns The user object if valid, otherwise null.
   */
  async validateUser(
    id: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const users = await this.fileDbService.readUsers<User>();
    const user = users.find(
      (u) => u.id.toLocaleLowerCase() === id.toLocaleLowerCase(),
    );

    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Logs in a user and generates a JWT token.
   * @param user The user object validated by validateUser.
   * @returns An object containing the access token.
   */
  login(user: Omit<User, 'password'>) {
    const payload = { id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      role: user.role,
    };
  }
}
