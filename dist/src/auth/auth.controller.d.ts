import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    postLogin(data: AuthDto): Promise<import("@nestjs/common").HttpException>;
}
