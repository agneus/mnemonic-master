"use client";

import { useLanguage } from '../contexts/LanguageContext';
import { useFlashcards } from '../contexts/FlashcardContext';
import { useEffect, useState } from 'react';
import Flashcard from './Flashcard';
import PlaceholderFlashcards from './PlaceholderFlashcards';

export default function FlashcardContainer() {
    const { language, topic } = useLanguage();
    const { flashcards, setFlashcards } = useFlashcards();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlashcards = async () => {
            if (!language || !topic || flashcards.length > 0) {
                setLoading(false);
                return;  // Skip if flashcards already exist
            }

            setLoading(true);
            try {
                const response = await fetch('/api/generateFlashcards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ language, topic })
                });

                if (response.ok) {
                    const data = await response.json();
                    setFlashcards(data);
                } else {
                    console.error("Failed to fetch flashcards.");
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlashcards();
    }, [language, topic]);

    if (loading) {
        return <PlaceholderFlashcards />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((card, index) => (
                <Flashcard key={index} word={card.word} meaning={card.meaning} mnemonic={card.mnemonic} />
            ))}
        </div>
    );
}
