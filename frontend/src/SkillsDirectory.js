import React, { useState } from "react";

const SkillsDirectory = () => {
  const [filter, setFilter] = useState("all");

  const skillBooks = [
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
      color: "#DC2626",
      bgGradient: "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
      badgeColor: "#B91C1C",
      highlights: [
        "UIKit, Storyboard, Autolayout & Size Classes",
        "UITableView, UICollectionView & Custom Cells",
        "Push Notifications & Grand Central Dispatch (GCD)",
        "CoreData, Networking (Alamofire/URLSession) & Memory"
      ],
      filename: "iOS0.pdf"
    }
  ];

  const filteredBooks = filter === "all" ? skillBooks : skillBooks.filter(b => b.category === filter);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px 80px", fontFamily: "inherit" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px", fontWeight: "500" }}>
        <span>Home</span> <span style={{ margin: "0 6px" }}>›</span> <span style={{ color: "#0F172A", fontWeight: "700" }}>Software Engineering & Skills Vault</span>
      </div>

      {/* Header Tag & Heading */}
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
          HANDPICKED TECH PROFESSIONAL COMPILATIONS • 3400+ PAGES
        </span>
        <h1 style={{ fontSize: "34px", fontWeight: "900", color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
          Engineering Skills & Career Vault ⚡
        </h1>
        <p style={{ color: "#475569", fontSize: "15px", margin: 0, lineHeight: "1.6" }}>
          Comprehensive, industry-standard engineering handbooks. Master high-performance programming, systems architecture, and mobile engineering with professional reference guides.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px" }}>
        {[
          { id: "all", label: "All Skills" },
          { id: "core", label: "Core CS & Algorithms" },
          { id: "backend", label: "Backend & Systems" },
          { id: "mobile", label: "Mobile Development" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: "9px 20px",
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

      {/* Books Grid */}
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
                    <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#0F172A", margin: 0 }}>
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
                  borderRadius: "20px"
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
                  Key Syllabus & Chapters:
                </p>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12.5px", color: "#475569", lineHeight: "1.6" }}>
                  {book.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <a
                href={"/" + book.filename}
                download={book.filename}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Direct prompt fallback if not static hosted
                  console.log("Downloading " + book.filename);
                }}
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
