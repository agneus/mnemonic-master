"use client";

import { useFlashcards } from '@/contexts/FlashcardContext';
import Quiz from '@/components/Quiz';

export default function QuizPage() {
    const { flashcards } = useFlashcards();

    return <Quiz flashcards={flashcards} />;
}