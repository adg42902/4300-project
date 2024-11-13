import React from "react";

export default function SpotifyConnect() {
  const handleConnect = () => {
    window.location.href = "/api/auth/spotify";
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect Spotify</button>
    </div>
  );
}
