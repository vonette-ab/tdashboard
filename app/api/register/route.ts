import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please provide your name, email, and password." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        token: `demo-token-${email}`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
