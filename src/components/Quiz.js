"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';
import QuizControls from '@/components/QuizControls';

export default function Quiz({ flashcards }) {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);

    useEffect(() => {
        if (flashcards.length === 0) {
            router.push('/');
        }
    }, [flashcards]);

    const handleNext = () => {
        const currentCard = flashcards[currentQuestion];

        if (answer.toLowerCase() === currentCard.meaning.toLowerCase()) {
            setScore(score + 1);
        } else {
            setIncorrectAnswers((prev) => [
                ...prev,
                { flashcard: currentCard, userAnswer: answer }
            ]);
        }

        if (currentQuestion < flashcards.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer('');
        } else {
            setQuizComplete(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setIncorrectAnswers([]);
        setQuizComplete(false);
        setAnswer('');
    };

    const handleEndQuiz = () => {
        router.push('/');
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl relative">
                
                <button
                    onClick={handleEndQuiz}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all"
                    aria-label="Quit Quiz"
                >
                    ❌
                </button>

                {quizComplete ? (
                    <QuizResult
                        score={score}
                        total={flashcards.length}
                        incorrectAnswers={incorrectAnswers}
                        onRestart={handleRestart}
                        onEndQuiz={handleEndQuiz}
                    />
                ) : (
                    <>
                        <QuizQuestion
                            flashcard={flashcards[currentQuestion]}
                            answer={answer}
                            setAnswer={setAnswer}
                        />
                        <QuizControls
                            currentQuestion={currentQuestion}
                            totalQuestions={flashcards.length}
                            handleNext={handleNext}
                        />
                    </>
                )}
            </div>
        </main>
    );
}