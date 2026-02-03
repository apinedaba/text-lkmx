import { prisma } from "@/lib/db";

const AREAS = ["OPERATIONS", "SALES", "HR"] as const;
type Area = (typeof AREAS)[number];

export async function getAnalytics() {
    const totalUsers = await prisma.user.count();

    const usersInside = await prisma.user.count({
        where: {
            OR: [
                { lastCheckOut: null },
                {
                    lastCheckIn: {
                        gt: prisma.user?.fields?.lastCheckOut,
                    },
                },
            ],
        },
    });

    const byArea = await prisma.user.groupBy({
        by: ["area"],
        _count: { area: true },
    });

    const usersByArea: Record<Area, number> = {
        OPERATIONS: 0,
        SALES: 0,
        HR: 0,
    };

    byArea.forEach((item) => {
        usersByArea[item.area as Area] = item._count.area;
    });

    return {
        totalUsers,
        usersInside,
        usersByArea,
    };
}
