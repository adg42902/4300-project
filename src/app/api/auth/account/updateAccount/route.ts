import { NextResponse } from 'next/server';
import Account from '@/models/Account'; 
import connectMongoDB from "@/libs/db"

export async function PUT(req: Request) {
    await connectMongoDB(); 

    const { email, playlistId } = await req.json();

    if (!email || !playlistId) {
        return NextResponse.json({ message: "Email and playlistId are required" }, { status: 400 });
    }

    try {
        const account = await Account.findOne({ email });

        if (!account) {
            return NextResponse.json({ message: "Account not found" }, { status: 404 });
        }
        account.playlists.push(playlistId);
        await account.save();

        return NextResponse.json({ message: "Playlist added successfully", playlists: account.playlists });
    } catch (error) {
        console.error("Error updating account:", error);
        return NextResponse.json({ message: "Error updating account" }, { status: 500 });
    }
}
