import { getUsers, saveUsers } from "@/lib/fileUtils";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     description: Registers a new user if the email does not already exist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully signed up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully signed up
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 */

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
