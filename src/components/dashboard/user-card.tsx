"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserFormModal } from "./user-form-modal";

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export function UserCard({ user }: { user: any }) {
    async function checkIn() {
        await fetch("/api/user/checkin", {
            method: "POST",
            body: JSON.stringify({ userId: user.id }),
        });
        location.reload();
    }

    async function checkOut() {
        await fetch("/api/user/checkout", {
            method: "POST",
            body: JSON.stringify({ userId: user.id }),
        });
        location.reload();
    }

    const inside =
        user.lastCheckIn &&
        (!user.lastCheckOut ||
            new Date(user.lastCheckIn) > new Date(user.lastCheckOut));

    const formatterDate = (date: string) => {
        return new Intl.DateTimeFormat("es-MX", {
            dateStyle: "short",
            timeStyle: "short",
        }).format(new Date(date));
    }

    return (
        <Card>
            <CardContent className="flex items-center gap-4 py-4">
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full bg-primary bg-blue-700 text-white flex items-center justify-center font-bold">
                    {getInitials(user.name)}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {user?.lastCheckIn && (
                        <p className="text-xs text-neutral-400 ">Acceso registrado: {formatterDate(user?.lastCheckIn)}</p>
                    )}
                    {user?.lastCheckOut && (
                        <p className="text-xs text-neutral-400 ">Salida registrada: {formatterDate(user?.lastCheckOut)}</p>
                    )}
                </div>
                <UserFormModal user={user} />
                {/* Actions */}
                {inside ? (
                    <Button variant="destructive" className="bg-yellow-400 text-yellow-600" size="sm" onClick={checkOut}>
                        Check Out
                    </Button>
                ) : (
                    <Button size="sm" className="bg-green-400 text-green-600" onClick={checkIn}>
                        Check In
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
