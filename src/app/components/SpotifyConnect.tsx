import React from "react";

interface Props {
    handleSpotifyConnectBtn: () => void;
}

export default function SpotifyConnect({ handleSpotifyConnectBtn }: Props) {
  const handleConnect = () => {
    handleSpotifyConnectBtn();
    window.location.href = "/api/auth/spotify";
  };

  return (
    <div>
      <button className="border rounded-lg py-1 px-4 bg-green-400 border-green-400 transition ease-in-out duration-200 hover:bg-green-500 hover:scale-105 hover:shadow-md disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:scale-100 disabled:opacity-50 disabled:hover:shadow-none" onClick={handleConnect}>Connect Spotify</button>
    </div>
  );
}
