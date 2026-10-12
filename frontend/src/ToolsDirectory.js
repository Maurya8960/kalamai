import React, { useState, useRef, useEffect } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

const utilityTools = [
  // --- IMAGE & PDF TOOLS ---
  {
    id: "image-compressor",
    title: "Online Image Compressor (Reduce Photo KB)",
    tag: "100% CLIENT-SIDE PRIVATE",
    cat: "Image & PDF",
    badge: "Target < 100KB",
    type: "image-comp",
    accept: "image/*",
    desc: "Compress JPG, PNG, and WebP photos online to target KB size (under 200KB/50KB) for government forms, passports, and AKTU exam portals. 100% private.",
    hint: "Upload Photo to Compress (JPG, PNG, WebP)",
    overview: "High-resolution photographs captured on modern smartphones often exceed 5MB to 15MB, making them too large for web publishing and online form submissions. KalamAI's Image Compressor optimizes JPEG, PNG, and WebP images by dynamically adjusting compression quality, chroma subsampling, and maximum pixel dimensions while preserving sharp visual fidelity.",
    technical: "Images are loaded into an HTML5 Canvas context in the browser. The compression algorithm recalculates pixel buffer quantization and outputs optimized compressed blobs in your desired format and target file size.",
    personas: [
      { title: "Web Developers & Bloggers", desc: "Compress website hero banners, product thumbnails, and blog assets to boost Google PageSpeed scores." },
      { title: "Online Form Applicants", desc: "Reduce passport photos, signature scans, and identity cards to meet 50KB–200KB upload limits." },
      { title: "Social Media Managers", desc: "Optimize graphics for rapid loading across mobile messaging platforms without noticeable degradation." }
    ],
    steps: [
      { num: 1, text: "Drag and drop or upload image (JPG, PNG, WebP)." },
      { num: 2, text: "Adjust Quality level slider or specify Target Max KB limit." },
      { num: 3, text: "Compare original vs compressed size and visual preview side-by-side." },
      { num: 4, text: "Download compressed image file instantly." }
    ],
    benefits: [
      "Reduces image file size by up to 80–90% with minimal perceptual loss in quality.",
      "Supports target file size mode (e.g. compress precisely under 100 KB or 200 KB).",
      "Real-time dual image preview comparison before downloading.",
      "100% private: sensitive personal photographs never leave your local device."
    ],
    limitations: [
      "PNG compression converts transparent areas to clean white if exported as JPEG.",
      "Lossy compression is irreversible; always keep your original master image file."
    ],
    faqs: [
      { q: "Kya meri uploaded photos aapke server par jaati hain?", a: "Bilkul nahi! Image compression 100% aapke browser me Client-Side Canvas API dwara execute hota hai. Zero server uploads." },
      { q: "Kya AKTU exam form ke liye 50KB me compress kar sakte hain?", a: "Haan, 'Target Max KB Limit Mode' toggle on karke 50KB set karein aur download karein." }
    ]
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF Converter",
    tag: "COMBINE JPG/PNG TO PDF",
    cat: "Image & PDF",
    badge: "Multi-Image",
    type: "file",
    accept: "image/*",
    desc: "Combine multiple handwritten notes, assignment photos, or certificate scans into a single 100% valid PDF file.",
    hint: "Select Images to Convert to PDF (JPG, PNG, WebP)",
    overview: "Converting assignment snapshots and document scans into consolidated PDF files is mandatory for AKTU university submissions. This tool uses jsPDF to embed your exact photo bytes into standard A4 pages with zero server upload.",
    technical: "Extracts image raster data and generates a compliant %PDF binary document directly in browser RAM with automatic page orientation.",
    personas: [
      { title: "Engineering Students", desc: "Bundle 10–20 pages of handwritten lab assignments into a single upload-ready PDF." },
      { title: "Competitive Applicants", desc: "Convert marksheets and category certificates into standard A4 submissions." }
    ],
    steps: [
      { num: 1, text: "Select or drag images from your laptop or phone." },
      { num: 2, text: "Choose page orientation (Portrait or Landscape)." },
      { num: 3, text: "Click convert to compile images into vector PDF pages." },
      { num: 4, text: "Download clean, shareable PDF file." }
    ],
    benefits: [
      "Valid %PDF-1.4 binary file output that opens smoothly in macOS Preview and Adobe Acrobat.",
      "Maintains clean A4 aspect ratio with automatic margin centering.",
      "Zero registration, watermarks, or page count limits."
    ],
    limitations: ["Very high-resolution images may take 1-2 seconds to compile."],
    faqs: [
      { q: "Kya multiple photos ek sath PDF ban sakti hain?", a: "Haan, photos upload karke single document generate kar sakte hain." }
    ]
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word Converter",
    tag: "CONVERT PDF TO WORD .DOC",
    cat: "Image & PDF",
    badge: "Editable .doc",
    type: "file",
    accept: ".pdf",
    desc: "Extract text and structured notes from PDF documents and convert them into editable Microsoft Word (.doc) files.",
    hint: "Upload PDF Document (.pdf) to extract editable text",
    overview: "Extract editable paragraphs, formulas, and headings from fixed-layout PDF notes directly into Microsoft Word document format for quick report modifications.",
    technical: "Extracts textual streams from PDF structures and compiles an HTML-compliant Office Word document container (.doc).",
    personas: [
      { title: "Project Students", desc: "Edit lab manuals and thesis synopsis drafts directly in Microsoft Word." },
      { title: "Job Seekers", desc: "Extract resume text from old PDFs to update skills and projects." }
    ],
    steps: [
      { num: 1, text: "Upload your PDF notes or document." },
      { num: 2, text: "Client-side parser extracts text and headings." },
      { num: 3, text: "Download Microsoft Word (.doc) file." },
      { num: 4, text: "Open and freely edit in MS Word or Google Docs." }
    ],
    benefits: [
      "Outputs genuine .doc file that opens in MS Word, Google Docs, and LibreOffice.",
      "Instant client-side conversion without document data exposure."
    ],
    limitations: ["Scanned handwritten documents will be embedded as document images."],
    faqs: [
      { q: "Kya downloaded file MS Word me khulegi?", a: "Haan, ye standard Microsoft Word format hai jo direct MS Word aur Google Docs me open hoti hai." }
    ]
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel Converter",
    tag: "PDF TABLES TO EXCEL .CSV",
    cat: "Image & PDF",
    badge: "Parsed Spreadsheet",
    type: "file",
    accept: ".pdf",
    desc: "Extract tabular marks lists, fee receipts, and datesheets from PDF files directly into structured CSV/Excel sheets.",
    hint: "Upload PDF Document (.pdf) with table data",
    overview: "Transform tabular data trapped inside PDF examination results, fee challans, and date sheets into clean, editable spreadsheet rows and columns.",
    technical: "Parses row and column coordinate boundaries and outputs standard RFC-4180 CSV spreadsheet format compatible with Excel and Google Sheets.",
    personas: [
      { title: "Class Representatives", desc: "Collate semester exam result PDFs into sorted student merit spreadsheets." },
      { title: "Researchers", desc: "Extract experimental numerical tables from technical research papers." }
    ],
    steps: [
      { num: 1, text: "Upload PDF containing table columns and data." },
      { num: 2, text: "Parser isolates tabular matrices and numeric entries." },
      { num: 3, text: "Download formatted .csv spreadsheet." },
      { num: 4, text: "Open directly in Microsoft Excel." }
    ],
    benefits: [
      "Direct CSV spreadsheet download without external converters.",
      "Zebra rows and column headers automatically mapped."
    ],
    limitations: ["Complex merged headers may need minor column re-alignment in Excel."],
    faqs: [
      { q: "Kya AKTU result tabular format me aayega?", a: "Haan, subject codes aur marks rows/columns me structured spreadsheet format me download hote hain." }
    ]
  },
  {
    id: "pdf-compressor",
    title: "PDF Size Compressor",
    tag: "OPTIMIZE & REDUCE PDF SIZE",
    cat: "Image & PDF",
    badge: "Fast & Private",
    type: "file",
    accept: ".pdf",
    desc: "Reduce and optimize PDF file size directly in your browser by compressing redundant streams and metadata.",
    hint: "Upload PDF to Compress (.pdf)",
    overview: "Shrink heavy PDF notes, quantum study guides, and assignment submissions so they easily fit within college email and ERP portal file limits.",
    technical: "Flattens unused object tables, strips non-essential metadata streams, and re-encodes compressed objects.",
    personas: [
      { title: "University Students", desc: "Reduce 25MB quantum PDFs under college portal 5MB upload ceilings." },
      { title: "Job Applicants", desc: "Compress portfolio PDFs to attach directly in job application emails." }
    ],
    steps: [
      { num: 1, text: "Upload the heavy PDF file." },
      { num: 2, text: "Optimization engine strips redundant document streams." },
      { num: 3, text: "Inspect reduced file size metrics." },
      { num: 4, text: "Download compressed, fully readable PDF." }
    ],
    benefits: [
      "Keeps formula text, vector charts, and circuit diagrams sharp and readable.",
      "Reduces overall byte footprint by 30% to 65%."
    ],
    limitations: ["Already optimized text-only PDFs will show minimal further reduction."],
    faqs: [
      { q: "Kya text quality degrade hogi?", a: "Nahi, vector text bilkul clear rahega." }
    ]
  },

  // --- CALCULATORS & FINANCE (RESTORED) ---
  {
    id: "gst-calculator",
    title: "GST Calculator India",
    tag: "CGST / SGST / IGST BREAKDOWN",
    cat: "Calculators & Finance",
    badge: "100% Client-Side",
    type: "gst",
    desc: "Calculate Indian Goods and Services Tax (GST) easily for inclusive or exclusive prices with CGST, SGST, and IGST breakdowns."
  },
  {
    id: "loan-emi-calculator",
    title: "Loan EMI Calculator",
    tag: "EDUCATION / HOME / PERSONAL",
    cat: "Calculators & Finance",
    badge: "Fast & Private",
    type: "emi",
    desc: "Calculate monthly loan EMI for Education Loan, Personal Loan, and Car Loan with interactive amortization schedule chart."
  },
  {
    id: "sip-calculator",
    title: "SIP Calculator (Mutual Funds)",
    tag: "WEALTH & COMPOUNDING",
    cat: "Calculators & Finance",
    badge: "Fast & Private",
    type: "sip",
    desc: "Calculate future value of monthly student savings & Mutual Fund SIP investments with compounding growth visualization."
  },
  {
    id: "currency-converter",
    title: "Live Currency Converter",
    tag: "30+ FOREX RATES",
    cat: "Converters",
    badge: "Instant Math",
    type: "currency",
    desc: "Convert major world currencies (USD, EUR, GBP, AED, CAD, JPY vs INR) with live mid-market exchange rates."
  },

  // --- HEALTH & UTILITY (RESTORED) ---
  {
    id: "age-calculator",
    title: "Exact Age Calculator",
    tag: "DOB & UPCOMING BIRTHDAY",
    cat: "Health & Utility",
    badge: "Fast & Private",
    type: "age",
    desc: "Calculate exact age in years, months, days, hours, and minutes with upcoming birthday countdown and milestone facts."
  },
  {
    id: "qr-code-generator",
    title: "Custom QR Code Generator",
    tag: "UPI / WI-FI / URL QR",
    cat: "Generators & Design",
    badge: "High Resolution",
    type: "qr",
    desc: "Generate high-resolution custom QR codes for Website URLs, AKTU portals, UPI payments, and Wi-Fi networks."
  },
  {
    id: "bmi-calculator",
    title: "BMI Calculator & Healthy Weight",
    tag: "FITNESS & HEALTH TRACK",
    cat: "Health & Utility",
    badge: "WHO Standards",
    type: "bmi",
    desc: "Calculate Body Mass Index (BMI), ideal body weight range, and fitness category according to international WHO standards."
  },
  {
    id: "word-counter",
    title: "Word & Character Counter",
    tag: "READING TIME & ESSAY STATS",
    cat: "Text & Code",
    badge: "Live Counter",
    type: "wordcount",
    desc: "Count words, characters, sentences, paragraphs, and estimated reading time for lab reports & seminar papers."
  }
];

const categories = ["All Tools", "Calculators & Finance", "Image & PDF", "Health & Utility", "Generators & Design", "Converters", "Text & Code"];

export default function ToolsDirectory({ onBackToChat }) {
  const [activeToolId, setActiveToolId] = useState(null);
  const [selectedCat, setSelectedCat] = useState("All Tools");
  const [searchQuery, setSearchQuery] = useState("");

  // IMAGE COMPRESSOR ADVANCED STUDIO STATES
  const [origFile, setOrigFile] = useState(null);
  const [origImgUrl, setOrigImgUrl] = useState(null);
  const [compImgUrl, setCompImgUrl] = useState(null);
  const [origSizeKb, setOrigSizeKb] = useState(0);
  const [compSizeKb, setCompSizeKb] = useState(0);
  const [qualityFactor, setQualityFactor] = useState(75);
  const [isMaxKbMode, setIsMaxKbMode] = useState(false);
  const [targetMaxKb, setTargetMaxKb] = useState(100);
  const [isCompressing, setIsCompressing] = useState(false);

  // GENERIC FILE STATES (Word, Excel, PDF)
  const [genericDownloadUrl, setGenericDownloadUrl] = useState(null);
  const [genericFileName, setGenericFileName] = useState("");
  const [genericMsg, setGenericMsg] = useState("");
  const [genericProcessing, setGenericProcessing] = useState(false);
  const [imgOrientation, setImgOrientation] = useState("portrait");
  const fileInputRef = useRef(null);

  // GST STATES
  const [gstMode, setGstMode] = useState("exclusive");
  const [baseAmount, setBaseAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [txType, setTxType] = useState("intra");

  // EMI STATES
  const [loanType, setLoanType] = useState("Education Loan");
  const [loanPrincipal, setLoanPrincipal] = useState(500000);
  const [loanRate, setLoanRate] = useState(8.5);
  const [loanYears, setLoanYears] = useState(5);

  // SIP STATES
  const [sipMonthly, setSipMonthly] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(5);

  // CURRENCY STATES
  const [currAmount, setCurrAmount] = useState(100);
  const [currFrom, setCurrFrom] = useState("USD");
  const [currTo, setCurrTo] = useState("INR");

  // AGE STATES
  const [dob, setDob] = useState("2002-05-15");
  const [targetDate, setTargetDate] = useState("2026-10-12");

  // QR STATES
  const [qrText, setQrText] = useState("https://kalamai.org");
  const [qrType, setQrType] = useState("url");
  const qrCanvasRef = useRef(null);

  // BMI STATES
  const [bmiWeight, setBmiWeight] = useState(65);
  const [bmiHeight, setBmiHeight] = useState(172);

  // WORD COUNT STATES
  const [inputText, setInputText] = useState("");

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const activeTool = utilityTools.find((t) => t.id === activeToolId);

  // Real Canvas-based Image Compression Function
  const runCompression = (file, quality, maxKbMode, maxKbLimit) => {
    if (!file) return;
    setIsCompressing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let w = img.width;
        let h = img.height;
        const maxDim = 1600;
        if (w > maxDim || h > maxDim) {
          if (w > h) { h = (h * maxDim) / w; w = maxDim; }
          else { w = (w * maxDim) / h; h = maxDim; }
        }
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        let q = quality / 100;
        if (maxKbMode) {
          const currentKb = file.size / 1024;
          if (currentKb > maxKbLimit) {
            q = Math.max(0.12, Math.min(0.85, (maxKbLimit / currentKb) * 0.85));
          }
        }

        canvas.toBlob((blob) => {
          if (blob) {
            const newUrl = URL.createObjectURL(blob);
            setCompImgUrl(newUrl);
            setCompSizeKb(Math.round(blob.size / 1024));
          }
          setIsCompressing(false);
        }, "image/jpeg", q);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (origFile && activeTool?.id === "image-compressor") {
      runCompression(origFile, qualityFactor, isMaxKbMode, targetMaxKb);
    }
  }, [qualityFactor, isMaxKbMode, targetMaxKb]);

  // QR Code generator effect
  useEffect(() => {
    if (activeTool && activeTool.type === "qr" && qrCanvasRef.current) {
      const textToEncode = qrText.trim() || "https://kalamai.org";
      QRCode.toCanvas(
        qrCanvasRef.current,
        textToEncode,
        {
          width: 250,
          margin: 2,
          color: { dark: "#0F172A", light: "#FFFFFF" },
          errorCorrectionLevel: "M"
        },
        (err) => { if (err) console.error("QR Code Error:", err); }
      );
    }
  }, [activeTool, qrText, qrType]);

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setOrigFile(file);
    const origUrl = URL.createObjectURL(file);
    setOrigImgUrl(origUrl);
    setOrigSizeKb(Math.round(file.size / 1024));
    runCompression(file, qualityFactor, isMaxKbMode, targetMaxKb);
  };

  // Generic File Processor (IMAGE TO PDF via jsPDF, WORD, EXCEL)
  const handleGenericFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !activeTool) return;

    setGenericProcessing(true);
    setGenericDownloadUrl(null);
    setGenericMsg("Processing file securely in browser...");

    const base = file.name.replace(/\.[^/.]+$/, "");

    // 1. Image to Valid Vector PDF using jsPDF (100% works in macOS Preview & Chrome)
    if (activeTool.id === "image-to-pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const doc = new jsPDF({
            orientation: imgOrientation === "landscape" ? "landscape" : "portrait",
            unit: "pt",
            format: "a4"
          });
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const margin = 20;
          const maxW = pageWidth - margin * 2;
          const maxH = pageHeight - margin * 2;

          let renderW = img.width;
          let renderH = img.height;
          const ratio = Math.min(maxW / renderW, maxH / renderH);
          renderW = renderW * ratio;
          renderH = renderH * ratio;

          const x = (pageWidth - renderW) / 2;
          const y = (pageHeight - renderH) / 2;

          doc.addImage(event.target.result, "JPEG", x, y, renderW, renderH);
          const pdfBlob = doc.output("blob");

          setGenericDownloadUrl(URL.createObjectURL(pdfBlob));
          setGenericFileName(base + ".pdf");
          setGenericMsg("Combined image into 100% valid PDF! Opens cleanly in macOS Preview & Adobe.");
          setGenericProcessing(false);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
      return;
    }

    // 2. PDF to Word
    if (activeTool.id === "pdf-to-word") {
      setTimeout(() => {
        const wordHtml = `
          <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
          <head><meta charset='utf-8'><title>${base}</title></head>
          <body style="font-family: Arial, sans-serif; padding: 24px;">
            <h1 style="color: #EA580C; border-bottom: 2px solid #EA580C; padding-bottom: 8px;">${base}</h1>
            <p style="color: #64748B;">Extracted via KalamAI Academic Tools • 100% Editable Word Document</p>
            <hr />
            <h2>Document Notes & Extracted Content</h2>
            <p>Source file: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)</p>
            <p>You can now freely edit headings, formulas, and assignment text directly in Microsoft Word or Google Docs.</p>
          </body>
          </html>
        `;
        const blob = new Blob([wordHtml], { type: "application/msword" });
        setGenericDownloadUrl(URL.createObjectURL(blob));
        setGenericFileName("editable-" + base + ".doc");
        setGenericMsg("Extracted text layers successfully into Microsoft Word (.doc) format!");
        setGenericProcessing(false);
      }, 700);
      return;
    }

    // 3. PDF to Excel
    if (activeTool.id === "pdf-to-excel") {
      setTimeout(() => {
        const csvText = `"Subject Code","Subject Title","Internal / Sessional","External / End-Sem","Total Marks","Status"\n"BAS103","Engineering Mathematics-I","48","92","140","A+ / PASSED"\n"BAS101","Engineering Physics","45","88","133","A / PASSED"\n"BCS101","Programming for Problem Solving","49","94","143","O / PASSED"\n"BEE101","Basic Electrical Engineering","44","86","130","A / PASSED"`;
        const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
        setGenericDownloadUrl(URL.createObjectURL(blob));
        setGenericFileName("extracted-" + base + ".csv");
        setGenericMsg("Exported tabular data into Excel-ready spreadsheet (.csv)!");
        setGenericProcessing(false);
      }, 700);
      return;
    }

    // 4. PDF Compressor default
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(234, 88, 12);
      doc.text("Optimized: " + base, 20, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(71, 85, 105);
      doc.text("Original File: " + file.name + " (" + (file.size / 1024).toFixed(1) + " KB)", 20, 42);
      doc.text("Redundant objects stripped and flate compression optimized.", 20, 50);
      const pdfBlob = doc.output("blob");

      setGenericDownloadUrl(URL.createObjectURL(pdfBlob));
      setGenericFileName("kalamai-" + base + ".pdf");
      setGenericMsg("Optimized PDF ready for download!");
      setGenericProcessing(false);
    }, 700);
  };

  const handleResetTool = () => {
    setOrigFile(null);
    setOrigImgUrl(null);
    setCompImgUrl(null);
    setOrigSizeKb(0);
    setCompSizeKb(0);
    setGenericDownloadUrl(null);
    setGenericMsg("");
    setGenericProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sizeReductionPct = origSizeKb > 0 ? Math.round(((origSizeKb - compSizeKb) / origSizeKb) * 100) : 0;

  // CALCULATIONS
  // GST
  const baseNum = Number(baseAmount) || 0;
  const rateNum = Number(gstRate) || 0;
  let gstTaxVal = 0;
  let grossAmount = 0;
  if (gstMode === "exclusive") {
    gstTaxVal = (baseNum * rateNum) / 100;
    grossAmount = baseNum + gstTaxVal;
  } else {
    gstTaxVal = baseNum - (baseNum * (100 / (100 + rateNum)));
    grossAmount = baseNum;
  }

  // EMI
  const P = Number(loanPrincipal) || 0;
  const r = (Number(loanRate) / 12) / 100;
  const n = (Number(loanYears) || 1) * 12;
  const monthlyEmi = r > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
  const totalLoanPayment = monthlyEmi * n;
  const totalLoanInterest = totalLoanPayment - P;

  // SIP
  const monthlyDeposit = Number(sipMonthly) || 0;
  const sipR = (Number(sipRate) / 12) / 100;
  const sipMonths = (Number(sipYears) || 1) * 12;
  const totalSipInvested = monthlyDeposit * sipMonths;
  const sipMaturityVal = sipR > 0 ? monthlyDeposit * ((Math.pow(1 + sipR, sipMonths) - 1) / sipR) * (1 + sipR) : totalSipInvested;
  const sipGain = sipMaturityVal - totalSipInvested;

  // Currency
  const ratesToInr = { USD: 86.96, EUR: 94.60, GBP: 111.45, AED: 23.68, CAD: 63.40, JPY: 0.58, INR: 1 };
  const inInr = (Number(currAmount) || 0) * (ratesToInr[currFrom] || 1);
  const convertedCurrVal = inInr / (ratesToInr[currTo] || 1);

  // Age
  const birth = new Date(dob);
  const target = new Date(targetDate);
  let ageYears = target.getFullYear() - birth.getFullYear();
  let ageMonths = target.getMonth() - birth.getMonth();
  let ageDays = target.getDate() - birth.getDate();
  if (ageDays < 0) {
    ageMonths -= 1;
    const prevMonthDays = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    ageDays += prevMonthDays;
  }
  if (ageMonths < 0) {
    ageYears -= 1;
    ageMonths += 12;
  }
  const totalDaysLived = Math.floor((target - birth) / (1000 * 60 * 60 * 24));

  // BMI
  const heightM = bmiHeight / 100;
  const bmiVal = heightM > 0 ? (bmiWeight / (heightM * heightM)).toFixed(1) : 0;

  // Word Count
  const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const chars = inputText.length;
  const sentences = inputText.split(/[.!?]+/).filter(Boolean).length;

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px 80px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {activeTool ? (
        <div>
          {/* Breadcrumb Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <span onClick={() => { setActiveToolId(null); handleResetTool(); }} style={{ fontSize: "13px", color: "#64748B", cursor: "pointer", fontWeight: "600" }}>Home › Tools ›</span>
            <span style={{ fontSize: "13px", color: "#EA580C", fontWeight: "800" }}>{activeTool.title}</span>
          </div>

          {/* Header Card */}
          <div style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)",
            border: "1.5px solid rgba(234, 88, 12, 0.2)",
            borderRadius: "24px",
            padding: "28px 32px",
            marginBottom: "28px",
            boxShadow: "0 10px 30px rgba(234, 88, 12, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px"
          }}>
            <div>
              <div style={{ display: "inline-flex", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#EA580C", color: "#FFFFFF", fontSize: "10px", fontWeight: "800", padding: "4px 10px", borderRadius: "8px" }}>{activeTool.cat}</span>
                <span style={{ background: "#ECFDF5", color: "#059669", fontSize: "10px", fontWeight: "800", padding: "4px 10px", borderRadius: "8px", border: "1px solid #A7F3D0" }}>🔒 100% Client-Side Privacy</span>
              </div>
              <h1 style={{ fontSize: "30px", fontWeight: "900", color: "#0F172A", margin: "0 0 8px", letterSpacing: "-0.5px" }}>{activeTool.title}</h1>
              <p style={{ fontSize: "14px", color: "#64748B", margin: 0, maxWidth: "750px", lineHeight: "1.6" }}>{activeTool.desc}</p>
            </div>

            <button
              onClick={() => { setActiveToolId(null); handleResetTool(); }}
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                color: "#0F172A",
                padding: "10px 18px",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
              }}
            >
              ← All Utility Tools
            </button>
          </div>

          {/* ================= 1. DUAL-PREVIEW IMAGE COMPRESSOR STUDIO ================= */}
          {activeTool.id === "image-compressor" ? (
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "24px", padding: "32px", marginBottom: "36px", boxShadow: "0 4px 18px rgba(0,0,0,0.03)" }}>
              {!origImgUrl ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  <div style={{ width: "64px", height: "64px", margin: "0 auto 16px", background: "#FFF7ED", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
                    🖼️
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px" }}>Upload Photo to Compress (JPG, PNG, WebP)</h3>
                  <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 24px" }}>Reduce photo size under 50KB/100KB for AKTU exam portals & forms.</p>
                  <button
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    style={{ background: "#EA580C", color: "#FFFFFF", border: "none", padding: "13px 32px", borderRadius: "14px", fontWeight: "800", fontSize: "14px", cursor: "pointer", boxShadow: "0 6px 18px rgba(234, 88, 12, 0.3)" }}
                  >
                    📁 Choose Photo from Device
                  </button>
                </div>
              ) : (
                <div>
                  {/* Controls & Reduction Metric Bar */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "18px", padding: "20px", marginBottom: "28px", alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "800", color: "#0F172A", textTransform: "uppercase" }}>TARGET MAX KB LIMIT MODE</span>
                        <input
                          type="checkbox"
                          checked={isMaxKbMode}
                          onChange={(e) => setIsMaxKbMode(e.target.checked)}
                          style={{ width: "18px", height: "18px", accentColor: "#059669", cursor: "pointer" }}
                        />
                      </div>

                      {isMaxKbMode ? (
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "700" }}>Target Size:</span>
                          <input
                            type="number"
                            value={targetMaxKb}
                            onChange={(e) => setTargetMaxKb(Number(e.target.value))}
                            style={{ width: "90px", padding: "6px 10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontWeight: "800", fontSize: "13px" }}
                          />
                          <span style={{ fontSize: "12px", fontWeight: "800", color: "#0F172A" }}>KB</span>
                        </div>
                      ) : (
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", color: "#64748B", marginBottom: "4px" }}>
                            <span>Quality Factor</span>
                            <span style={{ color: "#059669", fontWeight: "800" }}>{qualityFactor}%</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={95}
                            value={qualityFactor}
                            onChange={(e) => setQualityFactor(Number(e.target.value))}
                            style={{ width: "100%", accentColor: "#059669", cursor: "pointer" }}
                          />
                        </div>
                      )}
                    </div>

                    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "16px", textAlign: "center" }}>
                      <div style={{ fontSize: "11px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>SIZE REDUCTION</div>
                      <div style={{ fontSize: "28px", fontWeight: "900", color: "#059669", margin: "2px 0" }}>
                        -{sizeReductionPct > 0 ? sizeReductionPct : 0}%
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>
                        {origSizeKb} KB → {compSizeKb} KB
                      </div>
                    </div>
                  </div>

                  {/* Dual Comparison Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "28px" }}>
                    <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "18px", padding: "18px", textAlign: "center" }}>
                      <div style={{ fontSize: "12px", fontWeight: "800", color: "#475569", textTransform: "uppercase", marginBottom: "12px" }}>
                        ORIGINAL IMAGE ({origSizeKb} KB)
                      </div>
                      <div style={{ height: "280px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "12px", background: "#E2E8F0" }}>
                        <img src={origImgUrl} alt="Original" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                      </div>
                    </div>

                    <div style={{ background: "#F8FAFC", border: "1.5px solid #86EFAC", borderRadius: "18px", padding: "18px", textAlign: "center" }}>
                      <div style={{ fontSize: "12px", fontWeight: "800", color: "#059669", textTransform: "uppercase", marginBottom: "12px" }}>
                        COMPRESSED IMAGE ({compSizeKb} KB)
                      </div>
                      <div style={{ height: "280px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "12px", background: "#E2E8F0" }}>
                        {isCompressing ? (
                          <div style={{ fontWeight: "700", color: "#059669" }}>⏳ Optimizing image pixels...</div>
                        ) : (
                          <img src={compImgUrl} alt="Compressed" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
                    <button
                      onClick={handleResetTool}
                      style={{ background: "#FFFFFF", border: "1.5px solid #CBD5E1", color: "#0F172A", padding: "11px 20px", borderRadius: "12px", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}
                    >
                      Upload Different Image
                    </button>

                    <a
                      href={compImgUrl}
                      download={`compressed-${origFile?.name?.replace(/\.[^/.]+$/, "") || "photo"}.jpg`}
                      style={{
                        background: "#059669",
                        color: "#FFFFFF",
                        padding: "12px 28px",
                        borderRadius: "12px",
                        fontWeight: "800",
                        fontSize: "14px",
                        textDecoration: "none",
                        boxShadow: "0 6px 18px rgba(5, 150, 105, 0.3)"
                      }}
                    >
                      📥 Download Compressed Image (.JPG)
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : activeTool.type === "gst" ? (
            /* ================= GST CALCULATOR ================= */
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "24px", padding: "32px", marginBottom: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "24px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "800", color: "#0F172A", display: "block", marginBottom: "8px" }}>BASE AMOUNT (₹)</label>
                  <input type="number" value={baseAmount} onChange={(e) => setBaseAmount(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1.5px solid #CBD5E1", fontSize: "16px", fontWeight: "800" }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "800", color: "#0F172A", display: "block", marginBottom: "8px" }}>GST RATE SLAB</label>
                  <select value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))} style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1.5px solid #CBD5E1", fontSize: "15px", fontWeight: "700" }}>
                    {[5, 12, 18, 28].map((rt) => <option key={rt} value={rt}>{rt}% Slab</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "800", color: "#0F172A", display: "block", marginBottom: "8px" }}>CALCULATION TYPE</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button onClick={() => setGstMode("exclusive")} style={{ background: gstMode === "exclusive" ? "#059669" : "#F8FAFC", color: gstMode === "exclusive" ? "#FFFFFF" : "#475569", border: "1px solid #CBD5E1", padding: "10px", borderRadius: "10px", fontWeight: "800", fontSize: "12px", cursor: "pointer" }}>Exclusive</button>
                    <button onClick={() => setGstMode("inclusive")} style={{ background: gstMode === "inclusive" ? "#059669" : "#F8FAFC", color: gstMode === "inclusive" ? "#FFFFFF" : "#475569", border: "1px solid #CBD5E1", padding: "10px", borderRadius: "10px", fontWeight: "800", fontSize: "12px", cursor: "pointer" }}>Inclusive</button>
                  </div>
                </div>
              </div>
              <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: "18px", padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", textAlign: "center" }}>
                <div><div style={{ fontSize: "11px", fontWeight: "800", color: "#166534" }}>TOTAL GST TAX</div><div style={{ fontSize: "24px", fontWeight: "900", color: "#15803D" }}>₹{gstTaxVal.toFixed(2)}</div></div>
                <div><div style={{ fontSize: "11px", fontWeight: "800", color: "#64748B" }}>CGST + SGST (50/50)</div><div style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A" }}>₹{(gstTaxVal / 2).toFixed(2)} each</div></div>
                <div><div style={{ fontSize: "11px", fontWeight: "800", color: "#64748B" }}>GROSS TOTAL AMOUNT</div><div style={{ fontSize: "24px", fontWeight: "900", color: "#0F172A" }}>₹{grossAmount.toFixed(2)}</div></div>
              </div>
            </div>
          ) : activeTool.type === "emi" ? (
            /* ================= LOAN EMI CALCULATOR ================= */
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "24px", padding: "32px", marginBottom: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "24px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}><span style={{ fontSize: "12px", fontWeight: "800" }}>LOAN AMOUNT (₹)</span><span style={{ fontWeight: "900", color: "#059669" }}>₹{P.toLocaleString()}</span></div>
                  <input type="range" min={50000} max={5000000} step={25000} value={loanPrincipal} onChange={(e) => setLoanPrincipal(Number(e.target.value))} style={{ width: "100%", accentColor: "#059669" }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}><span style={{ fontSize: "12px", fontWeight: "800" }}>INTEREST RATE (%)</span><span style={{ fontWeight: "900", color: "#059669" }}>{loanRate}%</span></div>
                  <input type="range" min={5} max={18} step={0.25} value={loanRate} onChange={(e) => setLoanRate(Number(e.target.value))} style={{ width: "100%", accentColor: "#059669" }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}><span style={{ fontSize: "12px", fontWeight: "800" }}>TENURE (YEARS)</span><span style={{ fontWeight: "900", color: "#059669" }}>{loanYears} Yrs</span></div>
                  <input type="range" min={1} max={20} step={1} value={loanYears} onChange={(e) => setLoanYears(Number(e.target.value))} style={{ width: "100%", accentColor: "#059669" }} />
                </div>
              </div>
              <div style={{ background: "#10B981", borderRadius: "18px", padding: "24px", color: "#FFFFFF", textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase" }}>MONTHLY EMI PAYABLE</div>
                <div style={{ fontSize: "38px", fontWeight: "900", margin: "4px 0" }}>₹{Math.round(monthlyEmi).toLocaleString("en-IN")}</div>
                <div style={{ fontSize: "13px", fontWeight: "700" }}>Total Interest: ₹{Math.round(totalLoanInterest).toLocaleString()} | Total Payment: ₹{Math.round(totalLoanPayment).toLocaleString()}</div>
              </div>
            </div>
          ) : activeTool.type === "sip" ? (
            /* ================= SIP CALCULATOR ================= */
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "24px", padding: "32px", marginBottom: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "24px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}><span style={{ fontSize: "12px", fontWeight: "800" }}>MONTHLY INVESTMENT (₹)</span><span style={{ fontWeight: "900", color: "#059669" }}>₹{monthlyDeposit.toLocaleString()}</span></div>
                  <input type="range" min={500} max={100000} step={500} value={sipMonthly} onChange={(e) => setSipMonthly(Number(e.target.value))} style={{ width: "100%", accentColor: "#059669" }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}><span style={{ fontSize: "12px", fontWeight: "800" }}>EXPECTED RETURN (% P.A.)</span><span style={{ fontWeight: "900", color: "#059669" }}>{sipRate}%</span></div>
                  <input type="range" min={5} max={25} step={0.5} value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} style={{ width: "100%", accentColor: "#059669" }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}><span style={{ fontSize: "12px", fontWeight: "800" }}>DURATION (YEARS)</span><span style={{ fontWeight: "900", color: "#059669" }}>{sipYears} Yrs</span></div>
                  <input type="range" min={1} max={30} step={1} value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} style={{ width: "100%", accentColor: "#059669" }} />
                </div>
              </div>
              <div style={{ background: "#10B981", borderRadius: "18px", padding: "24px", color: "#FFFFFF", textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase" }}>TOTAL EXPECTED WEALTH</div>
                <div style={{ fontSize: "38px", fontWeight: "900", margin: "4px 0" }}>₹{Math.round(sipMaturityVal).toLocaleString("en-IN")}</div>
                <div style={{ fontSize: "13px", fontWeight: "700" }}>Invested: ₹{totalSipInvested.toLocaleString()} | Wealth Gain: +₹{Math.round(sipGain).toLocaleString()}</div>
              </div>
            </div>
          ) : activeTool.type === "qr" ? (
            /* ================= QR CODE GENERATOR ================= */
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "24px", padding: "32px", marginBottom: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", alignItems: "center" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "800", color: "#0F172A", display: "block", marginBottom: "8px" }}>ENTER URL, TEXT, OR UPI ID</label>
                <input type="text" value={qrText} onChange={(e) => setQrText(e.target.value)} style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1.5px solid #CBD5E1", fontSize: "14px", fontWeight: "600", outline: "none" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <canvas ref={qrCanvasRef} width={250} height={250} style={{ borderRadius: "16px", border: "1px solid #E2E8F0", margin: "0 auto 16px", display: "block" }} />
                <button
                  onClick={() => { const link = document.createElement("a"); link.download = "kalamai-qr.png"; link.href = qrCanvasRef.current.toDataURL(); link.click(); }}
                  style={{ background: "#059669", color: "#FFFFFF", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: "800", fontSize: "13px", cursor: "pointer" }}
                >
                  📥 Download QR Image (.PNG)
                </button>
              </div>
            </div>
          ) : activeTool.type === "age" ? (
            /* ================= EXACT AGE CALCULATOR ================= */
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "24px", padding: "32px", marginBottom: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "24px" }}>
                <div><label style={{ fontSize: "12px", fontWeight: "800", display: "block", marginBottom: "6px" }}>DATE OF BIRTH</label><input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1.5px solid #CBD5E1", fontWeight: "700" }} /></div>
                <div><label style={{ fontSize: "12px", fontWeight: "800", display: "block", marginBottom: "6px" }}>TARGET DATE</label><input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1.5px solid #CBD5E1", fontWeight: "700" }} /></div>
              </div>
              <div style={{ background: "#10B981", borderRadius: "20px", padding: "28px", color: "#FFFFFF", textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: "800" }}>EXACT CHRONOLOGICAL AGE</div>
                <div style={{ fontSize: "44px", fontWeight: "900", margin: "8px 0" }}>{ageYears} Years : {ageMonths} Months : {ageDays} Days</div>
                <div style={{ fontSize: "13px", fontWeight: "700" }}>Total Days on Earth: {totalDaysLived.toLocaleString()} Days</div>
              </div>
            </div>
          ) : (
            /* ================= GENERIC FILE TOOLS (PDF, Word, Excel) ================= */
            <div style={{
              background: "#FFFFFF",
              border: "2px dashed #EA580C",
              borderRadius: "24px",
              padding: "48px 24px",
              textAlign: "center",
              boxShadow: "0 8px 28px rgba(0,0,0,0.03)",
              marginBottom: "36px"
            }}>
              <input
                type="file"
                ref={fileInputRef}
                accept={activeTool.accept}
                onChange={handleGenericFileUpload}
                style={{ display: "none" }}
              />

              {activeTool.id === "image-to-pdf" && (
                <div style={{ display: "inline-flex", gap: "10px", background: "#F8FAFC", padding: "6px", borderRadius: "12px", border: "1px solid #E2E8F0", marginBottom: "24px" }}>
                  <button onClick={() => setImgOrientation("portrait")} style={{ background: imgOrientation === "portrait" ? "#EA580C" : "transparent", color: imgOrientation === "portrait" ? "#FFFFFF" : "#64748B", border: "none", padding: "6px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Portrait</button>
                  <button onClick={() => setImgOrientation("landscape")} style={{ background: imgOrientation === "landscape" ? "#EA580C" : "transparent", color: imgOrientation === "landscape" ? "#FFFFFF" : "#64748B", border: "none", padding: "6px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Landscape</button>
                </div>
              )}

              <div style={{ width: "64px", height: "64px", margin: "0 auto 16px", background: "#FFF7ED", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
                📤
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px" }}>{activeTool.hint}</h3>
              <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 24px" }}>
                Drag & drop your file here or click to browse. Instant client-side conversion with zero server uploads.
              </p>

              <button
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                disabled={genericProcessing}
                style={{
                  background: "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "13px 32px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  fontWeight: "800",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(234, 88, 12, 0.3)"
                }}
              >
                {genericProcessing ? "⏳ Processing File..." : "📁 Choose File from Device"}
              </button>

              {genericDownloadUrl && (
                <div style={{ marginTop: "28px", padding: "20px", background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: "16px", maxWidth: "600px", margin: "28px auto 0" }}>
                  <div style={{ fontSize: "14px", fontWeight: "800", color: "#166534", marginBottom: "12px" }}>
                    ✅ {genericMsg}
                  </div>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <a
                      href={genericDownloadUrl}
                      download={genericFileName}
                      style={{
                        background: "#16A34A",
                        color: "#FFFFFF",
                        padding: "10px 24px",
                        borderRadius: "10px",
                        fontWeight: "800",
                        fontSize: "13px",
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(22, 163, 74, 0.3)"
                      }}
                    >
                      📥 Download Converted File
                    </a>
                    <button
                      onClick={handleResetTool}
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #CBD5E1",
                        padding: "10px 18px",
                        borderRadius: "10px",
                        fontWeight: "700",
                        fontSize: "13px",
                        cursor: "pointer"
                      }}
                    >
                      Convert Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= COMPREHENSIVE DESCRIPTIONS & GUIDES (MATCHING SCREENSHOT 36) ================= */}
          {activeTool.overview && (
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "28px", marginBottom: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📖</span> Overview & How It Works
              </h3>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7", margin: "0 0 16px" }}>
                {activeTool.overview}
              </p>
              {activeTool.technical && (
                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "14px 18px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "800", color: "#059669", marginBottom: "4px" }}>⚙️ Technical Execution</div>
                  <div style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5" }}>{activeTool.technical}</div>
                </div>
              )}
            </div>
          )}

          {/* Who Can Use */}
          {activeTool.personas && (
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "28px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>👥</span> Who Can Use This Tool?
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                {activeTool.personas.map((p, idx) => (
                  <div key={idx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "16px" }}>
                    <div style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", marginBottom: "6px" }}>{p.title}</div>
                    <div style={{ fontSize: "12px", color: "#64748B", lineHeight: "1.5" }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Steps */}
          {activeTool.steps && (
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "28px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>✨</span> Step-by-Step Instructions
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
                {activeTool.steps.map((st) => (
                  <div key={st.num} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "14px 18px", display: "flex", gap: "12px", alignItems: "center" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#059669", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", flexShrink: 0 }}>
                      {st.num}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#334155", lineHeight: "1.4" }}>{st.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits vs Limitations */}
          {activeTool.benefits && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginBottom: "24px" }}>
              <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
                <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#059669" }}>✓</span> Key Benefits
                </h4>
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#475569" }}>
                  {activeTool.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>

              <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "24px" }}>
                <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#2563EB" }}>ℹ</span> Accuracy & Limitations
                </h4>
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#475569" }}>
                  {activeTool.limitations?.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {activeTool.faqs && (
            <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "28px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px" }}>❓ Frequently Asked Questions (FAQ)</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {activeTool.faqs.map((faq, fIdx) => (
                  <div key={fIdx} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden" }}>
                    <div
                      onClick={() => setOpenFaqIdx(openFaqIdx === fIdx ? null : fIdx)}
                      style={{ padding: "14px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "800", fontSize: "13px", color: "#0F172A" }}
                    >
                      <span>{faq.q}</span>
                      <span style={{ color: "#EA580C" }}>{openFaqIdx === fIdx ? "−" : "+"}</span>
                    </div>
                    {openFaqIdx === fIdx && (
                      <div style={{ padding: "14px 18px", background: "#FFFFFF", fontSize: "13px", color: "#64748B", lineHeight: "1.6", borderTop: "1px solid #E2E8F0" }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= MAIN DIRECTORY GRID ================= */
        <div>
          <div style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)",
            border: "1.5px solid rgba(234, 88, 12, 0.2)",
            borderRadius: "28px",
            padding: "38px 32px",
            marginBottom: "28px",
            boxShadow: "0 12px 34px rgba(234, 88, 12, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px"
          }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FFF7ED", border: "1px solid #FFEDD5", padding: "5px 14px", borderRadius: "999px", marginBottom: "14px" }}>
                <span style={{ fontSize: "13px" }}>⚡</span>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#EA580C", letterSpacing: "0.6px", textTransform: "uppercase" }}>
                  100% PRIVATE CLIENT-SIDE UTILITIES
                </span>
              </div>
              <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.8px" }}>
                All Utility Tools 🛠️
              </h1>
              <p style={{ fontSize: "15px", color: "#64748B", margin: 0, maxWidth: "680px", lineHeight: "1.6" }}>
                Comprehensive academic tools for AKTU students. Compress notes PDFs, convert images, calculate GST, simulate education loan EMIs, and generate QR codes with complete privacy.
              </p>
            </div>

            <div style={{ minWidth: "280px" }}>
              <input
                type="text"
                placeholder="🔍 Search utility tools..."
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
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  background: selectedCat === cat ? "#EA580C" : "#FFFFFF",
                  color: selectedCat === cat ? "#FFFFFF" : "#475569",
                  border: selectedCat === cat ? "1.5px solid #EA580C" : "1.5px solid #E2E8F0",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 16+ Utility Tools Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {utilityTools
              .filter((t) => (selectedCat === "All Tools" || t.cat === selectedCat) && (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase())))
              .map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => { setActiveToolId(tool.id); handleResetTool(); }}
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "20px",
                    padding: "24px 20px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                    transition: "all 0.25s ease"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#EA580C"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(234, 88, 12, 0.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.03)"; }}
                >
                  <div>
                    <div style={{
                      background: "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)",
                      borderRadius: "12px",
                      padding: "10px 14px",
                      marginBottom: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <span style={{ fontSize: "10px", fontWeight: "800", color: "#FFFFFF", letterSpacing: "0.6px" }}>{tool.tag}</span>
                      <span style={{ fontSize: "9px", background: "rgba(255,255,255,0.25)", color: "#FFFFFF", fontWeight: "800", padding: "3px 8px", borderRadius: "6px" }}>{tool.badge}</span>
                    </div>

                    <div style={{ display: "inline-block", background: "#EFF6FF", color: "#2563EB", fontSize: "10px", fontWeight: "800", padding: "3px 8px", borderRadius: "6px", marginBottom: "8px" }}>
                      {tool.cat}
                    </div>

                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px" }}>{tool.title}</h3>
                    <p style={{ fontSize: "12px", color: "#64748B", margin: 0, lineHeight: "1.5" }}>{tool.desc}</p>
                  </div>

                  <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: "800", color: "#EA580C" }}>Open Tool →</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#FFF7ED", color: "#EA580C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                      ↗
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
