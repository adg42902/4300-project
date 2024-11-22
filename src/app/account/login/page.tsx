"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [buttonText, setButtonText] = useState("Login");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonText("Logging in...");
    setLoading(true);
    setLoginDisabled(true);

    try {
      const response = await fetch("/api/auth/account/login", {
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
        setButtonText("Login Success");
        sessionStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.message || "Login failed");
        setButtonText("Login");
        setLoginDisabled(false);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setButtonText("Login");
      setLoginDisabled(false);
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
              Login
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
              Password
            </label>
            <input
              className="text-black p-1 border rounded-md transition bg-gray-200 duration-200 ease-in-out focus:bg-white"
              type="password"
              placeholder="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="flex items-center justify-center">
            <button
              disabled={loginDisabled}
              className="border rounded-lg py-1 px-4 bg-green-400 border-green-400 transition ease-in-out duration-200 hover:bg-green-500 hover:scale-105 hover:shadow-md disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:scale-100 disabled:opacity-50 disabled:hover:shadow-none"
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
