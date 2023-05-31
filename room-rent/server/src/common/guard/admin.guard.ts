import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { PrismaService } from '../database/prisma.service';
import { config } from '../config/config';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}
  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      console.log(token);
      const decodedToken: any = verify(token, config.JWT_SECRET_KEY);

      if (decodedToken) {
        const user = await this.prismaService.user.findFirst({
          where: {
            id: decodedToken?.id,
            isActive: true,
          },
        });

        if (user.token === token) {
          return true;
        } else {
          throw new BadRequestException('Token mismatch');
        }
      } else {
        throw new BadRequestException('Wrong authentication token');
      }
    } else {
      throw new BadRequestException('Auth token missing');
    }
  };
}
