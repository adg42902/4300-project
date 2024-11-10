'use client'

import React from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
        });

        if (response.ok) {
          router.push("/account/login");
          router.refresh();
        }
      } catch (error) {
        console.error("Logout failed: ", error);
      }
    }
  };

  return <button onClick={handleLogout} className="px-3 py-2 bg-gray-600 rounded-lg transition ease-in-out duration-200 hover:scale-105 hover:bg-gray-700 hover:shadow-md">Log Out</button>;
}
