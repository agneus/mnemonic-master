import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function DELETE(req, context) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { id } = await context.params;  // Await the params object

    try {
        // Find the flashcard to ensure it belongs to the user
        const flashcard = await prisma.flashcard.findUnique({
            where: { id },
        });

        if (!flashcard || flashcard.userEmail !== session.user.email) {
            return new Response('Forbidden', { status: 403 });
        }

        // Delete the flashcard
        await prisma.flashcard.delete({
            where: { id },
        });

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error('Failed to delete flashcard:', error);
        return new Response('Failed to delete flashcard', { status: 500 });
    }
}
