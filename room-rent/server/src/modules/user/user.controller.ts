import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { AdminAuthGuard } from 'src/common/guard/admin.guard';

@Controller('user')
export class UserController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  @UseInterceptors(AdminAuthGuard)
  async getAllUsers() {
    const result = await this.prismaService.user.findMany({});
    console.log(result);

    return {
      status: true,
      data: result,
      message: 'Users fetched successfully',
    };
  }
}
