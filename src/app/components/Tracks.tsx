import React from "react";
import Card from "./Card";

export default function Tracks() {
  const dummyTrackData = [
    {
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273fdf71af87c2a4f3cbed53d65"
    },
    {
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSogdPcrirVwAy0unQVpiKZLE4Kj9F6nrprYw&s",
    },
    {
      title: "Creep",
      artist: "Radiohead",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b2738ec9b518c37636bac3ed0a8c",
    },
    {
      title: "All Along the Watchtower",
      artist: "Jimi Hendrix",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273aa10736c701fdab05d60f64c",
    },
  ];

  return (
    <div className="w-full">
      {dummyTrackData.map((track, index) => (
        <div className=" ">
          <Card
            number={index + 1}
            title={track.title}
            artist={track.artist}
            imageUrl={track.imageUrl}
          />
        </div>
      ))}
    </div>
  );
}
