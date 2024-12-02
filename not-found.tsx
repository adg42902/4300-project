"use client";

import { useRouter } from "next/navigation"
import Link from "next/link"
import Cookies from "js-cookie";

export default function NotFound() {

    const connected = Cookies.get("connectedToSpotify") === "true";    let dash = ""
    if (connected) {
        dash = "/dashboard"
    } else {
        dash = "/"
    }
    const router = useRouter();

    return (
        <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/background.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
  
        {/* Overlay Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-8 text-white-400">Sorry this page can not be found</h1>
          <Link
          href="/account/login"
          className="px-4 py-2 mr-5 border border-green-400 bg-green-400 rounded-lg hover:bg-green-500 transition ease-in-out hover:border-green-500 duration-200 hover:scale-105 hover:shadow-md inline-block"
        >
            Login {/* send to login*/}
        </Link>
        <Link
          href={dash}
          className="px-4 py-2 mr-5 border border-green-400 bg-green-400 rounded-lg hover:bg-green-500 transition ease-in-out hover:border-green-500 duration-200 hover:scale-105 hover:shadow-md inline-block"
        >
            Dashboard {/* send to dashboard if logged in */}
        </Link>
        <Link
          href="/"
          className="px-4 py-2 mr-5 border border-green-400 bg-green-400 rounded-lg hover:bg-green-500 transition ease-in-out hover:border-green-500 duration-200 hover:scale-105 hover:shadow-md inline-block"
        >
            Home {/* send to start screen */}
        </Link>
        </div>
      </div>
    )
}