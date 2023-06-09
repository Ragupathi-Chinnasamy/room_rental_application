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
exports.AdminAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../database/prisma.service");
const config_1 = require("../config/config");
let AdminAuthGuard = class AdminAuthGuard {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.canActivate = async (context) => {
            var _a;
            const req = context.switchToHttp().getRequest();
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (token) {
                console.log(token);
                const decodedToken = (0, jsonwebtoken_1.verify)(token, config_1.config.JWT_SECRET_KEY);
                if (decodedToken) {
                    const user = await this.prismaService.user.findFirst({
                        where: {
                            id: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id,
                            isActive: true,
                        },
                    });
                    if (user.token === token) {
                        return true;
                    }
                    else {
                        throw new common_1.BadRequestException('Token mismatch');
                    }
                }
                else {
                    throw new common_1.BadRequestException('Wrong authentication token');
                }
            }
            else {
                throw new common_1.BadRequestException('Auth token missing');
            }
        };
    }
};
AdminAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminAuthGuard);
exports.AdminAuthGuard = AdminAuthGuard;
//# sourceMappingURL=admin.guard.js.map