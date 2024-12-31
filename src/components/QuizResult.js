export default function QuizResult({ score, total, incorrectAnswers, onRestart, onEndQuiz }) {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
            <p className="text-lg">
                Your score: 
                <span className="font-semibold"> {score} / {total}</span>
            </p>

            {incorrectAnswers.length > 0 && (
                <div className="mt-8 text-left">
                    <h2 className="text-2xl font-bold mb-4">Incorrect Answers</h2>
                    <div className="space-y-6">
                        {incorrectAnswers.map((item, index) => (
                            <div key={index} className="bg-red-100 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-semibold">{item.flashcard.word}</h3>
                                <p className="mt-2 text-gray-600">
                                    <strong>Your Answer:</strong> {item.userAnswer || 'N/A'}
                                </p>
                                <p className="mt-1 text-green-700">
                                    <strong>Correct Answer:</strong> {item.flashcard.meaning}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-center space-x-6 mt-10">
                <button
                    onClick={onRestart}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
                >
                    Restart Quiz
                </button>

                <button
                    onClick={onEndQuiz}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg"
                >
                    End Quiz
                </button>
            </div>
        </div>
    );
}
