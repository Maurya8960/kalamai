import React, { useState } from "react";

const PyqDirectory = ({ onOpenSubjectPrompt }) => {
  const [activeCourse, setActiveCourse] = useState("btech");

  const btechCards = [
    { title: "1st Year (Sem 1 & 2)", subjects: "Maths-I, Physics, Chemistry, Electrical, C Prog.", sem: "sem1-2", status: "available" },
    { title: "2nd Year (Sem 3 & 4)", subjects: "DSA, COA, Discrete Maths, OS, Python", sem: "sem3-4", status: "available" },
    { title: "3rd Year (Sem 5 & 6)", subjects: "DBMS, Networks, Automata, Compiler", sem: "sem5-6", status: "available" },
    { title: "4th Year (Sem 7 & 8)", subjects: "AI, Cloud, Cyber Security, Electives", sem: "sem7-8", status: "available" }
  ];

  const bpharmCards = [
    { title: "B.Pharm 1st Semester", subjects: "HAP-I, Analysis-I, Pharmaceutics-I, Inorganic Chem", status: "available" },
    { title: "B.Pharm 2nd Semester", subjects: "HAP-II, Org. Chem-I, Biochemistry, Pathophysiology", status: "coming_soon" },
    { title: "B.Pharm 3rd Semester", subjects: "Org Chem-II, Physical Pharm-I, Microbiology, Engg", status: "coming_soon" },
    { title: "B.Pharm 4th Semester", subjects: "Med Chem-I, Org Chem-III, Physical Pharm-II, Pharmacology-I", status: "coming_soon" },
    { title: "B.Pharm 5th Semester", subjects: "Med Chem-II, Industrial Pharm-I, Pharmacology-II, Pharmacognosy-II", status: "coming_soon" },
    { title: "B.Pharm 6th Semester", subjects: "Med Chem-III, Pharmacology-III, Herbal Tech, Biopharmaceutics", status: "coming_soon" },
    { title: "B.Pharm 7th Semester", subjects: "Instrumental Analysis, Industrial Pharm-II, Pharmacy Practice", status: "coming_soon" },
    { title: "B.Pharm 8th Semester", subjects: "Biostatistics, Social Pharmacy, Pharma Marketing, Electives", status: "coming_soon" }
  ];

  const mbaCards = [
    { title: "MBA 1st Semester", subjects: "Management Concepts, Managerial Economics, Financial Acc.", status: "available" },
    { title: "MBA 2nd Semester", subjects: "HRM, Financial Mgmt, Marketing Mgmt, Operations", status: "available" },
    { title: "MBA 3rd Semester", subjects: "Strategic Mgmt, International Business, Dual Electives", status: "coming_soon" },
    { title: "MBA 4th Semester", subjects: "Entrepreneurship, Corporate Governance, Research", status: "coming_soon" }
  ];

  const mcaCards = [
    { title: "MCA 1st Year (Sem 1 & 2)", subjects: "Fund. of Computers, C, Data Structures, Discrete Maths", status: "available" },
    { title: "MCA 2nd Year (Sem 3 & 4)", subjects: "Java, Web Tech, Software Engg, Cloud Computing", status: "coming_soon" }
  ];

  const upcomingCourses = [
    { title: "M.Pharmacy", desc: "Pharmaceutics, Pharmacology, Quality Assurance", status: "coming_soon" },
    { title: "M.Tech", desc: "Computer Science, VLSI Design, Thermal, Power Systems", status: "coming_soon" },
    { title: "BCA", desc: "Programming in C/C++, Web Tech, DBMS, Software Engg", status: "coming_soon" },
    { title: "BBA", desc: "Principles of Mgmt, Business Comm, Economics, Ethics", status: "coming_soon" },
    { title: "BHMCT / Allied", desc: "Hotel Management, Food Production, BFAD & BFA", status: "coming_soon" }
  ];

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px 80px", fontFamily: "inherit" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px", fontWeight: "500" }}>
        <span>Home</span> <span style={{ margin: "0 6px" }}>›</span> <span style={{ color: "#0F172A", fontWeight: "700" }}>AKTU Question Papers (All Courses)</span>
      </div>

      {/* Header Tag & Heading */}
      <div style={{ marginBottom: "20px" }}>
        <span style={{
          display: "inline-block",
          background: "#FEF3C7",
          color: "#92400E",
          fontSize: "12px",
          fontWeight: "800",
          letterSpacing: "0.5px",
          padding: "5px 14px",
          borderRadius: "6px",
          marginBottom: "12px",
          textTransform: "uppercase"
        }}>
          OFFICIAL UNIVERSITY QUESTION BANK • 10 YEARS QUESTION PAPERS
        </span>
        <h1 style={{ fontSize: "34px", fontWeight: "900", color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
          AKTU Question Papers (PYQs)
        </h1>
        <p style={{ color: "#475569", fontSize: "15px", margin: 0, lineHeight: "1.6" }}>
          Download last 10 years of university semester question papers with marking schemes and 10-mark repeated questions for B.Tech, B.Pharm, MBA, MCA & BHMCT courses.
        </p>
      </div>

      {/* Solved Papers Quantum Banner */}
      <div style={{
        background: "#FFFBEB",
        border: "1px solid #FDE68A",
        borderRadius: "10px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        marginBottom: "32px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "22px" }}>💡</span>
          <div>
            <strong style={{ color: "#92400E", fontSize: "14px", display: "block" }}>
              Looking for Solved Question Papers & Solutions?
            </strong>
            <span style={{ color: "#78350F", fontSize: "13px" }}>
              Official university PYQs below are original exam papers. For unit-wise solved question banks & Quantum solutions, visit our dedicated portal.
            </span>
          </div>
        </div>
        <button
          onClick={() => onOpenSubjectPrompt && onOpenSubjectPrompt("Provide unit-wise Quantum solved questions for my AKTU subject")}
          style={{
            background: "#D97706",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "6px",
            padding: "9px 18px",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          View Solved Papers (Quantum) →
        </button>
      </div>

      {/* Course Filter Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
        {[
          { id: "btech", label: "B.Tech PYQs" },
          { id: "bpharm", label: "B.Pharm PYQs" },
          { id: "mba", label: "MBA PYQs" },
          { id: "mca", label: "MCA PYQs" },
          { id: "quantum", label: "⚡ Solved Papers (Quantum)" },
          { id: "upcoming", label: "Upcoming Courses" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCourse(tab.id)}
            style={{
              padding: "9px 20px",
              borderRadius: "8px",
              border: activeCourse === tab.id ? "1.5px solid #EA580C" : "1px solid #E2E8F0",
              background: activeCourse === tab.id ? "#EA580C" : "#FFFFFF",
              color: activeCourse === tab.id ? "#FFFFFF" : "#334155",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. B.TECH SECTION */}
      {(activeCourse === "btech" || activeCourse === "all") && (
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "2px solid #E2E8F0", paddingBottom: "10px" }}>
            <h2 style={{ fontSize: "19px", fontWeight: "900", color: "#0F172A", margin: 0 }}>
              1. B.TECH QUESTION PAPERS (ALL BRANCHES)
            </h2>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#2563EB", background: "#EFF6FF", padding: "4px 10px", borderRadius: "4px", border: "1px solid #BFDBFE" }}>
              CSE • ECE • ME • CE • IT
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {btechCards.map((c, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1.5px solid #FED7AA", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 14px rgba(234, 88, 12, 0.05)" }}>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", marginBottom: "8px" }}>{c.title}</h3>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", margin: "0 0 16px" }}>{c.subjects}</p>
                </div>
                <button
                  onClick={() => onOpenSubjectPrompt && onOpenSubjectPrompt(`Provide AKTU ${c.title} previous year questions and solution analysis`)}
                  style={{ background: "transparent", border: "none", color: "#EA580C", fontWeight: "800", fontSize: "13px", cursor: "pointer", textAlign: "left", padding: 0, display: "flex", alignItems: "center", gap: "4px" }}
                >
                  Get PYQs →
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. B.PHARM SECTION */}
      {(activeCourse === "bpharm" || activeCourse === "all") && (
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "2px solid #E2E8F0", paddingBottom: "10px" }}>
            <h2 style={{ fontSize: "19px", fontWeight: "900", color: "#0F172A", margin: 0 }}>
              2. B.PHARMACY QUESTION PAPERS (PCI SYLLABUS – ALL 8 SEMESTERS)
            </h2>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#059669", background: "#ECFDF5", padding: "4px 10px", borderRadius: "4px", border: "1px solid #A7F3D0" }}>
              PCI CURRICULUM • SEMESTERS 1 TO 8
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {bpharmCards.map((c, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1.5px solid #CBD5E1", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>{c.title}</h3>
                    {c.status === "coming_soon" && (
                      <span style={{ background: "#FEF3C7", color: "#B45309", fontSize: "10px", fontWeight: "800", padding: "2px 6px", borderRadius: "4px" }}>
                        COMING SOON
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", margin: "0 0 16px" }}>{c.subjects}</p>
                </div>
                {c.status === "available" ? (
                  <button
                    onClick={() => onOpenSubjectPrompt && onOpenSubjectPrompt(`Provide AKTU ${c.title} question papers`)}
                    style={{ background: "transparent", border: "none", color: "#EA580C", fontWeight: "800", fontSize: "13px", cursor: "pointer", textAlign: "left", padding: 0 }}
                  >
                    Get PYQs →
                  </button>
                ) : (
                  <span style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600" }}>PDF Papers Coming Soon →</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. MBA SECTION */}
      {(activeCourse === "mba" || activeCourse === "all") && (
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "2px solid #E2E8F0", paddingBottom: "10px" }}>
            <h2 style={{ fontSize: "19px", fontWeight: "900", color: "#0F172A", margin: 0 }}>
              3. MBA QUESTION PAPERS (MANAGEMENT STUDIES)
            </h2>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#7C3AED", background: "#F5F3FF", padding: "4px 10px", borderRadius: "4px", border: "1px solid #DDD6FE" }}>
              SEMESTERS 1 TO 4 • ALL SPECIALIZATIONS
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {mbaCards.map((c, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1.5px solid #CBD5E1", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>{c.title}</h3>
                    {c.status === "coming_soon" && (
                      <span style={{ background: "#FEF3C7", color: "#B45309", fontSize: "10px", fontWeight: "800", padding: "2px 6px", borderRadius: "4px" }}>
                        COMING SOON
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", margin: "0 0 16px" }}>{c.subjects}</p>
                </div>
                {c.status === "available" ? (
                  <button
                    onClick={() => onOpenSubjectPrompt && onOpenSubjectPrompt(`Provide AKTU ${c.title} question papers`)}
                    style={{ background: "transparent", border: "none", color: "#EA580C", fontWeight: "800", fontSize: "13px", cursor: "pointer", textAlign: "left", padding: 0 }}
                  >
                    Get PYQs →
                  </button>
                ) : (
                  <span style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600" }}>PDF Papers Coming Soon →</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. MCA SECTION */}
      {(activeCourse === "mca" || activeCourse === "all") && (
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "2px solid #E2E8F0", paddingBottom: "10px" }}>
            <h2 style={{ fontSize: "19px", fontWeight: "900", color: "#0F172A", margin: 0 }}>
              4. MCA QUESTION PAPERS (COMPUTER APPLICATIONS)
            </h2>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#0284C7", background: "#F0F9FF", padding: "4px 10px", borderRadius: "4px", border: "1px solid #BAE6FD" }}>
              2-YEAR REGULAR • SEMESTERS 1 TO 4
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {mcaCards.map((c, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1.5px solid #CBD5E1", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>{c.title}</h3>
                    {c.status === "coming_soon" && (
                      <span style={{ background: "#FEF3C7", color: "#B45309", fontSize: "10px", fontWeight: "800", padding: "2px 6px", borderRadius: "4px" }}>
                        COMING SOON
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", margin: "0 0 16px" }}>{c.subjects}</p>
                </div>
                {c.status === "available" ? (
                  <button
                    onClick={() => onOpenSubjectPrompt && onOpenSubjectPrompt(`Provide AKTU ${c.title} question papers`)}
                    style={{ background: "transparent", border: "none", color: "#EA580C", fontWeight: "800", fontSize: "13px", cursor: "pointer", textAlign: "left", padding: 0 }}
                  >
                    Get PYQs →
                  </button>
                ) : (
                  <span style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600" }}>PDF Papers Coming Soon →</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. UPCOMING COURSES SECTION */}
      {(activeCourse === "upcoming" || activeCourse === "all") && (
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "2px solid #E2E8F0", paddingBottom: "10px" }}>
            <h2 style={{ fontSize: "19px", fontWeight: "900", color: "#0F172A", margin: 0 }}>
              5. UPCOMING COURSES & DEGREE PROGRAMS
            </h2>
            <span style={{ fontSize: "12px", fontWeight: "800", color: "#B45309", background: "#FEF3C7", padding: "4px 10px", borderRadius: "4px" }}>
              COMING SOON • UNDER DEVELOPMENT
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {upcomingCourses.map((c, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>{c.title}</h3>
                    <span style={{ background: "#FEF3C7", color: "#B45309", fontSize: "10px", fontWeight: "800", padding: "2px 6px", borderRadius: "4px" }}>
                      COMING SOON
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", margin: "0 0 16px" }}>{c.desc}</p>
                </div>
                <span style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600" }}>PDF Papers Coming Soon →</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PyqDirectory;
