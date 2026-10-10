import React, { useState } from 'react';

export default function SyllabusDirectory({ onBackToChat }) {
  const [activeTab, setActiveTab] = useState('btech'); // btech, mba, all
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const officialBranchPdfLinks = [
    {
      name: 'Agricultural Engineering',
      code: 'AG',
      color: '#10B981',
      bg: '#ECFDF5',
      url: 'https://shorturl.at/hgQgK',
      desc: 'Farm machinery, soil & water conservation, processing engineering'
    },
    {
      name: 'Biotechnology',
      code: 'BT',
      color: '#06B6D4',
      bg: '#ECFEFF',
      url: 'https://shorturl.at/3VCOC',
      desc: 'Molecular biology, immunology, bioprocess & fermentation'
    },
    {
      name: 'Chemical Engineering',
      code: 'CH',
      color: '#F59E0B',
      bg: '#FFFBEB',
      url: 'https://shorturl.at/r49i8',
      desc: 'Fluid flow, thermodynamics, chemical reaction engineering'
    },
    {
      name: 'Civil Engineering',
      code: 'CE',
      color: '#84CC16',
      bg: '#F7FEE7',
      url: 'https://shorturl.at/3GZgo',
      desc: 'Structural analysis, geotechnical, fluid mechanics & survey'
    },
    {
      name: 'Computer Science & Engineering',
      code: 'CSE / IT',
      color: '#6366F1',
      bg: '#EEF2FF',
      url: 'https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2627/CSE%20Stream_AKTU_UG_B.Tech._Course%20Structure_Syllabus_Evaluation%20Scheme%20(1).pdf',
      desc: 'Data structures, Operating systems, AI/ML, DBMS & algorithms'
    },
    {
      name: 'Electrical Engineering',
      code: 'EE',
      color: '#EAB308',
      bg: '#FEFCE8',
      url: 'https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2627/EE_Stream_AKTU_UG_B.Tech._Course%20Structure_Syllabus_Evaluation%20Scheme.pdf',
      desc: 'Power systems, machines, electrical drives, control engineering'
    },
    {
      name: 'Electronics & Communication Engineering',
      code: 'ECE',
      color: '#EC4899',
      bg: '#FDF2F8',
      url: 'https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2627/ECE_Stream_AKTU_UG_B.Tech._Course%20Structure_Syllabus_Evaluation%20Scheme.pdf',
      desc: 'VLSI, signal processing, embedded IoT, digital communication'
    },
    {
      name: 'Mechanical Engineering',
      code: 'ME',
      color: '#EA580C',
      bg: '#FFF7ED',
      url: 'https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2627/ME%20Stream_AKTU_UG_B.Tech._Course%20Structure_Syllabus_Evaluation%20Scheme.pdf',
      desc: 'Thermodynamics, mechanics, CAD/CAM, fluid mechanics & RAC'
    },
    {
      name: 'Textile Engineering',
      code: 'TX',
      color: '#8B5CF6',
      bg: '#F5F3FF',
      url: 'https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2627/TX_Stream_AKTU_UG_B_Tech__Course_Structure_Syllabus_Evaluation_Scheme_Hyperlinked.pdf',
      desc: 'Yarn manufacturing, fabric formation, chemical wet processing'
    },
    {
      name: 'Course Structure & Evaluation Scheme',
      code: 'COMMON',
      color: '#3B82F6',
      bg: '#EFF6FF',
      url: 'https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2627/AKTU_UG_B.Tech._Course%20Structure_V15_with%20SoPs.pdf',
      desc: 'Standard SOP, grading rules, credit distribution & guidelines'
    }
  ];

  const studySuiteItems = [
    { title: 'Curated Study Notes', icon: '📖', desc: 'Handwritten & topper notes for B.Tech, B.Pharm, MCA, and MBA.', badge: 'Topper Notes', color: '#10B981' },
    { title: 'Quantum Series PDFs', icon: '📦', desc: 'All-in-one exam preparation series for 1st to 8th semesters.', badge: 'All Semesters', color: '#8B5CF6' },
    { title: 'AKTU PYQ Papers', icon: '📝', desc: 'Last 5-10 years university semester question papers with keys.', badge: 'Solved Papers', color: '#F59E0B' },
    { title: 'Instant Circulars', icon: '🔔', desc: 'Realtime AKTU exam dates, admit cards, COP results & notices.', badge: 'Live Updates', color: '#EC4899' },
    { title: 'Internships & Jobs', icon: '💼', desc: 'Fresh graduate hiring alerts and verified tech internships.', badge: 'Verified', color: '#06B6D4' },
    { title: 'Promotions & Ads', icon: '📢', desc: 'Promote your brand, app & services to 50K+ university students.', badge: 'Partnership', color: '#EA580C' }
  ];

  const subjectVault = [
    { code: 'BAS-103 / 203', title: 'Engineering Mathematics', tags: ['Matrices', 'Calculus & Series'], year: '1st' },
    { code: 'BCS-301', title: 'Data Structures & Algo', tags: ['Trees', 'Graphs & Dynamic Prog'], year: '2nd' },
    { code: 'BCS-401', title: 'Operating Systems', tags: ['Processes', 'Semaphores & Paging'], year: '2nd' },
    { code: 'BCS-501', title: 'Database Management (DBMS)', tags: ['SQL', 'Normalization & ACID'], year: '3rd' },
    { code: 'BCS-502', title: 'Computer Networks', tags: ['OSI Model', 'TCP/IP & Routing'], year: '3rd' },
    { code: 'BCS-503', title: 'Theory of Automata (TAFL)', tags: ['DFA', 'NFA', 'CFG & Turing Machine'], year: '3rd' },
    { code: 'BCS-601', title: 'Software Engineering', tags: ['Agile', 'Scrum & SDLC Models'], year: '3rd' },
    { code: 'BCS-071', title: 'Artificial Intelligence', tags: ['A* Search', 'Neural Nets & Logic'], year: '4th' }
  ];

  const faqs = [
    {
      q: 'How often does AKTU update its syllabus scheme?',
      a: 'AKTU typically reviews and updates curricula periodically under NEP & AICTE guidelines. The download links provided above reference the current university structure.'
    },
    {
      q: 'Where can I find B.Tech branch-specific syllabus files?',
      a: 'You can directly download syllabus schemes for CSE, IT, ECE, EE, ME, Civil, Chemical, BioTech, Agriculture, and Textile using the download buttons in the table above.'
    },
    {
      q: 'Are all syllabus files free to download?',
      a: 'Yes, all syllabus documents and evaluations linked directly from AKTU servers are 100% free for all students.'
    }
  ];

  const filteredBranches = officialBranchPdfLinks.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px 80px', fontFamily: 'inherit' }}>
      
      {/* Top Banner Tag */}
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#EFF6FF',
          color: '#2563EB',
          padding: '6px 16px',
          borderRadius: '24px',
          fontSize: '12px',
          fontWeight: '800',
          letterSpacing: '0.5px',
          border: '1px solid #DBEAFE'
        }}>
          📖 DR. A.P.J. ABDUL KALAM TECHNICAL UNIVERSITY • MASTER SYLLABUS DIRECTORY
        </span>
      </div>

      {/* Main Heading */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#0F172A', margin: '0 0 10px', letterSpacing: '-0.8px' }}>
          Official AKTU Course <span style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Syllabus</span>
        </h1>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1E293B', margin: '0 0 12px' }}>
          All Degree Programs & Branches
        </h2>
        <p style={{ color: '#64748B', fontSize: '15px', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
          Select your academic degree program below to access year-wise syllabus schemes, evaluation structures, credit distribution, and official university PDF downloads.
        </p>
      </div>

      {/* Degree Program Cards (Screenshot 3 Layout) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '46px' }}>
        
        {/* B.Tech Active Card */}
        <div 
          onClick={() => setActiveTab('btech')}
          style={{
            background: activeTab === 'btech' ? 'linear-gradient(180deg, #FFFFFF, #FFF7ED)' : '#FFFFFF',
            border: activeTab === 'btech' ? '2px solid #EA580C' : '1.5px solid #E2E8F0',
            borderRadius: '20px',
            padding: '24px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: activeTab === 'btech' ? '0 12px 28px rgba(234, 88, 12, 0.14)' : '0 4px 12px rgba(0,0,0,0.03)',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ width: '52px', height: '52px', margin: '0 auto 14px', borderRadius: '16px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>⚙️</div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>B.Tech</h3>
          <p style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', margin: '0 0 16px' }}>CSE, IT, ECE, EE, ME, CE, AI-DS</p>
          <button style={{ background: '#FFF', border: '1.5px solid #EA580C', color: '#EA580C', padding: '7px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>
            1st - 4th Year Portals →
          </button>
        </div>

        {/* B.Pharm Card */}
        <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '20px', padding: '24px 20px', textAlign: 'center' }}>
          <div style={{ width: '52px', height: '52px', margin: '0 auto 14px', borderRadius: '16px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🧪</div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>B.Pharm</h3>
          <p style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', margin: '0 0 16px' }}>PCI Approved 8 Semesters</p>
          <button style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#475569', padding: '7px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
            View Syllabus →
          </button>
        </div>

        {/* MBA Card */}
        <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '20px', padding: '24px 20px', textAlign: 'center' }}>
          <div style={{ width: '52px', height: '52px', margin: '0 auto 14px', borderRadius: '16px', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📊</div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>MBA</h3>
          <p style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', margin: '0 0 16px' }}>1st & 2nd Year Dual Specializations</p>
          <button style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#475569', padding: '7px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
            1st & 2nd Year Portals →
          </button>
        </div>

        {/* MCA Card */}
        <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '20px', padding: '24px 20px', textAlign: 'center' }}>
          <div style={{ width: '52px', height: '52px', margin: '0 auto 14px', borderRadius: '16px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>💻</div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>MCA</h3>
          <p style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', margin: '0 0 16px' }}>2-Year Master of Computer Apps</p>
          <span style={{ background: '#FEF3C7', color: '#B45309', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '800' }}>
            ⏳ Coming Soon
          </span>
        </div>
      </div>

      {/* Official Syllabus Branch PDF Table (Screenshot 1 Layout with Exact Links) */}
      <div id="official-scheme-table" style={{ background: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.06)', marginBottom: '56px' }}>
        
        {/* Table Header Bar */}
        <div style={{ background: 'linear-gradient(90deg, #0F172A 0%, #1E293B 100%)', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ color: '#38BDF8', fontSize: '11px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>Direct Official Downloads</div>
            <h3 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: '800', margin: '4px 0 0' }}>BRANCH / STREAM OFFICIAL SYLLABUS</h3>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search branch (CSE, Civil, ME...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '8px 14px 8px 32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
            />
            <span style={{ position: 'absolute', left: '10px', top: '9px', fontSize: '12px', color: '#94A3B8' }}>🔍</span>
          </div>
        </div>

        {/* Table Rows */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1.5px solid #E2E8F0' }}>
                <th style={{ padding: '16px 28px', fontSize: '13px', fontWeight: '900', color: '#475569', textTransform: 'uppercase' }}>Branch / Stream</th>
                <th style={{ padding: '16px 28px', fontSize: '13px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', textAlign: 'right' }}>Official Syllabus</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((item, index) => (
                <tr 
                  key={index}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    background: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#FFF7ED'}
                  onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? '#FFFFFF' : '#FAFAFA'}
                >
                  <td style={{ padding: '18px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ background: item.bg, color: item.color, padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '900', letterSpacing: '0.5px' }}>
                        {item.code}
                      </span>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>{item.desc}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '18px 28px', textAlign: 'right' }}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                        color: '#FFFFFF',
                        padding: '10px 20px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: '800',
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
                        transition: 'transform 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <span>📥</span> Download PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Year-Wise Syllabus Pages Cards (Screenshot 4 Layout) */}
      <div style={{ marginBottom: '56px' }}>
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <span style={{ color: '#2563EB', fontSize: '11px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>Bachelor of Technology</span>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', margin: '6px 0' }}>AKTU B.Tech Year–Wise Syllabus Pages</h2>
          <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>Choose your specific academic year to view branch-wise curriculum, subject schemes, and direct PDF downloads.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            {
              year: '1ST YEAR • SEM 1 & 2',
              title: 'B.Tech 1st Year Syllabus',
              desc: 'Group A & Group B Common streams for CSE, ECE, EE, ME, Civil, Chemical & Biotech.',
              link: '#official-scheme-table'
            },
            {
              year: '2ND YEAR • SEM 3 & 4',
              title: 'B.Tech 2nd Year Syllabus',
              desc: 'Branch core subjects for CSE, IT, AI-ML, Data Science, ECE, EE, ME & Civil Engineering.',
              link: '#official-scheme-table'
            },
            {
              year: '3RD YEAR • SEM 5 & 6',
              title: 'B.Tech 3rd Year Syllabus',
              desc: 'Advanced branch courses, Open Electives I (OE-1), and Non-Credit constitution modules.',
              link: '#official-scheme-table'
            },
            {
              year: '4TH YEAR • SEM 7 & 8',
              title: 'B.Tech 4th Year Syllabus',
              desc: 'Departmental Electives II-IV, Open Electives II-IV, and Final Capstone Project guidelines.',
              link: '#official-scheme-table'
            }
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #E2E8F0',
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 6px 18px rgba(0,0,0,0.03)'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#2563EB', letterSpacing: '0.8px' }}>{card.year}</span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '8px 0 10px' }}>{card.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: '0 0 20px' }}>{card.desc}</p>
              </div>
              <a
                href={card.link}
                style={{ fontSize: '13px', fontWeight: '800', color: '#2563EB', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Open Syllabus Scheme →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Everything You Need Study Suite (Screenshot 2 Top Section) */}
      <div style={{ marginBottom: '56px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ background: '#0F172A', color: '#FFF', fontSize: '11px', fontWeight: '800', padding: '5px 14px', borderRadius: '20px', letterSpacing: '0.8px' }}>ALL-IN-ONE STUDY SUITE</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0F172A', margin: '14px 0 8px' }}>
            Everything You Need for a <span style={{ color: '#0F172A' }}>High CGPA</span> <br />
            <span style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>& Stress–Free Semester</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>Free handwritten notes, Quantum series PDFs, solved papers, and live circulars in one verified place.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {studySuiteItems.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                border: '1.5px solid #F1F5F9',
                padding: '22px 18px',
                textAlign: 'left',
                boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = item.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#F1F5F9';
              }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>
                {item.icon}
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>{item.title}</h4>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* High-Weightage Subject Vault (Screenshot 2 Bottom Section) */}
      <div style={{ marginBottom: '56px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ color: '#059669', fontSize: '11px', fontWeight: '900', letterSpacing: '1px' }}>B.TECH CURRICULUM</span>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', margin: '6px 0' }}>High–Weightage Subject Vault</h2>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 18px' }}>Instant access to unit-wise handwritten notes, formula cheat sheets, and important derivations.</p>
          
          {/* Year Filter Buttons */}
          <div style={{ display: 'inline-flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '14px' }}>
            {['all', '1st', '2nd', '3rd', '4th'].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                style={{
                  border: 'none',
                  background: selectedYear === yr ? '#0F172A' : 'transparent',
                  color: selectedYear === yr ? '#FFFFFF' : '#475569',
                  padding: '7px 16px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                {yr === 'all' ? 'All Subjects' : yr + ' Year'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {subjectVault
            .filter(sub => selectedYear === 'all' || sub.year === selectedYear)
            .map((sub, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1.5px solid #E2E8F0',
                  padding: '18px 20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <span style={{ background: '#F5F3FF', color: '#7C3AED', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800' }}>
                  {sub.code}
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '10px 0 8px' }}>{sub.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {sub.tags.map((t, tid) => (
                    <div key={tid} style={{ fontSize: '12px', color: '#059669', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>✓</span> {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Join 50,000+ Students Community Banner (Screenshot 5 with Direct Links) */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
        borderRadius: '28px',
        padding: '38px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.25)',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '620px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            Join 50,000+ AKTU Students
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            Get instant notifications on syllabus updates, semester exam dates, Quantum series PDFs, and handwritten topper notes.
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {/* Direct WhatsApp Contact Button */}
          <a
            href="https://wa.me/919454247006?text=Hi%20KalamAI,%20I%20want%20to%20join%20AKTU%20VIP%20Group%20and%20need%20notes"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#22C55E',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '24px',
              fontWeight: '800',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(34, 197, 94, 0.4)'
            }}
          >
            <span>💬</span> WhatsApp VIP
          </a>

          {/* Direct Telegram Profile Button */}
          <a
            href="https://t.me/anshmaurya"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#0EA5E9',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '24px',
              fontWeight: '800',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(14, 165, 233, 0.4)'
            }}
          >
            <span>✈️</span> Telegram Prime
          </a>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion (Screenshot 6 Layout) */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ color: '#4F46E5', fontSize: '11px', fontWeight: '900', letterSpacing: '1px' }}>HELP & GUIDANCE</span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0F172A', margin: '6px 0 0' }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #E2E8F0',
                padding: '20px 24px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{faq.q}</span>
                <span style={{ fontSize: '18px', color: '#64748B', transform: openFaq === fIdx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  ⌄
                </span>
              </div>
              {openFaq === fIdx && (
                <div style={{ marginTop: '12px', fontSize: '14px', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
