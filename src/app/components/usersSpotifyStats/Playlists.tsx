import { useState, useEffect } from "react";

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
    const playlists = await response.json();
    setUsersPlaylists(playlists.playlists);
  };

  const handleFilter = () => {
    setWantMyPlaylists(!wantsMyPlaylists);
  };

  useEffect(() => {
    getPlaylists();
    getUsersPlaylists();
  }, []);

  return (
    <div className="playlists-container p-4">
      {playlists.length >= 1 && (
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
