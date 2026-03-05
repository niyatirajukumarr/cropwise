import { useState, useEffect } from "react";

const CROPS_DB = {
  red:   { low: { kharif: ["Groundnut","Ragi","Maize"],        rabi: ["Chickpea","Linseed","Safflower"] },
           medium: { kharif: ["Cotton","Sunflower","Sesame"],   rabi: ["Wheat","Mustard","Barley"] },
           high:   { kharif: ["Sugarcane","Paddy","Banana"],    rabi: ["Potato","Onion","Garlic"] } },
  black: { low: { kharif: ["Soybean","Tur Dal","Maize"],       rabi: ["Wheat","Chickpea","Linseed"] },
           medium: { kharif: ["Cotton","Paddy","Bajra"],        rabi: ["Mustard","Safflower","Barley"] },
           high:   { kharif: ["Sugarcane","Banana","Turmeric"], rabi: ["Onion","Garlic","Potato"] } },
  sandy: { low: { kharif: ["Groundnut","Bajra","Moong"],       rabi: ["Mustard","Barley","Chickpea"] },
           medium: { kharif: ["Sunflower","Sesame","Watermelon"], rabi: ["Wheat","Garlic","Cumin"] },
           high:   { kharif: ["Maize","Cotton","Paddy"],        rabi: ["Potato","Onion","Tomato"] } },
  loamy: { low: { kharif: ["Soybean","Tur Dal","Bajra"],       rabi: ["Wheat","Chickpea","Mustard"] },
           medium: { kharif: ["Maize","Sunflower","Cotton"],    rabi: ["Barley","Potato","Onion"] },
           high:   { kharif: ["Paddy","Sugarcane","Banana"],    rabi: ["Tomato","Capsicum","Carrot"] } },
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
const ALERTS=[
  {crop:"Tomato",risk:72,reason:"High production in Karnataka, Maharashtra",alt:"Capsicum",altRisk:31},
  {crop:"Onion",risk:68,reason:"Bumper harvest expected across South India",alt:"Garlic",altRisk:38},
  {crop:"Potato",risk:48,reason:"Cold storage surplus in UP & MP",alt:"Chickpea",altRisk:19},
];
const YEARS=["2020","2021","2022","2023","2024"];

function MiniChart({data}){
  const max=Math.max(...data),min=Math.min(...data),range=max-min||1,w=100,h=36;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/range)*(h-6)-3}`).join(" ");
  const up=data[data.length-1]>data[0];
  return(<svg width={w} height={h} style={{display:"block"}}><polyline points={pts} fill="none" stroke={up?"#22c55e":"#ef4444"} strokeWidth="2" strokeLinejoin="round"/>{data.map((v,i)=>{const cx=(i/(data.length-1))*w,cy=h-((v-min)/range)*(h-6)-3;return <circle key={i} cx={cx} cy={cy} r="2.5" fill={up?"#22c55e":"#ef4444"}/>;})}</svg>);
}
function BigChart({data,years}){
  const max=Math.max(...data),min=Math.min(...data),range=max-min||1,w=320,h=110,p=14;
  const pts=data.map((v,i)=>`${p+(i/(data.length-1))*(w-p*2)},${h-p-((v-min)/range)*(h-p*2-8)}`);
  const up=data[data.length-1]>data[0],fill=[...pts,`${w-p},${h-p}`,`${p},${h-p}`].join(" ");
  return(<svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{display:"block"}}><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={up?"#22c55e":"#ef4444"} stopOpacity="0.25"/><stop offset="100%" stopColor={up?"#22c55e":"#ef4444"} stopOpacity="0.02"/></linearGradient></defs><polygon points={fill} fill="url(#cg)"/><polyline points={pts.join(" ")} fill="none" stroke={up?"#22c55e":"#ef4444"} strokeWidth="2.5" strokeLinejoin="round"/>{data.map((v,i)=>{const cx=p+(i/(data.length-1))*(w-p*2),cy=h-p-((v-min)/range)*(h-p*2-8);return(<g key={i}><circle cx={cx} cy={cy} r="4" fill={up?"#22c55e":"#ef4444"}/><text x={cx} y={cy-8} textAnchor="middle" fill="#94a3b8" fontSize="9">₹{v.toLocaleString()}</text><text x={cx} y={h-2} textAnchor="middle" fill="#475569" fontSize="8">{years[i]}</text></g>);})}</svg>);
}
function RiskMeter({value}){
  const c=value<30?"#22c55e":value<50?"#f59e0b":"#ef4444",l=value<30?"Low Risk":value<50?"Medium Risk":"High Risk",e=value<30?"🟢":value<50?"🟡":"🔴";
  return(<div style={{marginTop:6}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4,color:"#94a3b8"}}><span>{e} {l}</span><span style={{color:c,fontWeight:700}}>{value}%</span></div><div style={{background:"#1e293b",borderRadius:99,height:7,overflow:"hidden"}}><div style={{width:`${value}%`,background:`linear-gradient(90deg,${c}88,${c})`,height:"100%",borderRadius:99,transition:"width 0.8s"}}/></div></div>);
}

const CSS=`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
*{box-sizing:border-box}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:#1e293b;border-radius:99px}
.hw:hover{transform:translateY(-2px);border-color:#166534!important;transition:all .2s}.bb:hover{transform:translateY(-2px);box-shadow:0 12px 40px #4ade8044;transition:all .15s}.ob:hover{border-color:#4ade80!important;color:#4ade80!important;transition:all .2s}.nb:hover{background:#162032!important;transition:all .2s}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}.fade{animation:fadeUp .35s ease forwards}select option{background:#0f172a}`;

const badge=(p)=>({display:"inline-block",padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:p==="High"?"#052e16":p==="Medium"?"#1c1a05":"#1c0505",color:p==="High"?"#4ade80":p==="Medium"?"#fbbf24":"#f87171",border:`1px solid ${p==="High"?"#166534":p==="Medium"?"#854d0e":"#7f1d1d"}`});
const NAV=[{id:"home",label:"Home",icon:"🏠"},{id:"plan",label:"Crop Plan",icon:"🌱"},{id:"market",label:"Markets",icon:"📊"},{id:"profit",label:"Profit",icon:"💰"},{id:"alerts",label:"Alerts",icon:"⚠️"}];

export default function CropWise(){
  const [screen,setScreen]=useState("home");
  const [soil,setSoil]=useState("");
  const [rainfall,setRainfall]=useState("");
  const [season,setSeason]=useState("");
  const [location,setLocation]=useState("");
  const [area,setArea]=useState(2);
  const [profitCrop,setProfitCrop]=useState("Groundnut");
  const [results,setResults]=useState([]);
  const [listening,setListening]=useState(false);
  const [voiceText,setVoiceText]=useState("");
  const [expanded,setExpanded]=useState(null);
  const [loading,setLoading]=useState(false);
  const [locating,setLocating]=useState(false);
  const [isDesktop,setIsDesktop]=useState(window.innerWidth>=900);

  useEffect(()=>{const fn=()=>setIsDesktop(window.innerWidth>=900);window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);},[]);

  const go=(s)=>{setScreen(s);setExpanded(null);};
  const getRecommendations=()=>{
    if(!soil||!rainfall||!season)return;setLoading(true);
    setTimeout(()=>{const crops=CROPS_DB[soil]?.[rainfall]?.[season]||["Groundnut","Ragi","Tur Dal"];setResults(crops.slice(0,3).map(c=>({name:c,...CROP_DATA[c]})));setScreen("results");setLoading(false);},1400);
  };
  const detectLocation=()=>{setLocating(true);setTimeout(()=>{const l=["Dharwad, Karnataka","Nashik, Maharashtra","Anand, Gujarat","Guntur, Andhra Pradesh"];setLocation(l[Math.floor(Math.random()*l.length)]);setLocating(false);},1800);};
  const startVoice=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){setVoiceText("Voice not supported.");return;}const r=new SR();r.lang="en-IN";r.onstart=()=>setListening(true);r.onend=()=>setListening(false);r.onresult=(e)=>{const t=e.results[0][0].transcript.toLowerCase();setVoiceText(t);if(t.includes("red"))setSoil("red");else if(t.includes("black"))setSoil("black");else if(t.includes("sandy"))setSoil("sandy");else if(t.includes("loam"))setSoil("loamy");if(t.includes("low"))setRainfall("low");else if(t.includes("medium"))setRainfall("medium");else if(t.includes("high"))setRainfall("high");if(t.includes("kharif")||t.includes("summer"))setSeason("kharif");else if(t.includes("rabi")||t.includes("winter"))setSeason("rabi");};r.start();};

  const profitData=CROP_DATA[profitCrop];
  const profitEstimate=profitData?(area*profitData.yield*profitData.price).toLocaleString("en-IN"):"—";
  const props={screen,soil,setSoil,rainfall,setRainfall,season,setSeason,location,setLocation,area,setArea,profitCrop,setProfitCrop,results,listening,voiceText,expanded,setExpanded,loading,locating,profitData,profitEstimate,getRecommendations,detectLocation,startVoice,go,badge,setProfitCrop};

  const blobs=[["15%","-5%","#22c55e"],["55%","65%","#0ea5e9"],["85%","25%","#a855f7"]];

  if(isDesktop) return(
    <div style={{display:"flex",minHeight:"100vh",background:"#020c18",color:"#e2e8f0",fontFamily:"'Sora',sans-serif",position:"relative",overflow:"hidden"}}>
      <style>{CSS}</style>
      {blobs.map(([t,l,c],i)=><div key={i} style={{position:"fixed",top:t,left:l,width:500,height:500,borderRadius:"50%",background:c,filter:"blur(120px)",opacity:0.09,pointerEvents:"none",zIndex:0}}/>)}
      <aside style={{width:240,minHeight:"100vh",background:"linear-gradient(180deg,#0a1628,#050e1a)",borderRight:"1px solid #1e293b",display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,bottom:0,zIndex:10}}>
        <div style={{padding:"28px 24px 20px"}}>
          <div style={{fontSize:24,fontWeight:900,letterSpacing:"-0.5px"}}><span style={{color:"#4ade80"}}>Crop</span>Wise<span style={{fontSize:10,background:"#052e16",color:"#4ade80",borderRadius:6,padding:"2px 7px",marginLeft:8,fontWeight:700,verticalAlign:"middle"}}>AI</span></div>
          <div style={{fontSize:11,color:"#64748b",marginTop:4,fontWeight:600}}>Smart Farming Assistant</div>
        </div>
        <nav style={{flex:1,padding:"0 12px"}}>
          {NAV.map(n=>{const active=screen===n.id||(screen==="results"&&n.id==="plan");return(<div key={n.id} className="nb" onClick={()=>go(n.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 16px",borderRadius:12,cursor:"pointer",marginBottom:4,background:active?"linear-gradient(135deg,#052e16,#0a2010)":"transparent",color:active?"#4ade80":"#64748b",fontWeight:active?700:500,fontSize:14,border:active?"1px solid #166534":"1px solid transparent"}}><span style={{fontSize:18}}>{n.icon}</span>{n.label}</div>);})}
        </nav>
        <div style={{padding:"16px 24px",borderTop:"1px solid #1e293b"}}><div style={{background:"#052e16",border:"1px solid #166534",borderRadius:10,padding:"10px 14px"}}><div style={{fontSize:11,color:"#4ade8099",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>Current Season</div><div style={{fontSize:14,fontWeight:700,color:"#4ade80",marginTop:3}}>🌾 Kharif 2025</div></div></div>
      </aside>
      <main style={{marginLeft:240,width:"calc(100vw - 240px)",overflowY:"auto",minHeight:"100vh",position:"relative",zIndex:1}}>
        <div className="fade" key={screen} style={{padding:"32px 36px 60px"}}><DesktopScreens {...props}/></div>
      </main>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"#020c18",color:"#e2e8f0",fontFamily:"'Sora',sans-serif",position:"relative",overflow:"hidden"}}>
      <style>{CSS}</style>
      {blobs.map(([t,l,c],i)=><div key={i} style={{position:"fixed",top:t,left:l,width:400,height:400,borderRadius:"50%",background:c,filter:"blur(100px)",opacity:0.12,pointerEvents:"none",zIndex:0}}/>)}
      <div style={{padding:"20px 16px 8px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1}}>
        <div style={{fontSize:20,fontWeight:900}}><span style={{color:"#4ade80"}}>Crop</span>Wise<span style={{fontSize:9,background:"#052e16",color:"#4ade80",borderRadius:6,padding:"2px 6px",marginLeft:6,fontWeight:700,verticalAlign:"middle"}}>AI</span></div>
        <div style={{fontSize:11,color:"#64748b",fontWeight:600}}>Smart Farming</div>
      </div>
      <div style={{display:"flex",gap:6,padding:"0 14px 14px",overflowX:"auto",position:"relative",zIndex:1}}>
        {NAV.map(n=>{const active=screen===n.id||(screen==="results"&&n.id==="plan");return <button key={n.id} onClick={()=>go(n.id)} style={{padding:"7px 13px",borderRadius:99,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",background:active?"#4ade80":"#0f172a",color:active?"#020c18":"#64748b",transition:"all .2s"}}>{n.icon} {n.label}</button>;})}
      </div>
      <div className="fade" key={screen} style={{position:"relative",zIndex:1,paddingBottom:60}}><MobileScreens {...props}/></div>
    </div>
  );
}

function DesktopScreens({screen,soil,setSoil,rainfall,setRainfall,season,setSeason,location,setLocation,area,setArea,profitCrop,setProfitCrop,results,listening,voiceText,expanded,setExpanded,loading,locating,profitData,profitEstimate,getRecommendations,detectLocation,startVoice,go,badge}){
  const card={background:"linear-gradient(145deg,#0f172a,#0a1628)",border:"1px solid #1e293b",borderRadius:20,padding:"24px 28px",marginBottom:20};
  const lbl={fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#4ade80",marginBottom:12};
  const sel={width:"100%",padding:"12px 16px",background:"#0a1225",border:"1px solid #1e293b",borderRadius:12,color:"#e2e8f0",fontSize:14,outline:"none",appearance:"none",cursor:"pointer"};
  const inp={width:"100%",padding:"12px 16px",background:"#0a1225",border:"1px solid #1e293b",borderRadius:12,color:"#e2e8f0",fontSize:14,outline:"none"};
  const btn={width:"100%",padding:"15px",background:"linear-gradient(135deg,#4ade80,#22c55e)",border:"none",borderRadius:16,fontSize:15,fontWeight:800,color:"#020c18",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8};

  if(screen==="home")return(<>
    <div style={{background:"linear-gradient(135deg,#052e16,#0a1628,#1a1028)",border:"1px solid #14532d",borderRadius:24,padding:"40px 44px",marginBottom:24,display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"center"}}>
      <div>
        <div style={{fontSize:12,color:"#4ade80",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>🌾 Season 2025 · Kharif Planning</div>
        <div style={{fontSize:44,fontWeight:900,letterSpacing:"-1.5px",lineHeight:1.05}}>Grow Smarter.<br/><span style={{color:"#4ade80"}}>Earn Better.</span></div>
        <p style={{color:"#475569",fontSize:15,marginTop:14,lineHeight:1.7}}>AI-powered crop planning with live market intelligence, oversupply risk alerts, and profit forecasting — built for Indian farmers.</p>
        <button className="bb" style={{...btn,width:"auto",padding:"14px 32px",marginTop:20}} onClick={()=>go("plan")}>🌱 Start Crop Planning</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {[{icon:"📊",l:"Market Trends",s:"5-yr price data",t:"market"},{icon:"💰",l:"Profit Simulator",s:"Estimate income",t:"profit"},{icon:"⚠️",l:"Risk Alerts",s:"3 active alerts",t:"alerts"},{icon:"🎙️",l:"Krishi Voice",s:"Voice assistant",t:"plan"}].map((item,i)=>(
          <div key={i} className="hw" style={{background:"linear-gradient(145deg,#0f172a,#0a1628)",border:"1px solid #1e293b",borderRadius:16,padding:"20px",cursor:"pointer"}} onClick={()=>go(item.t)}>
            <div style={{fontSize:28}}>{item.icon}</div><div style={{fontWeight:700,fontSize:15,marginTop:10}}>{item.l}</div><div style={{color:"#475569",fontSize:12,marginTop:3}}>{item.s}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}}>
      {[{v:"20+",l:"Crops Covered"},{v:"₹5,200",l:"Avg Groundnut Price"},{v:"3",l:"Active Risk Alerts"},{v:"5 Yr",l:"Price History"}].map((s,i)=>(
        <div key={i} style={{...card,margin:0,textAlign:"center",padding:"20px"}}><div style={{fontSize:28,fontWeight:900,color:"#4ade80"}}>{s.v}</div><div style={{fontSize:12,color:"#475569",marginTop:4}}>{s.l}</div></div>
      ))}
    </div>
    <div style={{background:"linear-gradient(135deg,#1c0505,#0a1628)",border:"1px solid #7f1d1d",borderRadius:18,padding:"24px 28px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><span style={{fontSize:20}}>⚠️</span><span style={{fontWeight:700,fontSize:16}}>Active Market Alerts</span><span style={{marginLeft:"auto",fontSize:11,background:"#7f1d1d",color:"#fca5a5",borderRadius:6,padding:"3px 10px",fontWeight:700}}>HIGH RISK</span></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {[{c:"🍅 Tomato",r:72,a:"Capsicum"},{c:"🧅 Onion",r:68,a:"Garlic"},{c:"🥔 Potato",r:48,a:"Chickpea"}].map((a,i)=>(
          <div key={i} style={{background:"#0a1628",borderRadius:12,padding:"14px"}}><div style={{fontWeight:700,marginBottom:6}}>{a.c}</div><div style={{fontSize:12,color:"#ef4444",marginBottom:8}}>Risk: {a.r}%</div><div style={{fontSize:12,color:"#4ade80"}}>✅ Try: {a.a}</div></div>
        ))}
      </div>
    </div>
  </>);

  if(screen==="plan")return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
      <div>
        <div style={card}>
          <div style={lbl}>📍 Location</div>
          <div style={{display:"flex",gap:10}}><input style={{...inp,flex:1}} placeholder="District, State" value={location} onChange={e=>setLocation(e.target.value)}/><button className="ob" style={{padding:"12px 16px",background:"transparent",border:"1px solid #1e293b",borderRadius:12,fontSize:13,fontWeight:600,color:"#64748b",cursor:"pointer",whiteSpace:"nowrap"}} onClick={detectLocation}>{locating?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span>:"📍 Auto"}</button></div>
        </div>
        <div style={card}>
          <div style={lbl}>🌱 Farm Details</div>
          {[{l:"Soil Type",val:soil,set:setSoil,opts:[["red","Red Soil"],["black","Black / Cotton Soil"],["sandy","Sandy Soil"],["loamy","Loamy Soil"]]},{l:"Rainfall",val:rainfall,set:setRainfall,opts:[["low","Low (< 500mm)"],["medium","Medium (500–1000mm)"],["high","High (> 1000mm)"]]},{l:"Season",val:season,set:setSeason,opts:[["kharif","Kharif (June–Oct)"],["rabi","Rabi (Oct–Mar)"]]}].map(({l,val,set,opts})=>(
            <div key={l} style={{marginBottom:14}}><div style={{fontSize:12,color:"#64748b",marginBottom:5}}>{l}</div><select style={sel} value={val} onChange={e=>set(e.target.value)}><option value="">Select {l.toLowerCase()}</option>{opts.map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></div>
          ))}
        </div>
      </div>
      <div>
        <div style={card}>
          <div style={lbl}>🎙️ Krishi Voice Assistant</div>
          <p style={{color:"#475569",fontSize:13,marginBottom:14,lineHeight:1.6}}>Speak your farm details in English. The assistant auto-fills the form for you.</p>
          <button className="bb" style={{...btn,background:listening?"linear-gradient(135deg,#ef4444,#dc2626)":"linear-gradient(135deg,#1e40af,#1d4ed8)"}} onClick={startVoice}>{listening?<><span style={{animation:"pulse 1s ease infinite",display:"inline-block"}}>🔴</span>Listening...</>:<><span>🎤</span>Speak Farm Details</>}</button>
          {voiceText&&<div style={{marginTop:12,padding:"12px 16px",background:"#0a1628",borderRadius:10,fontSize:13,color:"#94a3b8",fontStyle:"italic"}}>Heard: "{voiceText}"</div>}
        </div>
        <div style={card}>
          <div style={lbl}>✅ Ready to Analyse</div>
          <p style={{color:"#475569",fontSize:13,marginBottom:16,lineHeight:1.6}}>Fill in your soil, rainfall and season, then click below for recommendations.</p>
          <button className="bb" style={btn} onClick={getRecommendations} disabled={loading||!soil||!rainfall||!season}>{loading?<><span style={{animation:"spin 1s linear infinite",display:"inline-block",fontSize:18}}>⟳</span>Analysing...</>:"🌾 Get Recommendations"}</button>
        </div>
      </div>
    </div>
  );

  if(screen==="results")return(<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div><div style={lbl}>🌱 Best Crops For Your Farm</div><div style={{fontSize:13,color:"#475569"}}>{soil} soil · {rainfall} rainfall · {season}</div></div>
      <button className="ob" style={{padding:"10px 18px",background:"transparent",border:"1px solid #1e293b",borderRadius:12,fontSize:13,fontWeight:600,color:"#64748b",cursor:"pointer"}} onClick={()=>go("plan")}>← Edit</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
      {results.map((crop,i)=>(
        <div key={crop.name} className="hw" style={{background:i===0?"linear-gradient(135deg,#052e16,#0a2010)":"linear-gradient(145deg,#0f172a,#0a1628)",border:`1px solid ${i===0?"#166534":"#1e293b"}`,borderRadius:18,padding:"22px",cursor:"pointer"}} onClick={()=>setExpanded(expanded===i?null:i)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>{i===0&&<div style={{fontSize:10,background:"#854d0e",color:"#fbbf24",borderRadius:6,padding:"2px 8px",fontWeight:700,marginBottom:6}}>TOP PICK</div>}<div style={{fontSize:28}}>{crop.icon}</div><div style={{fontWeight:800,fontSize:17,marginTop:6}}>{crop.name}</div><div style={{marginTop:6}}><span style={badge(crop.profit)}>Profit: {crop.profit}</span></div></div>
            <MiniChart data={crop.trend}/>
          </div>
          <RiskMeter value={crop.risk}/>
          {expanded===i&&(<div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #1e293b"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>{[{l:"Price",v:`₹${crop.price.toLocaleString()}/q`},{l:"Yield",v:`${crop.yield} q/ac`}].map(m=>(<div key={m.l} style={{background:"#0a1628",borderRadius:10,padding:"12px",textAlign:"center"}}><div style={{fontSize:11,color:"#475569",marginBottom:4}}>{m.l}</div><div style={{fontWeight:700}}>{m.v}</div></div>))}</div>
            <BigChart data={crop.trend} years={YEARS}/>
            <button className="bb" style={{...btn,marginTop:14}} onClick={e=>{e.stopPropagation();setProfitCrop(crop.name);go("profit");}}>💰 Simulate Profit</button>
          </div>)}
        </div>
      ))}
    </div>
  </>);

  if(screen==="market")return(<>
    <div style={{marginBottom:20}}><div style={lbl}>📊 Market Intelligence</div><div style={{fontSize:13,color:"#475569"}}>5-year price & risk analysis</div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
      {Object.entries(CROP_DATA).map(([name,data])=>(
        <div key={name} className="hw" style={{background:"linear-gradient(145deg,#0f172a,#0a1628)",border:"1px solid #1e293b",borderRadius:18,padding:"20px",cursor:"pointer"}} onClick={()=>setExpanded(expanded===name?null:name)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:26}}>{data.icon}</span><div><div style={{fontWeight:700,fontSize:15}}>{name}</div><div style={{fontSize:12,color:"#475569"}}>₹{data.price.toLocaleString()}/q</div></div></div><div style={{textAlign:"right"}}><MiniChart data={data.trend}/><div style={{fontSize:11,color:data.trend[4]>data.trend[0]?"#4ade80":"#ef4444",marginTop:4}}>{data.trend[4]>data.trend[0]?"▲":"▼"} {Math.round(Math.abs(data.trend[4]-data.trend[0])/data.trend[0]*100)}% (5yr)</div></div></div>
          <RiskMeter value={data.risk}/>
          {expanded===name&&<div style={{marginTop:14,paddingTop:14,borderTop:"1px solid #1e293b"}}><BigChart data={data.trend} years={YEARS}/></div>}
        </div>
      ))}
    </div>
  </>);

  if(screen==="profit")return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:28}}>
      <div>
        <div style={card}>
          <div style={lbl}>💰 Profit Simulator</div>
          <div style={{marginBottom:16}}><div style={{fontSize:12,color:"#64748b",marginBottom:6}}>Select Crop</div><select style={sel} value={profitCrop} onChange={e=>setProfitCrop(e.target.value)}>{Object.keys(CROP_DATA).map(c=><option key={c} value={c}>{CROP_DATA[c].icon} {c}</option>)}</select></div>
          <div><div style={{fontSize:12,color:"#64748b",marginBottom:6}}>Land Area: <strong style={{color:"#e2e8f0"}}>{area} Acres</strong></div><input type="range" min="0.5" max="20" step="0.5" value={area} onChange={e=>setArea(Number(e.target.value))} style={{width:"100%",accentColor:"#4ade80",cursor:"pointer"}}/><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#334155",marginTop:4}}><span>0.5 ac</span><span>20 ac</span></div></div>
        </div>
        <div style={card}><div style={lbl}>⚡ Quick Compare ({area} acres)</div>{["Groundnut","Sesame","Chickpea","Moong"].map(c=>(<div key={c} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #0f172a"}}><div style={{display:"flex",gap:10,alignItems:"center"}}><span>{CROP_DATA[c].icon}</span><span style={{fontWeight:600,fontSize:13}}>{c}</span></div><div style={{fontWeight:700,fontSize:14,color:"#4ade80"}}>₹{(area*CROP_DATA[c].yield*CROP_DATA[c].price).toLocaleString("en-IN")}</div></div>))}</div>
      </div>
      {profitData&&(<div style={{background:"linear-gradient(135deg,#052e16,#0a1628)",border:"1px solid #14532d",borderRadius:20,padding:"28px"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}><span style={{fontSize:44}}>{profitData.icon}</span><div><div style={{fontWeight:800,fontSize:22}}>{profitCrop}</div><span style={badge(profitData.profit)}>{profitData.profit} Stability</span></div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>{[{l:"Expected Price",v:`₹${profitData.price.toLocaleString()}/q`},{l:"Exp. Yield",v:`${profitData.yield} q/ac`},{l:"Total Yield",v:`${(area*profitData.yield).toFixed(1)} q`},{l:"Oversupply Risk",v:`${profitData.risk}%`}].map(m=>(<div key={m.l} style={{background:"#0a2010",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:11,color:"#4ade8099",marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>{m.l}</div><div style={{fontWeight:800,fontSize:16}}>{m.v}</div></div>))}</div>
        <div style={{background:"#052e16",border:"1px solid #166534",borderRadius:14,padding:"24px",textAlign:"center"}}><div style={{fontSize:12,color:"#4ade80",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Estimated Income</div><div style={{fontSize:42,fontWeight:900,color:"#4ade80",letterSpacing:"-1px"}}>₹{profitEstimate}</div><div style={{fontSize:12,color:"#166534",marginTop:8}}>Land: {area} Acres · Crop: {profitCrop}</div></div>
        <div style={{marginTop:16}}><RiskMeter value={profitData.risk}/></div>
      </div>)}
    </div>
  );

  if(screen==="alerts")return(<>
    <div style={{marginBottom:20}}><div style={lbl}>⚠️ Farmer Alert System</div><div style={{fontSize:13,color:"#475569"}}>AI-predicted oversupply warnings</div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,marginBottom:24}}>
      {ALERTS.map((a,i)=>(<div key={i} style={{background:"linear-gradient(135deg,#1c0505,#0a1628)",border:"1px solid #7f1d1d",borderRadius:18,padding:"22px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontWeight:800,fontSize:16}}>{CROP_DATA[a.crop]?.icon} {a.crop}</span><span style={{fontSize:10,background:"#7f1d1d",color:"#fca5a5",borderRadius:6,padding:"3px 8px",fontWeight:700}}>RISK</span></div><RiskMeter value={a.risk}/><div style={{marginTop:12,padding:"10px 12px",background:"#0a1628",borderRadius:10}}><div style={{fontSize:11,color:"#94a3b8",marginBottom:4}}>⚠️ Reason:</div><div style={{fontSize:12,color:"#e2e8f0"}}>{a.reason}</div></div><div style={{marginTop:12,fontSize:13,color:"#4ade80"}}>✅ Try: {CROP_DATA[a.alt]?.icon} {a.alt} ({a.altRisk}%)</div></div>))}
    </div>
    <div style={card}><div style={lbl}>🌏 Future Roadmap</div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>{["🗣️ Kannada & Hindi voice","🛰️ Satellite crop monitoring","🏛️ Govt scheme integration","📦 Farmer marketplace","🤖 AI yield prediction","📡 Real-time market API"].map((f,i)=>(<div key={i} style={{background:"#0a1628",borderRadius:12,padding:"14px",fontSize:13,color:"#475569"}}>{f}</div>))}</div></div>
  </>);
  return null;
}

function MobileScreens({screen,soil,setSoil,rainfall,setRainfall,season,setSeason,location,setLocation,area,setArea,profitCrop,setProfitCrop,results,listening,voiceText,expanded,setExpanded,loading,locating,profitData,profitEstimate,getRecommendations,detectLocation,startVoice,go,badge}){
  const card={background:"linear-gradient(145deg,#0f172a,#0a1628)",border:"1px solid #1e293b",borderRadius:20,padding:"18px 20px",margin:"0 14px 12px"};
  const lbl={fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#4ade80",marginBottom:10};
  const sel={width:"100%",padding:"11px 14px",background:"#0a1225",border:"1px solid #1e293b",borderRadius:12,color:"#e2e8f0",fontSize:14,outline:"none",appearance:"none",cursor:"pointer",marginTop:4};
  const inp={width:"100%",padding:"11px 14px",background:"#0a1225",border:"1px solid #1e293b",borderRadius:12,color:"#e2e8f0",fontSize:14,outline:"none"};
  const btn={width:"100%",padding:"14px",background:"linear-gradient(135deg,#4ade80,#22c55e)",border:"none",borderRadius:16,fontSize:14,fontWeight:800,color:"#020c18",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8};

  if(screen==="home")return(<>
    <div style={{background:"linear-gradient(135deg,#052e16,#0a1628,#1a1028)",border:"1px solid #14532d",borderRadius:24,padding:"26px 20px",margin:"0 14px 14px"}}>
      <div style={{fontSize:11,color:"#4ade80",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>🌾 Season 2025</div>
      <div style={{fontSize:30,fontWeight:900,letterSpacing:"-1px",lineHeight:1.1}}>Grow Smarter.<br/><span style={{color:"#4ade80"}}>Earn Better.</span></div>
      <p style={{color:"#475569",fontSize:13,marginTop:10,lineHeight:1.6}}>AI-powered crop planning with market intelligence & profit forecasting.</p>
      <button className="bb" style={{...btn,marginTop:18}} onClick={()=>go("plan")}>🌱 Start Crop Planning</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0 14px 12px"}}>
      {[{icon:"📊",l:"Market Trends",s:"5-yr data",t:"market"},{icon:"💰",l:"Profit Sim",s:"Estimate income",t:"profit"},{icon:"⚠️",l:"Risk Alerts",s:"3 active",t:"alerts"},{icon:"🎙️",l:"Voice",s:"Krishi AI",t:"plan"}].map((item,i)=>(
        <div key={i} className="hw" style={{background:"linear-gradient(145deg,#0f172a,#0a1628)",border:"1px solid #1e293b",borderRadius:16,padding:"16px",cursor:"pointer"}} onClick={()=>go(item.t)}><div style={{fontSize:24}}>{item.icon}</div><div style={{fontWeight:700,fontSize:13,marginTop:8}}>{item.l}</div><div style={{color:"#475569",fontSize:11,marginTop:2}}>{item.s}</div></div>
      ))}
    </div>
    <div style={{background:"linear-gradient(135deg,#1c0505,#0a1628)",border:"1px solid #7f1d1d",borderRadius:18,padding:"18px 20px",margin:"0 14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span>⚠️</span><span style={{fontWeight:700,fontSize:14}}>Market Alert</span><span style={{marginLeft:"auto",fontSize:10,background:"#7f1d1d",color:"#fca5a5",borderRadius:6,padding:"2px 8px",fontWeight:700}}>HIGH</span></div>
      <div style={{fontWeight:600,marginBottom:4}}>🍅 Tomato oversupply predicted</div>
      <div style={{fontSize:12,color:"#94a3b8"}}>High production in Karnataka.</div>
      <div style={{marginTop:8,fontSize:12,color:"#4ade80"}}>✅ Consider: Capsicum (31% risk)</div>
    </div>
  </>);

  if(screen==="plan")return(<>
    <div style={card}><div style={lbl}>📍 Location</div><div style={{display:"flex",gap:8}}><input style={{...inp,flex:1}} placeholder="District, State" value={location} onChange={e=>setLocation(e.target.value)}/><button style={{padding:"11px 13px",background:"transparent",border:"1px solid #1e293b",borderRadius:12,fontSize:12,fontWeight:600,color:"#64748b",cursor:"pointer"}} onClick={detectLocation}>{locating?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span>:"📍 Auto"}</button></div></div>
    <div style={card}><div style={lbl}>🌱 Farm Details</div>
      {[{l:"Soil Type",val:soil,set:setSoil,opts:[["red","Red Soil"],["black","Black / Cotton Soil"],["sandy","Sandy Soil"],["loamy","Loamy Soil"]]},{l:"Rainfall",val:rainfall,set:setRainfall,opts:[["low","Low (< 500mm)"],["medium","Medium (500–1000mm)"],["high","High (> 1000mm)"]]},{l:"Season",val:season,set:setSeason,opts:[["kharif","Kharif (June–Oct)"],["rabi","Rabi (Oct–Mar)"]]}].map(({l,val,set,opts})=>(
        <div key={l} style={{marginBottom:12}}><div style={{fontSize:12,color:"#64748b"}}>{l}</div><select style={sel} value={val} onChange={e=>set(e.target.value)}><option value="">Select {l.toLowerCase()}</option>{opts.map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></div>
      ))}
    </div>
    <div style={card}><div style={lbl}>🎙️ Krishi Voice Assistant</div><button className="bb" style={{...btn,background:listening?"linear-gradient(135deg,#ef4444,#dc2626)":"linear-gradient(135deg,#1e40af,#1d4ed8)",marginBottom:voiceText?10:0}} onClick={startVoice}>{listening?<><span style={{animation:"pulse 1s ease infinite",display:"inline-block"}}>🔴</span>Listening...</>:<><span>🎤</span>Speak Farm Details</>}</button>{voiceText&&<div style={{marginTop:8,padding:"10px 12px",background:"#0a1628",borderRadius:10,fontSize:12,color:"#94a3b8",fontStyle:"italic"}}>"{voiceText}"</div>}</div>
    <div style={{margin:"0 14px"}}><button className="bb" style={btn} onClick={getRecommendations} disabled={loading||!soil||!rainfall||!season}>{loading?<><span style={{animation:"spin 1s linear infinite",display:"inline-block",fontSize:18}}>⟳</span>Analysing...</>:"🌾 Get Recommendations"}</button></div>
  </>);

  if(screen==="results")return(<>
    <div style={{padding:"0 14px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={lbl}>🌱 Best Crops</div><div style={{fontSize:11,color:"#475569"}}>{soil} · {rainfall} · {season}</div></div><button style={{padding:"8px 12px",background:"transparent",border:"1px solid #1e293b",borderRadius:10,fontSize:12,fontWeight:600,color:"#64748b",cursor:"pointer"}} onClick={()=>go("plan")}>← Edit</button></div>
    {results.map((crop,i)=>(
      <div key={crop.name} className="hw" style={{background:i===0?"linear-gradient(135deg,#052e16,#0a2010)":"linear-gradient(145deg,#0f172a,#0a1628)",border:`1px solid ${i===0?"#166534":"#1e293b"}`,borderRadius:18,padding:"16px 18px",margin:"0 14px 10px",cursor:"pointer"}} onClick={()=>setExpanded(expanded===i?null:i)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{fontSize:28}}>{crop.icon}</div><div>{i===0&&<div style={{fontSize:9,background:"#854d0e",color:"#fbbf24",borderRadius:5,padding:"2px 7px",fontWeight:700,marginBottom:4}}>TOP PICK</div>}<div style={{fontWeight:800,fontSize:15}}>{crop.name}</div><div style={{marginTop:4}}><span style={badge(crop.profit)}>Profit: {crop.profit}</span></div></div></div><MiniChart data={crop.trend}/></div>
        <RiskMeter value={crop.risk}/>
        {expanded===i&&(<div style={{marginTop:14,paddingTop:14,borderTop:"1px solid #1e293b"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>{[{l:"Price",v:`₹${crop.price.toLocaleString()}/q`},{l:"Yield",v:`${crop.yield} q/ac`},{l:"Est. Inc",v:`₹${(crop.price*crop.yield).toLocaleString()}`}].map(m=>(<div key={m.l} style={{background:"#0a1628",borderRadius:9,padding:"10px",textAlign:"center"}}><div style={{fontSize:10,color:"#475569",marginBottom:3}}>{m.l}</div><div style={{fontWeight:700,fontSize:12}}>{m.v}</div></div>))}</div>
          <BigChart data={crop.trend} years={YEARS}/>
        </div>)}
      </div>
    ))}
  </>);

  if(screen==="market")return(<>
    <div style={{padding:"0 14px 12px"}}><div style={lbl}>📊 Market Intelligence</div></div>
    {Object.entries(CROP_DATA).slice(0,8).map(([name,data])=>(
      <div key={name} className="hw" style={{background:"linear-gradient(145deg,#0f172a,#0a1628)",border:"1px solid #1e293b",borderRadius:18,padding:"14px 16px",margin:"0 14px 10px",cursor:"pointer"}} onClick={()=>setExpanded(expanded===name?null:name)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>{data.icon}</span><div><div style={{fontWeight:700,fontSize:14}}>{name}</div><div style={{fontSize:11,color:"#475569"}}>₹{data.price.toLocaleString()}/q</div></div></div><div style={{textAlign:"right"}}><MiniChart data={data.trend}/><div style={{fontSize:10,color:data.trend[4]>data.trend[0]?"#4ade80":"#ef4444",marginTop:3}}>{data.trend[4]>data.trend[0]?"▲":"▼"} {Math.round(Math.abs(data.trend[4]-data.trend[0])/data.trend[0]*100)}%</div></div></div>
        <RiskMeter value={data.risk}/>
        {expanded===name&&<div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #1e293b"}}><BigChart data={data.trend} years={YEARS}/></div>}
      </div>
    ))}
  </>);

  if(screen==="profit")return(<>
    <div style={card}><div style={lbl}>💰 Profit Simulator</div><div style={{marginBottom:14}}><div style={{fontSize:12,color:"#64748b",marginBottom:4}}>Select Crop</div><select style={sel} value={profitCrop} onChange={e=>setProfitCrop(e.target.value)}>{Object.keys(CROP_DATA).map(c=><option key={c} value={c}>{CROP_DATA[c].icon} {c}</option>)}</select></div><div><div style={{fontSize:12,color:"#64748b",marginBottom:4}}>Land: <strong style={{color:"#e2e8f0"}}>{area} Acres</strong></div><input type="range" min="0.5" max="20" step="0.5" value={area} onChange={e=>setArea(Number(e.target.value))} style={{width:"100%",accentColor:"#4ade80",cursor:"pointer"}}/></div></div>
    {profitData&&(<div style={{...card,background:"linear-gradient(135deg,#052e16,#0a1628)"}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}><span style={{fontSize:34}}>{profitData.icon}</span><div><div style={{fontWeight:800,fontSize:18}}>{profitCrop}</div><span style={badge(profitData.profit)}>{profitData.profit} Stability</span></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>{[{l:"Price",v:`₹${profitData.price.toLocaleString()}/q`},{l:"Yield",v:`${profitData.yield} q/ac`},{l:"Total",v:`${(area*profitData.yield).toFixed(1)} q`},{l:"Risk",v:`${profitData.risk}%`}].map(m=>(<div key={m.l} style={{background:"#0a2010",borderRadius:10,padding:"12px"}}><div style={{fontSize:10,color:"#4ade8099",fontWeight:600,textTransform:"uppercase",marginBottom:3}}>{m.l}</div><div style={{fontWeight:800,fontSize:15}}>{m.v}</div></div>))}</div><div style={{background:"#052e16",border:"1px solid #166534",borderRadius:12,padding:"20px",textAlign:"center"}}><div style={{fontSize:11,color:"#4ade80",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Estimated Income</div><div style={{fontSize:34,fontWeight:900,color:"#4ade80",letterSpacing:"-1px"}}>₹{profitEstimate}</div><div style={{fontSize:11,color:"#166534",marginTop:6}}>{area} Acres · {profitCrop}</div></div><div style={{marginTop:12}}><RiskMeter value={profitData.risk}/></div></div>)}
  </>);

  if(screen==="alerts")return(<>
    <div style={{padding:"0 14px 12px"}}><div style={lbl}>⚠️ Farmer Alert System</div></div>
    {ALERTS.map((a,i)=>(<div key={i} style={{background:"linear-gradient(135deg,#1c0505,#0a1628)",border:"1px solid #7f1d1d",borderRadius:18,padding:"16px 18px",margin:"0 14px 10px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontWeight:800,fontSize:15}}>{CROP_DATA[a.crop]?.icon} {a.crop}</span><span style={{fontSize:10,background:"#7f1d1d",color:"#fca5a5",borderRadius:6,padding:"2px 8px",fontWeight:700}}>OVERSUPPLY</span></div><RiskMeter value={a.risk}/><div style={{marginTop:10,padding:"10px 12px",background:"#0a1628",borderRadius:10}}><div style={{fontSize:11,color:"#94a3b8",marginBottom:3}}>⚠️ {a.reason}</div></div><div style={{marginTop:10,fontSize:12,color:"#4ade80"}}>✅ Try: {CROP_DATA[a.alt]?.icon} {a.alt} ({a.altRisk}% risk)</div></div>))}
    <div style={card}><div style={lbl}>🌏 Roadmap</div>{["🗣️ Kannada & Hindi voice","🛰️ Satellite monitoring","🏛️ Govt portal integration","📦 Farmer marketplace","🤖 AI yield prediction"].map((f,i)=>(<div key={i} style={{padding:"9px 0",borderBottom:"1px solid #0f172a",fontSize:13,color:"#475569"}}>{f}</div>))}</div>
  </>);

  return null;
}
