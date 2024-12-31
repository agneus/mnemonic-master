import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFlashcards } from '@/contexts/FlashcardContext';

export default function Form() {
    const { setLanguage, setTopic } = useLanguage();
    const {setFlashcards} = useFlashcards();
    const [tentativeLanguage, setTentativeLanguage] = useState('');
    const [tentativeTopic, setTentativeTopic] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tentativeLanguage || !tentativeTopic) {
            alert("Please select a language and enter a topic.");
            return;
        }

        setLanguage(tentativeLanguage);
        setTopic(tentativeTopic);
        setFlashcards([]);  // Clear flashcards to trigger re-fetch
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium">Language:</label>
                <select
                    value={tentativeLanguage}
                    onChange={(e) => setTentativeLanguage(e.target.value)}
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                >
                    <option value="">Select a language</option>
                    <option value="french">French</option>
                    <option value="korean">Korean</option>
                    <option value="japanese">Japanese</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium">Topic:</label>
                <input
                    type="text"
                    value={tentativeTopic}
                    onChange={(e) => setTentativeTopic(e.target.value)}
                    placeholder="e.g., Travel, Food, Greetings"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
            </div>

            <button type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Generate Flashcards
            </button>
        </form>
    );
}
