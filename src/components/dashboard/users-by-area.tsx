import { UserCard } from "@/components/dashboard/user-card";
import { translateArea } from "@/types/user";

async function getUsers() {
    const res = await fetch("http://localhost:3000/api/user", {
        cache: "no-store",
    });
    return res.json();
}

export async function UsersByArea() {
    const users = await getUsers();

    const grouped = users.reduce((acc: any, user: any) => {
        acc[user.area] = acc[user.area] || [];
        acc[user.area].push(user);
        return acc;
    }, {});

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {Object.entries(grouped).map(([area, users]: any) => (
                <div key={area} className="space-y-2">
                    <h2 className="font-semibold text-lg">{translateArea[area.toLowerCase() as keyof typeof translateArea] || area}</h2>
                    {users.map((user: any) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            ))}
        </div>
    );
}
