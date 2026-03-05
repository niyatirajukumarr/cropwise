import { useState, useEffect } from "react";

const CROPS_DB = {
  red:   { low:{kharif:["Groundnut","Ragi","Maize"],rabi:["Chickpea","Linseed","Safflower"]}, medium:{kharif:["Cotton","Sunflower","Sesame"],rabi:["Wheat","Mustard","Barley"]}, high:{kharif:["Sugarcane","Paddy","Banana"],rabi:["Potato","Onion","Garlic"]} },
  black: { low:{kharif:["Soybean","Tur Dal","Maize"],rabi:["Wheat","Chickpea","Linseed"]}, medium:{kharif:["Cotton","Paddy","Bajra"],rabi:["Mustard","Safflower","Barley"]}, high:{kharif:["Sugarcane","Banana","Turmeric"],rabi:["Onion","Garlic","Potato"]} },
  sandy: { low:{kharif:["Groundnut","Bajra","Moong"],rabi:["Mustard","Barley","Chickpea"]}, medium:{kharif:["Sunflower","Sesame","Watermelon"],rabi:["Wheat","Garlic","Cumin"]}, high:{kharif:["Maize","Cotton","Paddy"],rabi:["Potato","Onion","Tomato"]} },
  loamy: { low:{kharif:["Soybean","Tur Dal","Bajra"],rabi:["Wheat","Chickpea","Mustard"]}, medium:{kharif:["Maize","Sunflower","Cotton"],rabi:["Barley","Potato","Onion"]}, high:{kharif:["Paddy","Sugarcane","Banana"],rabi:["Tomato","Capsicum","Carrot"]} },
};

const CROP_DATA = {
  Groundnut:{profit:"High",risk:18,price:5200,yield:18,icon:"🥜",trend:[4200,4500,4800,5100,5200]},
  Ragi:{profit:"Medium",risk:22,price:2800,yield:20,icon:"🌾",trend:[2200,2400,2500,2650,2800]},
  "Tur Dal":{profit:"High",risk:21,price:6800,yield:12,icon:"🫘",trend:[5500,5900,6200,6500,6800]},
  Maize:{profit:"Medium",risk:35,price:1900,yield:35,icon:"🌽",trend:[1500,1600,1700,1850,1900]},
  Cotton:{profit:"High",risk:28,price:6200,yield:15,icon:"🌿",trend:[5000,5400,5700,6000,6200]},
  Wheat:{profit:"Medium",risk:30,price:2200,yield:40,icon:"🌾",trend:[1900,2000,2050,2150,2200]},
  Soybean:{profit:"Medium",risk:25,price:3800,yield:22,icon:"🫘",trend:[3200,3400,3500,3700,3800]},
  Paddy:{profit:"Low",risk:42,price:2100,yield:45,icon:"🌾",trend:[1700,1800,1900,2000,2100]},
  Chickpea:{profit:"High",risk:19,price:5600,yield:16,icon:"🫘",trend:[4500,4800,5100,5400,5600]},
  Mustard:{profit:"Medium",risk:27,price:5400,yield:14,icon:"🌻",trend:[4200,4600,4900,5200,5400]},
  Sunflower:{profit:"Medium",risk:33,price:5100,yield:16,icon:"🌻",trend:[4000,4300,4600,4900,5100]},
  Bajra:{profit:"Low",risk:20,price:2300,yield:25,icon:"🌾",trend:[1900,2000,2100,2200,2300]},
  Sesame:{profit:"High",risk:24,price:9200,yield:8,icon:"🌿",trend:[7500,8000,8400,8900,9200]},
  Onion:{profit:"Low",risk:68,price:1200,yield:120,icon:"🧅",trend:[800,1500,600,1800,1200]},
  Tomato:{profit:"Low",risk:72,price:900,yield:150,icon:"🍅",trend:[600,1200,400,1500,900]},
  Potato:{profit:"Medium",risk:48,price:1400,yield:100,icon:"🥔",trend:[1100,1300,1200,1500,1400]},
  Capsicum:{profit:"High",risk:31,price:4200,yield:40,icon:"🫑",trend:[3200,3500,3800,4000,4200]},
  Sugarcane:{profit:"Medium",risk:15,price:350,yield:800,icon:"🌿",trend:[300,310,320,335,350]},
  Banana:{profit:"Medium",risk:26,price:2400,yield:250,icon:"🍌",trend:[2000,2100,2200,2300,2400]},
  Moong:{profit:"High",risk:20,price:7200,yield:10,icon:"🫘",trend:[6000,6400,6700,7000,7200]},
  Barley:{profit:"Low",risk:18,price:1800,yield:35,icon:"🌾",trend:[1500,1600,1650,1750,1800]},
  Linseed:{profit:"Medium",risk:22,price:4800,yield:12,icon:"🌿",trend:[4000,4200,4400,4600,4800]},
  Turmeric:{profit:"High",risk:29,price:8500,yield:25,icon:"🌿",trend:[7000,7500,7900,8200,8500]},
  Garlic:{profit:"High",risk:38,price:12000,yield:50,icon:"🧄",trend:[8000,9500,7000,11000,12000]},
  Watermelon:{profit:"Medium",risk:36,price:1800,yield:200,icon:"🍉",trend:[1400,1600,1700,1750,1800]},
  Safflower:{profit:"Medium",risk:20,price:5800,yield:12,icon:"🌸",trend:[4800,5100,5300,5600,5800]},
  Cumin:{profit:"High",risk:34,price:18000,yield:8,icon:"🌿",trend:[14000,15500,16800,17500,18000]},
  Carrot:{profit:"Medium",risk:30,price:2200,yield:80,icon:"🥕",trend:[1800,1900,2000,2100,2200]},
};

const ALERTS = [
  {crop:"Tomato",risk:72,reason:"High production in Karnataka, Maharashtra",alt:"Capsicum",altRisk:31},
  {crop:"Onion",risk:68,reason:"Bumper harvest expected across South India",alt:"Garlic",altRisk:38},
  {crop:"Potato",risk:48,reason:"Cold storage surplus in UP & MP",alt:"Chickpea",altRisk:19},
];
const YEARS = ["2020","2021","2022","2023","2024"];
const G = "#4ade80";

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 768, isTablet: w >= 768 && w < 1100, isDesktop: w >= 1100, w };
}

function RiskMeter({ value }) {
  const color = value < 30 ? "#22c55e" : value < 50 ? "#f59e0b" : "#ef4444";
  const label = value < 30 ? "Low Risk" : value < 50 ? "Medium Risk" : "High Risk";
  const emoji = value < 30 ? "🟢" : value < 50 ? "🟡" : "🔴";
  return (
    <div style={{marginTop:6}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4,color:"#94a3b8"}}>
        <span>{emoji} {label}</span><span style={{color,fontWeight:700}}>{value}%</span>
      </div>
      <div style={{background:"#1e293b",borderRadius:99,height:8,overflow:"hidden"}}>
        <div style={{width:`${value}%`,background:`linear-gradient(90deg,${color}88,${color})`,height:"100%",borderRadius:99,transition:"width 0.8s cubic-bezier(.4,0,.2,1)"}}/>
      </div>
    </div>
  );
}

function MiniChart({ data, w=110, h=36 }) {
  const max=Math.max(...data),min=Math.min(...data),range=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/range)*(h-6)-3}`).join(" ");
  const c=data[data.length-1]>data[0]?"#22c55e":"#ef4444";
  return (
    <svg width={w} height={h} style={{display:"block",flexShrink:0}}>
      <polyline points={pts} fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round"/>
      {data.map((v,i)=><circle key={i} cx={(i/(data.length-1))*w} cy={h-((v-min)/range)*(h-6)-3} r="2.5" fill={c}/>)}
    </svg>
  );
}

function BigChart({ data, years, label }) {
  const max=Math.max(...data),min=Math.min(...data),range=max-min||1;
  const w=480,h=130,pad=14;
  const map=(v,i)=>[pad+(i/(data.length-1))*(w-pad*2), h-pad-((v-min)/range)*(h-pad*2-10)];
  const pts=data.map((v,i)=>map(v,i).join(",")).join(" ");
  const fill=[...data.map((v,i)=>map(v,i).join(",")),`${w-pad},${h-pad}`,`${pad},${h-pad}`].join(" ");
  const c=data[data.length-1]>data[0]?"#22c55e":"#ef4444";
  return (
    <svg width={w} height={h} style={{display:"block",width:"100%"}}>
      <defs><linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} stopOpacity="0.25"/><stop offset="100%" stopColor={c} stopOpacity="0.02"/></linearGradient></defs>
      <polygon points={fill} fill="url(#cg2)"/>
      <polyline points={pts} fill="none" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {data.map((v,i)=>{const[cx,cy]=map(v,i);return(<g key={i}><circle cx={cx} cy={cy} r="4" fill={c}/><text x={cx} y={cy-8} textAnchor="middle" fill="#94a3b8" fontSize="10">₹{v.toLocaleString()}</text><text x={cx} y={h-1} textAnchor="middle" fill="#475569" fontSize="9">{years[i]}</text></g>);})}
    </svg>
  );
}

export default function CropWise() {
  const bp = useBreakpoint();
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
  const [animIn, setAnimIn] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const go = (s) => { setAnimIn(false); setSidebarOpen(false); setTimeout(() => { setScreen(s); setSelectedCrop(null); setAnimIn(true); }, 180); };

  const getRecommendations = () => {
    if (!soil||!rainfall||!season) return;
    setLoading(true); setAnimIn(false);
    setTimeout(() => {
      const crops = CROPS_DB[soil]?.[rainfall]?.[season] || ["Groundnut","Ragi","Tur Dal"];
      setResults(crops.slice(0,3).map(c=>({name:c,...CROP_DATA[c]})));
      setScreen("results"); setLoading(false); setAnimIn(true);
    }, 1400);
  };

  const detectLocation = () => {
    setLocating(true);
    setTimeout(() => {
      const locs=["Dharwad, Karnataka","Nashik, Maharashtra","Anand, Gujarat","Guntur, Andhra Pradesh"];
      setLocation(locs[Math.floor(Math.random()*locs.length)]); setLocating(false);
    }, 1800);
  };

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window)&&!('SpeechRecognition' in window)){setVoiceText("Voice not supported in this browser.");return;}
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    const r=new SR(); r.lang="en-IN";
    r.onstart=()=>setListening(true); r.onend=()=>setListening(false);
    r.onresult=(e)=>{
      const t=e.results[0][0].transcript.toLowerCase(); setVoiceText(t);
      if(t.includes("red"))setSoil("red"); else if(t.includes("black"))setSoil("black");
      else if(t.includes("sandy"))setSoil("sandy"); else if(t.includes("loam"))setSoil("loamy");
      if(t.includes("low"))setRainfall("low"); else if(t.includes("medium"))setRainfall("medium"); else if(t.includes("high"))setRainfall("high");
      if(t.includes("kharif")||t.includes("summer"))setSeason("kharif"); else if(t.includes("rabi")||t.includes("winter"))setSeason("rabi");
    };
    r.start();
  };

  const profitData = CROP_DATA[profitCrop];
  const profitEstimate = profitData ? (area*profitData.yield*profitData.price).toLocaleString("en-IN") : "—";
  const activeScreen = screen==="results" ? "plan" : screen;

  const navItems = [
    {id:"home",label:"Home",icon:"🏠"},
    {id:"plan",label:"Crop Plan",icon:"🌱"},
    {id:"market",label:"Markets",icon:"📊"},
    {id:"profit",label:"Profit Sim",icon:"💰"},
    {id:"alerts",label:"Alerts",icon:"⚠️"},
  ];

  // ── Shared style helpers ──────────────────────────────────────────────────
  const card = (hi=false) => ({
    background: hi ? "linear-gradient(135deg,#052e16,#0a2010)" : "linear-gradient(145deg,#0f172a,#0a1628)",
    border:`1px solid ${hi?"#166534":"#1e293b"}`, borderRadius:20, padding:"20px 22px", marginBottom:16,
  });
  const sel = {width:"100%",padding:"12px 16px",background:"#0f172a",border:"1px solid #1e293b",borderRadius:12,color:"#e2e8f0",fontSize:14,outline:"none",appearance:"none",cursor:"pointer"};
  const bigBtn = (bg=G) => ({width:"100%",padding:"15px",background:`linear-gradient(135deg,${bg},${bg}cc)`,border:"none",borderRadius:16,fontSize:15,fontWeight:800,color:"#020c18",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"transform 0.15s"});
  const lbl = {fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:G,marginBottom:10};
  const bdg = (p) => ({display:"inline-block",padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:p==="High"?"#052e16":p==="Medium"?"#1c1a05":"#1c0505",color:p==="High"?"#4ade80":p==="Medium"?"#fbbf24":"#f87171",border:`1px solid ${p==="High"?"#166534":p==="Medium"?"#854d0e":"#7f1d1d"}`});

  const cols = (n) => ({ display:"grid", gridTemplateColumns:`repeat(${n},1fr)`, gap:16 });

  // ── Screen content (shared between layouts) ───────────────────────────────
  const Home = () => (
    <>
      <div style={{...card(true),background:"linear-gradient(135deg,#052e16 0%,#0a1628 60%,#1a1028 100%)",border:"1px solid #14532d"}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:G,marginBottom:10}}>🌾 Season 2025 · Kharif Planning</div>
        <div style={{fontSize:bp.isDesktop?40:bp.isTablet?34:28,fontWeight:900,letterSpacing:"-1px",lineHeight:1.1}}>Grow Smarter.<br/><span style={{color:G}}>Earn Better.</span></div>
        <p style={{color:"#475569",fontSize:14,marginTop:10,lineHeight:1.6}}>AI-powered crop planning with live market intelligence, oversupply risk alerts, and profit forecasting built for Indian farmers.</p>
        {bp.isDesktop ? (
          <div style={{display:"flex",gap:12,marginTop:20}}>
            <button className="cw-btn" style={{...bigBtn(),flex:1}} onClick={()=>go("plan")}>🌱 Start Crop Planning</button>
            <button className="cw-btn" style={{...bigBtn("#1d4ed8"),flex:1,color:"#fff"}} onClick={()=>go("alerts")}>⚠️ View Risk Alerts</button>
            <button className="cw-btn" style={{...bigBtn("#0f172a"),flex:1,color:G,border:`1px solid ${G}`}} onClick={()=>go("market")}>📊 Market Trends</button>
          </div>
        ) : (
          <button className="cw-btn" style={{...bigBtn(),marginTop:20}} onClick={()=>go("plan")}>🌱 Start Crop Planning</button>
        )}
      </div>

      <div style={{...cols(bp.isDesktop?4:bp.isTablet?4:2),marginBottom:16}}>
        {[{icon:"📊",label:"Market Trends",sub:"5-yr price data",to:"market"},{icon:"💰",label:"Profit Sim",sub:"Estimate income",to:"profit"},{icon:"⚠️",label:"Risk Alerts",sub:"3 active alerts",to:"alerts"},{icon:"🎙️",label:"Voice Input",sub:"Krishi Voice",to:"plan"}].map((item,i)=>(
          <div key={i} onClick={()=>go(item.to)} className="cw-card" style={{...card(),margin:0,cursor:"pointer"}}>
            <div style={{fontSize:bp.isDesktop?32:24}}>{item.icon}</div>
            <div style={{fontWeight:700,fontSize:bp.isDesktop?15:13,marginTop:8}}>{item.label}</div>
            <div style={{color:"#475569",fontSize:12,marginTop:3}}>{item.sub}</div>
          </div>
        ))}
      </div>

      {(bp.isDesktop||bp.isTablet) && (
        <div style={{...cols(3),marginBottom:16}}>
          {[{n:"28+",l:"Crops Analysed"},{n:"5 Yrs",l:"Market Data"},{n:"4",l:"Soil Types"}].map((s,i)=>(
            <div key={i} style={{...card(),margin:0,textAlign:"center"}}>
              <div style={{fontSize:38,fontWeight:900,color:G}}>{s.n}</div>
              <div style={{fontSize:13,color:"#64748b",marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{background:"linear-gradient(135deg,#1c0505,#0a1628)",border:"1px solid #7f1d1d",borderRadius:20,padding:"20px 22px",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{fontSize:18}}>⚠️</span><span style={{fontWeight:700,fontSize:14}}>Active Market Alert</span>
          <span style={{marginLeft:"auto",fontSize:11,color:"#ef4444",fontWeight:700}}>HIGH RISK</span>
        </div>
        <div style={{fontWeight:600,marginBottom:4}}>🍅 Tomato oversupply predicted</div>
        <div style={{fontSize:13,color:"#94a3b8"}}>High production in Karnataka. Prices may crash next month.</div>
        <div style={{marginTop:10,fontSize:13,color:G}}>✅ Consider: Capsicum (31% risk)</div>
      </div>
    </>
  );

  const Plan = () => (
    <>
      <div style={{marginBottom:16}}>
        <div style={lbl}>📍 Location</div>
        <div style={{display:"flex",gap:10}}>
          <input style={{...sel,flex:1}} placeholder="District, State" value={location} onChange={e=>setLocation(e.target.value)}/>
          <button onClick={detectLocation} style={{padding:"12px 18px",background:"transparent",border:"1px solid #1e293b",borderRadius:12,color:"#64748b",cursor:"pointer",fontSize:13,fontWeight:600,whiteSpace:"nowrap"}}>
            {locating?"⟳ ...":"📍 Auto"}
          </button>
        </div>
      </div>
      <div style={{...cols(bp.isDesktop?3:bp.isTablet?3:1),marginBottom:16}}>
        {[
          {label:"Soil Type",val:soil,set:setSoil,opts:[["","Select soil"],["red","Red Soil"],["black","Black Soil"],["sandy","Sandy Soil"],["loamy","Loamy Soil"]]},
          {label:"Rainfall Level",val:rainfall,set:setRainfall,opts:[["","Select rainfall"],["low","Low (<500mm)"],["medium","Medium (500–1000mm)"],["high","High (>1000mm)"]]},
          {label:"Season",val:season,set:setSeason,opts:[["","Select season"],["kharif","Kharif (June–Oct)"],["rabi","Rabi (Oct–Mar)"]]},
        ].map(f=>(
          <div key={f.label}>
            <div style={{fontSize:13,color:"#64748b",marginBottom:6}}>{f.label}</div>
            <select style={sel} value={f.val} onChange={e=>f.set(e.target.value)}>
              {f.opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div style={{...card(),marginBottom:16}}>
        <div style={lbl}>🎙️ Krishi Voice Assistant</div>
        <button className="cw-btn" style={{...bigBtn(listening?"#ef4444":"#1d4ed8"),color:"#fff",marginBottom:voiceText?12:0}} onClick={startVoice}>
          {listening?"🔴 Listening...":"🎤 Speak your farm details"}
        </button>
        {voiceText&&<div style={{marginTop:10,padding:"10px 14px",background:"#0a1628",borderRadius:10,fontSize:13,color:"#94a3b8",fontStyle:"italic"}}>Heard: "{voiceText}"</div>}
      </div>
      <button className="cw-btn" style={bigBtn()} onClick={getRecommendations} disabled={loading||!soil||!rainfall||!season}>
        {loading?<><span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span> Analysing...</>:"🌾 Get Crop Recommendations"}
      </button>
    </>
  );

  const Results = () => (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <div style={lbl}>🌱 Best Crops For Your Farm</div>
          <div style={{fontSize:12,color:"#475569"}}>{soil} soil · {rainfall} rainfall · {season}</div>
        </div>
        <button onClick={()=>go("plan")} style={{padding:"8px 16px",background:"transparent",border:"1px solid #1e293b",borderRadius:10,color:"#64748b",cursor:"pointer",fontSize:13}}>← Edit</button>
      </div>
      <div style={{...cols(bp.isDesktop?3:1),gap:16}}>
        {results.map((crop,i)=>(
          <div key={crop.name} className="cw-card" onClick={()=>setSelectedCrop(selectedCrop?.name===crop.name?null:crop)}
            style={{...card(i===0),margin:0,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:36,lineHeight:1}}>{crop.icon}</div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    {i===0&&<span style={{fontSize:10,background:"#854d0e",color:"#fbbf24",borderRadius:6,padding:"2px 7px",fontWeight:700}}>TOP PICK</span>}
                    <span style={{fontWeight:800,fontSize:16}}>{i+1}. {crop.name}</span>
                  </div>
                  <div style={{marginTop:4}}><span style={bdg(crop.profit)}>Profit: {crop.profit}</span></div>
                </div>
              </div>
              <MiniChart data={crop.trend}/>
            </div>
            <RiskMeter value={crop.risk}/>
            {selectedCrop?.name===crop.name&&(
              <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #1e293b"}}>
                <div style={{...cols(3),gap:10,marginBottom:14}}>
                  {[{l:"Price",v:`₹${crop.price.toLocaleString()}/q`},{l:"Yield",v:`${crop.yield} q/acre`},{l:"Income/Acre",v:`₹${(crop.price*crop.yield).toLocaleString()}`}].map(m=>(
                    <div key={m.l} style={{background:"#0a1628",borderRadius:10,padding:"10px",textAlign:"center"}}>
                      <div style={{fontSize:11,color:"#475569",marginBottom:4}}>{m.l}</div>
                      <div style={{fontWeight:700,fontSize:13}}>{m.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:12,color:"#64748b",marginBottom:8}}>5-Year Price Trend</div>
                <BigChart data={crop.trend} years={YEARS} label={`${crop.name} — ₹/quintal`}/>
                <button className="cw-btn" style={{...bigBtn(),marginTop:14}} onClick={e=>{e.stopPropagation();setProfitCrop(crop.name);go("profit");}}>💰 Simulate Profit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  const Market = () => (
    <>
      <div style={{marginBottom:16}}>
        <div style={lbl}>📊 Market Intelligence</div>
        <div style={{fontSize:12,color:"#475569"}}>5-year price & risk analysis · Click to expand</div>
      </div>
      <div style={{...cols(bp.isDesktop?3:bp.isTablet?2:1),gap:14}}>
        {Object.entries(CROP_DATA).map(([name,data])=>(
          <div key={name} className="cw-card" onClick={()=>setSelectedCrop(selectedCrop?.name===name?null:{name,...data})}
            style={{...card(),margin:0,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:24}}>{data.icon}</span>
                <div>
                  <div style={{fontWeight:700,fontSize:15}}>{name}</div>
                  <div style={{fontSize:12,color:"#475569"}}>₹{data.price.toLocaleString()}/q</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <MiniChart data={data.trend}/>
                <div style={{fontSize:11,color:data.trend[4]>data.trend[0]?"#4ade80":"#ef4444",marginTop:4}}>
                  {data.trend[4]>data.trend[0]?"▲":"▼"} {Math.round(Math.abs(data.trend[4]-data.trend[0])/data.trend[0]*100)}% (5yr)
                </div>
              </div>
            </div>
            <RiskMeter value={data.risk}/>
            {selectedCrop?.name===name&&(
              <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #1e293b"}}>
                <BigChart data={data.trend} years={YEARS} label={`${name} — ₹/quintal`}/>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  const Profit = () => (
    <>
      <div style={{marginBottom:16}}>
        <div style={lbl}>💰 Profit Simulator</div>
        <div style={{fontSize:12,color:"#475569"}}>Estimate your season income</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:bp.isDesktop||bp.isTablet?"1fr 1fr":"1fr",gap:20,alignItems:"start"}}>
        <div>
          <div style={{...card(),marginBottom:16}}>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:13,color:"#64748b",marginBottom:6}}>Select Crop</div>
              <select style={sel} value={profitCrop} onChange={e=>setProfitCrop(e.target.value)}>
                {Object.keys(CROP_DATA).map(c=><option key={c} value={c}>{CROP_DATA[c].icon} {c}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize:13,color:"#64748b",marginBottom:6}}>Land Area: <strong style={{color:"#e2e8f0"}}>{area} Acres</strong></div>
              <input type="range" min="0.5" max="20" step="0.5" value={area} onChange={e=>setArea(Number(e.target.value))} style={{width:"100%",accentColor:G,cursor:"pointer"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#334155",marginTop:4}}><span>0.5 ac</span><span>20 ac</span></div>
            </div>
          </div>
          <div style={card()}>
            <div style={lbl}>⚡ Quick Compare ({area} acres)</div>
            {["Groundnut","Sesame","Chickpea","Moong"].map(c=>(
              <div key={c} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #0f172a"}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}><span>{CROP_DATA[c].icon}</span><span style={{fontWeight:600,fontSize:14}}>{c}</span></div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:700,fontSize:14,color:G}}>₹{(area*CROP_DATA[c].yield*CROP_DATA[c].price).toLocaleString("en-IN")}</div>
                  <div style={{fontSize:11,color:"#475569"}}>Risk: {CROP_DATA[c].risk}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {profitData&&(
          <div style={{background:"linear-gradient(135deg,#052e16 0%,#0a1628 60%,#1a1028 100%)",border:"1px solid #14532d",borderRadius:24,padding:"24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
              <span style={{fontSize:48}}>{profitData.icon}</span>
              <div>
                <div style={{fontWeight:800,fontSize:22}}>{profitCrop}</div>
                <span style={bdg(profitData.profit)}>{profitData.profit} Profit Stability</span>
              </div>
            </div>
            <div style={{...cols(2),gap:12,marginBottom:18}}>
              {[{l:"Expected Price",v:`₹${profitData.price.toLocaleString()}/q`},{l:"Yield/Acre",v:`${profitData.yield} q`},{l:"Total Yield",v:`${(area*profitData.yield).toFixed(1)} q`},{l:"Oversupply Risk",v:`${profitData.risk}%`}].map(m=>(
                <div key={m.l} style={{background:"#0a2010",borderRadius:12,padding:"14px 16px"}}>
                  <div style={{fontSize:11,color:"#4ade8099",marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>{m.l}</div>
                  <div style={{fontWeight:800,fontSize:16}}>{m.v}</div>
                </div>
              ))}
            </div>
            <div style={{background:"#052e16",border:"1px solid #166534",borderRadius:14,padding:"22px",textAlign:"center"}}>
              <div style={{fontSize:12,color:G,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Estimated Income</div>
              <div style={{fontSize:bp.isDesktop?48:36,fontWeight:900,color:G,letterSpacing:"-1px"}}>₹{profitEstimate}</div>
              <div style={{fontSize:12,color:"#166534",marginTop:6}}>Land: {area} Acres · {profitCrop}</div>
            </div>
            <RiskMeter value={profitData.risk}/>
          </div>
        )}
      </div>
    </>
  );

  const Alerts = () => (
    <>
      <div style={{marginBottom:16}}>
        <div style={lbl}>⚠️ Farmer Alert System</div>
        <div style={{fontSize:12,color:"#475569"}}>AI-predicted oversupply warnings</div>
      </div>
      <div style={{...cols(bp.isDesktop?3:bp.isTablet?2:1),gap:14,marginBottom:20}}>
        {ALERTS.map((a,i)=>(
          <div key={i} style={{background:"linear-gradient(135deg,#1c0505,#0a1628)",border:"1px solid #7f1d1d",borderRadius:18,padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <span style={{fontWeight:800,fontSize:16}}>{CROP_DATA[a.crop]?.icon} {a.crop}</span>
              <span style={{fontSize:11,background:"#7f1d1d",color:"#fca5a5",borderRadius:6,padding:"3px 10px",fontWeight:700}}>OVERSUPPLY</span>
            </div>
            <RiskMeter value={a.risk}/>
            <div style={{marginTop:12,padding:"10px 12px",background:"#0a1628",borderRadius:10}}>
              <div style={{fontSize:12,color:"#94a3b8",marginBottom:4}}>⚠️ Reason:</div>
              <div style={{fontSize:13,color:"#e2e8f0"}}>{a.reason}</div>
            </div>
            <div style={{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:13,color:G}}>✅ Switch to:</span>
              <span style={{fontWeight:700}}>{CROP_DATA[a.alt]?.icon} {a.alt} ({a.altRisk}%)</span>
            </div>
          </div>
        ))}
      </div>
      <div style={card()}>
        <div style={lbl}>🌏 Future Roadmap</div>
        <div style={{...cols(bp.isDesktop?3:bp.isTablet?2:1),gap:8}}>
          {["🗣️ Kannada & Hindi voice support","🛰️ Satellite crop monitoring","🏛️ Government scheme integration","📦 Farmer marketplace","🤖 AI yield prediction","📱 Native Android / iOS app"].map((f,i)=>(
            <div key={i} style={{padding:"12px 14px",background:"#0a1628",borderRadius:10,fontSize:13,color:"#475569"}}>{f}</div>
          ))}
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    if (screen==="home") return <Home/>;
    if (screen==="plan") return <Plan/>;
    if (screen==="results") return <Results/>;
    if (screen==="market") return <Market/>;
    if (screen==="profit") return <Profit/>;
    if (screen==="alerts") return <Alerts/>;
  };

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { overflow-x: hidden; }
    select option { background: #0f172a; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes spin { to{transform:rotate(360deg)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    ::-webkit-scrollbar{width:5px;height:5px}
    ::-webkit-scrollbar-thumb{background:#1e293b;border-radius:99px}
    .cw-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 30px rgba(74,222,128,0.25) !important; }
    .cw-card:hover { border-color: #166534 !important; transform: translateY(-2px); transition: all 0.2s; }
    .cw-nav:hover { background: #0f172a !important; color: #cbd5e1 !important; }
    .cw-sidebar:hover { background: #0a1628 !important; }
  `;

  const blobs = (
    <>
      {[["5%","-8%","#22c55e"],["50%","70%","#0ea5e9"],["85%","10%","#a855f7"]].map(([t,l,c],i)=>(
        <div key={i} style={{position:"fixed",top:t,left:l,width:600,height:600,borderRadius:"50%",background:c,filter:"blur(130px)",opacity:0.08,pointerEvents:"none",zIndex:0}}/>
      ))}
    </>
  );

  const Logo = () => (
    <div style={{fontSize:22,fontWeight:900,letterSpacing:"-0.5px",whiteSpace:"nowrap"}}>
      <span style={{color:G}}>Crop</span>Wise
      <span style={{fontSize:10,background:"#052e16",color:G,borderRadius:6,padding:"2px 7px",marginLeft:8,fontWeight:700,verticalAlign:"middle"}}>AI</span>
    </div>
  );

  // ══════════════════════════════════════════════════════════════
  // DESKTOP + TABLET LAYOUT  (>= 768px)
  // ══════════════════════════════════════════════════════════════
  if (!bp.isMobile) {
    const SIDEBAR_W = bp.isTablet ? 200 : 240;
    return (
      <div style={{minHeight:"100vh",background:"#020c18",color:"#e2e8f0",fontFamily:"'Sora','DM Sans',sans-serif",display:"flex"}}>
        <style>{CSS}</style>
        {blobs}

        {/* ── Sidebar ── */}
        <aside style={{width:SIDEBAR_W,minHeight:"100vh",background:"linear-gradient(180deg,#020c18,#060f1c)",borderRight:"1px solid #1e293b",position:"fixed",top:0,left:0,zIndex:20,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"28px 20px 16px"}}>
            <Logo/>
            <div style={{fontSize:11,color:"#1e3a2a",fontWeight:600,marginTop:5}}>Smart Farming Assistant</div>
          </div>

          <nav style={{padding:"4px 10px",flex:1}}>
            {navItems.map(n=>(
              <button key={n.id} className="cw-sidebar" onClick={()=>go(n.id)} style={{
                width:"100%",padding:"11px 14px",borderRadius:10,border:"none",cursor:"pointer",
                background:activeScreen===n.id?"#052e16":"transparent",
                color:activeScreen===n.id?G:"#475569",
                display:"flex",alignItems:"center",gap:12,fontSize:bp.isTablet?13:14,
                fontWeight:activeScreen===n.id?700:500,marginBottom:3,
                transition:"all 0.2s",textAlign:"left",
                borderLeft:activeScreen===n.id?`3px solid ${G}`:"3px solid transparent",
              }}>
                <span style={{fontSize:18}}>{n.icon}</span>{n.label}
              </button>
            ))}
          </nav>

          <div style={{padding:"16px 20px",borderTop:"1px solid #1e293b"}}>
            <div style={{fontSize:10,color:"#1e293b",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.1em"}}>Active Season</div>
            <div style={{fontSize:13,color:"#475569"}}>🌾 Kharif 2025</div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div style={{marginLeft:SIDEBAR_W,flex:1,position:"relative",zIndex:1,minHeight:"100vh",display:"flex",flexDirection:"column"}}>

          {/* Top bar */}
          <header style={{padding:"16px 36px",borderBottom:"1px solid #1e293b",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(2,12,24,0.88)",backdropFilter:"blur(16px)",position:"sticky",top:0,zIndex:10}}>
            <div>
              <div style={{fontWeight:800,fontSize:20}}>
                {navItems.find(n=>n.id===activeScreen)?.icon} {navItems.find(n=>n.id===activeScreen)?.label}
                {screen==="results"&&" — Recommendations"}
              </div>
              <div style={{fontSize:12,color:"#475569",marginTop:2}}>CropWise AI · Demand-Aware Crop Planning</div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <div style={{padding:"7px 16px",background:"#052e16",borderRadius:99,fontSize:12,color:G,fontWeight:600}}>🟢 Live Data</div>
              <div style={{padding:"7px 16px",background:"#0f172a",border:"1px solid #1e293b",borderRadius:99,fontSize:12,color:"#64748b"}}>📍 India</div>
            </div>
          </header>

          {/* Page content */}
          <main style={{padding:bp.isTablet?"28px 28px 60px":"36px 40px 60px",animation:animIn?"fadeUp 0.35s ease forwards":"none",opacity:animIn?undefined:0,flex:1}}>
            {renderContent()}
          </main>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // MOBILE LAYOUT  (< 768px)
  // ══════════════════════════════════════════════════════════════
  return (
    <div style={{minHeight:"100vh",background:"#020c18",color:"#e2e8f0",fontFamily:"'Sora','DM Sans',sans-serif",position:"relative"}}>
      <style>{CSS}</style>
      {blobs}

      {/* Mobile top bar */}
      <header style={{padding:"16px 20px 10px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"rgba(2,12,24,0.92)",backdropFilter:"blur(14px)",zIndex:20,borderBottom:"1px solid #1e293b"}}>
        <Logo/>
        <button onClick={()=>setSidebarOpen(o=>!o)} style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"8px 12px",color:"#94a3b8",cursor:"pointer",fontSize:18}}>
          {sidebarOpen?"✕":"☰"}
        </button>
      </header>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div style={{position:"fixed",inset:0,zIndex:30}} onClick={()=>setSidebarOpen(false)}>
          <div onClick={e=>e.stopPropagation()} style={{position:"absolute",top:0,right:0,width:"70%",maxWidth:280,height:"100%",background:"#060f1c",borderLeft:"1px solid #1e293b",padding:"20px 16px",display:"flex",flexDirection:"column",gap:6}}>
            <div style={{marginBottom:16,padding:"0 8px"}}><Logo/></div>
            {navItems.map(n=>(
              <button key={n.id} onClick={()=>go(n.id)} style={{width:"100%",padding:"13px 16px",borderRadius:12,border:"none",cursor:"pointer",background:activeScreen===n.id?"#052e16":"transparent",color:activeScreen===n.id?G:"#475569",display:"flex",alignItems:"center",gap:12,fontSize:15,fontWeight:activeScreen===n.id?700:500,textAlign:"left",borderLeft:activeScreen===n.id?`3px solid ${G}`:"3px solid transparent"}}>
                <span style={{fontSize:20}}>{n.icon}</span>{n.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile scrollable nav pills */}
      <div style={{display:"flex",gap:8,padding:"10px 16px",overflowX:"auto",borderBottom:"1px solid #0f172a"}}>
        {navItems.map(n=>(
          <button key={n.id} className="cw-nav" onClick={()=>go(n.id)} style={{padding:"7px 14px",borderRadius:99,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",background:activeScreen===n.id?G:"#0f172a",color:activeScreen===n.id?"#020c18":"#475569",flexShrink:0}}>
            {n.icon} {n.label}
          </button>
        ))}
      </div>

      {/* Mobile content */}
      <div style={{padding:"16px 16px 90px",animation:animIn?"fadeUp 0.4s ease forwards":"none",opacity:animIn?undefined:0,position:"relative",zIndex:1}}>
        {renderContent()}
      </div>

      {/* Mobile bottom nav */}
      <nav style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(2,12,24,0.97)",borderTop:"1px solid #1e293b",display:"flex",zIndex:20,backdropFilter:"blur(14px)"}}>
        {navItems.map(n=>(
          <button key={n.id} onClick={()=>go(n.id)} style={{flex:1,padding:"10px 4px 12px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:activeScreen===n.id?G:"#334155"}}>
            <span style={{fontSize:18}}>{n.icon}</span>
            <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.03em"}}>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
