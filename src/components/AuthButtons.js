"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
    const { data: session } = useSession();

    return (
        <div>
            {session ? (
                <div className="flex items-center space-x-4">
                    <p>Welcome, {session.user.name}</p>
                    <button
                        onClick={() => signOut()}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => signIn("github")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Sign In
                </button>
            )}
        </div>
    );
}
