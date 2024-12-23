import { useState, useEffect } from "react";
import Delete from "../Delete";
import Cookies from "js-cookie";
import Link from "next/link";

type Song = {
  name: string;
};

type Playlist = {
  _id: string;
  name: string;
  title: string;
  songs: Song[];
};

export default function Playlists() {
  const isLoggedIn = Cookies.get("isLoggedIn") === "true";
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [usersPlaylists, setUsersPlaylists] = useState<Playlist[]>([]);
  const [wantsMyPlaylists, setWantMyPlaylists] = useState(false);

  const getPlaylists = async () => {
    const response = await fetch("/api/playlists", { method: "GET" });
    const data = await response.json();
    setPlaylists(data.playlists);
  };

  const getUsersPlaylists = async () => {
    const response = await fetch("/api/playlists/usersPlaylists", {
      method: "GET",
    });
    const plays = await response.json();
    setUsersPlaylists(plays.playlists);
  };

  const handleFilter = () => {
    setWantMyPlaylists(!wantsMyPlaylists);
  };

  const handleDeletePlaylist = (id: string) => {
    const updatedUsersPlaylists = usersPlaylists.filter(
      (playlist) => playlist._id !== id
    );
    setUsersPlaylists(updatedUsersPlaylists);
    setPlaylists(playlists.filter((playlist) => playlist._id !== id));

    if (updatedUsersPlaylists.length === 0) {
      setWantMyPlaylists(false);
    }
  };

  useEffect(() => {
    getPlaylists();
    getUsersPlaylists();
  }, []);

  return (
    <div className="playlists-container p-4">
      {!isLoggedIn && (
        <div className="flex justify-center items-center">
          <Link
            className="px-4 py-2 mr-2 border border-green-400 bg-green-400 rounded-lg hover:bg-green-500 transition ease-in-out hover:border-green-500 duration-200 hover:scale-105 hover:shadow-md inline-block"
            href="/account/login"
          >
            Login
          </Link>
          <Link
            className="px-4 py-2  ml-2 border border-green-400 bg-green-400 rounded-lg hover:bg-green-500 transition ease-in-out hover:border-green-500 duration-200 hover:scale-105 hover:shadow-md inline-block"
            href="/account/signup"
          >
            Sign up
          </Link>
        </div>
      )}
      {isLoggedIn && usersPlaylists.length >= 1 && (
        <label>
          <input type="checkbox" onChange={handleFilter} /> Only My Playlists
        </label>
      )}
      {playlists.length === 0 && (
        <h1 className="text-center italic">No Playlists Yet</h1>
      )}
      {!wantsMyPlaylists &&
        playlists.map((playlist) => (
          <div
            key={playlist._id}
            className="playlist-container border p-4 rounded-lg shadow-md my-4"
          >
            <h1 className="text-xl font-bold">{playlist.title}</h1>
            <h2 className="text-lg text-gray-600">By {playlist.name}</h2>
            <ul className="list-disc pl-6 mt-2">
              {playlist.songs.map((song, index) => (
                <li key={index} className="text-gray-800">
                  {song.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      {wantsMyPlaylists &&
        usersPlaylists.map((playlist) => (
          <div
            key={playlist._id}
            className="playlist-container border p-4 rounded-lg shadow-md my-4"
          >
            <Delete id={playlist._id} onDelete={handleDeletePlaylist} />
            <h1 className="text-xl font-bold">{playlist.title}</h1>
            <h2 className="text-lg text-gray-600">By {playlist.name}</h2>
            <ul className="list-disc pl-6 mt-2">
              {playlist.songs.map((song, index) => (
                <li key={index} className="text-gray-800">
                  {song.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
