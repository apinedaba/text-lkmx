import { prisma } from "@/lib/db";
import { Area } from "@/generated/prisma/client";

export async function getAnalytics() {
    const totalUsers = await prisma.user.count();
    const usersInside = await prisma.user.count({
        where: {
            OR: [
                { lastCheckOut: null },
                {
                    lastCheckIn: {
                        gt: prisma.user.fields.lastCheckOut,
                    },
                },
            ],
        },
    });

    const byArea = await prisma.user.groupBy({
        by: ["area"],
        _count: { area: true },
    });

    const usersByArea = Object.values(Area).reduce((acc, area) => {
        acc[area] = 0;
        return acc;
    }, {} as Record<string, number>);

    byArea.forEach((item) => {
        usersByArea[item.area] = item._count.area;
    });

    return {
        totalUsers,
        usersInside,
        usersByArea,
    };
}
