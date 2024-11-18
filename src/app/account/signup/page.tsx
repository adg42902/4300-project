"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [buttonText, setButtonText] = useState("Sign Up");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signupDisabled = isLoading || !formData.email || !formData.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setButtonText("Signing up...");
    setLoading(true);
    e.preventDefault();
    // Implement Database logic here with post to create new user
    // Dummy data for now

    try {
      const response = await fetch("/api/auth/account/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setButtonText("Sign Up Successful");
        setLoading(false);
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.message || "Sign up failed.");
      }
    } catch (error) {
      setError("Sign Up failed");
    }
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
            <label className="text-right p-1" htmlFor="email">
              Create Username
            </label>
            <input
              className="text-black p-1 border rounded-md transition bg-gray-200 duration-200 ease-in-out focus:bg-white"
              type="email"
              placeholder="email"
              id="email"
              value={formData.email}
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
