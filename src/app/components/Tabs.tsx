import React, { useEffect, useState } from "react";
import Artists from "./usersSpotifyStats/Artists";
import Tracks from "./usersSpotifyStats/Tracks";

interface Props {
    handler: (tabId: number, e: React.MouseEvent<HTMLElement>) => void;
}

export default function Tabs({handler}: Props) {
  


  return (
      <div className="flex flex-row justify-evenly p-4 text-l">
        <button
          onClick={(e) => handler(1, e)}
        >
          Tracks
        </button>
        <button
          onClick={(e) => handler(2, e)}
        >
          Artists
        </button>
        <button
          onClick={(e) => handler(3, e)}
        >
          Genres
        </button>
      </div>
  );
};
