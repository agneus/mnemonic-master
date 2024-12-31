"use client";

import { useLibraryFlashcards } from '@/contexts/LibraryFlashcardContext';
import { FiX } from 'react-icons/fi';
import Link from 'next/link';

export default function Library() {
    // Use the context hook instead of local fetching
    const { libraryFlashcards, setLibraryFlashcards } = useLibraryFlashcards();

    const handleRemove = async (id) => {
        try {
            const res = await fetch(`/api/flashcards/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setLibraryFlashcards(libraryFlashcards.filter((card) => card.id !== id));
            } else {
                alert('Failed to delete flashcard');
            }
        } catch (error) {
            console.error('Error deleting flashcard:', error);
        }
    };

    // Render
    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold text-center mb-10">Your Flashcard Library</h1>

            {libraryFlashcards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {libraryFlashcards.map((card) => (
                        <div
                            key={card.id}
                            className="p-6 bg-white shadow-lg rounded-lg border relative"
                        >
                            <button
                                onClick={() => handleRemove(card.id)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                aria-label="Remove Flashcard"
                            >
                                <FiX size={22} />
                            </button>
                            <h2 className="text-2xl font-bold">{card.word}</h2>
                            <p className="text-gray-700 mt-2">{card.meaning}</p>
                            {card.mnemonic && (
                                <p className="text-gray-500 mt-2">{card.mnemonic}</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No flashcards saved yet.</p>
            )}

            <div className="text-center mt-10">
                <Link href="/library-quiz">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                        Start Library Quiz
                    </button>
                </Link>
            </div>
        </div>
    );
}