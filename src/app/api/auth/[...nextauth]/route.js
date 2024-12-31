import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: { scope: "read:user user:email" },
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,  // Ensure this exists in Vercel
    pages: {
        signIn: '/signin',  // Optional: Custom sign-in page
    },
    callbacks: {
        async jwt({ token, user }) {
            // Attach user ID on first sign-in
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Attach token ID to session for easy retrieval
            session.user.id = token.id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
