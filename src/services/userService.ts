import { mockUsers } from "@/src/data/mocks/mockUsers";

// const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userService = {
  async getAllUsers() {
    // const response = await fetch(`${API_URL}/users`);
    // const data = await response.json();
    // return data;
    return mockUsers;
  },

  async getUserById(id: string) {
    // const response = await fetch(`${API_URL}/users/${id}`);
    // const data = await response.json();
    // return data;
    return mockUsers.find(user => user.id === id);
  },
};


