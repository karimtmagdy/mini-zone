import type { UserDto } from "@/contract/user.dto";

export const storageUtils = {
  setToken: (token: string) => localStorage.setItem("token", token),
  setUser: (user: UserDto) =>
    localStorage.setItem("user", JSON.stringify(user)),
  getToken: () => localStorage.getItem("token"),
  getUser: (): UserDto | null => {
    const user = localStorage.getItem("user");
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
      return null;
    }
  },
  removeToken: () => localStorage.removeItem("token"),
  removeUser: () => localStorage.removeItem("user"),
};
