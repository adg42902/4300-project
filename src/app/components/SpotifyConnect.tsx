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
      <button onClick={handleConnect}>Connect Spotify</button>
    </div>
  );
}
