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
      <button className="w-full py-2 px-4 bg-green-500 text-black rounded hover:bg-green-600 transition duration-200" onClick={handleConnect}>Connect Spotify</button>
    </div>
  );
}
