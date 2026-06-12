import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide your email and password." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        token: `demo-token-${email}`,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
