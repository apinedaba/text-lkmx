import { prisma } from "@/lib/db";

export async function getAllUsers() {
    return prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function checkInUser(userId: number) {
    return prisma.user.update({
        where: { id: userId },
        data: {
            lastCheckIn: new Date(),
        },
    });
}

export async function checkOutUser(userId: number) {
    return prisma.user.update({
        where: { id: userId },
        data: {
            lastCheckOut: new Date(),
        },
    });
}
