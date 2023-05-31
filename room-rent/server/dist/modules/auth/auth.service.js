"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../common/config/config");
let AuthService = class AuthService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async SignIn(signInCredentials) {
        try {
            const existingUser = await this.prismaService.user.findFirst({
                where: {
                    email: signInCredentials.email,
                    isActive: true,
                },
            });
            if (!existingUser) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const passwordMatch = await bcrypt.compare(signInCredentials.password, existingUser.password);
            if (!passwordMatch) {
                throw new common_1.UnauthorizedException('Password does not match');
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
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async generateWebToken(userId) {
        return (0, jsonwebtoken_1.sign)({ id: userId }, config_1.config.JWT_SECRET_KEY, {
            expiresIn: config_1.config.TOKEN_EXPIRY_TIME,
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map