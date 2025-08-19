import { userService } from "@/src/services/userService";

export async function GET() {
  try {
    const users = await userService.getAllUsers();
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role } = body;
    if (!name || !email || !role) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    const user = await userService.createUser({ name, email, role });
    return Response.json(user, { status: 201 });
  } catch (error: unknown) {
    // @ts-expect-error: Prisma import for error codes
    const { Prisma } = await import('@prisma/client');
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}