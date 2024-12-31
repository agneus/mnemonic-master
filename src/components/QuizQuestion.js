export default function QuizQuestion({ flashcard, answer, setAnswer }) {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Quiz</h1>
            <div className="bg-blue-100 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold">{flashcard?.word}</h2>
                <p className="mt-2 text-gray-600">{flashcard?.mnemonic}</p>
            </div>

            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your Answer"
                className="w-full p-3 border border-gray-300 rounded-lg mb-6"
            />
        </div>
    );
}
