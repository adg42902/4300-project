import { NextResponse, NextRequest } from "next/server";

let playlists = [
    {
      title: "Playlist 1",
      criteria: "tracks"
    },
    {
      title: "Playlist 2",
      criteria: "genres"
    },
    {
      title: "Playlist 3",
      criteria: "artists"
    }
  ]

  export async function GET() {
    return NextResponse.json(playlists)
  }

  export async function POST(req: NextRequest) {
    try {
        const {title, criteria} = await req.json()

        const newPlaylist = {title, criteria};
        playlists.push(newPlaylist)

        return NextResponse.json({message : 'Playlist Successfully Added'})
    } catch (error: any) {
        return NextResponse.json({message: "Error Creating Playlist", error: error.message}, {status: 500})
    }
  }