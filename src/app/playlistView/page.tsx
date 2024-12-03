"use client";

import Playlists from "../components/usersSpotifyStats/Playlists";
import Link from "next/link";

export default function playlistView() {

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <Link
          href="/"
          className="px-4 py-2 my-2 border border-green-400 bg-green-400 rounded-lg hover:bg-green-500 transition ease-in-out hover:border-green-500 duration-200 hover:scale-105 hover:shadow-md inline-block"
        >
          Go Back Home
        </Link>
        <h1 className="text-2xl">People's Playlists</h1>
      </div>
      <Playlists />
    </div>
  );
}
