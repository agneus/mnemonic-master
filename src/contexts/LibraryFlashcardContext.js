"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const LibraryFlashcardContext = createContext();

// Provider component
export function LibraryFlashcardProvider({ children }) {
    const [libraryFlashcards, setLibraryFlashcards] = useState([]);

    useEffect(() => {
        const fetchLibraryFlashcards = async () => {
            try {
                const res = await fetch('/api/flashcards/list');
                if (res.ok) {
                    const data = await res.json();
                    setLibraryFlashcards(data);
                } else {
                    console.log('Failed to fetch Library flashcards');
                }
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchLibraryFlashcards();
    }, []);

    return (
        <LibraryFlashcardContext.Provider value={{ libraryFlashcards, setLibraryFlashcards }}>
            {children}
        </LibraryFlashcardContext.Provider>
    );
}

// Custom hook to use library flashcards
export function useLibraryFlashcards() {
    return useContext(LibraryFlashcardContext);
}