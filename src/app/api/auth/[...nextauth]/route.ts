import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Senha', type: 'password' } },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          return { id: '1', name: 'Usuário Demo', email: credentials.email };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'demo-secret',
  pages: { signIn: '/login' },
});

export { handler as GET, handler as POST };
