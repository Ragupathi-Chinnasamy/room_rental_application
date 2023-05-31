import { PrismaService } from 'src/common/database/prisma.service';
import { SignInDto } from './dto/auth.dto';
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
    SignIn(signInCredentials: SignInDto): Promise<{
        role: {
            role: string;
            id: number;
        };
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        token: string;
    }>;
    generateWebToken(userId: number): Promise<string>;
}
