import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/signin`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    }
                );
                const user = await res.json();
                if (res.ok && user) {
                    return user;
                }
                return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = { ...token, ...user };
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
