import { PrismaClient } from '../generated/prisma/client';
import { createPgliteAdapter } from 'prisma-pglite';
import path from 'node:path';

const prismaConfigPath = path.join(process.cwd(), 'prisma.config.ts');

const adapter = await createPgliteAdapter({
  dbParentDirPath: path.join(process.cwd(), 'pgdata'),
  prismaConfigPath,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
