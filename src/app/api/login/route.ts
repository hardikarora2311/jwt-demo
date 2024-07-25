import { NextResponse } from "next/server";
import { encode_jwt } from "jwt-library";

const secret = "my-secret-key";

export async function POST() {
  const userId = "123";
  const token = await encode_jwt(secret, userId, { username: "example_user" });
  return NextResponse.json({ token });
}
