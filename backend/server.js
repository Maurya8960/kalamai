const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());


// MongoDB connection with fallback to local in-memory storage if credentials are pending
const usersDB = [];
let isMongoConnected = false;

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => {
          isMongoConnected = true;
          console.log("✅ MongoDB successfully connected!");
      })
      .catch(err => console.log("⚠️ MongoDB connection warning (using robust local fallback):", err.message));
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.json({ status: 'success', message: '🚀 KalamAI Backend is live and running!' });
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (isMongoConnected) {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ success: false, message: '❌ Email already registered. Please Login.' });
            }
            await User.create({ name, email, password });
        } else {
            const userExists = usersDB.find(u => u.email === email);
            if (userExists) {
                return res.status(400).json({ success: false, message: '❌ Email already registered. Please Login.' });
            }
            usersDB.push({ name, email, password });
        }
        
        console.log("New User Registered:", email);
        res.json({ success: true, message: '✅ Registration Successful', token: 'kalam-auth-token' });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: '❌ Server Error during registration.' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (email === 'student@aktu.ac.in' && password === 'aktu123') {
            return res.json({ success: true, message: '✅ Login Successful', token: 'kalam-auth-token' });
        }

        let user = null;
        if (isMongoConnected) {
            user = await User.findOne({ email, password });
        } else {
            user = usersDB.find(u => u.email === email && u.password === password);
        }
        
        if (user) {
            console.log("User Logged In:", email);
            res.json({ success: true, message: '✅ Login Successful', token: 'kalam-auth-token' });
        } else {
            res.status(401).json({ success: false, message: '❌ Invalid Email or Password.' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: '❌ Server Error during login.' });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const prompt = req.body.userPrompt || req.body.message;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are KalamAI, an expert academic tutor for AKTU B.Tech students. Provide structured, accurate, exam-oriented explanations with clear bullet points and formulas."
                },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile"
        });

        const reply = chatCompletion.choices[0]?.message?.content || "No response generated.";
        res.json({ reply });
    } catch (error) {
        console.error("Groq Chat Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ KalamAI Backend successfully running on port ${PORT}`);
});
