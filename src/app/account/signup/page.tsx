"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [buttonText, setButtonText] = useState("Sign Up");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signupDisabled = isLoading || !formData.username || !formData.password;

  let username: string = "";
  let password: string = "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    setButtonText("Signing up...");
    setLoading(true);
    e.preventDefault();
    // Implement Database logic here with post to create new user
    // Dummy data for now
    username = formData.username;
    password = formData.password;
    // Assuming the dummy data is for demonstration purposes and actual database logic will be implemented
    // For demonstration, let's assume the signup is successful
    setButtonText("Sign Up Successful");
    // Route to dashboard view when implemented
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-center text-3xl font-bold my-8">
          Spotify
          <br /> Stats
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full max-w-md pd-8"
        >
          <div className="grid grid-cols-2 gap-4">
            <label className="text-right p-1" htmlFor="username">
              Create Username
            </label>
            <input
              className="text-black p-1 border rounded-md transition bg-gray-200 duration-200 ease-in-out focus:bg-white"
              type="text"
              placeholder="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            ></input>
            <label className="text-right p-1" htmlFor="password">
              Create Password
            </label>
            <input
              className="text-black p-1 border rounded-md transition bg-gray-200 duration-200 ease-in-out focus:bg-white"
              type="password"
              placeholder="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            ></input>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <button
              disabled={signupDisabled}
              className="border rounded-lg py-1 px-4 bg-green-400 border-green-400 
                       transition ease-in-out duration-200 
                       hover:bg-green-500 hover:scale-105 hover:shadow-md 
                       disabled:bg-gray-300 disabled:border-gray-300 
                       disabled:hover:scale-100 disabled:opacity-50 
                       disabled:hover:shadow-none"
              type="submit"
            >
              {buttonText}
            </button>
            <p className="text-sm text-gray-600 italic">
              Password must be 8 characters or longer
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
