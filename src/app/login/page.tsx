'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import React from "react";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    })
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-center text-3xl font-bold my-8">
          Spotify
          <br /> Stats
        </h1>
       
        <form className="flex flex-col space-y-4 w-full max-w-md pd-8">
          <div className="grid grid-cols-2 gap-4">
            <label className="text-right p-1" htmlFor="username">
              Login
            </label>
            <input
              className="p-1 border rounded-md transition bg-gray-200 duration-200 ease-in-out focus:bg-white"
              type="text"
              placeholder="username"
              id="username"
              required
            ></input>
            <label className="text-right p-1" htmlFor="password">
              Password
            </label>
            <input
              className="p-1 border rounded-md transition bg-gray-200 duration-200 ease-in-out focus:bg-white"
              type="password"
              placeholder="password"
              id="password"
              required
            ></input>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="border rounded-lg py-1 px-4 bg-green-400 border-green-400 transition ease-in-out duration-200 hover:bg-green-500 hover:scale-105 hover:shadow-md"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
