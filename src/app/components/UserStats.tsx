import React, { useState } from "react";
import Tracks from "./usersSpotifyStats/Tracks";
import Artists from "./usersSpotifyStats/Artists";
import Genres from "./usersSpotifyStats/Genres";
import Playlists from "./usersSpotifyStats/Playlists";

const UserStats = () => {
  const [activeTab, setActiveTab] = useState(1); 

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className="flex space-x-4 items-center justify-center">
        <button
          onClick={() => handleTabClick(1)}
          className={`${
            activeTab === 1 ? "bg-green-400" : "bg-gray-200"
          } border rounded-lg py-1 px-4 transition ease-in-out duration-200 hover:bg-green-500 hover:scale-105 hover:shadow-md`}
        >
          Tracks
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`${
            activeTab === 2 ? "bg-green-400" : "bg-gray-200"
          } border rounded-lg py-1 px-4 transition ease-in-out duration-200 hover:bg-green-500 hover:scale-105 hover:shadow-md`}
        >
          Artists
        </button>
        <button
          onClick={() => handleTabClick(3)}
          className={`${
            activeTab === 3 ? "bg-green-400" : "bg-gray-200"
          } border rounded-lg py-1 px-4 transition ease-in-out duration-200 hover:bg-green-500 hover:scale-105 hover:shadow-md`}
        >
          Genres
        </button>
        <button
          onClick={() => handleTabClick(4)}
          className={`${
            activeTab === 4 ? "bg-green-400" : "bg-gray-200"
          } border rounded-lg py-1 px-4 transition ease-in-out duration-200 hover:bg-green-500 hover:scale-105 hover:shadow-md`}
        >
          Peoples Playlists
        </button>
      </div>

      <div className="tab-content mt-4 mb-4">
        <div
          className={`${
            activeTab === 1 ? "block" : "hidden"
          } transition-all duration-300`}
        >
          <Tracks />
        </div>
        <div
          className={`${
            activeTab === 2 ? "block" : "hidden"
          } transition-all duration-300`}
        >
          <Artists />
        </div>
        <div
          className={`${
            activeTab === 3 ? "block" : "hidden"
          } transition-all duration-300`}
        >
          <Genres />
        </div>
        <div
          className={`${
            activeTab === 4 ? "block" : "hidden"
          } transition-all duration-300`}
        >
          <Playlists />
        </div>
      </div>
    </div>
  );
};

export default UserStats;
