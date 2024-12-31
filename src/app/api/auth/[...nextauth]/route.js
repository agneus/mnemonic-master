import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/signin',  // Optional: Custom sign-in page
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;  // Attach user ID to session
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
