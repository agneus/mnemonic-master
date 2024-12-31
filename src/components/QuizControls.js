export default function QuizControls({ currentQuestion, totalQuestions, handleNext }) {
    return (
        <div className="flex justify-between">
            <p className="text-sm text-gray-500">
                {currentQuestion + 1} of {totalQuestions}
            </p>
            <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
                {currentQuestion === totalQuestions - 1 ? 'Submit' : 'Next'}
            </button>
        </div>
    );
}
