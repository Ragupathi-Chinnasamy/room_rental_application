import { PrismaService } from './prisma.service';
declare function initDatabase(prisma: PrismaService): Promise<void>;
export default initDatabase;
