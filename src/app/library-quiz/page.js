"use client";

import { useLibraryFlashcards } from '@/contexts/LibraryFlashcardContext';
import Quiz from '@/components/Quiz';

export default function LibraryQuizPage() {
    const { libraryFlashcards } = useLibraryFlashcards();

    return <Quiz flashcards={libraryFlashcards} />;
}