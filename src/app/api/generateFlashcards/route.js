import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const { language, topic } = await req.json();
        console.log("Received POST request - Language:", language, "Topic:", topic);

        if (!language || !topic) {
            console.error("Error: Missing language or topic");
            return Response.json({ error: "Language and topic are required" }, { status: 400 });
        }

        // Craft the prompt
        const prompt = `
        Generate a list of 10 vocabulary flashcards for learning ${language} about ${topic}, with mnemonics.
        The mnemonics should be focused on sound and visual associations. Here is a good example:
        word: '모스크 (moseukeu)',
        meaning: 'Mosque',
        mnemonic: "Think 'mo' like 'more' and 'seu' like 'sue,'  imagine needing more space to sue for peace at a mosque."
        Return results in JSON format with the structure:
        [
            { "word": "Word", "meaning": "Meaning", "mnemonic": "Mnemonic" }
        ]
        `;
        console.log("Generated Prompt:", prompt);

        // Initialize the AI model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        //console.log("Gemini Model Initialized");

        // Call the model to generate content
        const result = await model.generateContent(prompt);
        //console.log("Raw Response from Gemini:", result);

        // Extract text from the response
        const text = result.response.text();
        //console.log("Text Response from Gemini:", text);

        // Clean the response to remove backticks
        const cleanText = text.replace(/```json|```/g, '').trim();
        //console.log("Cleaned Text (for Parsing):", cleanText);

        // Try parsing JSON from response
        try {
            const flashcards = JSON.parse(cleanText);
            //console.log("Parsed Flashcards:", flashcards);
            return Response.json(flashcards);
        } catch (parseError) {
            console.error("JSON Parsing Error:", parseError);
            console.error("Response Text (for Debugging):", cleanText);
            return Response.json({ error: "Failed to parse AI response" }, { status: 500 });
        }
    } catch (error) {
        console.error("AI API Call Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
