import { Roles } from '../enum/enum';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

async function initRole(prisma: PrismaService) {
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

async function initAdmin(prisma: PrismaService) {
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
        roleId: Roles.Admin,
      },
    });
  }
}

async function initDatabase(prisma: PrismaService) {
  try {
    await initRole(prisma);
    await initAdmin(prisma);
  } catch (error) {
    console.log(error);
  }
}

export default initDatabase;
