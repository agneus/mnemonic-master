"use client";

import { createContext, useContext, useState } from 'react';

// Create context
const LanguageContext = createContext();

// Provider component
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('');
    const [topic, setTopic] = useState('');

    return (
        <LanguageContext.Provider value={{ language, setLanguage, topic, setTopic }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Custom hook to use the context
export function useLanguage() {
    return useContext(LanguageContext);
}
