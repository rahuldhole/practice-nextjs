import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const prismaClientSingleton = () => {
  console.log('DATABASE_URL from env:', process.env.DATABASE_URL);
  const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
  console.log('Using database URL:', dbUrl);
  const adapter = new PrismaBetterSqlite3({
    url: dbUrl,
  });
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
