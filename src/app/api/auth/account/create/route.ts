import bcrypt from "bcrypt";
import Account from "@/models/Account";
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = new Account({
      email,
      password: hashedPassword,
    });

    await newAccount.save();

    return NextResponse.json({ message: "Account created" });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { message: "Email already used" },
      { status: 400 }
    );
  }
}
