import React, { useState } from "react";
import Tracks from "./usersSpotifyStats/Tracks";
import Artists from "./usersSpotifyStats/Artists";

const UserStats = () => {
  const [activeTab, setActiveTab] = useState(1); 

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex space-x-4 items-center justify-center">
        <button
          onClick={() => handleTabClick(1)}
          className={`${
            activeTab === 1 ? "bg-green-500" : "bg-gray-200"
          } px-4 py-2 rounded-md transition ease-in-out duration-200  hover:scale-105 hover:shadow-md`}
        >
          Tracks
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`${
            activeTab === 2 ? "bg-green-500" : "bg-gray-200"
          } px-4 py-2 rounded-md transition ease-in-out duration-200  hover:scale-105 hover:shadow-md`}
        >
          Artists
        </button>
        <button
          onClick={() => handleTabClick(3)}
          className={`${
            activeTab === 3 ? "bg-green-500" : "bg-gray-200"
          } px-4 py-2 rounded-md transition ease-in-out duration-200  hover:scale-105 hover:shadow-md`}
        >
          Genres
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-4">
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
      </div>
    </div>
  );
};

export default UserStats;
