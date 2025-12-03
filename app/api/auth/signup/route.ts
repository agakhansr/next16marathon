import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, createUser } from "@/shared/db/users";
import { hashPassword, generateToken } from "@/shared/utils/auth";
import type { SignupRequest, AuthResponse } from "@/features/auth/api/types";

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body: SignupRequest = await request.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user exists
    if (getUserByEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    }

    // Create user
    const user = createUser({
      email,
      password: hashPassword(password),
      name,
    });

    const token = generateToken(user.id);

    return NextResponse.json(
      {
        success: true,
        message: "Signup successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
