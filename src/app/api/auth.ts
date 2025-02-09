/*
  Fichier: auth.ts
  Description: 
  Ce fichier configure l'authentification via NextAuth.
  Il utilise le PrismaAdapter pour connecter NextAuth à la base de données.
  Un thème personnalisé est défini pour l'interface ainsi qu'un provider GitHub 
  pour permettre l'authentification via le compte GitHub de l'utilisateur. 
  Le callback session enrichit la session avec l'identifiant et l'image de l'utilisateur.
  
  Remarques:
  Vérifiez que les variables d'environnement nécessaires sont correctement
  configurées dans le fichier d'environnement.
*/

import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

 
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [],
// })

export const authOptions: AuthOptions = {
  // Utilise PrismaAdapter pour la connexion à la base de données.
  adapter: PrismaAdapter(prisma),
  // Définition d'un thème personnalisé pour l'interface d'authentification.
  theme: {
    logo: '/images/logo-text.png',
  },
  // Ajoute le provider GitHub pour l'authentification via le compte GitHub de l'utilisateur.
  providers: [
    GithubProvider({
      clientId: env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
  ],
  // Callback pour enrichir la session avec les données utilisateur (id et image).
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.image = user.image;
      return session;
    },
  },
};

export default NextAuth(authOptions);