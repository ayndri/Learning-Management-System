import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
    try {
        const db = await readDB();
        return NextResponse.json(db.settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const updatedSettings = await request.json();
        const db = await readDB();

        db.settings = {
            ...db.settings,
            ...updatedSettings
        };

        await writeDB(db);
        return NextResponse.json({ message: "Settings updated successfully", settings: db.settings });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
