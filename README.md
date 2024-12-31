# Mnemonic Master

Mnemonic Master is an AI-powered flashcard generator and quiz application. This project allows users to generate vocabulary flashcards with mnemonics, save them to a personal library, and take quizzes to test their knowledge.

## Features

- **Flashcard Generation**: Generate vocabulary flashcards with mnemonics based on selected language and topic.
- **User Authentication**: Sign in with GitHub to save and manage your flashcards.
- **Flashcard Library**: Save generated flashcards to your personal library.
- **Quiz Mode**: Test your knowledge with quizzes based on your saved flashcards.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with GitHub provider
- **AI Integration**: Gemini 1.5 Flash

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- GitHub OAuth app for authentication

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/mnemonic-master.git
   cd mnemonic-master
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=your_postgresql_database_url
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GEMINI_API_KEY=your_google_generative_ai_api_key
   ```

4. Run database migrations:

   ```sh
   npx prisma migrate deploy
   ```

5. Start the development server:

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Project Structure

- [app](http://_vscodecontentref_/0): Contains the main application pages and API routes.
- [components](http://_vscodecontentref_/1): Contains React components used throughout the application.
- [contexts](http://_vscodecontentref_/2): Contains context providers for managing global state.
- [lib](http://_vscodecontentref_/3): Contains utility libraries, including Prisma client.
- [prisma](http://_vscodecontentref_/4): Contains Prisma schema and migration files.
- [public](http://_vscodecontentref_/5): Contains static assets.
- `styles`: Contains global CSS styles.

## Usage

1. **Sign In**: Sign in with your GitHub account.
2. **Generate Flashcards**: Select a language and enter a topic to generate flashcards.
3. **Save Flashcards**: Save generated flashcards to your personal library.
4. **Take a Quiz**: Start a quiz based on your saved flashcards to test your knowledge.
