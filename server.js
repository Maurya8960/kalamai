const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Login Dummy Route
app.post('/api/auth/login', (req, res) => {
    res.json({ message: "Student logged in!", user: req.body });
});

// Smart AI Notes Generator Route
app.post('/api/generate-notes', async (req, res) => {
    const { topic } = req.body;
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const systemPrompt = `You are an expert academic tutor for B.Tech students. 
        A student has asked about: "${topic}". 
        
        Rule 1: Only provide structured, high-quality study material and notes.
        Rule 2: Strictly format the response with Headings, Bullet Points, and clear paragraphs.
        Rule 3: You MUST include at least one simple "Real-Life Example" to explain the concept.
        Rule 4: If the query is not related to academics, studies, or syllabus, politely refuse.`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ notes: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ notes: "❌ Server Error: Notes generate nahi ho paaye. API key check karo." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AKTU AI Backend running on port ${PORT}`));
