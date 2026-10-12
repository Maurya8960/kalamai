import React, { useState } from "react";

// Official Schemes Data for B.Pharm
const bpharmSyllabusData = [
  {
    code: "BP-01",
    bg: "#EFF6FF",
    color: "#2563EB",
    title: "Regulations & Ordinance (I, II, III & IV Year): 2026-27",
    desc: "Complete academic regulations, PCI guidelines and ordinance for all 4 years",
    pdfUrl: "/syllabus_btech/B.Pharm. Programme.pdf"
  },
  {
    code: "BP-02",
    bg: "#ECFDF5",
    color: "#059669",
    title: "Evaluation scheme & syllabus (I, II, III & IV Year): 2026-27",
    desc: "Official semester-wise credit distribution, practicals and evaluation matrix",
    pdfUrl: "/syllabus_btech/Evaluation Scheme and Syll...mme.pdf"
  },
  {
    code: "BP-03",
    bg: "#FFF7ED",
    color: "#D97706",
    title: "Updated Ordinance – Bachelor of Pharmacy: 2020 – 21",
    desc: "Revised university notifications, grading standards & ordinance clauses",
    pdfUrl: "/syllabus_btech/Updated Ordinan...ct 20.pdf"
  },
  {
    code: "BP-04",
    bg: "#FDF2F8",
    color: "#DB2777",
    title: "Bachelor of Pharmacy 4th year on (PCI Guidelines) – Modified: 2020-21",
    desc: "Final year advanced pharmaceutical technology, project work & clinical modules",
    pdfUrl: "/syllabus_btech/B.Pharm.-IVth Year revi...021.pdf"
  },
  {
    code: "BP-05",
    bg: "#F5F3FF",
    color: "#7C3AED",
    title: "Bachelor of Pharmacy I, II, III & IV Year syllabus 2019-2020",
    desc: "Foundational syllabus for pharmaceutics, pharmacology & chemistry modules",
    pdfUrl: "/syllabus_btech/Bachelor of Pharma...2021.pdf"
  }
];

// Official Streams for B.Tech
const btechBranches = [
  { code: "AG", bg: "#ECFDF5", color: "#059669", title: "Agricultural Engineering", desc: "Farm machinery, soil & water conservation, processing engineering", pdfUrl: "/syllabus_btech/Agricultural Engineering.pdf" },
  { code: "BT", bg: "#EFF6FF", color: "#2563EB", title: "Biotechnology", desc: "Molecular biology, immunology, bioprocess & fermentation", pdfUrl: "/syllabus_btech/Biotechnology.pdf" },
  { code: "CH", bg: "#FEF3C7", color: "#D97706", title: "Chemical Engineering", desc: "Fluid flow, thermodynamics, chemical reaction engineering", pdfUrl: "/syllabus_btech/Chemical Engineering.pdf" },
  { code: "CE", bg: "#F0FDF4", color: "#16A34A", title: "Civil Engineering", desc: "Structural analysis, geotechnical, fluid mechanics & survey", pdfUrl: "/syllabus_btech/Civil Engineering.pdf" },
  { code: "CSE / IT", bg: "#EFF6FF", color: "#3B82F6", title: "Computer Science & Engineering", desc: "Data structures, Operating systems, AI/ML, DBMS & algorithms", pdfUrl: "/syllabus_btech/Computer Science and Engineering (CSE).pdf" },
  { code: "EE", bg: "#FEF9C3", color: "#CA8A04", title: "Electrical Engineering", desc: "Power systems, machines, electrical drives, control engineering", pdfUrl: "/syllabus_btech/Electrical Engineering.pdf" },
  { code: "ECE", bg: "#FDF2F8", color: "#DB2777", title: "Electronics & Communication Engineering", desc: "Signals, VLSI design, digital communication, antenna theory", pdfUrl: "/syllabus_btech/Electronics and Communication Engineering.pdf" },
  { code: "ME", bg: "#F5F3FF", color: "#7C3AED", title: "Mechanical Engineering", desc: "Thermodynamics, manufacturing, heat transfer, machine design", pdfUrl: "/syllabus_btech/Mechanical Engineering.pdf" },
  { code: "TX", bg: "#FFF7ED", color: "#EA580C", title: "Textile Engineering", desc: "Yarn manufacture, fabric structure, testing & wet processing", pdfUrl: "/syllabus_btech/Textile Engineering.pdf" },
  { code: "AIML", bg: "#ECFEFF", color: "#0891B2", title: "Artificial Intelligence & Data Science", desc: "Deep learning, predictive modeling, big data pipelines, NLP", pdfUrl: "/syllabus_btech/AI_DataScience.pdf" }
];

// Official MBA Specializations
const mbaBranches = [
  { code: "MBA-GEN", bg: "#EFF6FF", color: "#2563EB", title: "Master of Business Administration (Core 1st & 2nd Year)", desc: "Managerial economics, organizational behavior, corporate finance & business law", pdfUrl: "#" },
  { code: "MBA-FIN", bg: "#ECFDF5", color: "#059669", title: "MBA Financial Management & Banking", desc: "Investment analysis, security valuation, corporate tax & financial derivatives", pdfUrl: "#" },
  { code: "MBA-MKT", bg: "#FEF3C7", color: "#D97706", title: "MBA Marketing Management & Digital Sales", desc: "Consumer behavior, product branding, digital marketing & CRM strategies", pdfUrl: "#" },
  { code: "MBA-HR", bg: "#FDF2F8", color: "#DB2777", title: "MBA Human Resource Management", desc: "Talent acquisition, labor relations, industrial laws & organizational development", pdfUrl: "#" },
  { code: "MBA-IT", bg: "#F5F3FF", color: "#7C3AED", title: "MBA Information Technology & Business Analytics", desc: "Enterprise resource planning, data analytics, IT consulting & database systems", pdfUrl: "#" },
  { code: "MBA-OPS", bg: "#FFF7ED", color: "#EA580C", title: "MBA Operations & Supply Chain Management", desc: "Logistics, supply chain analytics, lean manufacturing & inventory control", pdfUrl: "#" }
];

// Official MCA Specializations
const mcaBranches = [
  { code: "MCA-I", bg: "#EFF6FF", color: "#2563EB", title: "MCA 1st Year (Semester I & II Official Syllabus)", desc: "Advanced Java, Python, Operating Systems, Computer Architecture & Web Technologies", pdfUrl: "#" },
  { code: "MCA-II", bg: "#ECFDF5", color: "#059669", title: "MCA 2nd Year (Semester III & IV Official Syllabus)", desc: "Cloud Computing, Full Stack Web Development, Machine Learning & Capstone Project", pdfUrl: "#" },
  { code: "MCA-DS", bg: "#FEF3C7", color: "#D97706", title: "MCA Electives: Data Science & AI Systems", desc: "Deep neural networks, natural language processing & big data analytics", pdfUrl: "#" },
  { code: "MCA-CYB", bg: "#FDF2F8", color: "#DB2777", title: "MCA Electives: Cybersecurity & Network Defense", desc: "Cryptography, ethical hacking, digital forensics & cloud security", pdfUrl: "#" }
];

const SyllabusDirectory = () => {
  const [activeTab, setActiveTab] = useState("btech");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const getFilteredList = (list) => {
    if (!searchQuery.trim()) return list;
    return list.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const currentList = activeTab === "btech" ? btechBranches :
                      activeTab === "bpharm" ? bpharmSyllabusData :
                      activeTab === "mba" ? mbaBranches : mcaBranches;

  const filteredDisplay = getFilteredList(currentList);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px 60px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Aesthetic Dr. Kalam Inspiration & Welcome Hero */}
      <div id="official-scheme-table" style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)',
        border: '1.5px solid rgba(234, 88, 12, 0.2)',
        borderRadius: '24px',
        padding: '28px 32px',
        marginBottom: '32px',
        boxShadow: '0 12px 32px rgba(234, 88, 12, 0.08), 0 2px 8px rgba(0,0,0,0.02)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFF7ED', border: '1px solid #FFEDD5', padding: '5px 14px', borderRadius: '999px', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px' }}>✨</span>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#EA580C', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
              DR. A.P.J. ABDUL KALAM AI WORKSPACE
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            "You have to dream before your dreams can come true."
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: '1.6' }}>
            Instant access to verified AKTU syllabus schemes, credit distributions, and official curriculum PDFs. Select your degree below to get started.
          </p>
        </div>

        {/* Quick Highlights Counter Badges */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '10px 18px', borderRadius: '14px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#EA580C' }}>100%</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Official Syllabus</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '10px 18px', borderRadius: '14px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#2563EB' }}>2026–27</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Updated Session</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '10px 18px', borderRadius: '14px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#059669' }}>Instant</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>PDF Downloads</div>
          </div>
        </div>
      </div>

      {/* Top Banner Tag */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <span style={{ 
          background: "#EFF6FF", 
          color: "#2563EB", 
          fontSize: "12px", 
          fontWeight: "800", 
          letterSpacing: "0.8px", 
          padding: "8px 20px", 
          borderRadius: "999px",
          display: "inline-block",
          border: "1px solid #DBEAFE"
        }}>
          📖 DR. A.P.J. ABDUL KALAM TECHNICAL UNIVERSITY • MASTER SYLLABUS DIRECTORY
        </span>
      </div>

      {/* Hero Header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <h1 style={{ fontSize: "38px", fontWeight: "900", color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.8px" }}>
          Official AKTU Course <span style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Syllabus</span>
        </h1>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#1E293B", margin: "0 0 12px" }}>
          All Degree Programs & Branches
        </h2>
        <p style={{ color: "#64748B", fontSize: "15px", maxWidth: "720px", margin: "0 auto", lineHeight: "1.6" }}>
          Select your academic degree program below to access year-wise syllabus schemes, evaluation structures, credit distribution, and official university PDF downloads.
        </p>
      </div>

      {/* Degree Program Cards (All 4 Clickable with Uniform Orange State & Lift Animation) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", marginBottom: "40px" }}>
        
        {/* B.Tech Card */}
        <div 
          onClick={() => setActiveTab("btech")}
          style={{
            background: activeTab === "btech" ? "linear-gradient(180deg, #FFFFFF, #FFF7ED)" : "#FFFFFF",
            border: activeTab === "btech" ? "2px solid #EA580C" : "1.5px solid #E2E8F0",
            borderRadius: "20px",
            padding: "24px 20px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: activeTab === "btech" ? "0 14px 30px rgba(234, 88, 12, 0.16)" : "0 4px 12px rgba(0,0,0,0.03)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: activeTab === "btech" ? "translateY(-3px)" : "none"
          }}
        >
          <div style={{ width: "52px", height: "52px", margin: "0 auto 14px", borderRadius: "16px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>⚙️</div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px" }}>B.Tech</h3>
          <p style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", margin: "0 0 16px" }}>CSE, IT, ECE, EE, ME, CE, AI-DS</p>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab("btech"); }}
            style={{ 
              background: activeTab === "btech" ? "#EA580C" : "#F8FAFC", 
              border: activeTab === "btech" ? "1.5px solid #EA580C" : "1px solid #CBD5E1", 
              color: activeTab === "btech" ? "#FFFFFF" : "#475569", 
              padding: "7px 18px", 
              borderRadius: "12px", 
              fontSize: "12px", 
              fontWeight: "800", 
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            1st - 4th Year Portals →
          </button>
        </div>

        {/* B.Pharm Card */}
        <div 
          onClick={() => setActiveTab("bpharm")}
          style={{
            background: activeTab === "bpharm" ? "linear-gradient(180deg, #FFFFFF, #FFF7ED)" : "#FFFFFF",
            border: activeTab === "bpharm" ? "2px solid #EA580C" : "1.5px solid #E2E8F0",
            borderRadius: "20px",
            padding: "24px 20px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: activeTab === "bpharm" ? "0 14px 30px rgba(234, 88, 12, 0.16)" : "0 4px 12px rgba(0,0,0,0.03)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: activeTab === "bpharm" ? "translateY(-3px)" : "none"
          }}
        >
          <div style={{ width: "52px", height: "52px", margin: "0 auto 14px", borderRadius: "16px", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>🧪</div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px" }}>B.Pharm</h3>
          <p style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", margin: "0 0 16px" }}>PCI Approved 8 Semesters</p>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab("bpharm"); }}
            style={{ 
              background: activeTab === "bpharm" ? "#EA580C" : "#F8FAFC", 
              border: activeTab === "bpharm" ? "1.5px solid #EA580C" : "1px solid #CBD5E1", 
              color: activeTab === "bpharm" ? "#FFFFFF" : "#475569", 
              padding: "7px 18px", 
              borderRadius: "12px", 
              fontSize: "12px", 
              fontWeight: "800", 
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            View Syllabus →
          </button>
        </div>

        {/* MBA Card */}
        <div 
          onClick={() => setActiveTab("mba")}
          style={{
            background: activeTab === "mba" ? "linear-gradient(180deg, #FFFFFF, #FFF7ED)" : "#FFFFFF",
            border: activeTab === "mba" ? "2px solid #EA580C" : "1.5px solid #E2E8F0",
            borderRadius: "20px",
            padding: "24px 20px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: activeTab === "mba" ? "0 14px 30px rgba(234, 88, 12, 0.16)" : "0 4px 12px rgba(0,0,0,0.03)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: activeTab === "mba" ? "translateY(-3px)" : "none"
          }}
        >
          <div style={{ width: "52px", height: "52px", margin: "0 auto 14px", borderRadius: "16px", background: "#FFFBEB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>📊</div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px" }}>MBA</h3>
          <p style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", margin: "0 0 16px" }}>1st & 2nd Year Dual Specializations</p>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab("mba"); }}
            style={{ 
              background: activeTab === "mba" ? "#EA580C" : "#F8FAFC", 
              border: activeTab === "mba" ? "1.5px solid #EA580C" : "1px solid #CBD5E1", 
              color: activeTab === "mba" ? "#FFFFFF" : "#475569", 
              padding: "7px 18px", 
              borderRadius: "12px", 
              fontSize: "12px", 
              fontWeight: "800", 
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            1st & 2nd Year Portals →
          </button>
        </div>

        {/* MCA Card */}
        <div 
          onClick={() => setActiveTab("mca")}
          style={{
            background: activeTab === "mca" ? "linear-gradient(180deg, #FFFFFF, #FFF7ED)" : "#FFFFFF",
            border: activeTab === "mca" ? "2px solid #EA580C" : "1.5px solid #E2E8F0",
            borderRadius: "20px",
            padding: "24px 20px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: activeTab === "mca" ? "0 14px 30px rgba(234, 88, 12, 0.16)" : "0 4px 12px rgba(0,0,0,0.03)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: activeTab === "mca" ? "translateY(-3px)" : "none"
          }}
        >
          <div style={{ width: "52px", height: "52px", margin: "0 auto 14px", borderRadius: "16px", background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>💻</div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px" }}>MCA</h3>
          <p style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", margin: "0 0 16px" }}>2-Year Master of Computer Apps</p>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab("mca"); }}
            style={{ 
              background: activeTab === "mca" ? "#EA580C" : "#F8FAFC", 
              border: activeTab === "mca" ? "1.5px solid #EA580C" : "1px solid #CBD5E1", 
              color: activeTab === "mca" ? "#FFFFFF" : "#475569", 
              padding: "7px 18px", 
              borderRadius: "12px", 
              fontSize: "12px", 
              fontWeight: "800", 
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            View Syllabus →
          </button>
        </div>

      </div>

      {/* DYNAMIC SYLLABUS TABLE CONTAINER (Directly underneath the degree cards) */}
      <div style={{ animation: "fadeIn 0.3s ease", marginBottom: "40px" }}>
        
        {/* Table Top Header */}
        <div style={{ 
          background: "#0F172A", 
          borderRadius: "18px 18px 0 0", 
          padding: "20px 26px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px"
        }}>
          <div>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#38BDF8", letterSpacing: "1px", textTransform: "uppercase" }}>
              DIRECT OFFICIAL DOWNLOADS
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#FFFFFF", margin: "4px 0 0" }}>
              {activeTab === "btech" ? "BRANCH / STREAM OFFICIAL SYLLABUS" :
               activeTab === "bpharm" ? "AKTU B.PHARM OFFICIAL SYLLABUS (2026-27)" :
               activeTab === "mba" ? "AKTU MBA SPECIALIZATION SCHEMES & SYLLABUS" :
               "AKTU MCA OFFICIAL SYLLABUS & SCHEMES"}
            </h3>
          </div>
          <div style={{ position: "relative", minWidth: "260px" }}>
            <input 
              type="text" 
              placeholder={"Search " + activeTab.toUpperCase() + " branch/scheme..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                background: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "10px",
                padding: "8px 14px",
                color: "#F8FAFC",
                fontSize: "13px",
                outline: "none"
              }}
            />
          </div>
        </div>

        {/* Dynamic Scheme / Branch Rows */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderTop: "none", borderRadius: "0 0 18px 18px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" }}>
          {filteredDisplay.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: "18px 24px", 
                borderBottom: idx !== filteredDisplay.length - 1 ? "1px solid #F1F5F9" : "none", 
                flexWrap: "wrap", 
                gap: "14px",
                background: idx % 2 === 0 ? "#FFFFFF" : "#FBFDFE"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "280px" }}>
                <span style={{ 
                  background: item.bg, 
                  color: item.color, 
                  fontWeight: "800", 
                  fontSize: "12px", 
                  padding: "7px 14px", 
                  borderRadius: "10px", 
                  border: "1px solid " + item.color + "33",
                  minWidth: "64px",
                  textAlign: "center"
                }}>
                  {item.code}
                </span>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A", margin: 0 }}>{item.title}</h4>
                  <p style={{ fontSize: "12px", color: "#64748B", margin: "4px 0 0", lineHeight: "1.4" }}>{item.desc}</p>
                </div>
              </div>
              <a 
                href={item.pdfUrl} 
                download 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: "#FFFFFF",
                  padding: "10px 22px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "13px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.32)",
                  transition: "all 0.2s ease"
                }}
              >
                📥 Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== B.PHARM COMPLETE CREATIVE GUIDE (Screenshots 9-13) ===================== */}
      {activeTab === "bpharm" && (
        <div style={{ animation: "fadeIn 0.3s ease", marginBottom: "40px" }}>
          
          {/* Related Study Materials Quick Navigation (Screenshot 9) */}
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>Related B.Pharm Study Materials</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {[
                { title: "B.Pharm All Subject PYQs", icon: "📑", desc: "Previous year semester examination questions" },
                { title: "B.Pharm All Subject Notes", icon: "📚", desc: "Unit-wise handwritten and university lecture notes" },
                { title: "B.Pharm All Subject Syllabus", icon: "📋", desc: "PCI standard subject codes and unit breakdown" }
              ].map((mat, i) => (
                <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.03)", cursor: "pointer", transition: "all 0.2s ease" }}>
                  <div>
                    <span style={{ fontSize: "15px", fontWeight: "800", color: "#0F172A" }}>{mat.icon} {mat.title}</span>
                    <p style={{ fontSize: "12px", color: "#64748B", margin: "4px 0 0" }}>{mat.desc}</p>
                  </div>
                  <span style={{ color: "#2563EB", fontWeight: "900", fontSize: "18px" }}>→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Overview Card */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "32px", boxShadow: "0 6px 20px rgba(0,0,0,0.03)", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#0F172A", margin: "0 0 12px" }}>
              AKTU B.Pharm Syllabus 2026–27 (Complete Academic Reference)
            </h2>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7", marginBottom: "18px" }}>
              The Bachelor of Pharmacy programme under Dr. A.P.J. Abdul Kalam Technical University is structured across 8 semesters, progressing systematically from foundational pharmaceutical chemistry and biological systems to advanced clinical delivery mechanisms, industrial formulation, and pharmacology.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {["Pharmaceutics", "Pharmaceutical Chemistry", "Pharmacology", "Pharmacognosy", "Pharmaceutical Analysis", "Biochemistry", "Microbiology", "Pharmaceutical Biotechnology", "Pharmacy Practice", "Industrial Pharmacy", "Research & Project Work"].map((tag, idx) => (
                <span key={idx} style={{ background: "#F1F5F9", color: "#334155", fontSize: "12px", fontWeight: "700", padding: "6px 14px", borderRadius: "8px" }}>
                  • {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Year-by-Year Curriculum Breakdown (Screenshots 10 & 11) */}
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "18px" }}>
              Semester-Wise & Year-Wise Academic Breakdown
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              
              <div style={{ background: "#FFFFFF", borderRadius: "18px", border: "1px solid #E2E8F0", padding: "24px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "inline-block", background: "#EFF6FF", color: "#2563EB", padding: "4px 12px", borderRadius: "8px", fontWeight: "800", fontSize: "12px", marginBottom: "10px" }}>1st Year • Sem I & II</div>
                <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 10px" }}>Foundational Medical & Chemical Sciences</h4>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#475569", lineHeight: "1.7" }}>
                  <li>Human Anatomy and Physiology (I & II)</li>
                  <li>Pharmaceutical Analysis & Remedial Mathematics/Biology</li>
                  <li>Pharmaceutics I & Inorganic Chemistry</li>
                  <li>Communication Skills & Biochemistry</li>
                  <li>Pathophysiology & Computer Applications in Pharmacy</li>
                </ul>
              </div>

              <div style={{ background: "#FFFFFF", borderRadius: "18px", border: "1px solid #E2E8F0", padding: "24px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "inline-block", background: "#ECFDF5", color: "#059669", padding: "4px 12px", borderRadius: "8px", fontWeight: "800", fontSize: "12px", marginBottom: "10px" }}>2nd Year • Sem III & IV</div>
                <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 10px" }}>Applied Pharmaceutical Sciences & Lab Engineering</h4>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#475569", lineHeight: "1.7" }}>
                  <li>Pharmaceutical Organic Chemistry (II & III)</li>
                  <li>Physical Pharmaceutics (I & II)</li>
                  <li>Pharmaceutical Microbiology & Engineering</li>
                  <li>Medicinal Chemistry I & Pharmacology I</li>
                  <li>Pharmacognosy and Phytochemistry I</li>
                </ul>
              </div>

              <div style={{ background: "#FFFFFF", borderRadius: "18px", border: "1px solid #E2E8F0", padding: "24px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "inline-block", background: "#FEF3C7", color: "#D97706", padding: "4px 12px", borderRadius: "8px", fontWeight: "800", fontSize: "12px", marginBottom: "10px" }}>3rd Year • Sem V & VI</div>
                <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 10px" }}>Drug Design, Clinical Modules & Industrial Tech</h4>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#475569", lineHeight: "1.7" }}>
                  <li>Medicinal Chemistry II & III</li>
                  <li>Industrial Pharmacy I & Pharmacology II & III</li>
                  <li>Herbal Drug Technology & Biopharmaceutics</li>
                  <li>Pharmacokinetics & Pharmaceutical Biotechnology</li>
                  <li>Quality Assurance and GMP Standards</li>
                </ul>
              </div>

              <div style={{ background: "#FFFFFF", borderRadius: "18px", border: "1px solid #E2E8F0", padding: "24px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "inline-block", background: "#FDF2F8", color: "#DB2777", padding: "4px 12px", borderRadius: "8px", fontWeight: "800", fontSize: "12px", marginBottom: "10px" }}>4th Year • Sem VII & VIII</div>
                <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 10px" }}>Advanced Formulations, Clinical Practice & Capstone</h4>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#475569", lineHeight: "1.7" }}>
                  <li>Instrumental Methods of Analysis & Pharmacy Practice</li>
                  <li>Novel Drug Delivery Systems (NDDS)</li>
                  <li>Biostatistics & Research Methodology</li>
                  <li>Social and Preventive Pharmacy</li>
                  <li>PCI Elective Modules & Industrial Capstone Project Work</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Strategy, Mistakes Avoidance & Examination Roadmap (Screenshots 11 & 12) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "22px", marginBottom: "32px" }}>
            
            <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "18px", padding: "26px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", marginBottom: "12px" }}>🎯 How to Use Syllabus for High CGPA & GPAT</h4>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.7" }}>
                <p><strong>1. Divide Syllabus Subject-Wise:</strong> Create a dedicated checklist for each subject and monitor unit completion before sessional exams.</p>
                <p><strong>2. Match Notes with Prescribed Curriculum:</strong> Prevent studying deleted topics and ensure experimental objectives match current practical guidelines.</p>
                <p><strong>3. Previous Year Papers (PYQs) Synergy:</strong> Identify recurring high-weightage topics and long-answer derivations across university question papers.</p>
              </div>
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "18px", padding: "26px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#DC2626", marginBottom: "12px" }}>⚠️ Common Mistakes Pharmacy Students Must Avoid</h4>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#475569", lineHeight: "1.8" }}>
                <li>Studying without cross-checking the latest PCI revised syllabus.</li>
                <li>Using outdated semester materials with expired subject codes.</li>
                <li>Ignoring practical lab experiments and viva calculation components.</li>
                <li>Leaving technical medicinal synthesis reactions until the final week before exams.</li>
              </ul>
            </div>

          </div>

          {/* FAQs Section (Screenshot 12 & 13) */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "30px", boxShadow: "0 4px 16px rgba(0,0,0,0.03)", marginBottom: "36px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "18px" }}>
              Frequently Asked Questions (AKTU B.Pharm)
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { q: "What is the official AKTU B.Pharm syllabus structure?", a: "The AKTU B.Pharm curriculum conforms strictly to the Pharmacy Council of India (PCI) national syllabus across 8 semesters, covering theoretical science, laboratory sessions, industrial training, and a final capstone project." },
                { q: "Does this portal include syllabus access for all 4 years?", a: "Yes, students can download complete university PDFs covering 1st Year, 2nd Year, 3rd Year, and 4th Year including all semester-wise evaluation matrixes." },
                { q: "Where can I download the official AKTU B.Pharm PDF?", a: "Click the blue 'Download PDF' button in the official downloads table above to instantly save the verified curriculum PDF to your device." },
                { q: "Are practical exams included in the syllabus schemes?", a: "Yes, practical courses are an essential component of each semester with prescribed experiments, journal requirements, and internal/external viva weightage." }
              ].map((faq, fIdx) => (
                <div key={fIdx} style={{ border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden" }}>
                  <button 
                    onClick={() => toggleFaq(fIdx)}
                    style={{ 
                      width: "100%", 
                      textAlign: "left", 
                      padding: "16px 20px", 
                      background: openFaq === fIdx ? "#F8FAFC" : "#FFFFFF", 
                      border: "none", 
                      fontWeight: "700", 
                      fontSize: "14px", 
                      color: "#0F172A", 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      cursor: "pointer" 
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: "#2563EB", fontWeight: "bold" }}>{openFaq === fIdx ? "−" : "+"}</span>
                  </button>
                  {openFaq === fIdx && (
                    <div style={{ padding: "14px 20px", background: "#FFFFFF", borderTop: "1px solid #F1F5F9", fontSize: "13px", color: "#64748B", lineHeight: "1.6" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ===================== PERMANENT "JOIN 50,000+ AKTU STUDENTS" BANNER (Strictly above Footer) ===================== */}
      <div style={{ 
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", 
        borderRadius: "20px", 
        padding: "26px 32px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        flexWrap: "wrap", 
        gap: "18px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
        marginTop: "40px"
      }}>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "900", color: "#FFFFFF", margin: "0 0 6px" }}>
            Join 50,000+ AKTU Students
          </h3>
          <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0 }}>
            Get instant semester updates, direct PDF links, exam revision roadmaps & PYQ solutions on WhatsApp & Telegram.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a 
            href="https://chat.whatsapp.com" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              background: "#22C55E", 
              color: "#FFFFFF", 
              padding: "10px 20px", 
              borderRadius: "12px", 
              fontWeight: "700", 
              fontSize: "13px", 
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            💬 WhatsApp Channel
          </a>
          <a 
            href="https://t.me" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              background: "#0284C7", 
              color: "#FFFFFF", 
              padding: "10px 20px", 
              borderRadius: "12px", 
              fontWeight: "700", 
              fontSize: "13px", 
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            ✈️ Telegram Group
          </a>
        </div>
      </div>

    </div>
  );
};

export default SyllabusDirectory;
