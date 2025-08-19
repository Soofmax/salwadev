import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data, status } = useSession();
  return {
    user: data?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    signIn,
    signOut,
  };
}