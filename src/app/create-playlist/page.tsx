"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePlaylist() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    criteria: "tracks",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePlaylistSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const response = await fetch("/api/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({ title: "", criteria: "tracks" });
      router.push("/dashboard");
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

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
        <div className="mb-4">
          <label
            htmlFor="criteria"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Based on
          </label>
          <select
            id="criteria"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-black"
            value={formData.criteria}
            onChange={handleChange}
            required
          >
            <option value="tracks">Top Tracks</option>
            <option value="artists">Top Artists</option>
            <option value="genres">Top Genres</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-black rounded hover:bg-green-600 transition duration-200"
        >
          Create New Playlist
        </button>
      </form>
    </div>
  );
}
