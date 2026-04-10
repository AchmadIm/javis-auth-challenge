import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@javis.com' },
    update: {},
    create: {
        username: 'admin javis',
        email: 'admin@javis.com',
        password: hashedPassword,
    },
  })
  console.log('User Admin Berhasil Dibuat:', user)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())