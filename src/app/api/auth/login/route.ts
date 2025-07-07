import { validateUser } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and sets an auth cookie if credentials are valid.
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
 *         description: Successfully login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully login
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 */
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
