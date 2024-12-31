import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { FlashcardProvider } from '@/contexts/FlashcardContext';
import Sidebar from '@/components/Sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SessionWrapper from '@/components/SessionWrapper';
import { LibraryFlashcardProvider } from '@/contexts/LibraryFlashcardContext';


import Link from 'next/link';

export const metadata = {
    title: 'Flashcard App',
    description: 'AI-powered flashcard generator',
};

export default async function RootLayout({ children }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className="bg-gray-100 min-h-screen">
                <LibraryFlashcardProvider>
                    <SessionWrapper>
                        <LanguageProvider>
                            <FlashcardProvider>
                                <Sidebar />
                                <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg relative">
                                    <div className="absolute top-6 right-6 flex items-center space-x-4">
                                        {session ? (
                                            <>
                                                <span className="text-lg">
                                                    Welcome, {session.user.name || 'User'}
                                                </span>
                                                <Link
                                                    href="/api/auth/signout"
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Sign Out
                                                </Link>
                                            </>
                                        ) : (
                                            <Link
                                                href="/api/auth/signin"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Sign In
                                            </Link>
                                        )}
                                    </div>

                                    {children}
                                </div>
                            </FlashcardProvider>
                        </LanguageProvider>
                    </SessionWrapper>
                </LibraryFlashcardProvider>
            </body>
        </html>
    );
}
