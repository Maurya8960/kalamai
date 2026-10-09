import React, { useState } from 'react';
import './App.css';

const syllabusData = {
  1: { title: "1st Year", semesters: [ { sem: 1, name: "Semester 1", subjects: ["Engineering Math I", "Engineering Physics", "Basics of Electrical", "PPS (C Programming)"] }, { sem: 2, name: "Semester 2", subjects: ["Engineering Math II", "Engineering Chemistry", "Basic Electronics", "Engineering Graphics"] } ] },
  2: { title: "2nd Year", semesters: [ { sem: 3, name: "Semester 3", subjects: ["Data Structures", "COA", "Discrete Mathematics", "Technical Communication"] }, { sem: 4, name: "Semester 4", subjects: ["Operating Systems", "TAFL", "OOPs (Java/C++)", "Universal Human Values"] } ] },
  3: { title: "3rd Year", semesters: [ { sem: 5, name: "Semester 5", subjects: ["DBMS", "DAA (Algorithms)", "Compiler Design", "Web Technology"] }, { sem: 6, name: "Semester 6", subjects: ["Computer Networks", "Software Engineering", "Cloud Computing", "Department Elective"] } ] },
  4: { title: "4th Year", semesters: [ { sem: 7, name: "Semester 7", subjects: ["Artificial Intelligence", "Information Security", "Open Elective I", "Project Phase 1"] }, { sem: 8, name: "Semester 8", subjects: ["Deep Learning / NLP", "Open Elective II", "Major Project Phase 2", "Comprehensive Viva"] } ] }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedYear, setSelectedYear] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="kalam-bg-animated font-sans text-slate-800 relative min-h-screen flex flex-col">
      <span className="floating-icon text-5xl top-24 left-10" style={{ animationDelay: '0s' }}>📚</span>
      <span className="floating-icon text-4xl top-1/2 right-12" style={{ animationDelay: '2s' }}>⚡</span>
      <span className="floating-icon text-5xl bottom-24 left-1/4" style={{ animationDelay: '4s' }}>🎓</span>
      <span className="floating-icon text-4xl top-1/3 left-2/3" style={{ animationDelay: '1s' }}>🖋️</span>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className="text-3xl font-extrabold text-orange-600 tracking-tight">Kalam<span className="text-slate-900">AI</span></span>
          </div>

          <nav className="flex items-center gap-8 font-semibold text-slate-600">
            {['home', 'features', 'syllabus', 'about'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize transition-colors pb-1 border-b-2 text-base ${
                  activeTab === tab 
                    ? 'text-orange-600 border-orange-500 font-bold' 
                    : 'border-transparent hover:text-orange-600'
                }`}
              >
                {tab === 'about' ? 'About Us' : tab}
              </button>
            ))}
          </nav>

          <div>
            {isLoggedIn ? (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="px-5 py-2 rounded-full font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition shadow-sm text-sm"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="px-6 py-2 rounded-full font-semibold text-white bg-orange-500 hover:bg-orange-600 transition shadow-sm text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {activeTab === 'home' && (
          <div className="flex flex-col h-[calc(100vh-180px)] max-w-4xl mx-auto glass-card rounded-3xl p-6 shadow-xl">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              <div className="bg-orange-50/80 border-l-4 border-orange-500 p-4 rounded-xl text-slate-800 font-medium">
                Hello! I am your KalamAI Smart Assistant. Which AKTU subject or unit do you want to study today?
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Ask for notes, unit summaries, pyqs..."
                className="flex-1 px-5 py-3.5 rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/90 shadow-inner"
              />
              <button className="px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition shadow-md">
                Send
              </button>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-8">KalamAI Superpowers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "⚡", title: "Unit-Wise Revision", desc: "Complete 1-shot summaries crafted strictly according to AKTU syllabus." },
                { icon: "📝", title: "Important PYQ Answers", desc: "Previous year question patterns solved with proper step-wise exam marking." },
                { icon: "🎯", title: "Last Night Prep", desc: "Quick revision points and formulas for scoring top marks in semester exams." },
              ].map((f, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">{f.icon}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'syllabus' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">B.Tech Engineering Syllabus</h2>
              <p className="text-slate-600 mt-2">Apne year par click karke semester-wise syllabus check karein</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((year) => (
                <div
                  key={year}
                  onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                  className={`glass-card p-6 rounded-2xl cursor-pointer text-center border-2 transition ${
                    selectedYear === year ? 'border-orange-500 ring-2 ring-orange-200 bg-orange-50/50' : 'border-transparent'
                  }`}
                >
                  <div className="text-3xl mb-2">🎓</div>
                  <h3 className="text-xl font-bold text-slate-800">{year}{year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year Student</h3>
                  <p className="text-xs text-orange-600 font-semibold mt-1">
                    {selectedYear === year ? "▲ Click to Close" : "▼ Click for Semesters"}
                  </p>
                </div>
              ))}
            </div>

            {selectedYear && (
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                {syllabusData[selectedYear].semesters.map((s) => (
                  <div key={s.sem} className="glass-card p-6 rounded-2xl border border-orange-200">
                    <div className="flex items-center justify-between border-b border-orange-100 pb-3 mb-4">
                      <h4 className="text-xl font-bold text-orange-600">{s.name}</h4>
                      <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold">AKTU Scheme</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {s.subjects.map((sub, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                          <span className="text-orange-500 font-bold">•</span> {sub}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-2.5 rounded-xl border border-orange-500 text-orange-600 font-bold hover:bg-orange-500 hover:text-white transition text-sm">
                      Upload / View PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="glass-card p-8 rounded-3xl max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">About KalamAI</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              KalamAI AKTU aur technical university students ke semester exams ke liye customized intelligent learning platform hai.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
