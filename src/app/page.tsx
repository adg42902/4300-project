'use client'

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem("connectedToSpotify") === null) {
      localStorage.setItem("connectedToSpotify", "false");
    }
  }, []); 

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Spotify Stats</h1>
        <Link
          href="/account/login"
          className="px-4 py-2 mr-5 border border-green-400 bg-green-400 rounded-lg hover:bg-green-500 transition ease-in-out hover:border-green-500 duration-200 hover:scale-105 hover:shadow-md inline-block"
        >
          Go to Login
        </Link>
        <Link
          href="/account/signup"
          className="px-4 py-2 ml-5 border border-green-400 bg-green-400 rounded-lg hover:bg-green-500 transition ease-in-out hover:border-green-500 duration-200 hover:scale-105 hover:shadow-md inline-block"
        >
          Go to Sign Up
        </Link>
      </div>
    </div>
  );
}
