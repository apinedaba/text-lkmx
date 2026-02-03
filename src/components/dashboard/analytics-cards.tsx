import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { translateArea } from "@/types/user";

async function getAnalytics() {
    const res = await fetch("http://localhost:3000/api/analytics", {
        cache: "no-store",
    });
    if (!res.ok) {
        return {
            totalUsers: 0,
            usersInside: 0,
            usersByArea: {},
        };
    }
    return res.json();
}

export async function AnalyticsCards() {
    const analytics = await getAnalytics();
    return (
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Total de usuarios</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-center">
                    {analytics.totalUsers}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Usuarios dentro</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold text-center">
                    {analytics.usersInside}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Por area</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 items-center">
                    {Object.entries(analytics.usersByArea).map(([area, count]) => (
                        <p key={area} className="text-sm font-bold text-center">
                            <strong>{translateArea[area.toLowerCase() as keyof typeof translateArea] || area}</strong>: {String(count || "0")}
                        </p>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
