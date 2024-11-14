"use client";

import Logout from "../components/Logout";
import Tracks from "../components/Tracks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SpotifyConnect from "../components/SpotifyConnect";
import local from "next/font/local";

type Playlist = {
  title: string;
  criteria: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const connectedToSpotify = localStorage.getItem("connectedToSpotify");
      if (connectedToSpotify === "true") {
        setIsConnected(true);
      }
    }
  }, []);

  const getPlaylists = async () => {
    try {
      const response = await fetch("/api/playlists", { method: "GET" });

      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }

      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error(error);
    }
  };

 
  const handleSpotifyConnectBtn = () => {
    localStorage.setItem("connectedToSpotify", "true");
  }

  useEffect(() => {
    getPlaylists();
  }, []);


  return (
    <div className="relative flex flex-col items-center w-full h-screen mt-4">
      <h1 className="text-2xl font-bold text-center w-full mt-1">Dashboard</h1>
      <div className="absolute right-4">
        <Logout />
      </div>
      {isConnected && <Tracks />}
      <Link href="/create-playlist"
        className="border rounded-lg py-1 px-4 bg-green-400 border-green-400 transition ease-in-out duration-200 hover:bg-green-500 hover:scale-105 hover:shadow-md disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:scale-100 disabled:opacity-50 disabled:hover:shadow-none"
      >
        Create Playlist
      </Link>
      {!isConnected && <SpotifyConnect handleSpotifyConnectBtn={handleSpotifyConnectBtn} />}
    </div>
  );
}
