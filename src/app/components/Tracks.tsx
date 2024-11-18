import React, { useEffect, useState } from "react";
import Card from "./Card";

type Track = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
};

export default function Tracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tracksLoaded, setTracksLoaded] = useState(false);

  const fetchUserTracks = async () => {
    const response = await fetch("/api/spotifyStats/tracks", {
      method: "GET",
    });
    const tracks = await response.json();
    setTracks(tracks);
  };

  useEffect(() => {
    fetchUserTracks();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tracks.map((track, index) => (
        <div className="mx-2" key={track.id}>
          <Card
            number={index + 1}
            title={track.name}
            artist={track.artists.map((artist) => artist.name).join(", ")}
            imageUrl={track.album.images[0]?.url || ""}
          />
        </div>
      ))}
    </div>
  );
}
