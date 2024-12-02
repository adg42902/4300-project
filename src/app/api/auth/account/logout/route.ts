import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.cookies.set("token", "", { maxAge: 0, path: "/" });
    response.cookies.set("userEmail", "", { maxAge: 0,})
    response.cookies.set("access_token", "", { maxAge: 0,})
    response.cookies.set("isLoggedIn", "", { maxAge: 0,})
    return response;
  } catch (error) {
    console.error("Logout error: ", error);
    return NextResponse.json({
      message: "Error during logout",
      status: 500,
    });
  }
}
