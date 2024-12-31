"use client";

import { useState } from 'react';
import { FiBookmark, FiCheckCircle } from 'react-icons/fi';

export default function Flashcard({ word, meaning, mnemonic }) {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [flashcardId, setFlashcardId] = useState(null);  // Track saved flashcard ID

    const handleSaveToggle = async () => {
        setSaving(true);

        if (saved) {
            // Unsave (DELETE) with the stored flashcard ID
            const res = await fetch(`/api/flashcards/${flashcardId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setSaved(false);
                setFlashcardId(null);  // Clear ID after unsaving
            } else {
                alert('Failed to remove flashcard.');
            }
        } else {
            // Save (POST)
            const res = await fetch('/api/flashcards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word, meaning, mnemonic }),
            });

            if (res.ok) {
                const data = await res.json();
                setSaved(true);
                setFlashcardId(data.id);  // Store the flashcard ID from the response
            } else {
                alert('Failed to save flashcard.');
            }
        }

        setSaving(false);
    };

    return (
        <div className="bg-blue-100 p-6 rounded-lg shadow-md relative">
            {/* Toggle Save/Unsave Bookmark */}
            <button
                onClick={handleSaveToggle}
                className="absolute top-4 right-4 text-gray-500 hover:text-green-500"
                disabled={saving}
                aria-label={saved ? "Unsave flashcard" : "Save flashcard"}
            >
                {saved ? (
                    <FiCheckCircle size={24} />
                ) : (
                    <FiBookmark size={24} />
                )}
            </button>

            <h2 className="text-xl font-bold text-center pt-8">{word}</h2>
            <p className="mt-2 text-center">{meaning}</p>
            <p className="mt-2 text-gray-600 text-center">{mnemonic}</p>
        </div>
    );
}
