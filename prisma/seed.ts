import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const seedUserEmail = process.env.SEED_USER_EMAIL || 'admin@test.com';
  const seedUserPassword = process.env.SEED_USER_PASSWORD || 'admin123';
  const seedUserName = 'Admin User';
  const newsCount = 20;

  const hashedPassword = await bcrypt.hash(seedUserPassword, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: seedUserEmail },
  });

  let user;
  if (existingUser) {
    user = await prisma.user.update({
      where: { email: seedUserEmail },
      data: {
        password: hashedPassword,
        name: seedUserName,
        isActive: true,
      },
    });
  } else {
    user = await prisma.user.create({
      data: {
        email: seedUserEmail,
        password: hashedPassword,
        name: seedUserName,
        isActive: true,
      },
    });
  }

  const existingNewsCount = await prisma.news.count({
    where: { deletedAt: null },
  });

  if (existingNewsCount < newsCount) {
    const newsToCreate = newsCount - existingNewsCount;
    const newsData = Array.from({ length: newsToCreate }, (_, i) => ({
      title: `Notícia ${existingNewsCount + i + 1}`,
      description: `Esta é a descrição da notícia número ${existingNewsCount + i + 1}. Ela contém informações relevantes sobre o assunto abordado.`,
    }));

    await prisma.news.createMany({
      data: newsData,
    });
  }

  console.log('Seed executado com sucesso!');
  console.log(`Usuário: ${seedUserEmail} / ${seedUserPassword}`);
  console.log(`Notícias criadas: ${newsCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

