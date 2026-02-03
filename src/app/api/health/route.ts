import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        status: "Todo bien",
        timestamp: new Date().toISOString(),
    });
}
