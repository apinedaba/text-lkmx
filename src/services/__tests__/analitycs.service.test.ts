import { getAnalytics } from "@/services/analitycs.service";
import { prisma } from "@/lib/db";

jest.mock("@/lib/db");

describe("getAnalytics", () => {
    it("returns aggregated analytics data", async () => {
        (prisma.user.count as jest.Mock)
            .mockResolvedValueOnce(10) // totalUsers
            .mockResolvedValueOnce(4); // usersInside

        (prisma.user.groupBy as jest.Mock).mockResolvedValue([
            { area: "OPERATIONS", _count: { area: 5 } },
            { area: "SALES", _count: { area: 3 } },
            { area: "HR", _count: { area: 2 } },
        ]);

        const result = await getAnalytics();

        expect(result.totalUsers).toBe(10);
        expect(result.usersInside).toBe(4);
        expect(result.usersByArea).toEqual({
            OPERATIONS: 5,
            SALES: 3,
            HR: 2,
        });
    });
});
