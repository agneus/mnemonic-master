import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const flashcards = await prisma.flashcard.findMany({
            where: {
                userEmail: session.user.email,
            },
            orderBy: {
                word: 'asc',
            },
        });

        return Response.json(flashcards);
    } catch (error) {
        console.error("Failed to fetch flashcards:", error);
        return new Response('Failed to fetch flashcards', { status: 500 });
    }
}
