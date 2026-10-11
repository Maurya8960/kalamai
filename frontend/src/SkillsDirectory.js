import React, { useState } from "react";

const SkillsDirectory = () => {
  const [filter, setFilter] = useState("all");

  const skillBooks = [
    // --- 1. CORE & SYSTEMS ---
    {
      id: "cpp",
      category: "core",
      title: "C++ Programming Notes",
      subtitle: "Notes for Professionals",
      pages: "600+ Pages",
      edition: "Standard ISO C++98 to C++20",
      icon: "⚙️",
      color: "#2563EB",
      bgGradient: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
      badgeColor: "#1D4ED8",
      highlights: [
        "Object Oriented Programming & Polymorphism",
        "Pointers, Smart Pointers & Memory Management",
        "std::string, std::array, std::vector & Containers",
        "Multithreading, Mutexes & RAII Patterns"
      ],
      filename: "CPlusPlus0.pdf"
    },
    {
      id: "c-lang",
      category: "core",
      title: "C Language Mastery",
      subtitle: "Notes for Professionals",
      pages: "300+ Pages",
      edition: "ANSI C / C99 / C11 Foundations",
      icon: "🧱",
      color: "#0284C7",
      bgGradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
      badgeColor: "#0369A1",
      highlights: [
        "Pointers Arithmetic & Memory Pointers",
        "Structs, Unions & Low-level System I/O",
        "Preprocessor Directives & Compilation Workflow",
        "Dynamic Memory Allocation (malloc, free)"
      ],
      filename: "C1.pdf"
    },
    {
      id: "algo",
      category: "core",
      title: "Algorithms & Data Structures",
      subtitle: "Notes for Professionals",
      pages: "200+ Pages",
      edition: "Competitive Programming & Problem Solving",
      icon: "🧠",
      color: "#7C3AED",
      bgGradient: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
      badgeColor: "#6D28D9",
      highlights: [
        "Big-O, Big-Omega & Asymptotic Complexity",
        "Binary Trees, BST, Heaps & Graphs (DFS/BFS)",
        "Dynamic Programming (LCS, Knapsack, Edit Distance)",
        "Sorting Algorithms: Quick, Merge, Bubble & Prim's"
      ],
      filename: "Algorithms0.pdf"
    },

    // --- 2. BACKEND, CLOUD & DATABASES ---
    {
      id: "spring",
      category: "backend",
      title: "Spring Framework & Boot",
      subtitle: "Notes for Professionals",
      pages: "50+ Pages",
      edition: "Enterprise Java & Dependency Injection",
      icon: "🌱",
      color: "#16A34A",
      bgGradient: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
      badgeColor: "#15803D",
      highlights: [
        "Inversion of Control (IoC) & Application Context",
        "Spring Beans, Annotations & Auto-wiring",
        "Spring Data JPA, Hibernate & Transaction Mgmt",
        "REST APIs, Security & Actuator Monitoring"
      ],
      filename: "SpringFramework.pdf"
    },
    {
      id: "sql",
      category: "backend",
      title: "SQL & Relational Databases",
      subtitle: "Notes for Professionals",
      pages: "100+ Pages",
      edition: "ANSI SQL, Joins & Query Tuning",
      icon: "💾",
      color: "#0284C7",
      bgGradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
      badgeColor: "#0369A1",
      highlights: [
        "Complex Joins (Inner, Left, Cross, Outer)",
        "Subqueries, Window Functions & CTEs",
        "Indexing, Primary/Foreign Keys & Constraints",
        "Transactions, ACID Properties & Query Optimization"
      ],
      filename: "SQL.pdf"
    },
    {
      id: "python",
      category: "backend",
      title: "Python 3 & 2 Architecture",
      subtitle: "Notes for Professionals",
      pages: "800+ Pages",
      edition: "Pythonic Best Practices & PEP8",
      icon: "🐍",
      color: "#059669",
      bgGradient: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
      badgeColor: "#047857",
      highlights: [
        "Core Data Types, Comprehensions & Generators",
        "Decorators, Metaclasses & Context Managers",
        "Multiprocessing, Threading & Asyncio",
        "Data Science Foundations & File I/O Workflows"
      ],
      filename: "Python0.pdf"
    },
    {
      id: "csharp",
      category: "backend",
      title: "C# Programming Handbook",
      subtitle: "Notes for Professionals",
      pages: "700+ Pages",
      edition: "C# 6.0 to C# 10 & CLR Runtimes",
      icon: "🔷",
      color: "#4338CA",
      bgGradient: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
      badgeColor: "#3730A3",
      highlights: [
        "LINQ Queries, Expressions & Lambdas",
        "Async / Await Task Parallel Library",
        "Delegates, Events & Generic Collections",
        "Reflection, Dependency Injection & Interfaces"
      ],
      filename: "CSharp1.pdf"
    },
    {
      id: "vb-net",
      category: "backend",
      title: "Visual Basic .NET",
      subtitle: "Notes for Professionals",
      pages: "100+ Pages",
      edition: "VB.NET & Windows Application Development",
      icon: "📑",
      color: "#0284C7",
      bgGradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
      badgeColor: "#075985",
      highlights: [
        "Object Oriented Programming in VB.NET",
        "Event-Driven Architecture & WinForms",
        "Database Connections via ADO.NET",
        "Exception Handling & Delegates Management"
      ],
      filename: "VisualBasic_NET.pdf"
    },
    {
      id: "dotnet",
      category: "backend",
      title: ".NET Framework Architecture",
      subtitle: "Notes for Professionals",
      pages: "100+ Pages",
      edition: "Enterprise .NET & Web API Frameworks",
      icon: "🌐",
      color: "#1E40AF",
      bgGradient: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
      badgeColor: "#1E3A8A",
      highlights: [
        "Common Language Runtime (CLR) & Assemblies",
        "Memory Management & Garbage Collector",
        "ASP.NET Web API & RESTful Services",
        "Configuration, AppDomains & Windows Services"
      ],
      filename: "DotNETFramework1.pdf"
    },
    {
      id: "entity-framework",
      category: "backend",
      title: "Entity Framework ORM",
      subtitle: "Notes for Professionals",
      pages: "80+ Pages",
      edition: "Database First & Code First Systems",
      icon: "🗄️",
      color: "#047857",
      bgGradient: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
      badgeColor: "#065F46",
      highlights: [
        "Code-First Migrations & Fluent API",
        "LINQ to Entities & Eager/Lazy Loading",
        "Relationships, Foreign Keys & Cascades",
        "Stored Procedures & Performance Profiling"
      ],
      filename: "EntityFramework1.pdf"
    },

    // --- 3. FRONTEND & WEB ---
    {
      id: "angular",
      category: "frontend",
      title: "Angular Modern Framework",
      subtitle: "Notes for Professionals",
      pages: "200+ Pages",
      edition: "Angular 2+ Components & TypeScript",
      icon: "🅰️",
      color: "#DC2626",
      bgGradient: "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
      badgeColor: "#991B1B",
      highlights: [
        "Directives, Pipes, Components & Data Binding",
        "RxJS Observables & Reactive Forms",
        "Services, Dependency Injection & Routing Guards",
        "HTTP Client & State Management Systems"
      ],
      filename: "Angular0.pdf"
    },
    {
      id: "angularjs",
      category: "frontend",
      title: "AngularJS Legacy Notes",
      subtitle: "Notes for Professionals",
      pages: "100+ Pages",
      edition: "AngularJS 1.x Architecture",
      icon: "🛡️",
      color: "#B91C1C",
      bgGradient: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
      badgeColor: "#881337",
      highlights: [
        "Controllers, Scopes ($scope) & Digest Cycles",
        "Two-Way Data Binding & Custom Directives",
        "Filters, Factories & Providers Architecture",
        "$http Service & Module Injection"
      ],
      filename: "AngularJS1.pdf"
    },
    {
      id: "css",
      category: "frontend",
      title: "CSS & Web Styling",
      subtitle: "Notes for Professionals",
      pages: "200+ Pages",
      edition: "CSS3, Flexbox & Modern Grid",
      icon: "🎨",
      color: "#0891B2",
      bgGradient: "linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)",
      badgeColor: "#0E7490",
      highlights: [
        "Flexbox Layouts & Responsive CSS Grid",
        "Keyframe Animations, Transitions & Transforms",
        "Media Queries, Viewport & Mobile-First Styling",
        "Pseudo-classes, Variables & Modern Selectors"
      ],
      filename: "CSS1.pdf"
    },

    // --- 4. MOBILE DEVELOPMENT ---
    {
      id: "xamarin",
      category: "mobile",
      title: "Xamarin.Forms Cross-Platform",
      subtitle: "Notes for Professionals",
      pages: "100+ Pages",
      edition: "iOS & Android Unified Mobile C#",
      icon: "📱",
      color: "#2563EB",
      bgGradient: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
      badgeColor: "#1E40AF",
      highlights: [
        "XAML UI Layouts & ContentViews",
        "MVVM Pattern & Data Binding in Mobile",
        "Custom Renderers & Platform Specifics",
        "Navigation, SQLite & DependencyService"
      ],
      filename: "XamarinForms.pdf"
    },
    {
      id: "android",
      category: "mobile",
      title: "Android Native Engineering",
      subtitle: "Notes for Professionals",
      pages: "1000+ Pages",
      edition: "Android Studio & Jetpack Systems",
      icon: "🤖",
      color: "#D97706",
      bgGradient: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
      badgeColor: "#B45309",
      highlights: [
        "Custom Views, ViewGroups & ConstraintLayout",
        "RecyclerView, Adapters & Endless Scrolling",
        "Retrofit2, OkHttp, Volley & API Integrations",
        "Firebase, SQLite, Architecture Components & Services"
      ],
      filename: "Android0.pdf"
    },
    {
      id: "ios",
      category: "mobile",
      title: "iOS & Swift Development",
      subtitle: "Notes for Professionals",
      pages: "800+ Pages",
      edition: "Xcode, UIKit & Cocoa Touch",
      icon: "🍏",
      color: "#EA580C",
      bgGradient: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
      badgeColor: "#C2410C",
      highlights: [
        "UIKit, Storyboard, Autolayout & Size Classes",
        "UITableView, UICollectionView & Custom Cells",
        "Push Notifications & Grand Central Dispatch (GCD)",
        "CoreData, Networking (Alamofire/URLSession) & Memory"
      ],
      filename: "iOS0.pdf"
    },

    // --- 5. DEVOPS, SCRIPTS & AUTOMATION ---
    {
      id: "git",
      category: "tools",
      title: "Git Version Control Guide",
      subtitle: "Notes for Professionals",
      pages: "100+ Pages",
      edition: "Git Core, Branching & Merge Strategies",
      icon: "🌿",
      color: "#EA580C",
      bgGradient: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
      badgeColor: "#9A3412",
      highlights: [
        "Branching Workflows, Stashing & Merging",
        "Rebase, Cherry-Pick & Resolving Conflicts",
        "Remote Tracking, GitHub Pull Requests & Tags",
        "Git Hooks, Submodules & Clean History"
      ],
      filename: "Git1.pdf"
    },
    {
      id: "bash",
      category: "tools",
      title: "Bash Scripting & CLI",
      subtitle: "Notes for Professionals",
      pages: "100+ Pages",
      edition: "Shell Automation & Linux Admin",
      icon: "💻",
      color: "#334155",
      bgGradient: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
      badgeColor: "#1E293B",
      highlights: [
        "Shell Script Structure, Loops & Conditional Tests",
        "Pipes, Redirection (stdin/stdout) & Awk/Sed",
        "Environment Variables & Cron Automation",
        "Process Control, Signals & Error Handling"
      ],
      filename: "Bash1.pdf"
    },
    {
      id: "excel-vba",
      category: "tools",
      title: "Excel VBA & Macros",
      subtitle: "Notes for Professionals",
      pages: "100+ Pages",
      edition: "Data Processing & Office Automation",
      icon: "📊",
      color: "#15803D",
      bgGradient: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
      badgeColor: "#166534",
      highlights: [
        "Automating Spreadsheets, Workbooks & Ranges",
        "VBA Loops, User Forms & Event Handlers",
        "Custom Functions (UDF) & Fast Calculation Macros",
        "Data Import / Export & Report Generation"
      ],
      filename: "ExcelVBA1.pdf"
    }
  ];

  const filteredBooks = filter === "all" ? skillBooks : skillBooks.filter(b => b.category === filter);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px 80px", fontFamily: "inherit" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px", fontWeight: "500" }}>
        <span>Home</span> <span style={{ margin: "0 6px" }}>›</span> <span style={{ color: "#0F172A", fontWeight: "700" }}>Engineering Skills & Professional Books Vault</span>
      </div>

      {/* Header Banner */}
      <div style={{ marginBottom: "26px" }}>
        <span style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
          color: "#C2410C",
          fontSize: "12px",
          fontWeight: "800",
          letterSpacing: "0.5px",
          padding: "6px 14px",
          borderRadius: "8px",
          marginBottom: "12px",
          border: "1px solid #FED7AA",
          textTransform: "uppercase"
        }}>
          OFFICIAL DEVELOPER COMPILATIONS • 19 TECH BOOKS • 5800+ PAGES
        </span>
        <h1 style={{ fontSize: "34px", fontWeight: "900", color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
          Engineering Skills & Career Vault ⚡
        </h1>
        <p style={{ color: "#475569", fontSize: "15px", margin: 0, lineHeight: "1.6" }}>
          Industry-tested computer science notes, frameworks, and programming books. Filter by domain and download complete high-quality reference PDFs directly.
        </p>
      </div>

      {/* Domain Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px" }}>
        {[
          { id: "all", label: "All Tech Books (19)" },
          { id: "core", label: "Core CS, C/C++ & Algorithms" },
          { id: "backend", label: "Backend, Python, SQL & .NET" },
          { id: "frontend", label: "Frontend, Angular & CSS" },
          { id: "mobile", label: "Mobile (Android, iOS & Xamarin)" },
          { id: "tools", label: "Git, Bash & Automation" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: "9px 18px",
              borderRadius: "8px",
              border: filter === tab.id ? "1.5px solid #EA580C" : "1px solid #E2E8F0",
              background: filter === tab.id ? "#EA580C" : "#FFFFFF",
              color: filter === tab.id ? "#FFFFFF" : "#334155",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Responsive Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1.5px solid #FED7AA",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 8px 24px rgba(234, 88, 12, 0.05)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 14px 32px rgba(234, 88, 12, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(234, 88, 12, 0.05)";
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: book.bgGradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px"
                  }}>
                    {book.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "17.5px", fontWeight: "900", color: "#0F172A", margin: 0 }}>
                      {book.title}
                    </h3>
                    <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>
                      {book.subtitle}
                    </span>
                  </div>
                </div>
                <span style={{
                  background: "#FFF7ED",
                  color: book.badgeColor,
                  border: "1px solid #FED7AA",
                  fontSize: "11px",
                  fontWeight: "800",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  whiteSpace: "nowrap"
                }}>
                  {book.pages}
                </span>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#EA580C" }}>
                  {book.edition}
                </span>
              </div>

              <div style={{ background: "#F8FAFC", borderRadius: "10px", padding: "12px 14px", marginBottom: "20px", border: "1px solid #E2E8F0" }}>
                <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: "800", color: "#334155", textTransform: "uppercase" }}>
                  Key Topics & Syllabus:
                </p>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12.5px", color: "#475569", lineHeight: "1.6" }}>
                  {book.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Download Button */}
            <div>
              <a
                href={"/" + book.filename}
                download={book.filename}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)",
                  color: "#FFFFFF",
                  padding: "11px 16px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: "13px",
                  boxShadow: "0 4px 14px rgba(234, 88, 12, 0.25)",
                  transition: "all 0.2s ease"
                }}
              >
                <span>📥</span> Download Complete PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDirectory;
