'use client';

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-xl text-charcoal font-bold">Déconnexion...</div>
    </div>
  );
}