import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 }
    );
  }
console.log(accessToken);
  const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=25", {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Failed to fetch artists" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data.items);
}
