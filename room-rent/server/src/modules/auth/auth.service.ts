import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { SignInDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from 'src/common/config/config';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async SignIn(signInCredentials: SignInDto) {
    try {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          email: signInCredentials.email,
          isActive: true,
        },
      });

      if (!existingUser) {
        throw new UnauthorizedException('User not found');
      }

      const passwordMatch = await bcrypt.compare(
        signInCredentials.password,
        existingUser.password,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException('Password does not match');
      }

      const WebToken = await this.generateWebToken(existingUser.id);

      return await this.prismaService.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          token: WebToken,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          token: true,
          role: {
            select: {
              id: true,
              role: true,
            },
          },
        },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async generateWebToken(userId: number) {
    return sign({ id: userId }, config.JWT_SECRET_KEY, {
      expiresIn: config.TOKEN_EXPIRY_TIME,
    });
  }
}
