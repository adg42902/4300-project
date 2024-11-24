"use client";

import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Logout() {
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        const response = await fetch("/api/auth/account/logout", {
          method: "POST",
        });

        if (response.ok) {
          Cookies.remove("connectedToSpotify"); 
        }
      } catch (error) {
        console.error("Logout failed: ", error);
      }
    }
  };

  return (
    <Link
      href="/"
      onClick={handleLogout}
      className="px-3 py-2 text-white bg-gray-600 rounded-lg transition ease-in-out duration-200 hover:scale-105 hover:bg-gray-700 hover:shadow-md"
    >
      Log Out
    </Link>
  );
}
