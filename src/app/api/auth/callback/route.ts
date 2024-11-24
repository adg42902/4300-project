import { NextResponse } from "next/server";
import Cookies from "js-cookie";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const tokenResponse = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI || "",
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenResponse.ok) {
    const accessToken = tokenData.access_token;
    
    const response = NextResponse.redirect("http://localhost:3000/dashboard");
    response.cookies.set("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
    });
    

    return response;
  } else {
    return NextResponse.json({ error: tokenData.error }, { status: 400 });
  }
}
