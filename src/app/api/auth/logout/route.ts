import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout successfully" }, {status: 200});

  res.cookies.set("auth", "", { maxAge: 0, path: "/" });

  return res;
}
