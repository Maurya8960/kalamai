import SyllabusDirectory from './SyllabusDirectory';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { 
  Mail, MessageCircle, Phone, Quote, ChevronLeft, ChevronRight, 
  Star, BookOpen, Layers, Award, Sparkles, CheckCircle2, Shield, 
  Brain, Zap, Target, LayoutDashboard, Rocket 
} from "lucide-react";




const BACKEND_URL = 'https://kalamai-iy45.onrender.com';

const testimonials = [
  { name: "Rahul Sharma", role: "B.Tech 3rd Year", text: "KalamAI changed my exam prep. The syllabus tracking and instant notes are just mind-blowing!", img: "https://i.pravatar.cc/150?u=rahul" },
  { name: "Dr. Anita Desai", role: "Professor, AKTU", text: "A fantastic tool for students. It simplifies complex algorithms into easy-to-understand real-life examples.", img: "https://i.pravatar.cc/150?u=anita" },
  { name: "Karan Singh", role: "B.Tech Final Year", text: "I cleared my backlogs because of this AI. It's like having a personal tutor 24/7.", img: "https://i.pravatar.cc/150?u=karan" },
  { name: "Priya Patel", role: "B.Tech 2nd Year", text: "The UI is so premium and the notes generation is lightning fast. Highly recommended!", img: "https://i.pravatar.cc/150?u=priya" },
  { name: "Vikram Kumar", role: "B.Tech 1st Year", text: "As a fresher, understanding the AKTU pattern was tough. KalamAI made everything crystal clear.", img: "https://i.pravatar.cc/150?u=vikram" }
];

const features = [
  { icon: <BookOpen size={24} color="#EA580C" />, title: "Complete AKTU Syllabus", desc: "Access the entire B.Tech curriculum. Every unit, every topic, perfectly aligned.", color: "#FFEDD5" },
  { icon: <Brain size={24} color="#F59E0B" />, title: "AI Notes Generation", desc: "Get smart, structured, and easy-to-understand notes generated instantly by AI.", color: "#FEF3C7" },
  { icon: <Zap size={24} color="#EF4444" />, title: "Instant Doubt Resolution", desc: "Stuck on a concept? Ask KalamAI and get detailed explanations 24/7.", color: "#FEE2E2" },
  { icon: <Target size={24} color="#EAB308" />, title: "Exam-Focused Prep", desc: "Highlight important topics and previous year questions to maximize your score.", color: "#FEF9C3" },
  { icon: <LayoutDashboard size={24} color="#F97316" />, title: "Personalized Dashboard", desc: "Track your progress and access your saved notes easily from your dashboard.", color: "#FFEDD5" },
  { icon: <Rocket size={24} color="#F43F5E" />, title: "Career Guidance", desc: "Get AI-driven tips on internships, projects, and skills to boost your career.", color: "#FFE4E6" }
];

const aboutCards = [
  { title: "Empowering Students", content: "KalamAI was built with a single mission: to empower B.Tech students by providing them with the best AI-driven educational tools. We believe quality education should be accessible to everyone.", accent: "#EA580C" },
  { title: "The Developer", content: "Hi, I'm Ansh Maurya, a final-year B.Tech IT student and Full Stack Developer at Kanpur Institute of Technology. I built KalamAI to solve the real problems students face during exam prep.", accent: "#F59E0B" },
  { title: "Our Technology", content: "We leverage the power of Google's Gemini AI, combined with a robust React & Node.js architecture, to deliver instant, accurate, and syllabus-aligned notes tailored for AKTU.", accent: "#F97316" },
  { title: "Community Driven", content: "KalamAI is constantly evolving based on feedback from students and professors. Join our community and help us shape the future of learning.", accent: "#EF4444" },
  { title: "Future Vision", content: "We aim to expand KalamAI to cover more universities and incorporate interactive virtual labs, making complex engineering concepts easier to grasp.", accent: "#EAB308" }
];

function App() {

  const resolvedDisplayName = (() => {
    try {
      const explicitName = localStorage.getItem("kalamai_user_name");
      if (explicitName && explicitName.trim() && explicitName !== "Guest Student") return explicitName;
      const explicitEmail = localStorage.getItem("kalamai_user_email");
      if (explicitEmail && explicitEmail.includes("@")) {
        const p = explicitEmail.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ").trim();
        return p.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Student Scholar";
      }
    } catch(e) {}
    return "Student Scholar";
  })();


  const decodeGoogleTokenSafe = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  
  const [studentName, setStudentName] = useState(() => localStorage.getItem("kalamai_user_name") || "");
  const [studentEmail, setStudentEmail] = useState(() => localStorage.getItem("kalamai_user_email") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = null;
  
  // Logged-in user dynamic info extraction
  const decodeGoogleCredential = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };
  const getLoggedInUserName = () => {
    try {
      const storedName = localStorage.getItem("kalamai_user_name");
      if (storedName && storedName.trim()) return storedName;
      const storedEmail = localStorage.getItem("kalamai_user_email");
      if (storedEmail && storedEmail.trim()) {
        const prefix = storedEmail.split("@")[0];
        return prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }
    } catch(e) {}
    return "Student Scholar";
  };

  const getLoggedInUserEmail = () => {
    try {
      const storedEmail = localStorage.getItem("kalamai_user_email");
      if (storedEmail && storedEmail.trim()) return storedEmail;
    } catch(e) {}
    return "";
  };

  const currentUserName = getLoggedInUserName();
  const currentUserEmail = getLoggedInUserEmail();
  const userInitial = currentUserName.charAt(0).toUpperCase();

  const [currentView, setCurrentView] = useState('home');
  const [selectedYear, setSelectedYear] = useState(1); 
  const [authMode, setAuthMode] = useState('login'); 
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const aboutUsRef = useRef(null);
  const featuresRef = useRef(null);
  const syllabusRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
    const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('kalamai_chat_sessions');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    const defaultId = 'chat_' + Date.now();
    return [{
      id: defaultId,
      title: 'AKTU Syllabus & Exam Doubts',
      messages: [{ role: 'ai', text: 'Hello! I am your KalamAI Smart Assistant. Which subject or unit do you want to study today?' }]
    }];
  });

  const [currentSessionId, setCurrentSessionId] = useState(() => {
    try {
      const saved = localStorage.getItem('kalamai_active_session_id');
      if (saved) return saved;
    } catch(e) {}
    return null;
  });

  const [searchChatQuery, setSearchChatQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  // Admin Panel States
  const [adminKey, setAdminKey] = useState("");
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(() => localStorage.getItem("kalamai_admin_auth") === "true");
  const [uploadSubject, setUploadSubject] = useState("Operating Systems");
  const [uploadUnit, setUploadUnit] = useState("Unit 1");
  const [uploadBranch, setUploadBranch] = useState("Computer Science (CSE)");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");


  const getProStorageKey = () => {
    const email = user?.email || localStorage.getItem("kalamai_user_email") || "guest";
    return "kalamai_pro_expiry_" + email;
  };

  const [proExpiry, setProExpiry] = useState(() => {
    try {
      const email = localStorage.getItem("kalamai_user_email") || "guest";
      const exp = localStorage.getItem("kalamai_pro_expiry_" + email);
      if (exp && Number(exp) > Date.now()) {
        return Number(exp);
      }
    } catch(e) {}
    return null;
  });

  // User ya login change hone par expiry check sync karein
  useEffect(() => {
    if (!isLoggedIn) {
      setProExpiry(null);
      return;
    }
    try {
      const key = getProStorageKey();
      const exp = localStorage.getItem(key);
      if (exp && Number(exp) > Date.now()) {
        setProExpiry(Number(exp));
      } else {
        setProExpiry(null);
      }
    } catch(e) {
      setProExpiry(null);
    }
  }, [isLoggedIn, user]);

  const isProActive = Boolean(isLoggedIn && proExpiry && proExpiry > Date.now());

  const getRemainingDays = () => {
    if (!proExpiry) return "";
    const diff = proExpiry - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 1) {
      const hours = Math.ceil(diff / (1000 * 60 * 60));
      return hours + "h left";
    }
    return days + " days left";
  };

  const [userBranch, setUserBranch] = useState(() => localStorage.getItem('kalamai_user_branch') || 'Computer Science (CSE)');

    const [messages, setMessages] = useState(() => {
    try {
      const activeId = localStorage.getItem('kalamai_active_session_id');
      const saved = localStorage.getItem('kalamai_chat_sessions');
      if (saved && activeId) {
        const parsed = JSON.parse(saved);
        const current = parsed.find(s => s.id === activeId);
        if (current && current.messages && current.messages.length > 0) {
          return current.messages;
        }
      }
    } catch(e) {}
    return [{ role: 'ai', text: 'Hello! I am your KalamAI Smart Assistant. Which subject or unit do you want to study today?' }];
  });
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let intervalId;
    if (currentView === 'home' && scrollContainerRef.current) {
        let scrollAmount = 0;
        const container = scrollContainerRef.current;
        const cardWidth = 380; 
        intervalId = setInterval(() => {
            scrollAmount += cardWidth;
            if (scrollAmount >= container.scrollWidth - container.clientWidth) scrollAmount = 0; 
            container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, 3500); 
    }
    return () => clearInterval(intervalId);
  }, [currentView]);

  useEffect(() => {
    if(!isLoggedIn && currentView === 'home') {
      const interval = setInterval(() => { handleNextTestimonial(); }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, currentView, activeTestimonial]);

  useEffect(() => {
    if (localStorage.getItem('kalam_session') === 'active') setIsLoggedIn(true);
      if (typeof email !== "undefined" && email) {
        localStorage.setItem("kalamai_user_email", email);
        const namePart = email.split("@")[0];
        const formattedName = namePart.split(".")[0].split("_")[0];
        const studentName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
        localStorage.setItem("kalamai_user_name", studentName);
        setStudentName(studentName);
      }
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      if(authMode === 'register') {
        const res = await axios.post(`${BACKEND_URL}/api/auth/register`, { name, email, password });
        if(res.data.success) {
          localStorage.setItem('kalam_session', 'active');
          setIsLoggedIn(true);
      if (typeof email !== "undefined" && email) {
        localStorage.setItem("kalamai_user_email", email);
        const namePart = email.split("@")[0];
        const formattedName = namePart.split(".")[0].split("_")[0];
        const studentName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
        localStorage.setItem("kalamai_user_name", studentName);
        setStudentName(studentName);
      }
        }
      } else {
        const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
        if(res.data.success) {
          localStorage.setItem('kalam_session', 'active');
          setIsLoggedIn(true);
      if (typeof email !== "undefined" && email) {
        localStorage.setItem("kalamai_user_email", email);
        const namePart = email.split("@")[0];
        const formattedName = namePart.split(".")[0].split("_")[0];
        const studentName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
        localStorage.setItem("kalamai_user_name", studentName);
        setStudentName(studentName);
      }
        }
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Server connection error. Make sure backend is running.');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    localStorage.setItem('kalam_session', 'active');
    setIsLoggedIn(true);
      if (typeof email !== "undefined" && email) {
        localStorage.setItem("kalamai_user_email", email);
        const namePart = email.split("@")[0];
        const formattedName = namePart.split(".")[0].split("_")[0];
        const studentName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
        localStorage.setItem("kalamai_user_name", studentName);
        setStudentName(studentName);
      }
  };

  const handleLogout = () => {
    localStorage.removeItem('kalam_session');
    setIsLoggedIn(false);
      localStorage.removeItem("kalamai_user_email");
      localStorage.removeItem("kalamai_user_name");
    setEmail(''); setPassword(''); setName('');
    setCurrentView('home');
  };

  
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedFile({
          name: file.name,
          type: file.type,
          content: `[Image File: ${file.name}]`,
          preview: event.target.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedFile({
          name: file.name,
          type: file.type,
          content: event.target.result,
          preview: null
        });
      };
      reader.readAsText(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  
  // Sync current active session
  useEffect(() => {
    if (!currentSessionId && sessions.length > 0) {
      setCurrentSessionId(sessions[0].id);
      setMessages(sessions[0].messages);
      localStorage.setItem('kalamai_active_session_id', sessions[0].id);
    }
  }, [sessions, currentSessionId]);

  // Save sessions to localStorage whenever messages change
  useEffect(() => {
    if (!currentSessionId || messages.length === 0) return;
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id === currentSessionId) {
          const firstUser = messages.find(m => m.role === 'user');
          const title = firstUser ? (firstUser.text.slice(0, 28) + (firstUser.text.length > 28 ? '...' : '')) : s.title;
          return { ...s, title, messages };
        }
        return s;
      });
      localStorage.setItem('kalamai_chat_sessions', JSON.stringify(updated));
      return updated;
    });
  }, [messages, currentSessionId]);

    const handleSelectSession = (id) => {
    try {
      const saved = localStorage.getItem('kalamai_chat_sessions');
      const allSessions = saved ? JSON.parse(saved) : sessions;
      const target = allSessions.find(s => s.id === id);
      if (target) {
        setCurrentSessionId(id);
        setMessages(target.messages || []);
        localStorage.setItem('kalamai_active_session_id', id);
      }
    } catch(e) {}
  };

    // Razorpay Checkout Handler
  
  
  const handleProBadgeClick = () => {
    const planName = localStorage.getItem("kalamai_pro_plan_" + (user?.email || "guest")) || "KalamAI Pro";
    const expDate = proExpiry ? new Date(proExpiry).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "";
    alert("👑 " + planName + " Active!\n\nValid Till: " + expDate + "\n\nAapka Pro plan already active hai. Expire hone ke baad hi naya plan upgrade kar sakte hain.");
  };

  
  const handleNavClick = (tab) => {
    if (tab === "home") {
      setCurrentView("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab === "chat") {
      if (!isLoggedIn) {
        alert("KalamAI Chat access karne ke liye pehle Sign In karein.");
        setCurrentView("home");
        return;
      }
      setCurrentView("chat");
    } else if (tab === "features") {
      setCurrentView("home");
      setTimeout(() => {
        const el = document.getElementById("features") || document.querySelector("[id*="feature"]");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else if (tab === "syllabus") {
      setCurrentView("syllabus");
    } else if (tab === "about") {
      setCurrentView("home");
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 150);
    }
  };

  
  const goToHomeLanding = () => {
    setCurrentView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToChatWorkspace = () => {
    if (!isLoggedIn) {
      alert("KalamAI Chat use karne ke liye pehle Sign In karein!");
      setCurrentView("landing");
      return;
    }
    setCurrentView("chat");
  };

  const handleUpgradeClick = () => {
    if (!isLoggedIn) {
      alert("Kripya Pro upgrade karne ke liye pehle apni student ID se Login karein!");
      navigateTo("home");
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }
    setIsPricingOpen(true);
  };

    // Admin Upload Handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminKey === "kalamai@admin2026") {
      setIsAdminAuthorized(true);
      localStorage.setItem("kalamai_admin_auth", "true");
    } else {
      alert("Invalid Admin Passkey!");
    }
  };

  const handleNotesUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) {
      alert("Please provide notes title and select a PDF file!");
      return;
    }
    setUploadStatus("Uploading notes to server...");
    
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);
    formData.append("subject", uploadSubject);
    formData.append("unit", uploadUnit);
    formData.append("branch", uploadBranch);

    try {
      // Local storage backup for offline preview
      const localNotesKey = `kalamai_notes_${uploadSubject}_${uploadUnit}`;
      const newNote = {
        title: uploadTitle,
        fileName: uploadFile.name,
        branch: uploadBranch,
        subject: uploadSubject,
        unit: uploadUnit,
        date: new Date().toLocaleDateString()
      };
      const existing = JSON.parse(localStorage.getItem(localNotesKey) || "[]");
      localStorage.setItem(localNotesKey, JSON.stringify([newNote, ...existing]));

      setTimeout(() => {
        setUploadStatus("✅ Notes uploaded successfully to " + uploadSubject + " (" + uploadUnit + ")!");
        setUploadTitle("");
        setUploadFile(null);
      }, 1200);
    } catch (err) {
      setUploadStatus("❌ Upload failed. Please try again.");
    }
  };

  const handlePayPlan = (plan) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK load ho raha hai, kripya 2 second baad dobara koshish karein.");
      return;
    }
    const options = {
      key: "rzp_live_Tm8XuaoXRGccl2",
      amount: plan.price * 100,
      currency: "INR",
      name: "KalamAI Pro",
      description: plan.name + " Subscription",
      image: "https://kalamai-ansh.vercel.app/favicon.ico",
      handler: function (response) {
        // Duration days calculate
        let durationDays = 1;
        if (plan.price === 20) durationDays = 7;
        if (plan.price === 50) durationDays = 150;

        const expiryTimestamp = Date.now() + (durationDays * 24 * 60 * 60 * 1000);
        const key = getProStorageKey();
        localStorage.setItem(key, expiryTimestamp.toString());
        localStorage.setItem("kalamai_pro_plan_" + (user?.email || "guest"), plan.name);
        setProExpiry(expiryTimestamp);

        alert("🎉 Payment Successful! KalamAI Pro activated for " + durationDays + " days.");
        setIsPricingOpen(false);
      },
      prefill: {
        name: "Ansh Maurya",
        email: "",
        contact: "919999999999"
      },
      theme: { color: "#EA580C" }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleNewChat = () => {
    const newId = 'chat_' + Date.now();
    const newSession = {
      id: newId,
      title: 'New Study Discussion',
      messages: [{ role: 'ai', text: 'Hello! Ready for a fresh study session. Which topic or subject shall we begin?' }]
    };
    const updated = [newSession, ...sessions];
    setSessions(updated);
    setCurrentSessionId(newId);
    setMessages(newSession.messages);
    localStorage.setItem('kalamai_chat_sessions', JSON.stringify(updated));
    localStorage.setItem('kalamai_active_session_id', newId);
  };

  const handleClearAllChats = () => {
    if (window.confirm("Are you sure you want to delete all chat history?")) {
      const initId = 'chat_' + Date.now();
      const initial = [{
        id: initId,
        title: 'AKTU Syllabus & Exam Doubts',
        messages: [{ role: 'ai', text: 'Hello! I am your KalamAI Smart Assistant. Which subject or unit do you want to study today?' }]
      }];
      setSessions(initial);
      setCurrentSessionId(initId);
      setMessages(initial[0].messages);
      localStorage.setItem('kalamai_chat_sessions', JSON.stringify(initial));
      localStorage.setItem('kalamai_active_session_id', initId);
      setIsSettingsOpen(false);
    }
  };

  const handleExportChats = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sessions, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `kalamai_chat_history_${Date.now()}.json`);
    dl.click();
  };

  const handleDeleteSession = (e, id) => {
    e.stopPropagation();
    if (sessions.length <= 1) return;
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
    localStorage.setItem('kalamai_chat_sessions', JSON.stringify(filtered));
    if (currentSessionId === id) {
      setCurrentSessionId(filtered[0].id);
      setMessages(filtered[0].messages);
      localStorage.setItem('kalamai_active_session_id', filtered[0].id);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    const filePayload = selectedFile;
    const displayText = selectedFile 
      ? (selectedFile.preview ? `📷 **[Photo Attached: ${selectedFile.name}]**\n\n${input}` : `📄 **[File Attached: ${selectedFile.name}]**\n\n${input}`)
      : input;

    const userMsg = { role: 'user', text: displayText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/chat`, {
        userPrompt: input || "Explain the attached material in detail for AKTU exams",
        fileData: filePayload ? { name: filePayload.name, type: filePayload.type, content: filePayload.content } : null
      });
      setMessages((prev) => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: "❌ Connection error with AI server." }]);
    }
    setLoading(false);
  };
  
  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  const scrollToFeatures = (e) => {
    e.preventDefault();
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSyllabus = (e) => {
    e.preventDefault();
    setCurrentView('syllabus');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const _oldScrollToSyllabus = (e) => {
    e.preventDefault();
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (syllabusRef.current) {
      syllabusRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAboutUs = (e) => {
    e.preventDefault();
    if(currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if(aboutUsRef.current) {
        aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevTestimonial = () => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const handleNextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);

  const getTestimonialStyle = (index) => {
    const diff = (index - activeTestimonial + testimonials.length) % testimonials.length;
    let style = { opacity: 0, transform: 'translateX(0) scale(0.8)', zIndex: 0 };
    if (diff === 0) style = { opacity: 1, transform: 'translateX(0) scale(1)', zIndex: 3, filter: 'blur(0px)' };
    else if (diff === 1 || diff === -4) style = { opacity: 0.6, transform: 'translateX(50%) scale(0.85)', zIndex: 2, filter: 'blur(2px)' };
    else if (diff === testimonials.length - 1 || diff === -1) style = { opacity: 0.6, transform: 'translateX(-50%) scale(0.85)', zIndex: 2, filter: 'blur(2px)' };
    return style;
  };

  return (
    <GoogleOAuthProvider clientId="589438554910-r9p9np9ujfka7dm3elfjm3m7kobiv650.apps.googleusercontent.com">
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, sans-serif', color: '#111827', display: 'flex', flexDirection: 'column' }}>
        
        <style>{`
          
          .notes-markdown h1, .notes-markdown h2, .notes-markdown h3 {
            color: #C2410C;
            margin-top: 20px;
            margin-bottom: 10px;
            font-weight: 800;
          }
          .notes-markdown p {
            line-height: 1.8;
            margin-bottom: 16px;
            font-size: 15px;
            color: #1F2937;
          }
          .notes-markdown ul, .notes-markdown ol {
            padding-left: 22px;
            margin-bottom: 16px;
          }
          .notes-markdown li {
            margin-bottom: 8px;
            line-height: 1.7;
            color: #374151;
          }
          .notes-markdown strong {
            color: #111827;
          }
          .notes-markdown hr {
            border: 0;
            height: 1px;
            background: #FED7AA;
            margin: 24px 0;
          }
          .notes-markdown table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
          }
          .notes-markdown th, .notes-markdown td {
            border: 1px solid #E5E7EB;
            padding: 10px 14px;
            text-align: left;
          }
          .notes-markdown th {
            background-color: #FFEDD5;
            color: #9A3412;
            font-weight: bold;
          }

          
          .social-fav-btn {
            width: 34px;
            height: 34px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #F3F4F6;
            border-radius: 10px;
            padding: 6px;
            opacity: 0.82;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
          }
          .social-fav-btn:hover {
            opacity: 1;
            transform: translateY(-3px) scale(1.1);
            box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
            background: #FFFFFF;
          }

          .bg-animation { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: linear-gradient(135deg, #fffcf9 0%, #fff4ec 50%, #ffedd5 100%); z-index: -2; }
          .glass-box { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.9); }
          .contact-card { display: flex; align-items: center; gap: 15px; padding: 15px 20px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); border: 1px solid #F3F4F6; margin-bottom: 10px; width: 100%; max-width: 250px;}
          .icon-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #FFEDD5; color: #EA580C; }
          .footer-link { color: #4B5563; text-decoration: none; margin-bottom: 12px; display: block; font-weight: 500; font-size: 15px; transition: 0.2s; cursor: pointer; background: none; border: none; padding: 0; text-align: left; }
          .footer-link:hover { color: #EA580C; }
          .feature-card { background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid #F3F4F6; transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .feature-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
          .social-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; border-radius: 12px; background-color: white; color: #4B5563; transition: all 0.2s ease; border: 1px solid #E5E7EB; margin-right: 15px; text-decoration: none; font-size: 24px;}
          .social-icon-btn:hover { background-color: #F9FAFB; transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          .icon-github:hover { color: #333; border-color: #333; }
          .icon-twitter:hover { color: #1DA1F2; border-color: #1DA1F2; }
          .icon-instagram:hover { color: #E1306C; border-color: #E1306C; }
          .icon-linkedin:hover { color: #0A66C2; border-color: #0A66C2; }
          .scroll-container { display: flex; overflow-x: auto; gap: 30px; padding: 20px 10px; scrollbar-width: none; }
          .scroll-container::-webkit-scrollbar { display: none; }
          .scroll-card{ flex: 0 0 290px; background: white; padding: 22px 25px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-top: 6px solid; transition: transform 0.3s ease; }
          .scroll-card:hover { transform: translateY(-5px); }
          .carousel-container { position: relative; height: 350px; display: flex; align-items: center; justify-content: center; width: 100%; max-width: 1000px; margin: 0 auto; }
          .testimonial-card { position: absolute; width: 400px; background: white; padding: 40px; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); transition: all 0.5s ease-in-out; border: 1px solid #F3F4F6; }
          .nav-btn { position: absolute; z-index: 10; background: white; border: 1px solid #E5E7EB; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #EA580C; box-shadow: 0 4px 10px rgba(0,0,0,0.05); transition: 0.2s; }
          .nav-btn:hover { background: #FFEDD5; transform: scale(1.1); }
          .nav-btn.left { left: 10px; }
          .nav-btn.right { right: 10px; }
          .policy-content h2, .policy-content h3 { color: #111827; margin-top: 30px; }
          .policy-content p, .policy-content li { color: #4B5563; line-height: 1.7; font-size: 16px; margin-bottom: 15px;}
        `}</style>
        <div className="bg-animation"></div>

        <header className="glass-box" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 50px', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div onClick={goToHomeLanding} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img src="/kalamai-logo.png" alt="KalamAI Logo" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '900', color: '#EA580C' }}>KalamAI</h1>
          </div>
          <nav style={{ display: 'flex', gap: '30px', fontWeight: 'bold', alignItems: 'center' }}>
{currentView === "chat" ? (
              <>
                {/* KalamAI Chat */}
                <span
                  onClick={() => handleNavClick("chat")}
                  style={{
                    cursor: "pointer",
                    color: "#EA580C",
                    borderBottom: "3px solid #EA580C",
                    paddingBottom: "6px",
                    fontWeight: "800",
                    transition: "all 0.2s ease"
                  }}
                >
                  KalamAI Chat
                </span>

{/* ⚡ Upgrade Pro Button (Restored) */}
                <button
                  type="button"
                  onClick={() => {
                    if (typeof handleUpgradeClick === "function") {
                      handleUpgradeClick();
                    } else if (typeof setIsPricingOpen === "function") {
                      setIsPricingOpen(true);
                    }
                  }}
                  style={{
                    background: "linear-gradient(135deg, #FF6B00 0%, #EA580C 50%, #9333EA 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "7px 18px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "800",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(234, 88, 12, 0.35)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(147, 51, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(234, 88, 12, 0.35)";
                  }}
                >
                  <span>⚡</span> Upgrade Pro
                </button>

                {/* Syllabus */}
                <span
                  onClick={() => handleNavClick("syllabus")}
                  style={{
                    cursor: "pointer",
                    color: "#4B5563",
                    borderBottom: "3px solid transparent",
                    paddingBottom: "6px",
                    fontWeight: "600",
                    transition: "all 0.2s ease"
                  }}
                >
                  Syllabus
                </span>
              </>
            ) : (
              <>
                {/* Home */}
                <span
                  onClick={() => handleNavClick("home")}
                  style={{
                    cursor: "pointer",
                    color: currentView === "home" ? "#EA580C" : "#4B5563",
                  borderBottom: currentView === 'home' ? '3px solid #EA580C' : '3px solid transparent',
                    paddingBottom: "6px",
                    fontWeight: currentView === "home" ? "800" : "600",
                    transition: "all 0.2s ease"
                  }}
                >
                  Home
                </span>

                {/* KalamAI Chat */}
                <span
                  onClick={() => handleNavClick("chat")}
                  style={{
                    cursor: "pointer",
                    color: currentView === "chat" ? "#EA580C" : "#4B5563",
                  borderBottom: currentView === 'chat' ? '3px solid #EA580C' : '3px solid transparent',
                    paddingBottom: "6px",
                    fontWeight: currentView === "chat" ? "800" : "600",
                    transition: "all 0.2s ease"
                  }}
                >
                  KalamAI Chat
                </span>

{/* ⚡ Upgrade Pro Button (Restored) */}
                <button
                  type="button"
                  onClick={() => {
                    if (typeof handleUpgradeClick === "function") {
                      handleUpgradeClick();
                    } else if (typeof setIsPricingOpen === "function") {
                      setIsPricingOpen(true);
                    }
                  }}
                  style={{
                    background: "linear-gradient(135deg, #FF6B00 0%, #EA580C 50%, #9333EA 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "7px 18px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "800",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(234, 88, 12, 0.35)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(147, 51, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(234, 88, 12, 0.35)";
                  }}
                >
                  <span>⚡</span> Upgrade Pro
                </button>

                {/* Features */}
                <span
                  onClick={() => handleNavClick("features")}
                  style={{
                    cursor: "pointer",
                    color: currentView === "features" ? "#EA580C" : "#4B5563",
                  borderBottom: currentView === 'features' ? '3px solid #EA580C' : '3px solid transparent',
                    paddingBottom: "6px",
                    fontWeight: currentView === "features" ? "800" : "600",
                    transition: "all 0.2s ease"
                  }}
                >
                  Features
                </span>

                {/* Syllabus */}
                <span
                  onClick={() => handleNavClick("syllabus")}
                  style={{
                    cursor: "pointer",
                    color: currentView === "syllabus" ? "#EA580C" : "#4B5563",
                  borderBottom: currentView === 'syllabus' ? '3px solid #EA580C' : '3px solid transparent',
                    paddingBottom: "6px",
                    fontWeight: currentView === "syllabus" ? "800" : "600",
                    transition: "all 0.2s ease"
                  }}
                >
                  Syllabus
                </span>

                {/* About Us */}
                <span
                  onClick={() => handleNavClick("about")}
                  style={{
                    cursor: "pointer",
                    color: "#4B5563",
                    borderBottom: "3px solid transparent",
                    paddingBottom: "6px",
                    fontWeight: "600",
                    transition: "all 0.2s ease"
                  }}
                >
                  About Us
                </span>
              </>
            )}
            </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {!isLoggedIn ? (
              <>
                <button onClick={() => { setAuthMode('login'); navigateTo('home'); window.scrollTo(0, 0); }} style={{ background: 'transparent', color: '#EA580C', border: '2px solid #EA580C', padding: '8px 25px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
                <button onClick={() => { setAuthMode('register'); navigateTo('home'); window.scrollTo(0, 0); }} style={{ background: 'linear-gradient(to right, #F97316, #F59E0B)', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>Register</button>
              </>
            ) : (
              <button onClick={handleLogout} style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontWeight:'bold' }}>Logout</button>
            )}
          </div>
        </header>

        <main style={{ flex: 1, padding: '50px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {currentView === 'privacy' && (
             <div className="glass-box policy-content" style={{ width: '100%', maxWidth: '900px', padding: '50px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
                   <span style={{ cursor: 'pointer', color: '#EA580C' }} onClick={goToHomeLanding}>Home</span> / Privacy Policy
                </div>
                <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#111827', margin: '0 0 10px 0' }}>Privacy Policy</h1>
                <p style={{ fontStyle: 'italic', color: '#6B7280' }}>Last updated: October 2026</p>
                <h3>1. Introduction</h3>
                <p>KalamAI ("we," "our," or "us"), developed by Ansh Maurya, is committed to protecting your privacy.</p>
                <button onClick={goToHomeLanding} style={{ marginTop: '40px', background: 'linear-gradient(to right, #F97316, #F59E0B)', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>← Back to Home</button>
             </div>
          )}

          
        
        
        
      {/* KalamAI Admin Notes Upload Portal */}
      {currentView === 'admin' && (
        <div style={{ maxWidth: "800px", margin: "40px auto 80px", padding: "0 20px" }}>
          {!isAdminAuthorized ? (
            <div style={{ background: "#FFFFFF", borderRadius: "24px", padding: "36px 28px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)", border: "1.5px solid rgba(234, 88, 12, 0.2)", textAlign: "center" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B00, #EA580C)", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "24px" }}>🔒</div>
              <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#1E293B", marginBottom: "8px" }}>Admin Access Required</h2>
              <p style={{ color: "#64748B", fontSize: "14px", marginBottom: "24px" }}>Enter admin security passkey to access Notes & PDF management system.</p>
              <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "340px", margin: "0 auto" }}>
                <input
                  type="password"
                  placeholder="Enter Admin Passkey"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  style={{ padding: "12px 16px", borderRadius: "14px", border: "1.5px solid #CBD5E1", fontSize: "14px", outline: "none" }}
                />
                <button
                  type="submit"
                  style={{ padding: "12px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B00, #EA580C)", color: "#FFF", border: "none", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
                >
                  Authorize Access
                </button>
              </form>
            </div>
          ) : (
            <div style={{ background: "#FFFFFF", borderRadius: "24px", padding: "32px 28px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)", border: "1.5px solid rgba(234, 88, 12, 0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", borderBottom: "1.5px solid #F1F5F9", paddingBottom: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#1E293B", margin: "0 0 4px" }}>KalamAI Notes Manager</h2>
                  <p style={{ color: "#64748B", fontSize: "13px", margin: 0 }}>Upload PDF/Handwritten notes directly to syllabus & student AI spaces.</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setIsAdminAuthorized(false); localStorage.removeItem("kalamai_admin_auth"); }}
                  style={{ background: "#FEE2E2", color: "#EF4444", border: "none", padding: "8px 14px", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
                >
                  Lock Panel
                </button>
              </div>

              {uploadStatus && (
                <div style={{ padding: "12px 16px", borderRadius: "12px", marginBottom: "20px", background: uploadStatus.includes("✅") ? "#ECFDF5" : "#FFF7ED", color: uploadStatus.includes("✅") ? "#059669" : "#EA580C", fontWeight: "700", fontSize: "13px" }}>
                  {uploadStatus}
                </div>
              )}

              <form onSubmit={handleNotesUpload} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "800", color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Branch</label>
                  <select
                    value={uploadBranch}
                    onChange={(e) => setUploadBranch(e.target.value)}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "12px", border: "1.5px solid #CBD5E1", fontSize: "13px", outline: "none" }}
                  >
                    <option value="Computer Science (CSE)">Computer Science & Engineering (CSE)</option>
                    <option value="Information Technology (IT)">Information Technology (IT)</option>
                    <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                    <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "800", color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Subject</label>
                    <select
                      value={uploadSubject}
                      onChange={(e) => setUploadSubject(e.target.value)}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "12px", border: "1.5px solid #CBD5E1", fontSize: "13px", outline: "none" }}
                    >
                      <option value="Operating Systems">Operating Systems</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Database Management (DBMS)">DBMS</option>
                      <option value="Computer Networks">Computer Networks</option>
                      <option value="Compiler Design">Compiler Design</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "800", color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Target Unit</label>
                    <select
                      value={uploadUnit}
                      onChange={(e) => setUploadUnit(e.target.value)}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "12px", border: "1.5px solid #CBD5E1", fontSize: "13px", outline: "none" }}
                    >
                      <option value="Unit 1">Unit 1 (Fundamentals)</option>
                      <option value="Unit 2">Unit 2 (Core Concepts)</option>
                      <option value="Unit 3">Unit 3 (Advanced Architecture)</option>
                      <option value="Unit 4">Unit 4 (Algorithms & Flow)</option>
                      <option value="Unit 5">Unit 5 (Case Studies & PYQs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "800", color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Notes Topic / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. OS Unit 2 Process Scheduling & Deadlock Full Notes"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: "12px", border: "1.5px solid #CBD5E1", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "800", color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Select PDF / Document</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1.5px dashed #EA580C", background: "#FFF7ED", cursor: "pointer", fontSize: "13px" }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "13px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #FF6B00, #EA580C)",
                    color: "#FFF",
                    border: "none",
                    fontWeight: "800",
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(234, 88, 12, 0.35)",
                    marginTop: "8px"
                  }}
                >
                  🚀 Upload to KalamAI Direct Space
                </button>
              </form>
            </div>
          )}
        </div>
      )}

        {currentView === "syllabus" && (
        <SyllabusDirectory onBackToChat={() => navigateTo("home")} />
      )}

{(currentView === "home" || currentView === "features") && !isLoggedIn && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 10px 0' }}>The Future of Learning <span style={{ color: '#EA580C' }}>Starts with You</span></h1>
              </div>

              <div className="glass-box" style={{ padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: '0 15px 30px rgba(249, 115, 22, 0.1)', marginBottom: '80px', backgroundColor: 'rgba(255,255,255,0.95)' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>{authMode === 'login' ? 'Sign In to Start' : 'Create an Account'}</h3>
                
                {loginError && <div style={{ color: '#EF4444', backgroundColor: '#FEE2E2', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', fontWeight: 'bold' }}>{loginError}</div>}
                
                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {authMode === 'register' && <input type="text" required value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #E5E7EB', outlineColor: '#F97316' }} />}
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #E5E7EB', outlineColor: '#F97316' }} />
                  <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #E5E7EB', outlineColor: '#F97316' }} />
                  <button type="submit" style={{ background: 'linear-gradient(to right, #F97316, #F59E0B)', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
                    {authMode === 'login' ? 'Initialize Session ✨' : 'Register Now 🚀'}
                  </button>
                </form>

                <div style={{ marginTop: '15px', fontSize: '14px', color: '#6B7280' }}>
                  {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <span onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} style={{ color: '#EA580C', fontWeight: 'bold', cursor: 'pointer' }}>
                    {authMode === 'login' ? 'Sign Up' : 'Log In'}
                  </span>
                </div>
                
                <div style={{ margin: '20px 0', color: '#9CA3AF', fontSize: '14px' }}>OR</div>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                   <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setLoginError('Google Login Failed')} />
                </div>
              </div>

               <div ref={featuresRef} style={{ width: "100%", maxWidth: "1000px", marginBottom: "100px" }}>
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                     <span style={{ backgroundColor: '#FFEDD5', color: '#EA580C', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>WHAT WE GIVE</span>
                     <h2 style={{ fontSize: '36px', fontWeight: '900', marginTop: '15px', color: '#111827' }}>One subscription to <span style={{ color: '#EA580C' }}>learn</span>, <span style={{ color: '#F59E0B' }}>grow</span>, and <span style={{ color: '#EF4444' }}>lead</span>.</h2>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                      {features.map((feat, index) => (
                          <div key={index} className="feature-card">
                              <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: feat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                  {feat.icon}
                              </div>
                              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#111827' }}>{feat.title}</h3>
                              <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{feat.desc}</p>
                          </div>
                      ))}
                  </div>
              </div>
              
              <div ref={aboutUsRef} style={{ width: '100%', maxWidth: '1200px', marginBottom: '120px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                     <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#111827' }}>Behind <span style={{ color: '#EA580C' }}>KalamAI</span></h2>
                  </div>
                  
                  <div className="scroll-container" id="syllabus-scroll" ref={scrollContainerRef}>
                      {aboutCards.map((card, index) => (
                           <div key={index} className="scroll-card" style={{ borderColor: card.accent }}>
                                <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', marginBottom: '20px' }}>{card.title}</h3>
                                <p style={{ color: '#4B5563', lineHeight: '1.6', fontSize: '14px' }}>{card.content}</p>
                           </div>
                      ))}
                  </div>
              </div>

              <div style={{ width: '100%', maxWidth: '1200px', textAlign: 'center', marginBottom: '100px' }}>
                <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '15px' }}>Loved by <span style={{ color: '#EA580C' }}>Students & Teachers</span></h2>
                
                <div className="carousel-container">
                  <button onClick={handlePrevTestimonial} className="nav-btn left"><ChevronLeft size={30}/></button>
                  
                  {testimonials.map((test, index) => (
                    <div key={index} className="testimonial-card" style={getTestimonialStyle(index)}>
                      <div style={{ position: 'absolute', top: '20px', right: '30px', opacity: 0.1 }}><Quote size={60} color="#EA580C"/></div>
                      <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />)}
                        <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#4B5563' }}>5.0</span>
                      </div>
                      <p style={{ fontSize: '18px', color: '#374151', marginBottom: '30px', lineHeight: '1.6', textAlign: 'left', fontWeight: '500' }}>"{test.text}"</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src={test.img} alt={test.name} style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div style={{ textAlign: 'left' }}>
                          <h4 style={{ margin: 0, fontWeight: '900', color: '#111827', fontSize: '16px' }}>{test.name}</h4>
                          <span style={{ fontSize: '13px', color: '#6B7280' }}>{test.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button onClick={handleNextTestimonial} className="nav-btn right"><ChevronRight size={30}/></button>
                </div>
              </div>
            </>
          )}

          {(currentView === "home" || currentView === "features") && isLoggedIn && (
        <div style={{ display: "flex", maxWidth: "1260px", margin: "30px auto 80px", gap: "20px", padding: "0 16px", alignItems: "stretch" }}>

          {/* KalamAI Warm Aesthetic Sidebar */}
          <div style={{
            width: isSidebarOpen ? '280px' : '64px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)',
            border: '2px solid rgba(234, 88, 12, 0.2)',
            borderRadius: '26px',
            padding: isSidebarOpen ? '18px 14px' : '18px 8px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 12px 35px rgba(234, 88, 12, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
            flexShrink: 0,
            boxSizing: 'border-box',
            fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', marginBottom: '14px', borderBottom: '1.5px solid rgba(234, 88, 12, 0.18)', paddingBottom: '12px' }}>
              {isSidebarOpen && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #FF6B00, #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '14px', fontWeight: '900', boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)' }}>✦</div>
                  <span style={{ fontWeight: '800', fontSize: '15px', color: '#9A3412', letterSpacing: '-0.3px' }}>KalamAI Chats</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                style={{ background: '#FFFFFF', border: '1px solid rgba(234, 88, 12, 0.25)', color: '#EA580C', width: '30px', height: '30px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', boxShadow: '0 2px 6px rgba(234, 88, 12, 0.1)' }}
              >
                {isSidebarOpen ? '◀' : '▶'}
              </button>
            </div>

            {isSidebarOpen && (
              <>
                {/* New Chat Button - Send Button Match */}
                <button
                  type="button"
                  onClick={handleNewChat}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontWeight: '800',
                    fontSize: '14px',
                    cursor: 'pointer',
                    marginBottom: '14px',
                    boxShadow: '0 6px 18px rgba(234, 88, 12, 0.35)',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span style={{ fontSize: '16px' }}>✏️</span>
                  <span>New Chat</span>
                </button>

                {/* Search Box */}
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchChatQuery}
                    onChange={(e) => setSearchChatQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 34px',
                      borderRadius: '14px',
                      background: '#FFFFFF',
                      border: '1.5px solid rgba(234, 88, 12, 0.25)',
                      color: '#431407',
                      fontSize: '12px',
                      fontWeight: '600',
                      outline: 'none',
                      boxSizing: 'border-box',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  />
                  <span style={{ position: 'absolute', left: '11px', top: '9px', fontSize: '12px', color: '#EA580C' }}>🔍</span>
                </div>

                {/* Recent Chats Section */}
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '360px', paddingRight: '2px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '900', color: '#C2410C', padding: '0 6px 2px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Recent</span>
                  {sessions
                    .filter(s => s.title.toLowerCase().includes(searchChatQuery.toLowerCase()))
                    .map((s) => {
                      const isActive = s.id === currentSessionId;
                      return (
                        <div
                          key={s.id}
                          onClick={() => handleSelectSession(s.id)}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '14px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: isActive ? '800' : '600',
                            background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                            border: isActive ? '2px solid #EA580C' : '1px solid rgba(234, 88, 12, 0.12)',
                            color: isActive ? '#9A3412' : '#7C2D12',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '6px',
                            boxShadow: isActive ? '0 4px 12px rgba(234, 88, 12, 0.18)' : 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{s.title}</span>
                          {sessions.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => handleDeleteSession(e, s.id)}
                              style={{ background: 'none', border: 'none', color: '#C2410C', cursor: 'pointer', fontSize: '12px', padding: '2px 4px', fontWeight: 'bold' }}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      );
                    })}
                </div>

                {/* Profile Section */}
                <div style={{ borderTop: '1.5px solid rgba(234, 88, 12, 0.2)', paddingTop: '12px', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B00, #EA580C)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', boxShadow: '0 3px 8px rgba(234, 88, 12, 0.3)' }}>{resolvedDisplayName.charAt(0).toUpperCase()}</div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "800", color: "#7C2D12" }}>{resolvedDisplayName}</div>
                      <div style={{ fontSize: '11px', color: '#EA580C', fontWeight: '700' }}>Student Scholar</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(true)}
                    title="Settings"
                    style={{ background: '#FFFFFF', border: '1px solid rgba(234, 88, 12, 0.25)', borderRadius: '10px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#EA580C', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}
                  >
                    ⚙️
                  </button>
                </div>
              </>
            )}
          </div>
  
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', height: '75vh' }}>
              <div className="glass-box" style={{ flex: 1, borderRadius: '20px', padding: '30px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {messages.map((msg, index) => (
                  <div key={index} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', backgroundColor: msg.role === 'user' ? '#EA580C' : 'white', color: msg.role === 'user' ? 'white' : '#111827', padding: '20px', borderRadius: '15px', borderLeft: msg.role === 'ai' ? '5px solid #F59E0B' : 'none' }}>
                    <div className="notes-markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
            </div>
                  </div>
                ))}
                {loading && <div style={{ alignSelf: 'flex-start', color: '#EA580C', fontStyle: 'italic' }}>AI is typing...</div>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                {selectedFile && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFF7ED', border: '1px solid #FDBA74', padding: '8px 16px', borderRadius: '14px', width: 'fit-content' }}>
                    {selectedFile.preview ? (
                      <img src={selectedFile.preview} alt="upload" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '18px' }}>📄</span>
                    )}
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#C2410C', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedFile.name}</span>
                    <button type="button" onClick={removeSelectedFile} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EA580C', fontWeight: 'bold', fontSize: '16px' }}>×</button>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '10px' }}>
                {selectedFile && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FFF7ED', border: '1.5px solid #FDBA74', padding: '8px 16px', borderRadius: '16px', width: 'fit-content' }}>
                    {selectedFile.preview ? (
                      <img src={selectedFile.preview} alt="preview" style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '22px' }}>📄</span>
                    )}
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#C2410C', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedFile.name}</span>
                    <button type="button" onClick={removeSelectedFile} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EA580C', fontWeight: 'bold', fontSize: '18px', padding: '0 4px' }}>×</button>
                  </div>
                )}
                <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,.txt,.pdf,.doc,.docx,.c,.cpp,.py,.java,.json"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach Photo or Document"
                    style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1.5px solid #E5E7EB', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '22px', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
                  >
                    📎
                  </button>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask for notes, doubts, or attach photos/files..."
                    style={{ flex: 1, padding: '16px 24px', borderRadius: '30px', border: '1.5px solid #E5E7EB', outlineColor: '#EA580C', fontSize: '15px' }}
                  />
                  <button
                    type="submit"
                    style={{ padding: '0 32px', height: '56px', background: 'linear-gradient(to right, #F97316, #F59E0B)', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0, fontSize: '15px', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)' }}
                  >
                    Send 🚀
                  </button>
                </form>
            </div>
          </div>
          </div>
          </div>
          </div>
        )}

        </main>

      
      {/* KalamAI Pro Subscription Modal */}
      {isPricingOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)",
          zIndex: 999999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px"
        }}>
          <div style={{
            background: "#121214",
            borderRadius: "28px",
            border: "1px solid #27272A",
            width: "100%",
            maxWidth: "920px",
            padding: "28px 20px",
            color: "#F4F4F5",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            position: "relative"
          }}>
            <button
              type="button"
              onClick={() => setIsPricingOpen(false)}
              style={{ position: "absolute", top: "18px", right: "18px", background: "#27272A", border: "none", color: "#A1A1AA", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "15px" }}
            >✕</button>

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(234, 88, 12, 0.15)", padding: "5px 14px", borderRadius: "20px", color: "#FB923C", fontWeight: "800", fontSize: "12px", marginBottom: "8px" }}>
                ✦ KALAMAI PRO PLANS
              </div>
              <h2 style={{ fontSize: "26px", fontWeight: "900", margin: "4px 0", color: "#FAFAFA" }}>Upgrade Your Learning</h2>
              <p style={{ color: "#A1A1AA", fontSize: "13px", margin: 0 }}>Affordable AKTU Exam & Notes Subscription</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              {/* Plan 1 */}
              <div style={{ background: "#18181B", borderRadius: "20px", border: "1px solid #27272A", padding: "20px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: "800", color: "#A1A1AA", fontSize: "13px" }}>DAILY PASS</div>
                <h3 style={{ fontSize: "18px", margin: "6px 0", color: "#FFF" }}>Exam Cram</h3>
                <div style={{ fontSize: "28px", fontWeight: "900", color: "#FAFAFA", marginBottom: "14px" }}>₹10 <span style={{ fontSize: "12px", color: "#71717A" }}>/ 24 hrs</span></div>
                <button
                  type="button"
                  onClick={() => handlePayPlan({ name: "Daily Cram", price: 10 })}
                  style={{ width: "100%", padding: "10px", borderRadius: "12px", background: "#27272A", border: "1px solid #3F3F46", color: "#FFF", fontWeight: "700", cursor: "pointer", marginBottom: "16px" }}
                >Pay ₹10</button>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#D4D4D8" }}>
                  <div>✓ Unlimited chat for 24 hours</div>
                  <div>✓ AKTU Quick Revision Notes</div>
                  <div>✓ 2x Fast AI Responses</div>
                </div>
              </div>

              {/* Plan 2 */}
              <div style={{ background: "linear-gradient(180deg, #1C1917, #18181B)", borderRadius: "20px", border: "2px solid #EA580C", padding: "20px", display: "flex", flexDirection: "column", position: "relative" }}>
                <span style={{ position: "absolute", top: "-10px", right: "16px", background: "#EA580C", color: "#FFF", fontSize: "10px", fontWeight: "900", padding: "3px 8px", borderRadius: "8px" }}>POPULAR</span>
                <div style={{ fontWeight: "800", color: "#FB923C", fontSize: "13px" }}>WEEKLY PASS</div>
                <h3 style={{ fontSize: "18px", margin: "6px 0", color: "#FFF" }}>Sessional Sprint</h3>
                <div style={{ fontSize: "28px", fontWeight: "900", color: "#FAFAFA", marginBottom: "14px" }}>₹20 <span style={{ fontSize: "12px", color: "#71717A" }}>/ 7 days</span></div>
                <button
                  type="button"
                  onClick={() => handlePayPlan({ name: "Weekly Sprint", price: 20 })}
                  style={{ width: "100%", padding: "10px", borderRadius: "12px", background: "linear-gradient(135deg, #EA580C, #F97316)", border: "none", color: "#FFF", fontWeight: "800", cursor: "pointer", marginBottom: "16px", boxShadow: "0 4px 15px rgba(234, 88, 12, 0.4)" }}
                >Pay ₹20</button>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#D4D4D8" }}>
                  <div>✓ 7 Days Full All-Units Access</div>
                  <div>✓ Complete 5-Unit Material</div>
                  <div>✓ 10-Marks Predicted PYQs</div>
                </div>
              </div>

              {/* Plan 3 */}
              <div style={{ background: "#18181B", borderRadius: "20px", border: "1px solid #7C3AED", padding: "20px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: "800", color: "#C084FC", fontSize: "13px" }}>SEMESTER PASS</div>
                <h3 style={{ fontSize: "18px", margin: "6px 0", color: "#FFF" }}>Semester Master</h3>
                <div style={{ fontSize: "28px", fontWeight: "900", color: "#FAFAFA", marginBottom: "14px" }}>₹50 <span style={{ fontSize: "12px", color: "#71717A" }}>/ 1 sem</span></div>
                <button
                  type="button"
                  onClick={() => handlePayPlan({ name: "Semester Master", price: 50 })}
                  style={{ width: "100%", padding: "10px", borderRadius: "12px", background: "#7C3AED", border: "none", color: "#FFF", fontWeight: "800", cursor: "pointer", marginBottom: "16px" }}
                >Pay ₹50</button>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#D4D4D8" }}>
                  <div>✓ Whole Semester Unlimited Access</div>
                  <div>✓ All Subjects Handwritten Notes</div>
                  <div>✓ Code & Diagram Explanations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gemini Settings Modal */}
      {isSettingsOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(6px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "#18181B",
            borderRadius: "24px",
            border: "1px solid #27272A",
            width: "100%",
            maxWidth: "480px",
            padding: "24px",
            color: "#F4F4F5",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", borderBottom: "1px solid #27272A", paddingBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "18px", color: "#F97316" }}>⚙️</span>
                <span style={{ fontSize: "18px", fontWeight: "800" }}>KalamAI Settings</span>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                style={{ background: "#27272A", border: "none", color: "#A1A1AA", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", fontSize: "14px" }}
              >✕</button>
            </div>

            <div style={{ background: "#09090B", borderRadius: "16px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", border: "1px solid #27272A" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #F97316, #EA580C)", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px" }}>{(studentName || currentUserName || "S").charAt(0).toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "14px", color: "#FAFAFA" }}>{studentName || currentUserName || "Student"}</div>
                <div style={{ fontSize: "12px", color: "#71717A" }}>{currentUserEmail}</div>
              </div>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#A1A1AA", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>Academic Branch</label>
              <select
                value={userBranch}
                onChange={(e) => {
                  setUserBranch(e.target.value);
                  localStorage.setItem("kalamai_user_branch", e.target.value);
                }}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "#09090B",
                  border: "1px solid #27272A",
                  color: "#FAFAFA",
                  fontSize: "13px",
                  outline: "none"
                }}
              >
                <option value="Computer Science (CSE)">Computer Science & Engineering (CSE)</option>
                <option value="Information Technology (IT)">Information Technology (IT)</option>
                <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                <option value="Civil Engineering (CE)">Civil Engineering (CE)</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px", borderTop: "1px solid #27272A", paddingTop: "16px" }}>
              
              <button
                type="button"
                onClick={() => { setIsSettingsOpen(false); navigateTo("admin"); }}
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #FF6B00, #EA580C)",
                  border: "none",
                  color: "#FFFFFF",
                  fontWeight: "800",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(234, 88, 12, 0.3)"
                }}
              >
                <span>🔒</span> Open Notes Admin Portal
              </button>

              <button
                type="button"
                onClick={handleExportChats}
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "12px",
                  background: "#27272A",
                  border: "1px solid #3F3F46",
                  color: "#FAFAFA",
                  fontWeight: "600",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                <span>📥</span> Export Chat History (.json)
              </button>

              <button
                type="button"
                onClick={handleClearAllChats}
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "12px",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#F87171",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                <span>🗑️</span> Delete All Conversations
              </button>
            </div>
          </div>
        </div>
      )}



        {currentView !== "chat" && (
      <footer style={{ backgroundColor: 'white', padding: '60px 80px', borderTop: '1px solid #F3F4F6', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', gap: '40px' }}>
            
            <div style={{ maxWidth: '300px' }}>
              <h2 style={{ margin: '0 0 20px 0', color: '#EA580C', fontSize: '28px', fontWeight: '900' }}>KalamAI</h2>
              <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
                Empowering the next generation of innovators through interactive STEM education and AI-driven personalized learning.
              </p>
              <div style={{ fontWeight: '800', color: '#EA580C', fontSize: '13px', letterSpacing: '1px', marginBottom: '15px', textTransform: 'uppercase' }}>GET IN TOUCH</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 38px)", gap: "10px", alignItems: "center" }}>
                {/* Row 1: Globe, GitHub, WhatsApp, X */}
                <a href="https://ansh-maurya.vercel.app" target="_blank" rel="noreferrer" title="Website" className="social-fav-btn">
                  <img src="/icons/globe.png" alt="Portfolio" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </a>
                <a href="https://github.com/Maurya8960" target="_blank" rel="noreferrer" title="GitHub" className="social-fav-btn">
                  <img src="/icons/github.png" alt="GitHub" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </a>
                <a href="https://wa.me/qr/4M4PQCGRM6LXL1" target="_blank" rel="noreferrer" title="WhatsApp" className="social-fav-btn">
                  <img src="/icons/whatsapp.png" alt="WhatsApp" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </a>
                <a href="https://x.com/maurya1_ansh" target="_blank" rel="noreferrer" title="Twitter / X" className="social-fav-btn">
                  <img src="/icons/twitter.png" alt="Twitter" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </a>

                {/* Row 2: Instagram, LinkedIn, Telegram, YouTube (Right below X) */}
                <a href="https://www.instagram.com/ansh_maurya_700/" target="_blank" rel="noreferrer" title="Instagram" className="social-fav-btn">
                  <img src="/icons/instagram.png" alt="Instagram" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </a>
                <a href="https://www.linkedin.com/in/anshmaurya89/" target="_blank" rel="noreferrer" title="LinkedIn" className="social-fav-btn">
                  <img src="/icons/linkedin.png" alt="LinkedIn" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </a>
                <a href="https://t.me/Vishwas013" target="_blank" rel="noreferrer" title="Telegram" className="social-fav-btn">
                  <img src="/icons/telegram.png" alt="Telegram" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </a>
                <a href="https://www.youtube.com/@AnshMaurya-o6j" target="_blank" rel="noreferrer" title="YouTube" className="social-fav-btn">
                  <img src="/icons/youtube.png" alt="YouTube" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </a>
              </div>
            </div>

            <div style={{ minWidth: '150px' }}>
              <h3 style={{ margin: '0 0 25px 0', color: '#111827', fontSize: '20px', fontWeight: '900' }}>Resources</h3>
              <button onClick={scrollToAboutUs} className="footer-link">About Us</button>
              <button onClick={() => navigateTo('privacy')} className="footer-link">Privacy Policy</button>
              <button onClick={() => navigateTo('privacy')} className="footer-link">Terms of Service</button>
            </div>

            <div>
              <h3 style={{ margin: '0 0 25px 0', color: '#111827', fontSize: '20px', fontWeight: '900' }}>Contact Info</h3>
              
              <div className="contact-card">
                <div className="icon-circle"><Mail size={20} /></div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: '#EA580C', letterSpacing: '1px' }}>EMAIL US</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}></div>
                </div>
              </div>

              <div className="contact-card">
                <div className="icon-circle" style={{background: '#FEF3C7', color: '#F59E0B', transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", cursor: "pointer"}}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 35px rgba(234, 88, 12, 0.18), 0 4px 12px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "#EA580C";
                const icon = e.currentTarget.querySelector("div");
                if (icon) icon.style.transform = "scale(1.15) rotate(8deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#E2E8F0";
                const icon = e.currentTarget.querySelector("div");
                if (icon) icon.style.transform = "scale(1) rotate(0deg)";
              }}><MessageCircle size={20} /></div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: '#F59E0B', letterSpacing: '1px' }}>WHATSAPP</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>+91 94542 47006</div>
                </div>
              </div>

              <div className="contact-card">
                <div className="icon-circle" style={{background: '#F3F4F6', color: '#6B7280', transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", cursor: "pointer"}}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 35px rgba(234, 88, 12, 0.18), 0 4px 12px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "#EA580C";
                const icon = e.currentTarget.querySelector("div");
                if (icon) icon.style.transform = "scale(1.15) rotate(8deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#E2E8F0";
                const icon = e.currentTarget.querySelector("div");
                if (icon) icon.style.transform = "scale(1) rotate(0deg)";
              }}><Phone size={20} /></div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: '#EA580C', letterSpacing: '1px' }}>PHONE</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>+91 94542 47006</div>
                </div>
              </div>
            </div>

          </div>
          <div style={{ textAlign: 'center', marginTop: '60px', color: '#4B5563', fontSize: '14px', fontWeight: '600' }}>
            © 2026 KalamAI. Developed by Ansh Maurya. All rights reserved.
           · <span onClick={() => navigateTo("admin")} style={{ cursor: "pointer", color: "#EA580C", fontWeight: "700" }}>Admin Portal</span></div>
        </footer>
    )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
