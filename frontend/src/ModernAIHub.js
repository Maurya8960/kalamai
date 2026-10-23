import React, { useState } from "react";

export default function ModernAIHub({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState("heatmap");

  // State for Exam Heatmap
  const [subject, setSubject] = useState("Operating Systems (KCS401)");
  const [unit, setUnit] = useState("Unit 2: Process Scheduling");

  // State for Study Canvas & OCR
  const [canvasNotes, setCanvasNotes] = useState(
    "### Unit Notes & Mathematical Equations:\n\n- Turnaround Time = Exit Time - Arrival Time\n- Waiting Time = Turnaround Time - Burst Time\n\n$$\\text{Average Waiting Time} = \\frac{\\sum W_i}{N}$$\n\n> Note: SJF gives the minimum average waiting time among all scheduling algorithms."
  );

  // State for Viva Examiner
  const [vivaQuery, setVivaQuery] = useState("");
  const [vivaChat, setVivaChat] = useState([
    { role: "bot", text: "Namaste Engineer! Main aapka AKTU Lab Viva Examiner hoon. Aap jis subject ka viva conduct karwana chahte hain, bas batayein!" }
  ]);

  const handleVivaAsk = () => {
    if (!vivaQuery.trim()) return;
    const userMsg = vivaQuery;
    setVivaChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setVivaQuery("");

    setTimeout(() => {
      setVivaChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Good point! Let me evaluate: \n\n1. Concept Accuracy: 9/10\n2. Key Term Missing: 'Context Switching Overhead'.\n\nFollow-up Examiner Question: Agar CPU burst time zero ho jaye, to scheduling algorithm par kya farq padega?`
        }
      ]);
    }, 800);
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px 80px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <span onClick={onBackToHome} style={{ fontSize: "13px", color: "#64748B", cursor: "pointer", fontWeight: "600" }}>Home ›</span>
        <span style={{ fontSize: "13px", color: "#EA580C", fontWeight: "800" }}>Modern AI Ecosystem & Exam Intelligence</span>
      </div>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)",
        borderRadius: "24px",
        padding: "32px",
        color: "#FFFFFF",
        marginBottom: "28px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)"
      }}>
        <div style={{ display: "inline-block", background: "rgba(234, 88, 12, 0.2)", border: "1px solid #EA580C", padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: "800", color: "#FB923C", marginBottom: "12px" }}>
          NEXT-GEN ENGINEERING STUDY CANVAS ⚡
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: "900", margin: "0 0 8px" }}>KalamAI NextGen Engineering Suite</h1>
        <p style={{ fontSize: "14px", color: "#94A3B8", margin: 0, maxWidth: "700px" }}>
          AKTU Exam Heatmaps, NotebookLM-style dynamic Split Canvas, Viva Examiner, and Instant Audio Recaps designed specifically for B.Tech students.
        </p>

        {/* Feature Navigation Tabs */}
        <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
          {[
            { id: "heatmap", label: "🔥 AKTU Exam Heatmap & Predictor" },
            { id: "canvas", label: "📝 NotebookLM Study Canvas & OCR" },
            { id: "audio_viva", label: "🎙️ 2-Min Audio Recap & Lab Viva" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: activeTab === t.id ? "#EA580C" : "rgba(255, 255, 255, 0.08)",
                color: "#FFFFFF",
                border: activeTab === t.id ? "1.5px solid #EA580C" : "1.5px solid rgba(255, 255, 255, 0.15)",
                padding: "10px 18px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: EXAM HEATMAP & PREDICTOR */}
      {activeTab === "heatmap" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 16px" }}>🎯 Semester Probability Predictor</h3>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", display: "block", marginBottom: "6px" }}>Select Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "13px", fontWeight: "600" }}
              >
                <option>Operating Systems (KCS401)</option>
                <option>Data Structures & Algorithms (KCS301)</option>
                <option>Database Management Systems (KCS501)</option>
                <option>Compiler Design (KCS701)</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", display: "block", marginBottom: "6px" }}>Select Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "13px", fontWeight: "600" }}
              >
                <option>Unit 1: Introduction & System Calls</option>
                <option>Unit 2: Process Scheduling & Threads</option>
                <option>Unit 3: Synchronization & Deadlocks</option>
                <option>Unit 4: Memory Management & Paging</option>
                <option>Unit 5: File System & Disk Scheduling</option>
              </select>
            </div>

            <div style={{ background: "#FFF7ED", border: "1px solid #FFEDD5", borderRadius: "14px", padding: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "800", color: "#EA580C", marginBottom: "4px" }}>🔥 94% Probability (AKTU Section C - 10 Marks)</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>"Explain Round Robin vs SJF Scheduling with Gantt Chart and Numerical Example."</div>
              <div style={{ fontSize: "11px", color: "#64748B", marginTop: "8px" }}>Appeared in 2022, 2023, and 2024 Semester Examinations.</div>
            </div>
          </div>

          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 16px" }}>📋 AKTU Answer-Writing Structure Blueprint</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { step: "1. Definition & Core Formula Box", score: "+2 Marks", tip: "Enclose formulas in double border." },
                { step: "2. Clean Hardware/System Diagram", score: "+3 Marks", tip: "Label input/output arrows with pencil." },
                { step: "3. Derivation / Algorithm Walkthrough", score: "+3 Marks", tip: "Show step-by-step Gantt chart iteration." },
                { step: "4. Advantages & Real-World Example", score: "+2 Marks", tip: "Mention Linux / Windows practical kernel mapping." }
              ].map((s, idx) => (
                <div key={idx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "800", color: "#0F172A" }}>{s.step}</div>
                    <div style={{ fontSize: "11px", color: "#64748B" }}>{s.tip}</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#16A34A", background: "#DCFCE7", padding: "4px 8px", borderRadius: "6px" }}>{s.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDY CANVAS (NOTEBOOKLM STYLE) */}
      {activeTab === "canvas" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Left Canvas Input */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "900", color: "#0F172A", margin: 0 }}>Markdown & Formula Editor</h3>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#EA580C", background: "#FFF7ED", padding: "3px 8px", borderRadius: "6px" }}>Active Canvas</span>
            </div>
            <textarea
              value={canvasNotes}
              onChange={(e) => setCanvasNotes(e.target.value)}
              style={{
                flex: 1,
                minHeight: "340px",
                padding: "16px",
                borderRadius: "14px",
                border: "1.5px solid #CBD5E1",
                fontFamily: "monospace",
                fontSize: "13px",
                outline: "none",
                lineHeight: "1.6"
              }}
            />
          </div>

          {/* Right Live Reader */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "900", color: "#0F172A", margin: "0 0 16px" }}>Compiled Exam Note Preview</h3>
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "20px", minHeight: "340px", whiteSpace: "pre-wrap", fontSize: "13px", lineHeight: "1.7", color: "#334155" }}>
              {canvasNotes}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIO RECAP & LAB VIVA */}
      {activeTab === "audio_viva" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {/* 2-Min Audio Recap Player */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 16px" }}>🎧 2-Minute Chapter Audio Podcast</h3>
            <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>
              Hinglish podcast discussing the most critical exam derivations and viva questions.
            </p>

            <div style={{ background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)", border: "1px solid #FDBA74", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎙️</div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "#0F172A" }}>Unit 2: Process Scheduling Recap</div>
              <div style={{ fontSize: "12px", color: "#EA580C", fontWeight: "700", marginTop: "4px" }}>Duration: 02:15 mins • KalamAI Audio Overviews</div>

              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "18px" }}>
                <button
                  onClick={() => alert("Playing 2-Min Audio Overview for Unit 2!")}
                  style={{ background: "#EA580C", color: "#FFFFFF", border: "none", padding: "10px 24px", borderRadius: "10px", fontWeight: "800", fontSize: "13px", cursor: "pointer" }}
                >
                  ▶️ Play Recap
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Lab Viva Examiner */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", height: "420px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 12px" }}>🤖 Interactive Lab Viva Examiner</h3>
            <div style={{ flex: 1, overflowY: "auto", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "16px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {vivaChat.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    background: m.role === "user" ? "#EA580C" : "#FFFFFF",
                    color: m.role === "user" ? "#FFFFFF" : "#0F172A",
                    border: m.role === "user" ? "none" : "1px solid #E2E8F0",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    lineHeight: "1.5",
                    maxWidth: "85%",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Apna viva answer yahan likhein..."
                value={vivaQuery}
                onChange={(e) => setVivaQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVivaAsk()}
                style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
              />
              <button
                onClick={handleVivaAsk}
                style={{ background: "#0F172A", color: "#FFFFFF", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: "800", fontSize: "13px", cursor: "pointer" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
EOFcd /Users/anshmaurya/aktu-ai-notes-app/frontend

cat << 'EOF' > src/ModernAIHub.js
import React, { useState } from "react";

export default function ModernAIHub({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState("heatmap");

  // State for Exam Heatmap
  const [subject, setSubject] = useState("Operating Systems (KCS401)");
  const [unit, setUnit] = useState("Unit 2: Process Scheduling");

  // State for Study Canvas & OCR
  const [canvasNotes, setCanvasNotes] = useState(
    "### Unit Notes & Mathematical Equations:\n\n- Turnaround Time = Exit Time - Arrival Time\n- Waiting Time = Turnaround Time - Burst Time\n\n$$\\text{Average Waiting Time} = \\frac{\\sum W_i}{N}$$\n\n> Note: SJF gives the minimum average waiting time among all scheduling algorithms."
  );

  // State for Viva Examiner
  const [vivaQuery, setVivaQuery] = useState("");
  const [vivaChat, setVivaChat] = useState([
    { role: "bot", text: "Namaste Engineer! Main aapka AKTU Lab Viva Examiner hoon. Aap jis subject ka viva conduct karwana chahte hain, bas batayein!" }
  ]);

  const handleVivaAsk = () => {
    if (!vivaQuery.trim()) return;
    const userMsg = vivaQuery;
    setVivaChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setVivaQuery("");

    setTimeout(() => {
      setVivaChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Good point! Let me evaluate: \n\n1. Concept Accuracy: 9/10\n2. Key Term Missing: 'Context Switching Overhead'.\n\nFollow-up Examiner Question: Agar CPU burst time zero ho jaye, to scheduling algorithm par kya farq padega?`
        }
      ]);
    }, 800);
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px 80px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <span onClick={onBackToHome} style={{ fontSize: "13px", color: "#64748B", cursor: "pointer", fontWeight: "600" }}>Home ›</span>
        <span style={{ fontSize: "13px", color: "#EA580C", fontWeight: "800" }}>Modern AI Ecosystem & Exam Intelligence</span>
      </div>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)",
        borderRadius: "24px",
        padding: "32px",
        color: "#FFFFFF",
        marginBottom: "28px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)"
      }}>
        <div style={{ display: "inline-block", background: "rgba(234, 88, 12, 0.2)", border: "1px solid #EA580C", padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: "800", color: "#FB923C", marginBottom: "12px" }}>
          NEXT-GEN ENGINEERING STUDY CANVAS ⚡
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: "900", margin: "0 0 8px" }}>KalamAI NextGen Engineering Suite</h1>
        <p style={{ fontSize: "14px", color: "#94A3B8", margin: 0, maxWidth: "700px" }}>
          AKTU Exam Heatmaps, NotebookLM-style dynamic Split Canvas, Viva Examiner, and Instant Audio Recaps designed specifically for B.Tech students.
        </p>

        {/* Feature Navigation Tabs */}
        <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
          {[
            { id: "heatmap", label: "🔥 AKTU Exam Heatmap & Predictor" },
            { id: "canvas", label: "📝 NotebookLM Study Canvas & OCR" },
            { id: "audio_viva", label: "🎙️ 2-Min Audio Recap & Lab Viva" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: activeTab === t.id ? "#EA580C" : "rgba(255, 255, 255, 0.08)",
                color: "#FFFFFF",
                border: activeTab === t.id ? "1.5px solid #EA580C" : "1.5px solid rgba(255, 255, 255, 0.15)",
                padding: "10px 18px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: EXAM HEATMAP & PREDICTOR */}
      {activeTab === "heatmap" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 16px" }}>🎯 Semester Probability Predictor</h3>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", display: "block", marginBottom: "6px" }}>Select Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "13px", fontWeight: "600" }}
              >
                <option>Operating Systems (KCS401)</option>
                <option>Data Structures & Algorithms (KCS301)</option>
                <option>Database Management Systems (KCS501)</option>
                <option>Compiler Design (KCS701)</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", display: "block", marginBottom: "6px" }}>Select Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "13px", fontWeight: "600" }}
              >
                <option>Unit 1: Introduction & System Calls</option>
                <option>Unit 2: Process Scheduling & Threads</option>
                <option>Unit 3: Synchronization & Deadlocks</option>
                <option>Unit 4: Memory Management & Paging</option>
                <option>Unit 5: File System & Disk Scheduling</option>
              </select>
            </div>

            <div style={{ background: "#FFF7ED", border: "1px solid #FFEDD5", borderRadius: "14px", padding: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "800", color: "#EA580C", marginBottom: "4px" }}>🔥 94% Probability (AKTU Section C - 10 Marks)</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>"Explain Round Robin vs SJF Scheduling with Gantt Chart and Numerical Example."</div>
              <div style={{ fontSize: "11px", color: "#64748B", marginTop: "8px" }}>Appeared in 2022, 2023, and 2024 Semester Examinations.</div>
            </div>
          </div>

          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 16px" }}>📋 AKTU Answer-Writing Structure Blueprint</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { step: "1. Definition & Core Formula Box", score: "+2 Marks", tip: "Enclose formulas in double border." },
                { step: "2. Clean Hardware/System Diagram", score: "+3 Marks", tip: "Label input/output arrows with pencil." },
                { step: "3. Derivation / Algorithm Walkthrough", score: "+3 Marks", tip: "Show step-by-step Gantt chart iteration." },
                { step: "4. Advantages & Real-World Example", score: "+2 Marks", tip: "Mention Linux / Windows practical kernel mapping." }
              ].map((s, idx) => (
                <div key={idx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "800", color: "#0F172A" }}>{s.step}</div>
                    <div style={{ fontSize: "11px", color: "#64748B" }}>{s.tip}</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#16A34A", background: "#DCFCE7", padding: "4px 8px", borderRadius: "6px" }}>{s.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDY CANVAS (NOTEBOOKLM STYLE) */}
      {activeTab === "canvas" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Left Canvas Input */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "900", color: "#0F172A", margin: 0 }}>Markdown & Formula Editor</h3>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#EA580C", background: "#FFF7ED", padding: "3px 8px", borderRadius: "6px" }}>Active Canvas</span>
            </div>
            <textarea
              value={canvasNotes}
              onChange={(e) => setCanvasNotes(e.target.value)}
              style={{
                flex: 1,
                minHeight: "340px",
                padding: "16px",
                borderRadius: "14px",
                border: "1.5px solid #CBD5E1",
                fontFamily: "monospace",
                fontSize: "13px",
                outline: "none",
                lineHeight: "1.6"
              }}
            />
          </div>

          {/* Right Live Reader */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "900", color: "#0F172A", margin: "0 0 16px" }}>Compiled Exam Note Preview</h3>
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "20px", minHeight: "340px", whiteSpace: "pre-wrap", fontSize: "13px", lineHeight: "1.7", color: "#334155" }}>
              {canvasNotes}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIO RECAP & LAB VIVA */}
      {activeTab === "audio_viva" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {/* 2-Min Audio Recap Player */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 16px" }}>🎧 2-Minute Chapter Audio Podcast</h3>
            <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>
              Hinglish podcast discussing the most critical exam derivations and viva questions.
            </p>

            <div style={{ background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)", border: "1px solid #FDBA74", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎙️</div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "#0F172A" }}>Unit 2: Process Scheduling Recap</div>
              <div style={{ fontSize: "12px", color: "#EA580C", fontWeight: "700", marginTop: "4px" }}>Duration: 02:15 mins • KalamAI Audio Overviews</div>

              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "18px" }}>
                <button
                  onClick={() => alert("Playing 2-Min Audio Overview for Unit 2!")}
                  style={{ background: "#EA580C", color: "#FFFFFF", border: "none", padding: "10px 24px", borderRadius: "10px", fontWeight: "800", fontSize: "13px", cursor: "pointer" }}
                >
                  ▶️ Play Recap
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Lab Viva Examiner */}
          <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", height: "420px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 12px" }}>🤖 Interactive Lab Viva Examiner</h3>
            <div style={{ flex: 1, overflowY: "auto", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "16px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {vivaChat.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    background: m.role === "user" ? "#EA580C" : "#FFFFFF",
                    color: m.role === "user" ? "#FFFFFF" : "#0F172A",
                    border: m.role === "user" ? "none" : "1px solid #E2E8F0",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    lineHeight: "1.5",
                    maxWidth: "85%",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Apna viva answer yahan likhein..."
                value={vivaQuery}
                onChange={(e) => setVivaQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVivaAsk()}
                style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
              />
              <button
                onClick={handleVivaAsk}
                style={{ background: "#0F172A", color: "#FFFFFF", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: "800", fontSize: "13px", cursor: "pointer" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
