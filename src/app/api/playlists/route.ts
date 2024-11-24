import Playlist from "@/models/Playlist";
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, title, songs } = await req.json();
    await connectMongoDB();

    const newPlaylist = new Playlist({
      name: name,
      title: title,
      songs: songs,
    });
    await newPlaylist.save();

    return NextResponse.json({ message: "Playlist created" });
  } catch (error) {
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
