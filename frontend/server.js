const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();

// Hosting ke liye CORS frontend ke URL ko allow karega
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Temporary DB (Hosting ke time ise MongoDB se replace karenge)
const usersDB = []; 

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    const userExists = usersDB.find(u => u.email === email);
    if (userExists) return res.status(400).json({ success: false, message: '❌ Email already registered. Please Login.' });
    
    usersDB.push({ name, email, password });
    console.log("New User Registered:", email);
    res.json({ success: true, message: '✅ Registration Successful', token: 'kalam-auth-token' });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = usersDB.find(u => u.email === email && u.password === password);
    
    if (user || (email === 'student@aktu.ac.in' && password === 'aktu123')) {
        console.log("User Logged In:", email);
        res.json({ success: true, message: '✅ Login Successful', token: 'kalam-auth-token' });
    } else {
        res.status(401).json({ success: false, message: '❌ Invalid Email or Password.' });
    }
});

app.post('/api/chat', async (req, res) => {
    const { userPrompt } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const systemPrompt = `You are a specialized AKTU Professor. A student asked: "${userPrompt}". Give structured notes with Headings, Bullet Points, and Real-Life Examples.`;
        const result = await model.generateContent(systemPrompt);
        res.json({ reply: (await result.response).text() });
    } catch (error) {
        res.status(500).json({ reply: "❌ Server Error: AI limit ya network issue." });
    }
});

// Live server (jaise Railway) automatically PORT assign karta hai
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ KalamAI Backend running on port ${PORT}`));
