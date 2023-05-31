import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    WebUserLogin(signInCredentials: SignInDto, req: Request): Promise<{
        status: boolean;
        data: {
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
        };
        message: string;
    }>;
}
