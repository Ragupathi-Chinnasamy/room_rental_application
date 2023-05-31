import { PrismaService } from 'src/common/database/prisma.service';
export declare class UserController {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllUsers(): Promise<{
        status: boolean;
        data: import(".prisma/client").User[];
        message: string;
    }>;
}
