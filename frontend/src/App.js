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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 
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
  
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I am your KalamAI Smart Assistant. Which subject or unit do you want to study today?" }
  ]);
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
        }
      } else {
        const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
        if(res.data.success) {
          localStorage.setItem('kalam_session', 'active');
          setIsLoggedIn(true);
        }
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Server connection error. Make sure backend is running.');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    localStorage.setItem('kalam_session', 'active');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('kalam_session');
    setIsLoggedIn(false);
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
          <div onClick={() => navigateTo('home')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img src="/kalamai-logo.png" alt="KalamAI Logo" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '900', color: '#EA580C' }}>KalamAI</h1>
          </div>
          <nav style={{ display: 'flex', gap: '30px', fontWeight: 'bold', alignItems: 'center' }}>
             <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', color: currentView === 'home' ? '#EA580C' : '#4B5563', borderBottom: currentView === 'home' ? '3px solid #EA580C' : 'none', paddingBottom: '5px' }}>Home</span>
             <span onClick={scrollToFeatures} style={{ cursor: "pointer", color: "#4B5563" }}>Features</span>
             <span onClick={scrollToSyllabus} style={{ cursor: "pointer", color: "#4B5563" }}>Syllabus</span>
             <span onClick={scrollToAboutUs} style={{ cursor: 'pointer', color: '#4B5563' }}>About Us</span>
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
                   <span style={{ cursor: 'pointer', color: '#EA580C' }} onClick={() => navigateTo('home')}>Home</span> / Privacy Policy
                </div>
                <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#111827', margin: '0 0 10px 0' }}>Privacy Policy</h1>
                <p style={{ fontStyle: 'italic', color: '#6B7280' }}>Last updated: October 2026</p>
                <h3>1. Introduction</h3>
                <p>KalamAI ("we," "our," or "us"), developed by Ansh Maurya, is committed to protecting your privacy.</p>
                <button onClick={() => navigateTo('home')} style={{ marginTop: '40px', background: 'linear-gradient(to right, #F97316, #F59E0B)', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>← Back to Home</button>
             </div>
          )}

          {currentView === 'home' && !isLoggedIn && (
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

          {currentView === 'home' && isLoggedIn && (
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
          )}
        </main>

        <footer style={{ backgroundColor: 'white', padding: '60px 80px', borderTop: '1px solid #F3F4F6', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', gap: '40px' }}>
            
            <div style={{ maxWidth: '300px' }}>
              <h2 style={{ margin: '0 0 20px 0', color: '#EA580C', fontSize: '28px', fontWeight: '900' }}>KalamAI</h2>
              <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
                Empowering the next generation of innovators through interactive STEM education and AI-driven personalized learning.
              </p>
              <div style={{ fontWeight: '800', color: '#EA580C', fontSize: '13px', letterSpacing: '1px', marginBottom: '15px', textTransform: 'uppercase' }}>GET IN TOUCH</div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <a href="https://ansh-maurya.vercel.app" target="_blank" rel="noreferrer" title="Website" style={{ width: "36px", height: "36px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#F3F4F6", borderRadius: "10px", padding: "6px", transition: "0.2s" }}>
                  <img src="/icons/globe.png" alt="Portfolio" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e)=>{e.target.style.display="none"}} />
                </a>
                <a href="https://github.com/Maurya8960" target="_blank" rel="noreferrer" title="GitHub" style={{ width: "36px", height: "36px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#F3F4F6", borderRadius: "10px", padding: "6px", transition: "0.2s" }}>
                  <img src="/icons/github.png" alt="GitHub" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e)=>{e.target.style.display="none"}} />
                </a>
                <a href="https://wa.me/qr/4M4PQCGRM6LXL1" target="_blank" rel="noreferrer" title="WhatsApp" style={{ width: "36px", height: "36px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#F3F4F6", borderRadius: "10px", padding: "6px", transition: "0.2s" }}>
                  <img src="/icons/whatsapp.png" alt="WhatsApp" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e)=>{e.target.style.display="none"}} />
                </a>
                <a href="https://x.com/maurya1_ansh" target="_blank" rel="noreferrer" title="Twitter / X" style={{ width: "36px", height: "36px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#F3F4F6", borderRadius: "10px", padding: "6px", transition: "0.2s" }}>
                  <img src="/icons/twitter.png" alt="Twitter" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e)=>{e.target.style.display="none"}} />
                </a>
                <a href="https://www.youtube.com/@AnshMaurya-o6j" target="_blank" rel="noreferrer" title="YouTube" style={{ width: "36px", height: "36px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#F3F4F6", borderRadius: "10px", padding: "6px", transition: "0.2s" }}>
                  <img src="/icons/youtube.png" alt="YouTube" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e)=>{e.target.style.display="none"}} />
                </a>
                <a href="https://www.instagram.com/ansh_maurya_700/" target="_blank" rel="noreferrer" title="Instagram" style={{ width: "36px", height: "36px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#F3F4F6", borderRadius: "10px", padding: "6px", transition: "0.2s" }}>
                  <img src="/icons/instagram.png" alt="Instagram" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e)=>{e.target.style.display="none"}} />
                </a>
                <a href="https://www.linkedin.com/in/anshmaurya89/" target="_blank" rel="noreferrer" title="LinkedIn" style={{ width: "36px", height: "36px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#F3F4F6", borderRadius: "10px", padding: "6px", transition: "0.2s" }}>
                  <img src="/icons/linkedin.png" alt="LinkedIn" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e)=>{e.target.style.display="none"}} />
                </a>
                <a href="https://t.me/Vishwas013" target="_blank" rel="noreferrer" title="Telegram" style={{ width: "36px", height: "36px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#F3F4F6", borderRadius: "10px", padding: "6px", transition: "0.2s" }}>
                  <img src="/icons/telegram.png" alt="Telegram" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e)=>{e.target.style.display="none"}} />
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
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>mauryal.ansh@gmail.com</div>
                </div>
              </div>

              <div className="contact-card">
                <div className="icon-circle" style={{background: '#FEF3C7', color: '#F59E0B'}}><MessageCircle size={20} /></div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: '#F59E0B', letterSpacing: '1px' }}>WHATSAPP</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>+91 94542 47006</div>
                </div>
              </div>

              <div className="contact-card">
                <div className="icon-circle" style={{background: '#F3F4F6', color: '#6B7280'}}><Phone size={20} /></div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: '#EA580C', letterSpacing: '1px' }}>PHONE</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>+91 94542 47006</div>
                </div>
              </div>
            </div>

          </div>
          <div style={{ textAlign: 'center', marginTop: '60px', color: '#4B5563', fontSize: '14px', fontWeight: '600' }}>
            © 2026 KalamAI. Developed by Ansh Maurya. All rights reserved.
          </div>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
