// Fichier : app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockUsers } from "@/src/data/mocks/mockUsers";
import { User } from "next-auth"; // Importer le type User pour plus de clarté

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = mockUsers.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        );

        // Si l'utilisateur est trouvé, on retourne l'objet utilisateur complet.
        // NextAuth utilisera cet objet dans le callback 'jwt'.
        if (user) {
          return user; // Retourne l'objet utilisateur complet, pas seulement une partie
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Le callback 'jwt' est appelé en premier. Il reçoit l'objet 'user' du 'authorize'
    // uniquement lors de la première connexion.
    async jwt({ token, user }) {
      // Si 'user' existe, cela signifie que c'est la connexion initiale.
      // On copie toutes les données de l'utilisateur dans le token.
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // On peut aussi passer d'autres propriétés si besoin
        // token.status = user.status; // Exemple
      }
      return token;
    },
    // Le callback 'session' est appelé après 'jwt'. Il reçoit le token
    // et construit l'objet session qui sera visible côté client.
    async session({ session, token }) {
      // On s'assure que session.user existe avant de lui assigner des propriétés
      if (session.user) {
        // On copie les propriétés du token vers l'objet session.user
        // Le type 'Session' que nous avons défini dans 'next-auth.d.ts'
        // nous autorise à faire ces assignations.
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        // session.user.status = token.status; // Exemple
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
});

export { handler as GET, handler as POST };
