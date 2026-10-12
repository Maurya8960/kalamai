import React, { useState } from "react";

// Degrees Configuration
const degreePrograms = [
  { id: "btech", title: "B.Tech", icon: "⚙️", desc: "CSE, IT, ECE, EE, ME, CE, AI-DS", badge: "4 Years" },
  { id: "bpharm", title: "B.Pharm", icon: "🧪", desc: "PCI Approved Curriculum", badge: "4 Years" },
  { id: "mca", title: "MCA", icon: "💻", desc: "Master of Computer Applications", badge: "2 Years" },
  { id: "mba", title: "MBA", icon: "📊", desc: "Dual Specializations & Finance", badge: "2 Years" },
  { id: "bba", title: "BBA", icon: "📈", desc: "Bachelor of Business Administration", badge: "3 Years" },
  { id: "bca", title: "BCA", icon: "🖥️", desc: "Bachelor of Computer Applications", badge: "3 Years" },
  { id: "mtech", title: "M.Tech", icon: "🔬", desc: "Advanced Engineering Disciplines", badge: "2 Years" }
];

// Branches per Degree (Screenshot 15 reference)
const disciplinesData = {
  btech: [
    { id: "cse", name: "CSE", files: "1,800+ Files" },
    { id: "it", name: "IT", files: "1,200+ Files" },
    { id: "ece", name: "ECE", files: "950+ Files" },
    { id: "ee", name: "EE / EN", files: "850+ Files" },
    { id: "me", name: "ME", files: "920+ Files" },
    { id: "civil", name: "Civil", files: "780+ Files" },
    { id: "aids", name: "AI & DS", files: "650+ Files" }
  ],
  bpharm: [
    { id: "pceutics", name: "Pharmaceutics", files: "540+ Files" },
    { id: "pcol", name: "Pharmacology", files: "610+ Files" },
    { id: "medchem", name: "Medicinal Chemistry", files: "720+ Files" },
    { id: "cognosy", name: "Pharmacognosy", files: "430+ Files" },
    { id: "analysis", name: "Pharm Analysis", files: "390+ Files" }
  ],
  mca: [
    { id: "core_cs", name: "Core Software", files: "620+ Files" },
    { id: "cloud", name: "Cloud & DevOps", files: "480+ Files" },
    { id: "ai_ml", name: "AI & Data Science", files: "510+ Files" },
    { id: "security", name: "Cybersecurity", files: "340+ Files" }
  ],
  mba: [
    { id: "finance", name: "Finance", files: "590+ Files" },
    { id: "marketing", name: "Marketing", files: "640+ Files" },
    { id: "hr", name: "Human Resource", files: "480+ Files" },
    { id: "ops", name: "Operations & Supply", files: "390+ Files" },
    { id: "analytics", name: "Business Analytics", files: "520+ Files" }
  ],
  bba: [
    { id: "management", name: "General Management", files: "410+ Files" },
    { id: "banking", name: "Banking & Finance", files: "380+ Files" },
    { id: "sales", name: "Sales & Retail", files: "320+ Files" }
  ],
  bca: [
    { id: "programming", name: "Coding & Algorithms", files: "710+ Files" },
    { id: "web", name: "Full Stack Web", files: "630+ Files" },
    { id: "dbms", name: "Database & SQL", files: "490+ Files" }
  ],
  mtech: [
    { id: "vlsi", name: "VLSI Design", files: "290+ Files" },
    { id: "thermal", name: "Thermal Engineering", files: "260+ Files" },
    { id: "structures", name: "Structural Eng.", files: "310+ Files" },
    { id: "comp_eng", name: "Computer Engineering", files: "380+ Files" }
  ]
};

// Year Options
const yearOptions = [
  { id: "1", title: "1st Year", sem: "Semester 1 & 2", badge: "Common Subjects", icon: "🌱" },
  { id: "2", title: "2nd Year", sem: "Semester 3 & 4", badge: "Core Branch Basics", icon: "🚀" },
  { id: "3", title: "3rd Year", sem: "Semester 5 & 6", badge: "Advanced Technicals", icon: "⚙️" },
  { id: "4", title: "4th Year", sem: "Semester 7 & 8", badge: "Electives & Systems", icon: "🎓" }
];

// Cheat Sheets Data
const cheatSheetsLibrary = {
  btech: [
    { code: "BAS103", title: "Engineering Mathematics-I", type: "Formula Card", units: "5 Units Dense Summary", pdf: "#" },
    { code: "BAS101", title: "Engineering Physics", type: "Formula Card", units: "Optics, Quantum & EM Waves", pdf: "#" },
    { code: "BAS102", title: "Engineering Chemistry", type: "Derivations Card", units: "Spectroscopy, Polymers & Electrochemistry", pdf: "#" },
    { code: "BCS101", title: "Programming for Problem Solving (C)", type: "Cheat Sheet", units: "Pointers, Recursion & Structures", pdf: "#" },
    { code: "BEE101", title: "Basic Electrical Engineering", type: "Formula Card", units: "DC/AC Circuits & Transformers", pdf: "#" },
    { code: "BCE101", title: "Engineering Mechanics", type: "Derivations Card", units: "Trusses, Equilibrium & Friction", pdf: "#" }
  ],
  bpharm: [
    { code: "BP101T", title: "Human Anatomy & Physiology I", type: "Revision Card", units: "Histology, Skeleton & Cardiovascular", pdf: "#" },
    { code: "BP102T", title: "Pharmaceutical Analysis I", type: "Formula Card", units: "Titrations, Redox & Potentiometry", pdf: "#" },
    { code: "BP103T", title: "Pharmaceutics I", type: "Quick Formula", units: "Dosage Forms, Syrups & Emulsions", pdf: "#" },
    { code: "BP104T", title: "Pharmaceutical Inorganic Chemistry", type: "Cheat Sheet", units: "Antacids, Expectorants & Radiopharma", pdf: "#" }
  ],
  mca: [
    { code: "MCA101", title: "Advanced Data Structures & Algorithms", type: "Formula Card", units: "Trees, Graphs & Dynamic Programming", pdf: "#" },
    { code: "MCA102", title: "Object Oriented Programming (Java/Python)", type: "Cheat Sheet", units: "Collections, Multithreading & Lambdas", pdf: "#" },
    { code: "MCA103", title: "Operating Systems & System Architecture", type: "Revision Card", units: "Memory Management & Concurrency", pdf: "#" }
  ],
  mba: [
    { code: "KMB101", title: "Management Concepts & Organizational Behavior", type: "Cheat Sheet", units: "Leadership, Motivation & Culture", pdf: "#" },
    { code: "KMB102", title: "Managerial Economics", type: "Formula Card", units: "Elasticity, Cost Functions & Pricing", pdf: "#" },
    { code: "KMB103", title: "Financial Accounting for Managers", type: "Formula Card", units: "Balance Sheets, Cash Flow & Ratio Analysis", pdf: "#" }
  ],
  bba: [
    { code: "BBA101", title: "Business Organization & Ethics", type: "Cheat Sheet", units: "Corporate Forms & Governance", pdf: "#" },
    { code: "BBA102", title: "Business Mathematics", type: "Formula Card", units: "Matrices, Calculus & Commercial Math", pdf: "#" }
  ],
  bca: [
    { code: "BCA101", title: "Computer Fundamentals & Office Tools", type: "Quick Sheet", units: "Hardware, Logic Gates & MS Tools", pdf: "#" },
    { code: "BCA102", title: "Programming Principles in C", type: "Formula Card", units: "Arrays, Functions & File Handling", pdf: "#" }
  ],
  mtech: [
    { code: "MT101", title: "Advanced Engineering Mathematics", type: "Derivations Card", units: "Numerical Methods & PDE Solutions", pdf: "#" },
    { code: "MT102", title: "Research Methodology & IPR", type: "Cheat Sheet", units: "Patents, Statistical Modeling & Ethics", pdf: "#" }
  ]
};

const CheatSheetDirectory = () => {
  const [selectedDegree, setSelectedDegree] = useState("btech");
  const [selectedBranch, setSelectedBranch] = useState("cse");
  const [selectedYear, setSelectedYear] = useState("1");

  const currentDisciplines = disciplinesData[selectedDegree] || [];
  const currentSheets = cheatSheetsLibrary[selectedDegree] || [];

  const handleDegreeChange = (degId) => {
    setSelectedDegree(degId);
    const availableBranches = disciplinesData[degId];
    if (availableBranches && availableBranches.length > 0) {
      setSelectedBranch(availableBranches[0].id);
    }
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px 60px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Top Breadcrumb & Badge */}
      <div style={{ marginBottom: "16px" }}>
        <span style={{ fontSize: "13px", color: "#64748B" }}>Home › </span>
        <span style={{ fontSize: "13px", color: "#0F172A", fontWeight: "700" }}>AKTU Engineering & Degree Cheat Sheets</span>
      </div>

      <div style={{ marginBottom: "14px" }}>
        <span style={{ 
          background: "#FEF3C7", 
          color: "#92400E", 
          fontSize: "11px", 
          fontWeight: "800", 
          letterSpacing: "0.8px", 
          padding: "6px 14px", 
          borderRadius: "8px",
          display: "inline-block",
          textTransform: "uppercase"
        }}>
          HIGH-YIELD 1-PAGE FORMULA SHEETS & DERIVATIONS
        </span>
      </div>

      {/* Hero Header */}
      <div style={{ marginBottom: "34px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.8px" }}>
          AKTU Revision Cheat Sheets ⚡
        </h1>
        <p style={{ color: "#64748B", fontSize: "15px", maxWidth: "800px", margin: 0, lineHeight: "1.6" }}>
          Instant, dense exam cheat sheets crafted specifically for AKTU university examinations. Select your degree, engineering discipline, and academic year to access concise 1-page formula revisions.
        </p>
      </div>

      {/* ================= STEP 1: ALL DEGREE PROGRAMS ================= */}
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", letterSpacing: "0.5px", textTransform: "uppercase", margin: 0 }}>
            STEP 1: SELECT YOUR DEGREE PROGRAM
          </h2>
          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>7 Programs Available</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          {degreePrograms.map((deg) => {
            const isSelected = selectedDegree === deg.id;
            return (
              <div
                key={deg.id}
                onClick={() => handleDegreeChange(deg.id)}
                style={{
                  background: isSelected ? "linear-gradient(180deg, #FFFFFF, #FFF7ED)" : "#FFFFFF",
                  border: isSelected ? "2px solid #EA580C" : "1.5px solid #E2E8F0",
                  borderRadius: "18px",
                  padding: "20px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: isSelected ? "0 12px 28px rgba(234, 88, 12, 0.16)" : "0 4px 12px rgba(0,0,0,0.03)",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isSelected ? "translateY(-3px)" : "none"
                }}
              >
                <div style={{ width: "46px", height: "46px", margin: "0 auto 10px", borderRadius: "14px", background: isSelected ? "#FFF7ED" : "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                  {deg.icon}
                </div>
                <div style={{ display: "inline-block", background: isSelected ? "#EA580C" : "#F1F5F9", color: isSelected ? "#FFF" : "#64748B", fontSize: "10px", fontWeight: "800", padding: "3px 8px", borderRadius: "6px", marginBottom: "6px" }}>
                  {deg.badge}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 4px" }}>{deg.title}</h3>
                <p style={{ fontSize: "11px", color: "#64748B", margin: "0 0 14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{deg.desc}</p>
                <button
                  style={{
                    width: "100%",
                    background: isSelected ? "#EA580C" : "#FFFFFF",
                    border: isSelected ? "1.5px solid #EA580C" : "1px solid #CBD5E1",
                    color: isSelected ? "#FFFFFF" : "#475569",
                    padding: "7px 12px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "800",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {isSelected ? "Selected ✓" : "Select Degree →"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= STEP 2: BRANCHES / DISCIPLINES (Screenshot 15 reference) ================= */}
      {currentDisciplines.length > 0 && (
        <div style={{ marginBottom: "36px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "18px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563EB", letterSpacing: "1px", textTransform: "uppercase" }}>
              BRANCHES SUPPORTED
            </span>
            <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#0F172A", margin: "4px 0 0" }}>
              {selectedDegree === "btech" ? "Engineering Disciplines" : selectedDegree.toUpperCase() + " Specializations & Streams"}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "14px" }}>
            {currentDisciplines.map((branch) => {
              const isBranchActive = selectedBranch === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch.id)}
                  style={{
                    background: isBranchActive ? "linear-gradient(180deg, #FFFFFF, #FFF7ED)" : "#FFFFFF",
                    border: isBranchActive ? "2px solid #EA580C" : "1.5px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "18px 14px",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: isBranchActive ? "0 10px 24px rgba(234, 88, 12, 0.15)" : "0 2px 8px rgba(0,0,0,0.02)",
                    transition: "all 0.2s ease",
                    transform: isBranchActive ? "translateY(-2px)" : "none"
                  }}
                >
                  <h4 style={{ fontSize: "17px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px" }}>
                    {branch.name}
                  </h4>
                  <span style={{ fontSize: "12px", color: isBranchActive ? "#EA580C" : "#059669", fontWeight: "700" }}>
                    {branch.files}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 3: ACADEMIC YEAR SELECTION ================= */}
      <div style={{ marginBottom: "36px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "16px" }}>
          STEP 2: SELECT YOUR ACADEMIC YEAR
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
          {yearOptions.map((yr) => {
            const isYearActive = selectedYear === yr.id;
            return (
              <div
                key={yr.id}
                onClick={() => setSelectedYear(yr.id)}
                style={{
                  background: isYearActive ? "linear-gradient(180deg, #FFFFFF, #FFF7ED)" : "#FFFFFF",
                  border: isYearActive ? "2px solid #EA580C" : "1.5px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "22px 20px",
                  cursor: "pointer",
                  boxShadow: isYearActive ? "0 12px 26px rgba(234, 88, 12, 0.14)" : "0 4px 12px rgba(0,0,0,0.03)",
                  transition: "all 0.25s ease",
                  transform: isYearActive ? "translateY(-2px)" : "none"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <span style={{ fontSize: "24px" }}>{yr.icon}</span>
                  <span style={{ background: isYearActive ? "#EA580C" : "#F1F5F9", color: isYearActive ? "#FFFFFF" : "#475569", fontSize: "11px", fontWeight: "800", padding: "4px 10px", borderRadius: "8px" }}>
                    {yr.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#0F172A", margin: "0 0 4px" }}>{yr.title}</h3>
                <p style={{ fontSize: "12px", color: "#64748B", margin: 0, fontWeight: "600" }}>{yr.sem}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= STEP 4: SUBJECT REVISION CHEAT SHEETS ================= */}
      <div style={{ animation: "fadeIn 0.3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#0F172A", margin: 0 }}>
            {selectedDegree.toUpperCase()} ({yearOptions.find(y => y.id === selectedYear)?.title}) • Available Cheat Sheets
          </h2>
          <span style={{ fontSize: "13px", color: "#2563EB", fontWeight: "800", background: "#EFF6FF", padding: "6px 14px", borderRadius: "10px", border: "1px solid #DBEAFE" }}>
            {currentSheets.length} Subjects Ready for Download
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {currentSheets.map((sheet, sIdx) => (
            <div
              key={sIdx}
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                borderRadius: "18px",
                padding: "22px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "14px",
                transition: "all 0.2s ease"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ background: "#EFF6FF", color: "#2563EB", fontWeight: "800", fontSize: "11px", padding: "5px 10px", borderRadius: "8px", border: "1px solid #BFDBFE" }}>
                    {sheet.code}
                  </span>
                  <span style={{ background: "#ECFDF5", color: "#059669", fontWeight: "800", fontSize: "11px", padding: "5px 10px", borderRadius: "8px", border: "1px solid #A7F3D0" }}>
                    {sheet.type}
                  </span>
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px" }}>{sheet.title}</h3>
                <p style={{ fontSize: "12px", color: "#64748B", margin: 0, lineHeight: "1.5" }}>{sheet.units}</p>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                <a
                  href={sheet.pdf}
                  download
                  style={{
                    flex: 1,
                    textAlign: "center",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    padding: "9px 16px",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "12px",
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(37,99,235,0.25)"
                  }}
                >
                  📥 Download PDF
                </a>
                <button
                  style={{
                    background: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                    color: "#0F172A",
                    padding: "9px 14px",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "12px",
                    cursor: "pointer"
                  }}
                >
                  👁️ Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CheatSheetDirectory;
