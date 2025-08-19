'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.ok) {
      router.push('/');
    } else {
      setErrorMsg('Identifiants invalides');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        <input
          className="w-full mb-4 px-4 py-2 border rounded"
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-6 px-4 py-2 border rounded"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errorMsg && <div className="mb-4 text-red-600 text-center">{errorMsg}</div>}
        <button
          type="submit"
          className="w-full bg-magenta text-white py-2 rounded font-semibold hover:bg-rose-powder transition"
        >Se connecter</button>
      </form>
    </div>
  );
}