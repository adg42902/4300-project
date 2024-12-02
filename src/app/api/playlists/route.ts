import Playlist from "@/models/Playlist";
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import Account from '@/models/Account';

export async function POST(req: NextRequest) {
  try {
    const { name, title, songs } = await req.json();
    await connectMongoDB();
    const userEmailCookie = req.cookies.get("userEmail");
   
    if (!userEmailCookie) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    const userEmail = userEmailCookie.value;
    const account = await Account.findOne({ email: userEmail });

    if (!account) {
      return NextResponse.json({ message: "Account not found" }, { status: 404 });
    }

    const newPlaylist = new Playlist({
      name: name,
      title: title,
      songs: songs,
    });
    await newPlaylist.save();
    await fetch("http://localhost:3000/api/auth/account/updateAccount", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, playlistId: newPlaylist._id.toString() }),
    });
    
    return NextResponse.json({ message: "Playlist created" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Invalid JSON or other error" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const playlists = await Playlist.find({}); 

    return NextResponse.json({ playlists });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching playlists" },
      { status: 500 }
    );
  }
}
