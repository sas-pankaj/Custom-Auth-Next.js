import path from "path";
import fs from "fs";
import prisma from "./prisma";

type Iuser = {
  Id?: string;
  email: string;
  password: string;
};

const filePath = path.join(process.cwd(), "public", "data", "users.json");

export async function getUsers(): Promise<Iuser[]> {
  // const data = fs.readFileSync(filePath, "utf-8");
  // return JSON.parse(data);
  const users = await prisma.authUsers.findMany();
  return users;
}

export async function saveUsers(user: Iuser) {
  // fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
  await prisma.authUsers.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });
}
