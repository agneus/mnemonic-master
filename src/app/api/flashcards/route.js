import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    let payload;
    try {
        payload = await req.json();
        if (!payload || !payload.word || !payload.meaning) {
            console.error("Invalid request payload:", payload);
            return new Response('Invalid request data', { status: 400 });
        }
    } catch (error) {
        console.error("Failed to parse JSON:", error.stack);  // Log error stack
        return new Response('Invalid JSON format', { status: 400 });
    }

    try {
        const flashcardId = uuidv4();
        console.log("Payload before database insert:", { ...payload, id: flashcardId });

        const flashcard = await prisma.flashcard.create({
            data: {
                id: flashcardId,
                word: payload.word,
                meaning: payload.meaning,
                mnemonic: payload.mnemonic,
                userEmail: session.user.email,
            },
        });

        console.log("Flashcard successfully saved:", flashcard);
        return Response.json(flashcard);
    } catch (error) {
        if (error.code === 'P2002') {
            return new Response('Flashcard already exists', { status: 409 });
        }
        console.error("Database Error:", error.stack);  // Log error stack trace
        return new Response('Failed to save flashcard', { status: 500 });
    }
}
