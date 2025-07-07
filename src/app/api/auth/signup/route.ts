import { getUsers, saveUsers } from "@/lib/fileUtils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const users = await getUsers();

  const userExist = users.find((user) => user.email === email);
  if (userExist) {
    return NextResponse.json(
      { message: "User already exist" },
      { status: 400 }
    );
  }

  const newUser = { email: email as string, password: password as string };
  saveUsers(newUser);
  
  return NextResponse.json(
    { message: "Successfully signed up" },
    { status: 200 }
  );
}
