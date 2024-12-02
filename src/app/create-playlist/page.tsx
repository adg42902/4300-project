"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function CreatePlaylist() {
  const isLoggedIn = Cookies.get("isLoggedIn") === "true";
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    songs: [],
  });

  const fetchUserTracks = async () => {
    const response = await fetch("/api/spotifyStats/tracks", {
      method: "GET",
    });
    const tracks = await response.json();
    formData.songs = tracks;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePlaylistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetchUserTracks();
    const response = await fetch("/api/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({ name: "", title: "", songs: [] });
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [isLoggedIn])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="flex flex-col max-w-md w-full p-4 border rounded-lg shadow-md bg-white"
        onSubmit={handlePlaylistSubmit}
      >
        <h2 className="text-lg font-semibold mb-4 text-center text-black">
          Create Playlist
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Playlist title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            By
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div></div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-black rounded hover:bg-green-600 transition duration-200 my-2"
        >
          Create New Playlist based on Top Tracks
        </button>
      </form>
    </div>
  );
}
