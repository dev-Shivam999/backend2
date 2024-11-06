import { PrismaClient } from "@prisma/client"

const PClient=new PrismaClient()

export async function AddUser(){
    await PClient.user.upsert({
        where:{
            id:1
        },
        update:{},
        create:{
            name:"lol"
        }
    })
    await PClient.user.upsert({
        where: {
            id: 2
        },
        update: {},
        create: {
            name: "lol2"
        }
    })
    await PClient.user.upsert({
        where: {
            id: 3
        },
        update: {},
        create: {
            name: "lol3"
        }
    })
}


