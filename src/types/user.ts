export interface User {
    id: number;
    name: string;
    email: string;
    area: Area;
    lastCheckIn: string;
    lastCheckOut: string;
    createdAt: string;
    updatedAt: string;
}

export type Area = "operations" | "sales" | "production";

export const translateArea = {
    "operations": String("Operaciones"),
    "sales": String("Ventas"),
    "production": String("Produccion")
};
