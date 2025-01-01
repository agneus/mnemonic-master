"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLibraryFlashcards } from '@/contexts/LibraryFlashcardContext';
import Library from '@/components/Library';

export default function LibraryPage() {
    const { setLibraryFlashcards } = useLibraryFlashcards();
    const router = useRouter();

    useEffect(() => {
        async function fetchFlashcards() {
            const res = await fetch('/api/flashcards/list');
            const data = await res.json();
            setLibraryFlashcards(data);
        }

        fetchFlashcards();
    }, [router]);

    return <Library />;
}