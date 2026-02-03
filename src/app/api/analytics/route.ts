export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAnalytics } from "@/services/analitycs.service";

export async function GET() {
    const data = await getAnalytics();
    return NextResponse.json(data);
}
