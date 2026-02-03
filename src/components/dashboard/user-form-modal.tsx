"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AREAS = ["OPERATIONS", "SALES", "HR"];

export function UserFormModal({ user }: { user?: any }) {
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [area, setArea] = useState(user?.area ?? "OPERATIONS");

    async function onSubmit() {
        const method = user ? "PUT" : "POST";

        await fetch("/api/user", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: user?.id,
                name,
                email,
                area,
            }),
        });

        location.reload();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">
                    {user ? "Editar usuario" : "Agregar usuario"}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>
                        {user ? "Editar usuario" : "Crear usuario"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Nombre</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <Label>Correo electrónico</Label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="mail@lkm.com.mx"
                        />
                    </div>

                    <div>
                        <Label>Área</Label>
                        <Select value={area} onValueChange={setArea}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {AREAS.map((area) => (
                                    <SelectItem key={area} value={area}>
                                        {area}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button className="w-full" onClick={onSubmit}>
                        {user ? "Guardar cambios" : "Crear"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
