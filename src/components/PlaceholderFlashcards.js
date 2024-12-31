export default function PlaceholderFlashcards() {
    const gibberishWords = Array.from({ length: 10 }, () =>
        Math.random().toString(36).substring(2, 8)
    );

    return (
        <div className="grid grid-cols-2 gap-4">
            {gibberishWords.map((word, index) => (
                <div key={index} className="flashcard bg-gray-300 p-6 rounded-lg animate-pulse">
                    <h2 className="text-lg font-semibold">{word}</h2>
                    <p className="mt-2"><strong>Meaning:</strong> generating... </p>
                    <p className="mt-2 text-gray-500"><strong>Mnemonic:</strong> Loading...</p>
                </div>
            ))}
        </div>
    );
}
