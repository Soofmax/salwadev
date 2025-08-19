import { prisma } from "@/src/lib/prisma";
import { User } from "@prisma/client";

export const userService = {
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  },

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async createUser(data: Pick<User, "name" | "email" | "role">): Promise<User> {
    return prisma.user.create({ data });
  },

  async updateUser(id: string, data: Partial<Pick<User, "name" | "email" | "role">>): Promise<User | null> {
    return prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id: string): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  },
};