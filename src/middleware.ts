import { NextRequest, NextResponse } from "next/server";
import { validate_jwt } from "jwt-library";

const secret = "my-secret-key";

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    console.log("No Authorization header");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Invalid token format");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log("Token received in middleware:", token);

  const isValid = await validate_jwt(secret, token);
  console.log("Is token valid in middleware?", isValid);

  if (isValid) {
    return NextResponse.next();
  } else {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: "/api/secure/:path*",
};
