import { userService } from "@/src/services/userService";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userService.getUserById(params.id);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    return Response.json(user, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const user = await userService.updateUser(params.id, body);
    return Response.json(user, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userService.deleteUser(params.id);
    return Response.json(user, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}