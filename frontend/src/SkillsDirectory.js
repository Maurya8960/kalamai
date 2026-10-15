import React, { useState } from "react";

const booksData = [
  // --- CORE CS, C/C++ & ALGORITHMS ---
  {
    id: "cpp",
    title: "C++ Programming Notes",
    subtitle: "Notes for Professionals",
    tagline: "Standard ISO C++98 to C++20",
    cat: "Core CS, C/C++ & Algorithms",
    pages: "600+ Pages",
    icon: "⚙️",
    fileName: "C++NotesForProfessionals.pdf",
    topics: [
      "Object Oriented Programming & Polymorphism",
      "Pointers, Smart Pointers & Memory Management",
      "std::string, std::array, std::vector & Containers",
      "Multithreading, Mutexes & RAII Patterns"
    ]
  },
  {
    id: "c-lang",
    title: "C Language Mastery",
    subtitle: "Notes for Professionals",
    tagline: "ANSI C / C99 / C11 Foundations",
    cat: "Core CS, C/C++ & Algorithms",
    pages: "300+ Pages",
    icon: "🧱",
    fileName: "CNotesForProfessionals.pdf",
    topics: [
      "Pointers Arithmetic & Memory Pointers",
      "Structs, Unions & Low-level System I/O",
      "Preprocessor Directives & Compilation Workflow",
      "Dynamic Memory Allocation (malloc, free)"
    ]
  },
  {
    id: "dsa",
    title: "Algorithms & Data Structures",
    subtitle: "Notes for Professionals",
    tagline: "Competitive Programming & Problem Solving",
    cat: "Core CS, C/C++ & Algorithms",
    pages: "200+ Pages",
    icon: "🧠",
    fileName: "AlgorithmsNotesForProfessionals.pdf",
    topics: [
      "Big-O, Big-Omega & Asymptotic Complexity",
      "Binary Trees, BST, Heaps & Graphs (DFS/BFS)",
      "Dynamic Programming (LCS, Knapsack, Edit Distance)",
      "Sorting Algorithms: Quick, Merge, Bubble & Prim's"
    ]
  },
  {
    id: "java",
    title: "Java Programming Master",
    subtitle: "Notes for Professionals",
    tagline: "Core Java, Multithreading & Streams",
    cat: "Core CS, C/C++ & Algorithms",
    pages: "1000+ Pages",
    icon: "☕",
    fileName: "Java1 2.pdf",
    topics: [
      "OOP Encapsulation, Inheritance & Interfaces",
      "Java Collections Framework (List, Map, Set)",
      "Multithreading, Concurrency & JVM Internals",
      "Java 8+ Lambdas, Functional Interfaces & Streams"
    ]
  },
  {
    id: "kotlin",
    title: "Kotlin Notes for Professionals",
    subtitle: "Notes for Professionals",
    tagline: "Modern Android & Backend JVM Language",
    cat: "Core CS, C/C++ & Algorithms",
    pages: "100+ Pages",
    icon: "🎯",
    fileName: "Kotlin1.pdf",
    topics: [
      "Null Safety & Type Inference",
      "Coroutines & Asynchronous Flow",
      "Extension Functions & Higher Order Lambdas",
      "Kotlin Multiplatform & Android Integration"
    ]
  },
  {
    id: "haskell",
    title: "Haskell Functional Programming",
    subtitle: "Notes for Professionals",
    tagline: "Pure Functional, Monads & Typeclasses",
    cat: "Core CS, C/C++ & Algorithms",
    pages: "150+ Pages",
    icon: "λ",
    fileName: "Haskell1.pdf",
    topics: [
      "Pure Functions, Immutability & Laziness",
      "Functors, Applicatives & Monads",
      "Pattern Matching & Algebraic Data Types",
      "Typeclasses and Category Theory Basics"
    ]
  },

  // --- FRONTEND & JAVASCRIPT ECOSYSTEM ---
  {
    id: "javascript",
    title: "JavaScript Notes for Professionals",
    subtitle: "Notes for Professionals",
    tagline: "Modern ES6+ to ESNext Specification",
    cat: "Frontend, Angular & CSS",
    pages: "450+ Pages",
    icon: "💛",
    fileName: "JavaScript1 2.pdf",
    topics: [
      "Event Loop, Callbacks & Promises (async/await)",
      "Prototypes, Closures & Scope Chain Execution",
      "DOM Traversal, Event Bubbling & Web APIs",
      "ES6 Modules, Destructuring & Generators"
    ]
  },
  {
    id: "react",
    title: "React JS Notes for Professionals",
    subtitle: "Notes for Professionals",
    tagline: "Hooks, Context API, Redux & Virtual DOM",
    cat: "Frontend, Angular & CSS",
    pages: "250+ Pages",
    icon: "⚛️",
    fileName: "ReactJS1.pdf",
    topics: [
      "JSX, Component Lifecycle & Virtual DOM Diffing",
      "React Hooks (useState, useEffect, useMemo, useRef)",
      "State Management with Context API & Redux Toolkit",
      "Server Side Rendering & Performance Optimization"
    ]
  },
  {
    id: "typescript",
    title: "TypeScript Notes for Professionals",
    subtitle: "Notes for Professionals",
    tagline: "Typed JavaScript at Any Scale",
    cat: "Frontend, Angular & CSS",
    pages: "150+ Pages",
    icon: "🔷",
    fileName: "TypeScript1.pdf",
    topics: [
      "Static Typing, Interfaces & Type Aliases",
      "Generics, Utility Types & Type Guards",
      "Decorators, Namespaces & tsconfig Compiler Options",
      "Integrating with React, Node & Express"
    ]
  },
  {
    id: "html5",
    title: "HTML5 Web Architecture",
    subtitle: "Notes for Professionals",
    tagline: "Modern Semantic Web & Storage Standards",
    cat: "Frontend, Angular & CSS",
    pages: "120+ Pages",
    icon: "🌐",
    fileName: "HTML51.pdf",
    topics: [
      "Semantic Tags (header, nav, article, section)",
      "Web Storage (localStorage, sessionStorage, IndexedDB)",
      "Audio, Video & Media Streaming APIs",
      "Accessibility (ARIA) & Responsive Meta Viewports"
    ]
  },
  {
    id: "html5-canvas",
    title: "HTML5 Canvas 2D Graphics",
    subtitle: "Notes for Professionals",
    tagline: "Interactive 2D Rendering & Game Physics",
    cat: "Frontend, Angular & CSS",
    pages: "180+ Pages",
    icon: "🎨",
    fileName: "HTML5Canvas1.pdf",
    topics: [
      "2D Context Drawing Paths, Rectangles & Arcs",
      "Image Transformations, Scaling & Matrix Rotation",
      "Pixel Manipulation (getImageData, putImageData)",
      "requestAnimationFrame Game Loops & Collision"
    ]
  },
  {
    id: "jquery",
    title: "jQuery Library Notes",
    subtitle: "Notes for Professionals",
    tagline: "DOM Manipulation & AJAX Handling",
    cat: "Frontend, Angular & CSS",
    pages: "100+ Pages",
    icon: "⚡",
    fileName: "jQuery1.pdf",
    topics: [
      "Selectors, Traversing & Chaining Syntax",
      "Event Listeners & Animation Queues",
      "AJAX Requests ($.ajax, $.get, $.post)",
      "Custom Plugin Development & DOM Shims"
    ]
  },

  // --- BACKEND, PYTHON, SQL & DATABASES ---
  {
    id: "nodejs",
    title: "Node.js Server Runtime",
    subtitle: "Notes for Professionals",
    tagline: "Asynchronous Event-Driven Backend Services",
    cat: "Backend, Python, SQL & .NET",
    pages: "300+ Pages",
    icon: "🟢",
    fileName: "NodeJS1 2.pdf",
    topics: [
      "Event-Driven Architecture & libuv Event Loop",
      "Streams, Buffers & File System (fs) Modules",
      "RESTful API Development with Express.js",
      "Clustering, Worker Threads & Microservices"
    ]
  },
  {
    id: "python",
    title: "Python 3 & 2 Core Mastery",
    subtitle: "Notes for Professionals",
    tagline: "Object-Oriented, Scripting & Data Engineering",
    cat: "Backend, Python, SQL & .NET",
    pages: "800+ Pages",
    icon: "🐍",
    fileName: "PythonNotesForProfessionals.pdf",
    topics: [
      "Data Structures: Lists, Tuples, Dictionaries & Sets",
      "Decorators, Generators & Context Managers",
      "OOP, Metaclasses & Magic Dunder Methods",
      "Asyncio & Fast Data Processing Pipelines"
    ]
  },
  {
    id: "php",
    title: "PHP Web Development Notes",
    subtitle: "Notes for Professionals",
    tagline: "Modern PHP 7/8 Object-Oriented Backend",
    cat: "Backend, Python, SQL & .NET",
    pages: "400+ Pages",
    icon: "🐘",
    fileName: "PHP1 2.pdf",
    topics: [
      "OOP Classes, Namespaces & Autoloading (Composer)",
      "Database Connections with PDO & Prepared Statements",
      "Session Handling, Cookies & Authentication Security",
      "Building REST APIs & Error Handling"
    ]
  },
  {
    id: "ruby",
    title: "Ruby Programming Notes",
    subtitle: "Notes for Professionals",
    tagline: "Object-Oriented & Scripting Language",
    cat: "Backend, Python, SQL & .NET",
    pages: "200+ Pages",
    icon: "💎",
    fileName: "Ruby1.pdf",
    topics: [
      "Blocks, Procs, Lambdas & Closures",
      "Object Model, Mixins & Metaprogramming",
      "Gems, Bundler & Package Management",
      "File I/O, Enumerable Modules & Regex"
    ]
  },
  {
    id: "rubyonrails",
    title: "Ruby on Rails Framework",
    subtitle: "Notes for Professionals",
    tagline: "Convention Over Configuration MVC Web",
    cat: "Backend, Python, SQL & .NET",
    pages: "220+ Pages",
    icon: "🚂",
    fileName: "RubyOnRails1.pdf",
    topics: [
      "MVC Architecture: Models, Views & Controllers",
      "ActiveRecord ORM, Migrations & Associations",
      "Routing, Middleware & RESTful Resources",
      "Authentication, ActionMailer & Background Jobs"
    ]
  },
  {
    id: "sql",
    title: "SQL & Relational Databases",
    subtitle: "Notes for Professionals",
    tagline: "Queries, Joins, Indexing & Transactions",
    cat: "Backend, Python, SQL & .NET",
    pages: "250+ Pages",
    icon: "🗄️",
    fileName: "SQL1 2.pdf",
    topics: [
      "SELECT Queries, Aggregations & Window Functions",
      "INNER, LEFT, RIGHT & FULL OUTER JOINS",
      "ACID Properties, Indexes & Execution Plans",
      "Subqueries, Common Table Expressions (CTEs)"
    ]
  },
  {
    id: "mysql",
    title: "MySQL Server Architecture",
    subtitle: "Notes for Professionals",
    tagline: "High-Performance Relational Storage Engine",
    cat: "Backend, Python, SQL & .NET",
    pages: "300+ Pages",
    icon: "🐬",
    fileName: "MySQL1 2.pdf",
    topics: [
      "InnoDB Engine, Foreign Keys & Constraints",
      "Stored Procedures, Triggers & Views",
      "Query Optimization, EXPLAIN & Index Tuning",
      "Replication, Backup (mysqldump) & Security"
    ]
  },
  {
    id: "postgresql",
    title: "PostgreSQL Advanced Notes",
    subtitle: "Notes for Professionals",
    tagline: "Enterprise-Grade Object-Relational Database",
    cat: "Backend, Python, SQL & .NET",
    pages: "200+ Pages",
    icon: "🐘",
    fileName: "PostgreSQL1 2.pdf",
    topics: [
      "JSONB Data Types & Document Storage",
      "Partitioning, Connection Pooling & Vacuuming",
      "Full-Text Search & Complex Recursive CTEs",
      "PL/pgSQL Functions & Concurrency MVCC"
    ]
  },
  {
    id: "mongodb",
    title: "MongoDB NoSQL Database",
    subtitle: "Notes for Professionals",
    tagline: "Document Database, Mongoose & Sharding",
    cat: "Backend, Python, SQL & .NET",
    pages: "150+ Pages",
    icon: "🍃",
    fileName: "MongoDB1 2.pdf",
    topics: [
      "BSON Documents, Collections & CRUD Operations",
      "Aggregation Pipeline ($match, $group,$project)",
      "Indexing Strategies (Compound, TTL, Text)",
      "Replica Sets, High Availability & Sharding"
    ]
  },
  {
    id: "mssql",
    title: "Microsoft SQL Server (T-SQL)",
    subtitle: "Notes for Professionals",
    tagline: "Enterprise Relational Database System",
    cat: "Backend, Python, SQL & .NET",
    pages: "350+ Pages",
    icon: "🏛️",
    fileName: "MicrosoftSQLServer1 2.pdf",
    topics: [
      "T-SQL Queries, Variables & Control-of-Flow",
      "Clustered vs Non-Clustered Indexes",
      "SSMS Administration & Backup Schedules",
      "Transactions, Deadlocks & Isolation Levels"
    ]
  },
  {
    id: "hibernate",
    title: "Hibernate ORM Framework",
    subtitle: "Notes for Professionals",
    tagline: "Java Persistence API (JPA) & Mapping",
    cat: "Backend, Python, SQL & .NET",
    pages: "100+ Pages",
    icon: "🔄",
    fileName: "Hibernate1.pdf",
    topics: [
      "Entity Mapping, Annotations & XML Configs",
      "HQL (Hibernate Query Language) & Criteria API",
      "First & Second Level Caching Mechanisms",
      "Lazy vs Eager Loading & N+1 Problem Fixes"
    ]
  },

  // --- MOBILE & CROSS-PLATFORM ---
  {
    id: "react-native",
    title: "React Native Mobile Dev",
    subtitle: "Notes for Professionals",
    tagline: "Native iOS & Android Apps with React",
    cat: "Mobile (Android, iOS & Xamarin)",
    pages: "180+ Pages",
    icon: "📱",
    fileName: "ReactNative1 2.pdf",
    topics: [
      "Native Bridge & New Architecture (Fabric/TurboModules)",
      "Core Components (View, Text, FlatList, ScrollView)",
      "React Navigation (Stack, Tab & Drawer)",
      "Native Device APIs (Camera, GPS, Storage)"
    ]
  },
  {
    id: "swift",
    title: "Swift iOS Programming",
    subtitle: "Notes for Professionals",
    tagline: "Modern Apple iOS, iPadOS & macOS Dev",
    cat: "Mobile (Android, iOS & Xamarin)",
    pages: "300+ Pages",
    icon: "🕊️",
    fileName: "Swift1.pdf",
    topics: [
      "Optionals, Unwrapping & Guard Statements",
      "Protocols, Extensions & Generics",
      "ARC (Automatic Reference Counting) & Memory Leaks",
      "SwiftUI & UIKit Integration Paradigms"
    ]
  },
  {
    id: "objective-c",
    title: "Objective-C Apple Programming",
    subtitle: "Notes for Professionals",
    tagline: "Apple Foundation & Legacy Codebases",
    cat: "Mobile (Android, iOS & Xamarin)",
    pages: "150+ Pages",
    icon: "🍏",
    fileName: "ObjectiveC1.pdf",
    topics: [
      "Message Passing Syntax & Runtime Dispatch",
      "Manual Retain-Release (MRR) & ARC",
      "Protocols, Delegates & Categories",
      "Bridging Objective-C with Modern Swift"
    ]
  },

  // --- GIT, BASH, AUTOMATION & DATA SCIENCE ---
  {
    id: "linux",
    title: "Linux Command Line & Kernel",
    subtitle: "Notes for Professionals",
    tagline: "System Administration, Bash & POSIX",
    cat: "Git, Bash & Automation",
    pages: "250+ Pages",
    icon: "🐧",
    fileName: "Linux1 2.pdf",
    topics: [
      "File System Hierarchy, Permissions (chmod/chown)",
      "Process Management (ps, top, kill, systemctl)",
      "Bash Shell Scripting, Pipes & Redirections",
      "Networking Tools (ssh, scp, netstat, iptables)"
    ]
  },
  {
    id: "powershell",
    title: "PowerShell Automation",
    subtitle: "Notes for Professionals",
    tagline: "Object-Oriented Windows & Cross-Platform Shell",
    cat: "Git, Bash & Automation",
    pages: "180+ Pages",
    icon: "💻",
    fileName: "PowerShell1.pdf",
    topics: [
      "Cmdlets, Pipelines & Object Streams",
      "PowerShell Scripting (.ps1) & Error Handling",
      "Active Directory & Windows Administration",
      "PowerShell Core (Cross-Platform on Linux/macOS)"
    ]
  },
  {
    id: "perl",
    title: "Perl Scripting Language",
    subtitle: "Notes for Professionals",
    tagline: "Text Processing, System Admin & Regex",
    cat: "Git, Bash & Automation",
    pages: "180+ Pages",
    icon: "🐪",
    fileName: "Perl1.pdf",
    topics: [
      "Scalars, Arrays, Hashes & Context Evaluation",
      "Advanced Regular Expression Engine",
      "File Handles, Directory Parsing & System Calls",
      "CPAN Modules & Practical Automation Scripts"
    ]
  },
  {
    id: "r-lang",
    title: "R for Data Science & Stats",
    subtitle: "Notes for Professionals",
    tagline: "Statistical Computing, Visuals & Modeling",
    cat: "Git, Bash & Automation",
    pages: "250+ Pages",
    icon: "📊",
    fileName: "R1.pdf",
    topics: [
      "Vectors, Matrices, DataFrames & Factors",
      "Data Manipulation with dplyr & tidyverse",
      "Data Visualization with ggplot2",
      "Statistical Hypothesis Testing & Regression"
    ]
  },
  {
    id: "matlab",
    title: "MATLAB Scientific Computing",
    subtitle: "Notes for Professionals",
    tagline: "Engineering Mathematics, Matrix & Signals",
    cat: "Git, Bash & Automation",
    pages: "200+ Pages",
    icon: "🔬",
    fileName: "MATLAB1.pdf",
    topics: [
      "Matrix Algebra, Vectors & Linear Systems",
      "2D/3D Plotting & Graphical Engineering Displays",
      "Signal Processing, FFT & Filter Design",
      "Differential Equations & Numerical Solvers"
    ]
  },
  {
    id: "latex",
    title: "LaTeX Document Preparation",
    subtitle: "Notes for Professionals",
    tagline: "Typesetting Papers, Theses & Math Equations",
    cat: "Git, Bash & Automation",
    pages: "150+ Pages",
    icon: "📄",
    fileName: "LaTeX1.pdf",
    topics: [
      "Document Classes (article, report, book)",
      "Mathematical Formulas, Matrices & Greek Symbols",
      "BibTeX Bibliography & Citation Management",
      "Tables, Multi-column Layouts & Figure Floats"
    ]
  },
  {
    id: "vba",
    title: "VBA for Microsoft Office",
    subtitle: "Notes for Professionals",
    tagline: "Excel Macros, Automations & Office APIs",
    cat: "Git, Bash & Automation",
    pages: "200+ Pages",
    icon: "📈",
    fileName: "VBA1.pdf",
    topics: [
      "Excel Object Model (Workbooks, Sheets, Ranges)",
      "Subroutines, Functions & Event Listeners",
      "UserForms, Custom Controls & Dialog Boxes",
      "Automating Repetitive Corporate Spreadsheets"
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
              OFFICIAL DEVELOPER COMPILATIONS • {booksData.length} TECH BOOKS • 12,000+ PAGES
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

      {/* Books Cards Grid */}
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
              {/* Card Header */}
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

              {/* Tagline */}
              <div style={{ fontSize: "12px", fontWeight: "800", color: "#EA580C", marginBottom: "14px" }}>
                {book.tagline}
              </div>

              {/* Key Topics Box */}
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

            {/* Direct Download Button */}
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
