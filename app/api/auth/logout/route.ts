import { NextResponse } from "next/server";

interface LogoutResponse {
  success: boolean;
  message: string;
}

export async function POST(): Promise<NextResponse<LogoutResponse>> {
  return NextResponse.json(
    { success: true, message: "Logout successful" },
    { status: 200 }
  );
}
