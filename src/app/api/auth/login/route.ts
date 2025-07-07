import { validateUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await request.json();
  const isValidUser: { email: string; password: string } | undefined =
    await validateUser(user);

  if (!isValidUser) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ message: "Successfully login" });
  response.cookies.set("auth", user.email, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}
