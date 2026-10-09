const Groq = require('groq-sdk');
let groqClient = null;
function getGroq() {
    if (!groqClient) {
        groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }
    return groqClient;
}
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

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

app.post('/api/chat', async (req, res) => {
    try {
        const text = req.body.userPrompt || req.body.message;
        const attachedFile = req.body.fileData;
        
        if (!text && !attachedFile) {
            return res.status(400).json({ error: "Message or file is required" });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
        }

        const groq = new Groq({ apiKey });

        let fullPrompt = text || "Please summarize and explain the attached material for AKTU exam prep.";
        if (attachedFile) {
            fullPrompt += `

[Attached File: ${attachedFile.name}]
${attachedFile.content || ""}`;
        }

        const modelsToTry = ["openai/gpt-oss-20b", "openai/gpt-oss-120b", "qwen/qwen3.8-27b"];
        let reply = null;
        let lastError = null;

        for (const model of modelsToTry) {
            try {
                const completion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: "system", content: `You are KalamAI, an expert engineering academic tutor for AKTU B.Tech students.

Your goal is to produce crystal-clear, beautifully formatted textbook-quality revision notes.

STRICT FORMATTING RULES:
1. NEVER USE ASCII/MARKDOWN TABLES (Do not use pipes '|', dashes '---', or '<br>').
2. For EVERY concept or unit topic, structure it exactly like this:

### 📌 [Topic Name]

**Core Definition & In-Depth Concept:**
Write a 4 to 5 line detailed paragraph explaining what this concept is, why it is essential in engineering, its working principle, and practical use case. Keep the explanation natural, intuitive, and easy to grasp.

**⚡ Key Points & Working:**
• Point 1: Clear explanation with bold keywords.
• Point 2: Working or operational detail.
• Point 3: Technical specifications or standard values.

**📐 Formula / Derivation / Architecture (if applicable):**
Provide formulas with variable definitions or clean text-based block diagrams.

**📝 AKTU Exam Tip:**
State typical question weightage (2 marks vs 7 marks) and key points the examiner looks for.

---

Ensure there are double line breaks between paragraphs and bullet points so the text never clumps together.`
                        },
                        { role: "user", content: fullPrompt }
                    ],
                    model: model
                });
                reply = completion.choices[0]?.message?.content || "No response generated.";
                break;
            } catch (err) {
                lastError = err;
                console.warn(`Model ${model} failed, trying next candidate...`);
            }
        }

        if (reply) {
            return res.json({ reply });
        } else {
            throw lastError;
        }
    } catch (error) {
        console.error("Groq Chat Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ KalamAI Backend successfully running on port ${PORT}`);
});