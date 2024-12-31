"use client";

import { createContext, useContext, useState } from 'react';

// Create context
const FlashcardContext = createContext();

// Provider component
export function FlashcardProvider({ children }) {
    const [flashcards, setFlashcards] = useState([]);

    return (
        <FlashcardContext.Provider value={{ flashcards, setFlashcards }}>
            {children}
        </FlashcardContext.Provider>
    );
}

// Custom hook to use flashcards
export function useFlashcards() {
    return useContext(FlashcardContext);
}
