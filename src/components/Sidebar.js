"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiBook, FiHome } from 'react-icons/fi';
import { MdOutlineQuiz } from 'react-icons/md';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Sidebar Toggle Button */}
            {!isOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-5 left-5 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg"
                >
                    ☰
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 z-40`}
            >
                <div className="p-6 relative">
                    {/* Close Button */}
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
                        aria-label="Close Menu"
                    >
                        ✕
                    </button>

                    <h2 className="text-3xl font-bold mb-8">Menu</h2>

                    <nav className="space-y-6"> {/* Increased to space-y-12 */}
                        <Link href="/">
                            <div className="flex items-center space-x-3 text-lg cursor-pointer hover:text-blue-500 mb-3">
                                <FiHome size={22} className="w-6 h-6" />
                                <span>Home</span>
                            </div>
                        </Link>

                        <Link href="/library">
                            <div className="flex items-center space-x-3 text-lg cursor-pointer hover:text-blue-500  mb-3">
                                <FiBook size={22} className="w-6 h-6" />
                                <span>Library</span>
                            </div>
                        </Link>

                        <Link href="/quiz">
                            <div className="flex items-center space-x-3 text-lg cursor-pointer hover:text-blue-500  mb-3">
                                <MdOutlineQuiz size={22} className="w-6 h-6" />
                                <span>Start Quiz</span>
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black opacity-30 z-30"
                ></div>
            )}
        </>
    );
}