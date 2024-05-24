import { PrismaClient } from '@prisma/client'



export async function connectToDatabase() {
    const prisma = new PrismaClient()
    // ... you will write your Prisma Client queries here
    return prisma
}

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })
