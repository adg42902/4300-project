import React, { useState, useEffect } from "react";

type Artist = {
  genres: string[];
};

export default function Genres() {
  const [genres, setGenres] = useState<string[]>([]);

  const fetchUserArtists = async () => {
    const response = await fetch("/api/spotifyStats/artists", {
      method: "GET",
    });
    const artists: Artist[] = await response.json();

    const allGenres = artists.flatMap((artist) => artist.genres);
    setGenres(allGenres);
  };

  useEffect(() => {
    fetchUserArtists();
  }, []);

  const topGenres = () => {
    const genreCounts: { [key: string]: number } = {};

    genres.forEach((genre) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });

    const sortedGenres = Object.entries(genreCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([genre]) => genre)
      .slice(0, 25);

    return sortedGenres;
  };

  const sortedGenres = topGenres();

  return (
    <div className="grid grid-cols-5 justify-items-center">
      {sortedGenres.map((genre, index) => (
        <h2 className="m-3 border rounded-md p-4" key={genre + index}>
          {index + 1 + ") " + genre}
        </h2>
      ))}
    </div>
  );
}
