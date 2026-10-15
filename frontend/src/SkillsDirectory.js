import React, { useState } from "react";

const booksData = [
  // --- FRONTEND & JAVASCRIPT ---
  {
    id: "reactjs",
    title: "React JS Notes",
    subtitle: "Notes for Professionals",
    tagline: "Hooks, Redux, Context API & Components",
    cat: "Frontend, Angular & CSS",
    pages: "250+ Pages",
    icon: "⚛️",
    fileName: "ReactJS1.pdf",
    topics: [
      "Components, Props & State Management",
      "React Hooks (useState, useEffect, useMemo)",
      "Context API, Redux Toolkit & Routing",
      "Performance Tuning & Clean Architecture"
    ]
  },
  {
    id: "react-native",
    title: "React Native Mobile Dev",
    subtitle: "Notes for Professionals",
    tagline: "Cross-Platform Android & iOS Applications",
    cat: "Mobile (Android, iOS & Xamarin)",
    pages: "200+ Pages",
    icon: "📱",
    fileName: "ReactNative1_2.pdf",
    topics: [
      "Native Components: View, Text, FlatList",
      "Navigation Stacks, Tabs & Drawers",
      "Native Modules & Device Hardware APIs",
      "Building APKs & Production Deployment"
    ]
  },
  {
    id: "typescript",
    title: "TypeScript Mastery",
    subtitle: "Notes for Professionals",
    tagline: "Typed JavaScript at Enterprise Scale",
    cat: "Frontend, Angular & CSS",
    pages: "180+ Pages",
    icon: "🔷",
    fileName: "TypeScript1.pdf",
    topics: [
      "Types, Interfaces, Enums & Generics",
      "Type Narrowing, Guards & Utility Types",
      "Configuring tsconfig & Compilation Targets",
      "Integration with React and Node.js Backends"
    ]
  },

  // --- BACKEND & RUNTIMES ---
  {
    id: "nodejs",
    title: "Node.js Server Architecture",
    subtitle: "Notes for Professionals",
    tagline: "Asynchronous Event-Driven Backend Services",
    cat: "Backend, Python, SQL & .NET",
    pages: "300+ Pages",
    icon: "🟢",
    fileName: "NodeJS1_2.pdf",
    topics: [
      "Event Loop, Streams, Buffers & File System",
      "RESTful API Development with Express",
      "Authentication, JWT & Security Best Practices",
      "Clustering & Scalable Microservices"
    ]
  },
  {
    id: "php",
    title: "PHP Web Development",
    subtitle: "Notes for Professionals",
    tagline: "Modern Object-Oriented Web Engineering",
    cat: "Backend, Python, SQL & .NET",
    pages: "400+ Pages",
    icon: "🐘",
    fileName: "PHP1_2.pdf",
    topics: [
      "OOP Classes, Namespaces & Autoloading",
      "PDO Secure Database Operations",
      "Session Handling, Security & Cookies",
      "RESTful API Architecture in Modern PHP"
    ]
  },
  {
    id: "ruby",
    title: "Ruby Programming",
    subtitle: "Notes for Professionals",
    tagline: "Pure Object-Oriented Scripting Power",
    cat: "Backend, Python, SQL & .NET",
    pages: "200+ Pages",
    icon: "💎",
    fileName: "Ruby1.pdf",
    topics: [
      "Blocks, Procs, Lambdas & Closures",
      "Object Model, Mixins & Modules",
      "File I/O, Regex & System Scripting",
      "Gem Packaging & Ecosystem Management"
    ]
  },
  {
    id: "rubyonrails",
    title: "Ruby on Rails Framework",
    subtitle: "Notes for Professionals",
    tagline: "Rapid MVC Web Application Engineering",
    cat: "Backend, Python, SQL & .NET",
    pages: "250+ Pages",
    icon: "🚂",
    fileName: "RubyOnRails1.pdf",
    topics: [
      "MVC: Models, Views, and Controllers",
      "ActiveRecord Migrations & Relationships",
      "RESTful Routes & Resource Controllers",
      "Background Workers, Mailers & APIs"
    ]
  },

  // --- DATABASES & STORAGE ---
  {
    id: "sql",
    title: "SQL & Query Optimization",
    subtitle: "Notes for Professionals",
    tagline: "Standard Relational Database Operations",
    cat: "Backend, Python, SQL & .NET",
    pages: "250+ Pages",
    icon: "🗄️",
    fileName: "SQL1_2.pdf",
    topics: [
      "Complex Queries, Aggregations & Windows",
      "Multi-table Joins, Subqueries & CTEs",
      "Indexes, Constraints & Transactions (ACID)",
      "Database Normalization & Performance Tuning"
    ]
  },
  {
    id: "mysql",
    title: "MySQL Database Server",
    subtitle: "Notes for Professionals",
    tagline: "High-Performance Open-Source Database",
    cat: "Backend, Python, SQL & .NET",
    pages: "300+ Pages",
    icon: "🐬",
    fileName: "MySQL1_2.pdf",
    topics: [
      "InnoDB Storage Engine & Foreign Keys",
      "Stored Procedures, Triggers & Views",
      "Query Profiling & EXPLAIN Optimization",
      "Backups, Replication & Security Grants"
    ]
  },
  {
    id: "postgresql",
    title: "PostgreSQL Advanced DB",
    subtitle: "Notes for Professionals",
    tagline: "Enterprise Object-Relational Database",
    cat: "Backend, Python, SQL & .NET",
    pages: "220+ Pages",
    icon: "🐘",
    fileName: "PostgreSQL1_2.pdf",
    topics: [
      "JSONB Columns & Semi-Structured Data",
      "Partitioning, Connection Pooling & Vacuuming",
      "Advanced Window Functions & CTEs",
      "Full-Text Search & PL/pgSQL Functions"
    ]
  },
  {
    id: "mongodb",
    title: "MongoDB NoSQL Engine",
    subtitle: "Notes for Professionals",
    tagline: "Scalable Document-Oriented Database",
    cat: "Backend, Python, SQL & .NET",
    pages: "160+ Pages",
    icon: "🍃",
    fileName: "MongoDB1_2.pdf",
    topics: [
      "BSON Documents, Collections & CRUD",
      "Aggregation Framework ($group,$match)",
      "Index Architectures & Schema Validation",
      "Sharding & Replica Set Configurations"
    ]
  },
  {
    id: "mssql",
    title: "Microsoft SQL Server",
    subtitle: "Notes for Professionals",
    tagline: "Enterprise T-SQL & Database Administration",
    cat: "Backend, Python, SQL & .NET",
    pages: "350+ Pages",
    icon: "🏛️",
    fileName: "MicrosoftSQLServer1_2.pdf",
    topics: [
      "Transact-SQL (T-SQL) Programming",
      "Clustered vs Non-Clustered Indexes",
      "Transaction Locks, Isolation & Deadlocks",
      "SSMS Administration & Backup Strategies"
    ]
  },

  // --- MOBILE & APPLE PLATFORMS ---
  {
    id: "swift",
    title: "Swift for iOS & macOS",
    subtitle: "Notes for Professionals",
    tagline: "Modern Apple Ecosystem Programming",
    cat: "Mobile (Android, iOS & Xamarin)",
    pages: "300+ Pages",
    icon: "🕊️",
    fileName: "Swift1.pdf",
    topics: [
      "Optionals, Enums & Pattern Matching",
      "Protocols, Extensions & Generics",
      "ARC Memory Management & Closures",
      "SwiftUI Paradigms & Architecture"
    ]
  },
  {
    id: "objective-c",
    title: "Objective-C Foundations",
    subtitle: "Notes for Professionals",
    tagline: "Apple Foundation & Legacy Codebases",
    cat: "Mobile (Android, iOS & Xamarin)",
    pages: "150+ Pages",
    icon: "🍏",
    fileName: "ObjectiveC1.pdf",
    topics: [
      "Message Dispatch & Runtime Fundamentals",
      "Manual Retain-Release (MRR) & ARC",
      "Protocols, Categories & Delegates",
      "Bridging Objective-C with Modern Swift"
    ]
  },

  // --- OS, SCRIPTING & AUTOMATION ---
  {
    id: "linux",
    title: "Linux Command Line & Admin",
    subtitle: "Notes for Professionals",
    tagline: "System Administration, Bash & POSIX",
    cat: "Git, Bash & Automation",
    pages: "250+ Pages",
    icon: "🐧",
    fileName: "Linux1_2.pdf",
    topics: [
      "Shell Navigation, Permissions (chmod/chown)",
      "Process Management (systemctl, top, kill)",
      "Bash Scripting, Streams, Pipes & Sed/Awk",
      "Network Configurations & SSH Security"
    ]
  },
  {
    id: "powershell",
    title: "PowerShell Scripting",
    subtitle: "Notes for Professionals",
    tagline: "Object-Oriented Automation Shell",
    cat: "Git, Bash & Automation",
    pages: "180+ Pages",
    icon: "💻",
    fileName: "PowerShell1.pdf",
    topics: [
      "Cmdlets, Pipelines & Object Streams",
      "PowerShell Scripting (.ps1) & Workflows",
      "System Administration & Remote Management",
      "Cross-Platform PowerShell Core"
    ]
  },
  {
    id: "perl",
    title: "Perl Scripting Language",
    subtitle: "Notes for Professionals",
    tagline: "High-Performance Text & System Scripting",
    cat: "Git, Bash & Automation",
    pages: "180+ Pages",
    icon: "🐪",
    fileName: "Perl1.pdf",
    topics: [
      "Scalars, Arrays, Hashes & References",
      "Regular Expressions & Text Parsing",
      "File Handles, Directory Operations & I/O",
      "CPAN Module Integration & Automation"
    ]
  },
  {
    id: "vba",
    title: "VBA for Microsoft Office",
    subtitle: "Notes for Professionals",
    tagline: "Excel Macros & Office Automation",
    cat: "Git, Bash & Automation",
    pages: "200+ Pages",
    icon: "📈",
    fileName: "VBA1.pdf",
    topics: [
      "Excel Object Hierarchy (Workbooks, Ranges)",
      "Subroutines, Custom Functions & Events",
      "UserForms, Dialogs & UI Automation",
      "Automating Repetitive Spreadsheet Tasks"
    ]
  },

  // --- DATA SCIENCE & SCIENTIFIC COMPUTING ---
  {
    id: "r-lang",
    title: "R for Statistical Analysis",
    subtitle: "Notes for Professionals",
    tagline: "Data Science, Visualization & Modeling",
    cat: "Core CS, C/C++ & Algorithms",
    pages: "250+ Pages",
    icon: "📊",
    fileName: "R1.pdf",
    topics: [
      "Data Frames, Vectors, Lists & Matrices",
      "Data Wrangling with tidyverse & dplyr",
      "Publication Visuals using ggplot2",
      "Statistical Hypothesis Tests & Regression"
    ]
  },
  {
    id: "matlab",
    title: "MATLAB Engineering Computing",
    subtitle: "Notes for Professionals",
    tagline: "Matrix Mathematics & Signal Processing",
    cat: "Core CS, C/C++ & Algorithms",
    pages: "200+ Pages",
    icon: "🔬",
    fileName: "MATLAB1.pdf",
    topics: [
      "Matrix Arithmetic, Linear Systems & Solvers",
      "2D/3D Technical Plotting & Visuals",
      "Signal Processing Toolbox & Fourier Transforms",
      "Simulink Fundamentals & Numerical Modeling"
    ]
  }
];

const categoryTabs = [
  "All Tech Books",
  "Core CS, C/C++ & Algorithms",
  "Backend, Python, SQL & .NET",
  "Frontend, Angular & CSS",
  "Mobile (Android, iOS & Xamarin)",
  "Git, Bash & Automation"
];

export default function SkillsDirectory({ onBackToHome }) {
  const [selectedCat, setSelectedCat] = useState("All Tech Books");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = booksData.filter((b) => {
    const matchesCat =
      selectedCat === "All Tech Books" ||
      b.cat.toLowerCase().trim() === selectedCat.toLowerCase().trim();
    const matchesSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px 80px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <span onClick={onBackToHome} style={{ fontSize: "13px", color: "#64748B", cursor: "pointer", fontWeight: "600" }}>Home ›</span>
        <span style={{ fontSize: "13px", color: "#EA580C", fontWeight: "800" }}>Engineering Skills & Professional Books Vault</span>
      </div>

      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)",
        border: "1.5px solid rgba(234, 88, 12, 0.2)",
        borderRadius: "28px",
        padding: "36px 32px",
        marginBottom: "28px",
        boxShadow: "0 10px 30px rgba(234, 88, 12, 0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "24px"
      }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FFF7ED", border: "1px solid #FFEDD5", padding: "5px 14px", borderRadius: "999px", marginBottom: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#EA580C", letterSpacing: "0.6px", textTransform: "uppercase" }}>
              OFFICIAL DEVELOPER COMPILATIONS • {booksData.length} TECH BOOKS
            </span>
          </div>
          <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.8px" }}>
            Engineering Skills & Career Vault ⚡
          </h1>
          <p style={{ fontSize: "15px", color: "#64748B", margin: 0, maxWidth: "680px", lineHeight: "1.6" }}>
            Industry-tested computer science notes, frameworks, and programming books. Filter by domain and download complete high-quality reference PDFs directly.
          </p>
        </div>

        <div style={{ minWidth: "280px" }}>
          <input
            type="text"
            placeholder="🔍 Search tech books or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 18px",
              borderRadius: "14px",
              border: "1.5px solid #CBD5E1",
              fontSize: "14px",
              fontWeight: "600",
              outline: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
            }}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
        {categoryTabs.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            style={{
              background: selectedCat === cat ? "#EA580C" : "#FFFFFF",
              color: selectedCat === cat ? "#FFFFFF" : "#475569",
              border: selectedCat === cat ? "1.5px solid #EA580C" : "1.5px solid #E2E8F0",
              padding: "8px 18px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: selectedCat === cat ? "0 4px 12px rgba(234, 88, 12, 0.25)" : "none"
            }}
          >
            {cat} {cat === "All Tech Books" ? `(${booksData.length})` : ""}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: "24px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
              transition: "all 0.25s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#EA580C";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(234, 88, 12, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.03)";
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                    {book.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: "0 0 2px" }}>{book.title}</h3>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748B" }}>{book.subtitle}</div>
                  </div>
                </div>
                <span style={{ fontSize: "10px", fontWeight: "800", color: "#2563EB", background: "#EFF6FF", padding: "4px 10px", borderRadius: "8px", border: "1px solid #BFDBFE" }}>
                  {book.pages}
                </span>
              </div>

              <div style={{ fontSize: "12px", fontWeight: "800", color: "#EA580C", marginBottom: "14px" }}>
                {book.tagline}
              </div>

              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "14px", marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: "800", color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                  KEY TOPICS & SYLLABUS:
                </div>
                <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#475569", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {book.topics.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={`/notes/${book.fileName}`}
              download={book.fileName}
              style={{
                background: "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)",
                color: "#FFFFFF",
                padding: "12px 20px",
                borderRadius: "12px",
                fontWeight: "800",
                fontSize: "13px",
                textAlign: "center",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(234, 88, 12, 0.25)"
              }}
            >
              <span>📥</span> Download Complete PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
