import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Library from '@/components/Library';
import { useLibraryFlashcards } from '@/contexts/LibraryFlashcardContext';

export default async function LibraryPage() {
    const session = await getServerSession(authOptions);
    const { libraryFlashcards } = useLibraryFlashcards();

    if (!session) {
        redirect('/api/auth/signin');
    }

    return <Library key={libraryFlashcards}/>;
}
