import { NextResponse, NextRequest } from 'next/server';
import Account from '@/models/Account';
import Playlist from '@/models/Playlist';
import connectMongoDB from '@/libs/db';

export async function GET(req: NextRequest) {
    await connectMongoDB();

    const userEmailCookie = req.cookies.get("userEmail");

    if (!userEmailCookie) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    const userEmail = userEmailCookie.value;

    try {
        const account = await Account.findOne({ email: userEmail });

        if (!account) {
            return NextResponse.json({ message: "Account not found" }, { status: 404 });
        }

        const playlistIds = account.playlists;

        const playlists = await Playlist.find({ _id: { $in: playlistIds } });

        return NextResponse.json({ playlists });
    } catch (error) {
        console.error("Error fetching user playlists:", error);
        return NextResponse.json({ message: "Error fetching playlists" }, { status: 500 });
    }
}