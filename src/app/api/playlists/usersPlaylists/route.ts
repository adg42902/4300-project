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

export async function DELETE(req: NextRequest) {
    await connectMongoDB();

    const { id } = await req.json();
    if (!id) {
        return NextResponse.json({ message: "No Playlist Given" }, { status: 400 });
    }   

    try {
        const result = await Playlist.findByIdAndDelete({ _id: id });

        return NextResponse.json({ message: "Playlist deleted successfully" });
    } catch (error) {
        console.error("Error deleting playlist:", error);
        return NextResponse.json({ message: "Error deleting playlist" }, { status: 500 });
    }
}