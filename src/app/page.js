"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFlashcards } from '@/contexts/FlashcardContext';
import FlashcardContainer from '@/components/FlashcardContainer';
import Form from '@/components/Form';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [showFlashcards, setShowFlashcards] = useState(false);
    const { language, topic } = useLanguage();
    const { flashcards } = useFlashcards();
    const router = useRouter();

    useEffect(() => {
        if (language && topic) {
            setShowFlashcards(true);
        }
    }, [language, topic]);

    return (
        <main className="space-y-10 max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center">Flashcard Generator</h1>
            
            {/* Form to Select Language and Topic */}
            <Form />

            {showFlashcards && (
                <div className="space-y-8">
                    <FlashcardContainer />
                    
                    {flashcards.length > 0 && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={() => router.push('/quiz')}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Start Quiz
                            </button>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
