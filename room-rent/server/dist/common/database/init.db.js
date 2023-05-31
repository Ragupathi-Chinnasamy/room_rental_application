"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum/enum");
const bcrypt = require("bcrypt");
async function initRole(prisma) {
    const roleCount = await prisma.role.count({});
    const roles = ['Admin', 'PropertyOwner', 'User'];
    if (roleCount == 0) {
        for (const role of roles) {
            await prisma.role.create({
                data: {
                    role: role,
                },
            });
        }
    }
}
async function initAdmin(prisma) {
    const hashedPassword = await bcrypt.hash('super@admin', 10);
    const userCount = await prisma.user.count({});
    if (userCount == 0) {
        await prisma.user.create({
            data: {
                firstName: 'Super',
                lastName: 'Admin',
                email: 'admin@super.in',
                password: hashedPassword,
                phone: '9999999999',
                roleId: enum_1.Roles.Admin,
            },
        });
    }
}
async function initDatabase(prisma) {
    try {
        await initRole(prisma);
        await initAdmin(prisma);
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = initDatabase;
//# sourceMappingURL=init.db.js.map