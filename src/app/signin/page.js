"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Redirect to homepage if already signed in
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    if (session) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg">Redirecting to homepage...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
                <button
                    onClick={() => signIn("github")}
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg"
                >
                    Sign in with GitHub
                </button>
            </div>
        </div>
    );
}
