import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import NextAuth from 'next-auth';

// Define session type augmentation
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: string;
            email: string;
            name?: string | null;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                // Mock login for demo if DB fails or user not found
                // In real app, remove this and rely on prisma
                if ((credentials.email === 'admin@system.com' || credentials.email === 'admin@speccon.com') && credentials.password === 'password') {
                    return { id: 'sys-admin', email: credentials.email, role: 'SYSTEM_ADMIN', name: 'System Admin' };
                }
                if (credentials.email === 'user@client.com' && credentials.password === 'password') {
                    return { id: 'client-user', email: 'user@client.com', role: 'ADMIN', name: 'Client User' };
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        include: { role: true },
                    });

                    if (!user || user.password !== credentials.password) { // Ideally hash passwords
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role.name, // Assuming role has name field
                        name: user.name,
                    };
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login', // Custom login page
    },
    session: { strategy: 'jwt' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
