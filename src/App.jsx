import { useState, useEffect, useRef } from "react";

const CROPS_DB = {
  red: {
    low: { kharif: ["Groundnut","Ragi","Maize"], rabi: ["Chickpea","Linseed","Safflower"] },
    medium: { kharif: ["Cotton","Sunflower","Sesame"], rabi: ["Wheat","Mustard","Barley"] },
    high: { kharif: ["Sugarcane","Paddy","Banana"], rabi: ["Potato","Onion","Garlic"] },
  },
  black: {
    low: { kharif: ["Soybean","Tur Dal","Maize"], rabi: ["Wheat","Chickpea","Linseed"] },
    medium: { kharif: ["Cotton","Paddy","Bajra"], rabi: ["Mustard","Safflower","Barley"] },
    high: { kharif: ["Sugarcane","Banana","Turmeric"], rabi: ["Onion","Garlic","Potato"] },
  },
  sandy: {
    low: { kharif: ["Groundnut","Bajra","Moong"], rabi: ["Mustard","Barley","Chickpea"] },
    medium: { kharif: ["Sunflower","Sesame","Watermelon"], rabi: ["Wheat","Garlic","Cumin"] },
    high: { kharif: ["Maize","Cotton","Paddy"], rabi: ["Potato","Onion","Tomato"] },
  },
  loamy: {
    low: { kharif: ["Soybean","Tur Dal","Bajra"], rabi: ["Wheat","Chickpea","Mustard"] },
    medium: { kharif: ["Maize","Sunflower","Cotton"], rabi: ["Barley","Potato","Onion"] },
    high: { kharif: ["Paddy","Sugarcane","Banana"], rabi: ["Tomato","Capsicum","Carrot"] },
  },
};

const CROP_DATA = {
  Groundnut:  { profit: "High", risk: 18, price: 5200, yield: 18, icon: "🥜", trend: [4200,4500,4800,5100,5200] },
  Ragi:       { profit: "Medium", risk: 22, price: 2800, yield: 20, icon: "🌾", trend: [2200,2400,2500,2650,2800] },
  "Tur Dal":  { profit: "High", risk: 21, price: 6800, yield: 12, icon: "🫘", trend: [5500,5900,6200,6500,6800] },
  Maize:      { profit: "Medium", risk: 35, price: 1900, yield: 35, icon: "🌽", trend: [1500,1600,1700,1850,1900] },
  Cotton:     { profit: "High", risk: 28, price: 6200, yield: 15, icon: "🌿", trend: [5000,5400,5700,6000,6200] },
  Wheat:      { profit: "Medium", risk: 30, price: 2200, yield: 40, icon: "🌾", trend: [1900,2000,2050,2150,2200] },
  Soybean:    { profit: "Medium", risk: 25, price: 3800, yield: 22, icon: "🫘", trend: [3200,3400,3500,3700,3800] },
  Paddy:      { profit: "Low", risk: 42, price: 2100, yield: 45, icon: "🌾", trend: [1700,1800,1900,2000,2100] },
  Chickpea:   { profit: "High", risk: 19, price: 5600, yield: 16, icon: "🫘", trend: [4500,4800,5100,5400,5600] },
  Mustard:    { profit: "Medium", risk: 27, price: 5400, yield: 14, icon: "🌻", trend: [4200,4600,4900,5200,5400] },
  Sunflower:  { profit: "Medium", risk: 33, price: 5100, yield: 16, icon: "🌻", trend: [4000,4300,4600,4900,5100] },
  Bajra:      { profit: "Low", risk: 20, price: 2300, yield: 25, icon: "🌾", trend: [1900,2000,2100,2200,2300] },
  Sesame:     { profit: "High", risk: 24, price: 9200, yield: 8, icon: "🌿", trend: [7500,8000,8400,8900,9200] },
  Onion:      { profit: "Low", risk: 68, price: 1200, yield: 120, icon: "🧅", trend: [800,1500,600,1800,1200] },
  Tomato:     { profit: "Low", risk: 72, price: 900, yield: 150, icon: "🍅", trend: [600,1200,400,1500,900] },
  Potato:     { profit: "Medium", risk: 48, price: 1400, yield: 100, icon: "🥔", trend: [1100,1300,1200,1500,1400] },
  Capsicum:   { profit: "High", risk: 31, price: 4200, yield: 40, icon: "🫑", trend: [3200,3500,3800,4000,4200] },
  Sugarcane:  { profit: "Medium", risk: 15, price: 350, yield: 800, icon: "🌿", trend: [300,310,320,335,350] },
  Banana:     { profit: "Medium", risk: 26, price: 2400, yield: 250, icon: "🍌", trend: [2000,2100,2200,2300,2400] },
  Moong:      { profit: "High", risk: 20, price: 7200, yield: 10, icon: "🫘", trend: [6000,6400,6700,7000,7200] },
  Barley:     { profit: "Low", risk: 18, price: 1800, yield: 35, icon: "🌾", trend: [1500,1600,1650,1750,1800] },
  Linseed:    { profit: "Medium", risk: 22, price: 4800, yield: 12, icon: "🌿", trend: [4000,4200,4400,4600,4800] },
  Turmeric:   { profit: "High", risk: 29, price: 8500, yield: 25, icon: "🌿", trend: [7000,7500,7900,8200,8500] },
  Garlic:     { profit: "High", risk: 38, price: 12000, yield: 50, icon: "🧄", trend: [8000,9500,7000,11000,12000] },
  Watermelon: { profit: "Medium", risk: 36, price: 1800, yield: 200, icon: "🍉", trend: [1400,1600,1700,1750,1800] },
  Safflower:  { profit: "Medium", risk: 20, price: 5800, yield: 12, icon: "🌸", trend: [4800,5100,5300,5600,5800] },
  Cumin:      { profit: "High", risk: 34, price: 18000, yield: 8, icon: "🌿", trend: [14000,15500,16800,17500,18000] },
  Carrot:     { profit: "Medium", risk: 30, price: 2200, yield: 80, icon: "🥕", trend: [1800,1900,2000,2100,2200] },
};

const ALERTS = [
  { crop: "Tomato", risk: 72, reason: "High production in Karnataka, Maharashtra", alt: "Capsicum", altRisk: 31 },
  { crop: "Onion", risk: 68, reason: "Bumper harvest expected across South India", alt: "Garlic", altRisk: 38 },
  { crop: "Potato", risk: 48, reason: "Cold storage surplus in UP & MP", alt: "Chickpea", altRisk: 19 },
];

const YEARS = ["2020","2021","2022","2023","2024"];

function RiskMeter({ value }) {
  const color = value < 30 ? "#22c55e" : value < 50 ? "#f59e0b" : "#ef4444";
  const label = value < 30 ? "Low Risk" : value < 50 ? "Medium Risk" : "High Risk";
  const emoji = value < 30 ? "🟢" : value < 50 ? "🟡" : "🔴";
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4, color: "#94a3b8" }}>
        <span>{emoji} {label}</span>
        <span style={{ color, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ background: "#1e293b", borderRadius: 99, height: 8, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, height: "100%", borderRadius: 99, transition: "width 0.8s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function MiniChart({ data }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120, h = 40;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 6) - 3}`).join(" ");
  const trend = data[data.length - 1] > data[0];
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`g${data[0]}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={trend ? "#22c55e" : "#ef4444"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={trend ? "#22c55e" : "#ef4444"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={trend ? "#22c55e" : "#ef4444"} strokeWidth="2" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - ((v - min) / range) * (h - 6) - 3} r="2.5" fill={trend ? "#22c55e" : "#ef4444"} />
      ))}
    </svg>
  );
}

function BigChart({ data, years, label }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 340, h = 120, pad = 10;
  const pts = data.map((v, i) => `${pad + (i / (data.length - 1)) * (w - pad * 2)},${h - pad - ((v - min) / range) * (h - pad * 2 - 10)}`).join(" ");
  const trend = data[data.length - 1] > data[0];
  const polyFill = data.map((v, i) => `${pad + (i / (data.length - 1)) * (w - pad * 2)},${h - pad - ((v - min) / range) * (h - pad * 2 - 10)}`);
  const fillPts = [...polyFill, `${w - pad},${h - pad}`, `${pad},${h - pad}`].join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block", width: "100%" }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={trend ? "#22c55e" : "#ef4444"} stopOpacity="0.25" />
          <stop offset="100%" stopColor={trend ? "#22c55e" : "#ef4444"} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill="url(#chartGrad)" />
      <polyline points={pts} fill="none" stroke={trend ? "#22c55e" : "#ef4444"} strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((v, i) => {
        const cx = pad + (i / (data.length - 1)) * (w - pad * 2);
        const cy = h - pad - ((v - min) / range) * (h - pad * 2 - 10);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4" fill={trend ? "#22c55e" : "#ef4444"} />
            <text x={cx} y={cy - 8} textAnchor="middle" fill="#94a3b8" fontSize="10">₹{v.toLocaleString()}</text>
            <text x={cx} y={h - 1} textAnchor="middle" fill="#475569" fontSize="9">{years[i]}</text>
          </g>
        );
      })}
      <text x={w / 2} y={h + 5} textAnchor="middle" fill="#64748b" fontSize="11">{label}</text>
    </svg>
  );
}

export default function CropWise() {
  const [screen, setScreen] = useState("home");
  const [soil, setSoil] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [season, setSeason] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState(2);
  const [profitCrop, setProfitCrop] = useState("Groundnut");
  const [results, setResults] = useState([]);
  const [listening, setListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 100);
  }, [screen]);

  const getRecommendations = () => {
    if (!soil || !rainfall || !season) return;
    setLoading(true);
    setAnimIn(false);
    setTimeout(() => {
      const crops = CROPS_DB[soil]?.[rainfall]?.[season] || ["Groundnut", "Ragi", "Tur Dal"];
      setResults(crops.slice(0, 3).map(c => ({ name: c, ...CROP_DATA[c] })));
      setScreen("results");
      setLoading(false);
      setAnimIn(true);
    }, 1400);
  };

  const detectLocation = () => {
    setLocating(true);
    setTimeout(() => {
      const locs = ["Dharwad, Karnataka", "Nashik, Maharashtra", "Anand, Gujarat", "Guntur, Andhra Pradesh"];
      setLocation(locs[Math.floor(Math.random() * locs.length)]);
      setLocating(false);
    }, 1800);
  };

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setVoiceText("Voice not supported in this browser. Please type your details.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase();
      setVoiceText(transcript);
      if (transcript.includes("red")) setSoil("red");
      else if (transcript.includes("black")) setSoil("black");
      else if (transcript.includes("sandy")) setSoil("sandy");
      else if (transcript.includes("loam")) setSoil("loamy");
      if (transcript.includes("low")) setRainfall("low");
      else if (transcript.includes("medium")) setRainfall("medium");
      else if (transcript.includes("high")) setRainfall("high");
      if (transcript.includes("kharif") || transcript.includes("summer")) setSeason("kharif");
      else if (transcript.includes("rabi") || transcript.includes("winter")) setSeason("rabi");
    };
    recognition.start();
  };

  const profitData = CROP_DATA[profitCrop];
  const profitEstimate = profitData ? (area * profitData.yield * profitData.price).toLocaleString("en-IN") : "—";

  const s = {
    app: { minHeight: "100vh", background: "#020c18", color: "#e2e8f0", fontFamily: "'Sora', 'DM Sans', sans-serif", position: "relative", overflow: "hidden" },
    bgBlob: (top, left, c) => ({ position: "fixed", top, left, width: 400, height: 400, borderRadius: "50%", background: c, filter: "blur(100px)", opacity: 0.12, pointerEvents: "none", zIndex: 0 }),
    wrap: { maxWidth: 480, margin: "0 auto", padding: "0 0 80px", position: "relative", zIndex: 1 },
    header: { padding: "28px 24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    logo: { fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" },
    logoGreen: { color: "#4ade80" },
    nav: { display: "flex", gap: 8, padding: "0 20px 20px", overflowX: "auto" },
    navBtn: (active) => ({ padding: "8px 16px", borderRadius: 99, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", transition: "all 0.2s", background: active ? "#4ade80" : "#0f172a", color: active ? "#020c18" : "#64748b", letterSpacing: "0.02em" }),
    card: { background: "linear-gradient(145deg, #0f172a, #0a1628)", border: "1px solid #1e293b", borderRadius: 20, padding: "20px 22px", margin: "0 20px 16px" },
    label: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#4ade80", marginBottom: 10 },
    select: { width: "100%", padding: "12px 16px", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, color: "#e2e8f0", fontSize: 14, outline: "none", marginTop: 6, appearance: "none", cursor: "pointer" },
    bigBtn: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #4ade80, #22c55e)", border: "none", borderRadius: 16, fontSize: 16, fontWeight: 800, color: "#020c18", cursor: "pointer", letterSpacing: "-0.02em", transition: "transform 0.15s, box-shadow 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
    outlineBtn: { padding: "12px 20px", background: "transparent", border: "1px solid #1e293b", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "#64748b", cursor: "pointer", transition: "all 0.2s" },
    heroCard: { background: "linear-gradient(135deg, #052e16 0%, #0a1628 60%, #1a1028 100%)", border: "1px solid #14532d", borderRadius: 24, padding: "30px 24px", margin: "0 20px 20px" },
    heroTitle: { fontSize: 32, fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1 },
    heroSub: { color: "#4ade80", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 },
    cropCard: (rank) => ({ background: rank === 0 ? "linear-gradient(135deg, #052e16, #0a2010)" : "linear-gradient(145deg, #0f172a, #0a1628)", border: `1px solid ${rank === 0 ? "#166534" : "#1e293b"}`, borderRadius: 18, padding: "18px 20px", margin: "0 20px 12px", cursor: "pointer", transition: "all 0.2s" }),
    badge: (p) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: p === "High" ? "#052e16" : p === "Medium" ? "#1c1a05" : "#1c0505", color: p === "High" ? "#4ade80" : p === "Medium" ? "#fbbf24" : "#f87171", border: `1px solid ${p === "High" ? "#166534" : p === "Medium" ? "#854d0e" : "#7f1d1d"}` }),
    alertCard: { background: "linear-gradient(135deg, #1c0505, #0a1628)", border: "1px solid #7f1d1d", borderRadius: 18, padding: "18px 20px", margin: "0 20px 12px" },
    input: { width: "100%", padding: "12px 16px", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, color: "#e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" },
    row: { display: "flex", gap: 12 },
    fadeIn: { animation: "fadeUp 0.4s ease forwards", opacity: 0 },
  };

  const navItems = [
    { id: "home", label: "🏠 Home" },
    { id: "plan", label: "🌱 Crop Plan" },
    { id: "market", label: "📊 Markets" },
    { id: "profit", label: "💰 Profit Sim" },
    { id: "alerts", label: "⚠️ Alerts" },
  ];

  const go = (s) => { setAnimIn(false); setTimeout(() => { setScreen(s); setAnimIn(true); }, 200); };

  return (
    <div style={s.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        select option { background: #0f172a; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ripple { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
        .crop-card:hover { transform: translateY(-2px); border-color: #166534 !important; }
        .big-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px #4ade8044; }
        .outline-btn:hover { border-color: #4ade80; color: #4ade80; }
        .nav-item:hover { background: #162032 !important; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 99px; }
      `}</style>

      <div style={s.bgBlob("10%", "-10%", "#22c55e")} />
      <div style={s.bgBlob("50%", "60%", "#0ea5e9")} />
      <div style={s.bgBlob("80%", "20%", "#a855f7")} />

      <div style={s.wrap}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.logo}>
            <span style={s.logoGreen}>Crop</span>Wise
            <span style={{ fontSize: 10, background: "#052e16", color: "#4ade80", borderRadius: 6, padding: "2px 7px", marginLeft: 8, fontWeight: 700, verticalAlign: "middle" }}>AI</span>
          </div>
          <div style={{ fontSize: 12, color: "#334155", fontWeight: 600 }}>Smart Farming Assistant</div>
        </div>

        {/* Nav */}
        <div style={s.nav}>
          {navItems.map(n => (
            <button key={n.id} className="nav-item" style={s.navBtn(screen === n.id || (screen === "results" && n.id === "plan"))} onClick={() => go(n.id)}>{n.label}</button>
          ))}
        </div>

        <div style={animIn ? { animation: "fadeUp 0.4s ease forwards" } : { opacity: 0 }}>

          {/* HOME */}
          {screen === "home" && (
            <>
              <div style={s.heroCard}>
                <div style={s.heroSub}>🌾 Season 2025 · Kharif Planning</div>
                <div style={s.heroTitle}>Grow Smarter.<br /><span style={{ color: "#4ade80" }}>Earn Better.</span></div>
                <p style={{ color: "#475569", fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>AI-powered crop planning with live market intelligence, oversupply risk alerts, and profit forecasting built for Indian farmers.</p>
                <button className="big-btn" style={{ ...s.bigBtn, marginTop: 20 }} onClick={() => go("plan")}>🌱 Start Crop Planning</button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "0 20px 16px" }}>
                {[
                  { icon: "📊", label: "Market Trends", sub: "5-yr price data", onClick: () => go("market") },
                  { icon: "💰", label: "Profit Simulator", sub: "Estimate income", onClick: () => go("profit") },
                  { icon: "⚠️", label: "Risk Alerts", sub: "3 active alerts", onClick: () => go("alerts") },
                  { icon: "🎙️", label: "Voice Assistant", sub: "Krishi Voice", onClick: () => go("plan") },
                ].map((item, i) => (
                  <div key={i} className="crop-card" style={{ ...s.cropCard(99), margin: 0, cursor: "pointer" }} onClick={item.onClick}>
                    <div style={{ fontSize: 26 }}>{item.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8 }}>{item.label}</div>
                    <div style={{ color: "#475569", fontSize: 12, marginTop: 3 }}>{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* Active Alert Preview */}
              <div style={{ ...s.alertCard, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 18 }}>⚠️</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Active Market Alert</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, color: "#ef4444", fontWeight: 700 }}>HIGH RISK</span>
                </div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>🍅 Tomato oversupply predicted</div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>High production in Karnataka. Prices may crash next month.</div>
                <div style={{ marginTop: 10, fontSize: 13, color: "#4ade80" }}>✅ Consider: Capsicum (31% risk)</div>
              </div>
            </>
          )}

          {/* PLAN */}
          {(screen === "plan" || screen === "results") && screen !== "results" && (
            <>
              <div style={s.card}>
                <div style={s.label}>📍 Location</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <input style={{ ...s.input, flex: 1 }} placeholder="District, State" value={location} onChange={e => setLocation(e.target.value)} />
                  <button className="outline-btn" style={{ ...s.outlineBtn, whiteSpace: "nowrap" }} onClick={detectLocation}>
                    {locating ? <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> : "📍 Auto"}
                  </button>
                </div>
              </div>

              <div style={s.card}>
                <div style={s.label}>🌱 Farm Details</div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>Soil Type</div>
                  <select style={s.select} value={soil} onChange={e => setSoil(e.target.value)}>
                    <option value="">Select soil type</option>
                    <option value="red">Red Soil</option>
                    <option value="black">Black / Cotton Soil</option>
                    <option value="sandy">Sandy Soil</option>
                    <option value="loamy">Loamy Soil</option>
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>Rainfall Level</div>
                  <select style={s.select} value={rainfall} onChange={e => setRainfall(e.target.value)}>
                    <option value="">Select rainfall</option>
                    <option value="low">Low (below 500mm)</option>
                    <option value="medium">Medium (500–1000mm)</option>
                    <option value="high">High (above 1000mm)</option>
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>Season</div>
                  <select style={s.select} value={season} onChange={e => setSeason(e.target.value)}>
                    <option value="">Select season</option>
                    <option value="kharif">Kharif (June–October)</option>
                    <option value="rabi">Rabi (October–March)</option>
                  </select>
                </div>
              </div>

              {/* Voice */}
              <div style={s.card}>
                <div style={s.label}>🎙️ Krishi Voice Assistant</div>
                <button className="big-btn" style={{ ...s.bigBtn, background: listening ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #1e40af, #1d4ed8)", marginBottom: voiceText ? 12 : 0 }} onClick={startVoice}>
                  {listening ? <><span style={{ animation: "pulse 1s ease infinite", display: "inline-block" }}>🔴</span> Listening...</> : <><span>🎤</span> Speak your farm details</>}
                </button>
                {voiceText && (
                  <div style={{ marginTop: 10, padding: "10px 14px", background: "#0a1628", borderRadius: 10, fontSize: 13, color: "#94a3b8", fontStyle: "italic" }}>
                    Heard: "{voiceText}"
                  </div>
                )}
              </div>

              <div style={{ margin: "0 20px" }}>
                <button className="big-btn" style={s.bigBtn} onClick={getRecommendations} disabled={loading || !soil || !rainfall || !season}>
                  {loading ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block", fontSize: 18 }}>⟳</span> Analyzing crops...</> : "🌾 Get Crop Recommendations"}
                </button>
              </div>
            </>
          )}

          {/* RESULTS */}
          {screen === "results" && (
            <>
              <div style={{ padding: "0 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={s.label}>🌱 Best Crops For Your Farm</div>
                  <div style={{ fontSize: 12, color: "#475569" }}>{soil} soil · {rainfall} rainfall · {season}</div>
                </div>
                <button className="outline-btn" style={s.outlineBtn} onClick={() => go("plan")}>← Edit</button>
              </div>

              {results.map((crop, i) => (
                <div key={crop.name} className="crop-card" style={s.cropCard(i)} onClick={() => setSelectedCrop(selectedCrop?.name === crop.name ? null : crop)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ fontSize: 32, lineHeight: 1 }}>{crop.icon}</div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {i === 0 && <span style={{ fontSize: 10, background: "#854d0e", color: "#fbbf24", borderRadius: 6, padding: "2px 7px", fontWeight: 700 }}>TOP PICK</span>}
                          <span style={{ fontWeight: 800, fontSize: 16 }}>{i + 1}. {crop.name}</span>
                        </div>
                        <div style={{ marginTop: 4 }}><span style={s.badge(crop.profit)}>Profit: {crop.profit}</span></div>
                      </div>
                    </div>
                    <MiniChart data={crop.trend} />
                  </div>
                  <RiskMeter value={crop.risk} />

                  {selectedCrop?.name === crop.name && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #1e293b" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                        {[
                          { l: "Market Price", v: `₹${crop.price.toLocaleString()}/q` },
                          { l: "Avg Yield", v: `${crop.yield} q/acre` },
                          { l: "Income/Acre", v: `₹${(crop.price * crop.yield / 100 * 100).toLocaleString()}` },
                        ].map(m => (
                          <div key={m.l} style={{ background: "#0a1628", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                            <div style={{ fontSize: 11, color: "#475569", marginBottom: 4 }}>{m.l}</div>
                            <div style={{ fontWeight: 700, fontSize: 13 }}>{m.v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>5-Year Price Trend</div>
                      <BigChart data={crop.trend} years={YEARS} label={`${crop.name} price (₹/quintal)`} />
                      <button className="big-btn" style={{ ...s.bigBtn, marginTop: 14 }} onClick={(e) => { e.stopPropagation(); setProfitCrop(crop.name); go("profit"); }}>
                        💰 Simulate Profit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* MARKET */}
          {screen === "market" && (
            <>
              <div style={{ padding: "0 20px 16px" }}>
                <div style={s.label}>📊 Market Intelligence</div>
                <div style={{ fontSize: 12, color: "#475569" }}>5-year price & risk analysis</div>
              </div>
              {Object.entries(CROP_DATA).slice(0, 8).map(([name, data]) => (
                <div key={name} className="crop-card" style={s.cropCard(99)} onClick={() => setSelectedCrop(selectedCrop?.name === name ? null : { name, ...data })}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 24 }}>{data.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{name}</div>
                        <div style={{ fontSize: 12, color: "#475569" }}>₹{data.price.toLocaleString()}/quintal</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <MiniChart data={data.trend} />
                      <div style={{ fontSize: 11, color: data.trend[4] > data.trend[0] ? "#4ade80" : "#ef4444", marginTop: 4 }}>
                        {data.trend[4] > data.trend[0] ? "▲" : "▼"} {Math.round(Math.abs(data.trend[4] - data.trend[0]) / data.trend[0] * 100)}% (5yr)
                      </div>
                    </div>
                  </div>
                  <RiskMeter value={data.risk} />
                  {selectedCrop?.name === name && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #1e293b" }}>
                      <BigChart data={data.trend} years={YEARS} label={`${name} — ₹/quintal`} />
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* PROFIT SIMULATOR */}
          {screen === "profit" && (
            <>
              <div style={{ padding: "0 20px 16px" }}>
                <div style={s.label}>💰 Profit Simulator</div>
                <div style={{ fontSize: 12, color: "#475569" }}>Estimate your season income</div>
              </div>

              <div style={s.card}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 6 }}>Select Crop</div>
                  <select style={s.select} value={profitCrop} onChange={e => setProfitCrop(e.target.value)}>
                    {Object.keys(CROP_DATA).map(c => <option key={c} value={c}>{CROP_DATA[c].icon} {c}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 6 }}>Land Area: <strong style={{ color: "#e2e8f0" }}>{area} Acres</strong></div>
                  <input type="range" min="0.5" max="20" step="0.5" value={area} onChange={e => setArea(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#4ade80", cursor: "pointer" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#334155", marginTop: 4 }}>
                    <span>0.5 acres</span><span>20 acres</span>
                  </div>
                </div>
              </div>

              {profitData && (
                <div style={{ ...s.heroCard, margin: "0 20px 16px" }}>
                  <div style={{ display: "flex", align: "center", gap: 14, marginBottom: 18 }}>
                    <span style={{ fontSize: 40 }}>{profitData.icon}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 20 }}>{profitCrop}</div>
                      <div style={s.badge(profitData.profit)}>{profitData.profit} Profit Stability</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                    {[
                      { l: "Expected Price", v: `₹${profitData.price.toLocaleString()}/q` },
                      { l: "Exp. Yield", v: `${profitData.yield} q/acre` },
                      { l: "Total Yield", v: `${(area * profitData.yield).toFixed(1)} quintals` },
                      { l: "Oversupply Risk", v: `${profitData.risk}%` },
                    ].map(m => (
                      <div key={m.l} style={{ background: "#0a2010", borderRadius: 12, padding: "14px 16px" }}>
                        <div style={{ fontSize: 11, color: "#4ade8099", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.l}</div>
                        <div style={{ fontWeight: 800, fontSize: 16 }}>{m.v}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#052e16", border: "1px solid #166534", borderRadius: 14, padding: "20px", textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: "#4ade80", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Estimated Income</div>
                    <div style={{ fontSize: 38, fontWeight: 900, color: "#4ade80", letterSpacing: "-1px" }}>₹{profitEstimate}</div>
                    <div style={{ fontSize: 12, color: "#166534", marginTop: 6 }}>Land: {area} Acres · Crop: {profitCrop}</div>
                  </div>
                  <RiskMeter value={profitData.risk} />
                </div>
              )}

              {/* Compare */}
              <div style={s.card}>
                <div style={s.label}>⚡ Quick Compare</div>
                {["Groundnut", "Sesame", "Chickpea"].map(c => (
                  <div key={c} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #0f172a" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span>{CROP_DATA[c].icon}</span>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{c}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#4ade80" }}>₹{(area * CROP_DATA[c].yield * CROP_DATA[c].price).toLocaleString("en-IN")}</div>
                      <div style={{ fontSize: 11, color: "#475569" }}>{area} acres</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ALERTS */}
          {screen === "alerts" && (
            <>
              <div style={{ padding: "0 20px 16px" }}>
                <div style={s.label}>⚠️ Farmer Alert System</div>
                <div style={{ fontSize: 12, color: "#475569" }}>AI-predicted oversupply warnings</div>
              </div>

              {ALERTS.map((a, i) => (
                <div key={i} style={{ ...s.alertCard, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontWeight: 800, fontSize: 16 }}>{CROP_DATA[a.crop]?.icon} {a.crop}</span>
                    <span style={{ fontSize: 11, background: "#7f1d1d", color: "#fca5a5", borderRadius: 6, padding: "3px 10px", fontWeight: 700 }}>OVERSUPPLY RISK</span>
                  </div>
                  <RiskMeter value={a.risk} />
                  <div style={{ marginTop: 12, padding: "10px 12px", background: "#0a1628", borderRadius: 10 }}>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>⚠️ Reason:</div>
                    <div style={{ fontSize: 13, color: "#e2e8f0" }}>{a.reason}</div>
                  </div>
                  <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "#4ade80" }}>✅ Suggested Alternative:</span>
                    <span style={{ fontWeight: 700 }}>{CROP_DATA[a.alt]?.icon} {a.alt} ({a.altRisk}% risk)</span>
                  </div>
                </div>
              ))}

              <div style={s.card}>
                <div style={s.label}>🌏 Future Roadmap</div>
                {[
                  "🗣️ Kannada & Hindi voice support",
                  "🛰️ Satellite crop monitoring",
                  "🏛️ Government scheme integration",
                  "📦 Farmer marketplace",
                  "🤖 AI yield prediction (CNN model)",
                ].map((f, i) => (
                  <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #0f172a", fontSize: 14, color: "#475569" }}>{f}</div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}