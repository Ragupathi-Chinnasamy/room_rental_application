import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
export declare class AdminAuthGuard implements CanActivate {
    private prismaService;
    constructor(prismaService: PrismaService);
    canActivate: (context: ExecutionContext) => Promise<boolean>;
}
