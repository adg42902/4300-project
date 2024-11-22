import React, { useEffect, useState } from "react";
import Card from "../Card";


type Artist = {
  id : string,
  name: string,
  images: { url: string }[];
}

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([]);


  const fetchUserArtists = async () => {
    const response = await fetch("/api/spotifyStats/artists", {
      method: "GET"
    })
    const artists = await response.json();
    setArtists(artists);
  }

  useEffect(() => {
    fetchUserArtists();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {artists.map((artist, index) => (
        <div className="mx-2"key={artist.id}>
        <Card
          number={index + 1}
          title={artist.name}
          imageUrl={artist.images[0]?.url || ""}
        />
        </div>
      ))}
    </div>
  );
}
