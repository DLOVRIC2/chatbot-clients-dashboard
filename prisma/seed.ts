// import { PrismaClient } from "@prisma/client";
// import { randomUUID } from "crypto";

// const prisma = new PrismaClient();

// async function main() {
//   // Check if root user exists
//   const rootEmail = "root@algorise.com";
//   const existingRoot = await prisma.user.findUnique({
//     where: { email: rootEmail },
//   });

//   if (!existingRoot) {
//     // Create root user if doesn't exist
//     const user = await prisma.user.create({
//       data: {
//         id: randomUUID(),
//         name: "Root Admin",
//         email: rootEmail,
//         emailVerified: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         companyName: "Algorise",
//         logoUrl: "/algorise-logo.png",
//         langsmithProjectName: "algorise-root",
//         langsmithApiKey: "default-key",
//         projectSessionId: "root-session",
//         role: "root",
//       },
//     });
//     console.log("Root user created:", user.email);
//   } else {
//     console.log("Root user already exists");
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
