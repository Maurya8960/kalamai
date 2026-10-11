import React, { useState } from "react";

const CheatSheetDirectory = () => {
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState("cse");

  const yearBranches = {
    1: [
      { id: "common", label: "Common First Year (All Branches)" }
    ],
    2: [
      { id: "cse", label: "Computer Science & Engg (CSE)" },
      { id: "it", label: "Information Technology (IT)" },
      { id: "ece", label: "Electronics & Comm. (ECE)" },
      { id: "me", label: "Mechanical Engineering (ME)" },
      { id: "ce", label: "Civil Engineering (CE)" }
    ],
    3: [
      { id: "cse", label: "Computer Science & Engg (CSE)" },
      { id: "it", label: "Information Technology (IT)" },
      { id: "ece", label: "Electronics & Comm. (ECE)" },
      { id: "me", label: "Mechanical Engineering (ME)" },
      { id: "ce", label: "Civil Engineering (CE)" }
    ],
    4: [
      { id: "cse", label: "Computer Science & Engg (CSE)" },
      { id: "it", label: "Information Technology (IT)" },
      { id: "ece", label: "Electronics & Comm. (ECE)" },
      { id: "me", label: "Mechanical Engineering (ME)" },
      { id: "ce", label: "Civil Engineering (CE)" }
    ]
  };

  // Branch & Year specific subject cheat sheets data with PDF placeholder links
  const cheatSheetData = {
    "1-common": [
      { code: "BAS103", name: "Engineering Mathematics-I", highlights: "Calculus, Matrices, Vector Calculus Formulas", pdfUrl: "#" },
      { code: "BAS101", name: "Engineering Physics", highlights: "Optics, Relativistic Mechanics, Quantum Wave Equations", pdfUrl: "#" },
      { code: "BAS102", name: "Engineering Chemistry", highlights: "Molecular Orbital Theory, Water Treatment, Polymers", pdfUrl: "#" },
      { code: "BEE101", name: "Basic Electrical Engineering", highlights: "DC Circuits, AC Analysis, Transformer Formulas", pdfUrl: "#" },
      { code: "BCS101", name: "Programming for Problem Solving (C)", highlights: "Pointers, Memory allocation, Recursion Cheat Sheet", pdfUrl: "#" }
    ],
    "2-cse": [
      { code: "BCS301", name: "Data Structures & Algorithms", highlights: "Trees, Graphs, Sorting Complexities & Quick Cheats", pdfUrl: "#" },
      { code: "BCS302", name: "Computer Organization & Architecture", highlights: "Pipelining, Addressing Modes, Memory Hierarchy", pdfUrl: "#" },
      { code: "BCS303", name: "Discrete Structures & Graph Theory", highlights: "Set Theory, Recurrence Relations, Graph Theorems", pdfUrl: "#" },
      { code: "BCS401", name: "Operating Systems", highlights: "Scheduling, Semaphore, Deadlock Bankers Formulas", pdfUrl: "#" },
      { code: "BCS402", name: "Theory of Automata & Formal Languages", highlights: "DFA/NFA, CFG, Pumping Lemma, Turing Machine Cheats", pdfUrl: "#" }
    ],
    "2-it": [
      { code: "BIT301", name: "Data Structures Using C", highlights: "Linked Lists, Heaps, Hashing Quick Notes", pdfUrl: "#" },
      { code: "BCS401", name: "Operating Systems", highlights: "CPU Scheduling, Virtual Memory, Inode System", pdfUrl: "#" },
      { code: "BIT401", name: "Object Oriented Programming (Java)", highlights: "Inheritance, Polymorphism, Collections Framework", pdfUrl: "#" }
    ],
    "2-ece": [
      { code: "BEC301", name: "Electronic Devices & Circuits", highlights: "BJT, MOSFET Biasing, Small Signal Models", pdfUrl: "#" },
      { code: "BEC302", name: "Digital System Design", highlights: "K-Maps, Combinational & Sequential Circuits", pdfUrl: "#" },
      { code: "BEC303", name: "Network Analysis & Synthesis", highlights: "Network Theorems, Two-Port Parameters, Filter Design", pdfUrl: "#" }
    ],
    "2-me": [
      { code: "BME301", name: "Thermodynamics", highlights: "Carnot Cycles, Entropy, Steam Tables Quick Cheats", pdfUrl: "#" },
      { code: "BME302", name: "Fluid Mechanics", highlights: "Bernoulli Equation, Boundary Layer Theory, Flow Meters", pdfUrl: "#" },
      { code: "BME303", name: "Strength of Materials", highlights: "Stress-Strain, Bending Moment, Shear Force Diagrams", pdfUrl: "#" }
    ],
    "2-ce": [
      { code: "BCE301", name: "Building Materials & Construction", highlights: "Cement, Concrete Mix Design, Brick Masonry", pdfUrl: "#" },
      { code: "BCE302", name: "Surveying & Geomatics", highlights: "Traversing, Leveling, Tachometry Formulas", pdfUrl: "#" }
    ],
    "3-cse": [
      { code: "BCS501", name: "Database Management Systems", highlights: "Normalization (1NF-BCNF), SQL Joins, B+ Trees, Transactions", pdfUrl: "#" },
      { code: "BCS502", name: "Compiler Design", highlights: "Lexical Analysis, LL(1) / LR Parsers, Code Optimization", pdfUrl: "#" },
      { code: "BCS503", name: "Design & Analysis of Algorithms", highlights: "Dynamic Programming, Greedy, Divide & Conquer Complexity", pdfUrl: "#" },
      { code: "BCS601", name: "Computer Networks", highlights: "OSI vs TCP/IP, IP Subnetting, Routing Algorithms, Sliding Window", pdfUrl: "#" },
      { code: "BCS602", name: "Software Engineering", highlights: "SDLC, Agile, Cocomo Model, UML Diagrams", pdfUrl: "#" }
    ],
    "3-it": [
      { code: "BIT501", name: "Database Management Systems", highlights: "Relational Algebra, SQL Queries, Concurrency Control", pdfUrl: "#" },
      { code: "BIT601", name: "Computer Networks", highlights: "TCP/UDP, Subnet Masking, HTTP/DNS Protocols", pdfUrl: "#" }
    ],
    "3-ece": [
      { code: "BEC501", name: "Microprocessors & Microcontrollers", highlights: "8085/8051 Pin Diagrams, Addressing Modes, Timers", pdfUrl: "#" },
      { code: "BEC601", name: "Digital Signal Processing", highlights: "DFT, FFT, FIR/IIR Filter Design Formulas", pdfUrl: "#" }
    ],
    "3-me": [
      { code: "BME501", name: "Heat and Mass Transfer", highlights: "Conduction, Convection, Radiation, LMTD Formulas", pdfUrl: "#" },
      { code: "BME601", name: "Theory of Machines", highlights: "Gears, Cams, Flywheels, Gyroscope Cheat Sheet", pdfUrl: "#" }
    ],
    "3-ce": [
      { code: "BCE501", name: "Geotechnical Engineering", highlights: "Soil Mechanics, Permeability, Shear Strength", pdfUrl: "#" },
      { code: "BCE601", name: "Design of Concrete Structures", highlights: "Limit State Method, Beam & Slab Design Code IS 456", pdfUrl: "#" }
    ],
    "4-cse": [
      { code: "BCS701", name: "Artificial Intelligence & Machine Learning", highlights: "Search Algorithms (A*, Heuristics), Neural Networks, Regression", pdfUrl: "#" },
      { code: "BCS702", name: "Cloud Computing", highlights: "SaaS, PaaS, IaaS, AWS/Azure Architecture, Virtualization", pdfUrl: "#" },
      { code: "BCS801", name: "Information & Cyber Security", highlights: "RSA, AES Cryptography, Hash Functions, Firewalls", pdfUrl: "#" }
    ],
    "4-it": [
      { code: "BIT701", name: "Machine Learning", highlights: "Supervised & Unsupervised Learning, Decision Trees", pdfUrl: "#" },
      { code: "BIT801", name: "Mobile Computing", highlights: "GSM, CDMA, Android Architecture Cheat Sheet", pdfUrl: "#" }
    ],
    "4-ece": [
      { code: "BEC701", name: "VLSI Design", highlights: "CMOS Inverter, Stick Diagrams, Layout Rules", pdfUrl: "#" },
      { code: "BEC801", name: "Optical Communication", highlights: "Optical Fiber Modes, Dispersion, WDM Systems", pdfUrl: "#" }
    ],
    "4-me": [
      { code: "BME701", name: "Automobile Engineering", highlights: "IC Engine, Transmission, Suspension, Braking", pdfUrl: "#" },
      { code: "BME801", name: "Power Plant Engineering", highlights: "Thermal, Nuclear, Hydro Plants Efficiency Formulas", pdfUrl: "#" }
    ],
    "4-ce": [
      { code: "BCE701", name: "Transportation Engineering", highlights: "Geometric Design of Highways, IRC Standards", pdfUrl: "#" },
      { code: "BCE801", name: "Water Resources Engineering", highlights: "Hydrology, Dam Design, Irrigation Engineering", pdfUrl: "#" }
    ]
  };

  const currentKey = selectedYear === 1 ? "1-common" : `${selectedYear}-${selectedBranch}`;
  const subjectList = cheatSheetData[currentKey] || cheatSheetData["2-cse"];

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px 80px", fontFamily: "inherit" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px", fontWeight: "500" }}>
        <span>Home</span> <span style={{ margin: "0 6px" }}>›</span> <span style={{ color: "#0F172A", fontWeight: "700" }}>AKTU Engineering Cheat Sheets</span>
      </div>

      {/* Header Banner */}
      <div style={{ marginBottom: "28px" }}>
        <span style={{
          display: "inline-block",
          background: "#FFEDD5",
          color: "#C2410C",
          fontSize: "12px",
          fontWeight: "800",
          letterSpacing: "0.5px",
          padding: "5px 14px",
          borderRadius: "6px",
          marginBottom: "12px",
          textTransform: "uppercase"
        }}>
          HIGH-YIELD 1-PAGE FORMULA SHEETS & DERIVATIONS
        </span>
        <h1 style={{ fontSize: "34px", fontWeight: "900", color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
          AKTU Revision Cheat Sheets ⚡
        </h1>
        <p style={{ color: "#475569", fontSize: "15px", margin: 0, lineHeight: "1.6" }}>
          Instant, dense exam cheat sheets crafted specifically for AKTU B.Tech semesters. Select your academic year and branch to download crisp PDF revision cards.
        </p>
      </div>

      {/* STEP 1: SELECT ACADEMIC YEAR (1st to 4th Year Cards) */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Step 1: Select Your B.Tech Year
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {[
            { year: 1, title: "1st Year", sems: "Semester 1 & 2", badge: "Common Subjects", icon: "🌱" },
            { year: 2, title: "2nd Year", sems: "Semester 3 & 4", badge: "Core Branch Basics", icon: "🚀" },
            { year: 3, title: "3rd Year", sems: "Semester 5 & 6", badge: "Advanced Technicals", icon: "⚙️" },
            { year: 4, title: "4th Year", sems: "Semester 7 & 8", badge: "Electives & Systems", icon: "🎓" }
          ].map((item) => (
            <div
              key={item.year}
              onClick={() => {
                setSelectedYear(item.year);
                if (item.year === 1) setSelectedBranch("common");
                else if (selectedBranch === "common") setSelectedBranch("cse");
              }}
              style={{
                background: selectedYear === item.year ? "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)" : "#FFFFFF",
                border: selectedYear === item.year ? "2px solid #EA580C" : "1.5px solid #E2E8F0",
                borderRadius: "14px",
                padding: "20px",
                cursor: "pointer",
                boxShadow: selectedYear === item.year ? "0 8px 24px rgba(234, 88, 12, 0.15)" : "0 2px 8px rgba(0,0,0,0.03)",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "28px" }}>{item.icon}</span>
                <span style={{
                  background: selectedYear === item.year ? "#EA580C" : "#F1F5F9",
                  color: selectedYear === item.year ? "#FFFFFF" : "#475569",
                  fontSize: "11px",
                  fontWeight: "800",
                  padding: "3px 8px",
                  borderRadius: "6px"
                }}>
                  {item.badge}
                </span>
              </div>
              <h4 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 4px" }}>{item.title}</h4>
              <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>{item.sems}</p>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 2: SELECT BRANCH */}
      {selectedYear > 1 && (
        <div style={{ marginBottom: "36px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Step 2: Choose Your Branch
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {yearBranches[selectedYear].map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBranch(b.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: selectedBranch === b.id ? "1.5px solid #EA580C" : "1.5px solid #CBD5E1",
                  background: selectedBranch === b.id ? "#EA580C" : "#FFFFFF",
                  color: selectedBranch === b.id ? "#FFFFFF" : "#1E293B",
                  fontWeight: "800",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: SUBJECT CHEAT SHEET LIST */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "2px solid #E2E8F0", paddingBottom: "10px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: 0 }}>
            {selectedYear}st Year • Available Cheat Sheets
          </h3>
          <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "700" }}>
            {subjectList.length} Subjects Ready
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {subjectList.map((sub, idx) => (
            <div
              key={idx}
              style={{
                background: "#FFFFFF",
                borderRadius: "14px",
                border: "1.5px solid #FED7AA",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 6px 18px rgba(234, 88, 12, 0.05)"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: "11px", fontWeight: "800", padding: "3px 8px", borderRadius: "5px", border: "1px solid #BFDBFE" }}>
                    {sub.code}
                  </span>
                  <span style={{ background: "#ECFDF5", color: "#047857", fontSize: "11px", fontWeight: "800", padding: "3px 8px", borderRadius: "5px" }}>
                    Formula Card
                  </span>
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "900", color: "#0F172A", margin: "6px 0 10px" }}>
                  {sub.name}
                </h4>
                <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", margin: "0 0 16px" }}>
                  <strong>Key Highlights:</strong> {sub.highlights}
                </p>
              </div>

              {/* Download PDF Button with link placeholder */}
              <a
                href={sub.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (sub.pdfUrl === "#") {
                    e.preventDefault();
                    alert(`${sub.name} (${sub.code}) ka PDF Cheat Sheet jald hi direct link ke sath update hoga!`);
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)",
                  color: "#FFFFFF",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: "13px",
                  boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)"
                }}
              >
                <span>📥</span> Download PDF Sheet
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheatSheetDirectory;
