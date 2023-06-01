import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    WebUserLogin(signInCredentials: SignInDto): Promise<{
        status: boolean;
        data: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            token: string;
            role: {
                role: string;
                id: number;
            };
            id: number;
        };
        message: string;
    }>;
}
