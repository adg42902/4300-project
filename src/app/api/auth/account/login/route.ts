import bcrypt from "bcrypt";
import Account from "@/models/Account";
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await connectMongoDB();

  const user = await Account.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }



  const response = NextResponse.json({ message: "Login successful" });

  return response;
}
