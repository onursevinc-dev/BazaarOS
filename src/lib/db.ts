// Too many connections hatası bu şekilde bağlantı kurulursa çözülür globalThisda prisma varsa onu kullanıyor yoksa yeni bağlantı açıyor gereksiz connectionları engelliyor

import { PrismaClient } from "@prisma/client"

declare global{
    var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production") globalThis.prisma = db