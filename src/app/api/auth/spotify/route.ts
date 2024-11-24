import { NextResponse } from "next/server";

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";

export async function GET(req: Request) {
  const authUrl = `${SPOTIFY_AUTH_URL}?client_id=${
    process.env.SPOTIFY_CLIENT_ID
  }&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=user-top-read`;
  return NextResponse.redirect(authUrl);
}
