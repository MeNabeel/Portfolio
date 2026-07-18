import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Seed the default Admin User
  // Note: Since we are using Supabase Auth, the 'id' here must match the user's UUID in Supabase's auth.users table.
  // In a real scenario, you'd create the user in Supabase Auth first, grab their ID, and use it here.
  // For the seed, we use a placeholder UUID. YOU MUST UPDATE THIS AFTER CREATING YOUR SUPABASE USER.
  const adminId = '00000000-0000-0000-0000-000000000000'; // REPLACE WITH ACTUAL SUPABASE USER ID

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { role: 'ADMIN' },
    create: {
      id: adminId,
      email: 'admin@example.com',
      role: 'ADMIN',
    },
  });
  console.log(`Upserted admin user: ${admin.email}`);

  // 2. Seed Default Portfolio Content
  const content = await prisma.portfolioContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroTitle: "Hi, I'm Nabeel Ijaz",
      heroSubtitle: "A passionate Software Engineer specializing in Full Stack MERN Development, Artificial Intelligence, and creating scalable modern web applications.",
      aboutText: "I am a final year software engineering student specializing in MERN Stack Development, AI integrations, modern web applications, and cloud technologies.",
      education: [
        {
          degree: "BSc Software Engineering",
          school: "University Name",
          year: "2022 - 2026",
          description: "Focusing on full stack development and AI integrations."
        }
      ],
      experience: [],
      skills: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
      projects: [],
      socialLinks: [
        { name: "GitHub", url: "https://github.com" },
        { name: "LinkedIn", url: "https://linkedin.com" }
      ]
    },
  });
  console.log('Seeded Portfolio Content.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
