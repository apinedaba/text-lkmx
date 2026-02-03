import { User } from "@/types/user";
import { UserCard } from "@/components/dashboard/user-card";
import { UserFormModal } from "@/components/dashboard/user-form-modal";

async function getUsers(): Promise<User[]> {
    const res = await fetch("http://localhost:3000/api/user", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return res.json();
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="p-6 space-y-6 max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Usuarios</h1>
                <UserFormModal />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}
