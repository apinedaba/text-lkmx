export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { checkOutUser } from "@/services/user.service";

export async function POST(req: Request) {
    const { userId } = await req.json();

    const user = await checkOutUser(Number(userId));
    return NextResponse.json(user);
}
