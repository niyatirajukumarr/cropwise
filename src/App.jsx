import { useState, useEffect, useCallback, useRef } from "react";

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendOtpViaSms(phone, otp) {
  try {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();
    return { success: data.success, message: data.message };
  } catch {
    return { success: false, message: "Network error. Check your connection." };
  }
}

const handleSendOtp = async () => {

  const otp = generateOtp();   // create OTP

  const result = await sendOtpViaSms(phone, otp); // send OTP to backend

  if (result.success) {
    setGeneratedOtp(otp);
    alert("OTP sent to your phone");
  } else {
    alert(result.message);
  }

};

function TopCropDeco() {
  return (
    <svg style={rg.topDeco} viewBox="0 0 120 80" fill="none">
      {[0,18,36,54,72,90,108].map((x,i)=>(
        <g key={i}>
          <line x1={x+6} y1="80" x2={x+4} y2={50+Math.sin(i)*8} stroke="#4a7a00" strokeWidth="1.5" opacity="0.5"/>
          <ellipse cx={x+2} cy={50+Math.sin(i)*8} rx="5" ry="3" fill="#6aaa00" opacity="0.4" transform={`rotate(-20,${x+2},${50+Math.sin(i)*8})`}/>
          <ellipse cx={x+10} cy={48+Math.sin(i)*8} rx="5" ry="3" fill="#78b800" opacity="0.4" transform={`rotate(20,${x+10},${48+Math.sin(i)*8})`}/>
        </g>
      ))}
    </svg>
  );
}

function BottomScene() {
  return (
    <div style={rg.bottomScene}>
      <svg viewBox="0 0 390 90" style={{width:"100%",display:"block"}} preserveAspectRatio="none">
        <rect x="0" y="55" width="390" height="40" fill="#2a5000"/>
        <path d="M0,60 Q100,56 200,60 Q300,64 390,60" stroke="#1e3a00" strokeWidth="2" fill="none" opacity="0.5"/>
        {[...Array(30)].map((_,i)=>{
          const x=i/29*390,h=18+Math.sin(i*1.9)*8,lean=Math.sin(i*2.5)*7;
          return <line key={i} x1={x} y1="56" x2={x+lean} y2={56-h}
            stroke={i%3===0?"#5aaa00":"#3d8000"} strokeWidth="2" strokeLinecap="round"
            opacity={0.6+Math.sin(i)*0.35}/>;
        })}
        <g transform="translate(310,25)" opacity="0.8">
          <circle cx="0" cy="0" r="7" fill="#1a0800"/>
          <ellipse cx="0" cy="-6" rx="12" ry="3" fill="#1a0800"/>
          <rect x="-5" y="6" width="10" height="15" rx="2" fill="#1a0800"/>
          <line x1="-5" y1="10" x2="-16" y2="20" stroke="#1a0800" strokeWidth="3" strokeLinecap="round"/>
          <line x1="-3" y1="21" x2="-5" y2="32" stroke="#1a0800" strokeWidth="3" strokeLinecap="round"/>
          <line x1="3" y1="21" x2="5" y2="32" stroke="#1a0800" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <g transform="translate(345,32)" opacity="0.8">
          <ellipse cx="0" cy="8" rx="18" ry="7" fill="#1a0800"/>
          <circle cx="-16" cy="3" r="6" fill="#1a0800"/>
          <line x1="-21" y1="-1" x2="-26" y2="-8" stroke="#1a0800" strokeWidth="1.5"/>
          <line x1="-14" y1="-1" x2="-11" y2="-8" stroke="#1a0800" strokeWidth="1.5"/>
          <line x1="-8" y1="14" x2="-9" y2="24" stroke="#1a0800" strokeWidth="2.5"/>
          <line x1="4" y1="14" x2="5" y2="24" stroke="#1a0800" strokeWidth="2.5"/>
        </g>
        {[20,50,80,110,140,170,200,230,260].map((x,i)=>(
          <g key={i}>
            <line x1={x} y1="58" x2={x} y2="50" stroke="#5a8a00" strokeWidth="1.5"/>
            <ellipse cx={x-3} cy="50" rx="4" ry="2.5" fill="#6aaa00" opacity="0.8" transform={`rotate(-20,${x-3},50)`}/>
            <ellipse cx={x+3} cy="48" rx="4" ry="2.5" fill="#78b800" opacity="0.8" transform={`rotate(20,${x+3},48)`}/>
          </g>
        ))}
      </svg>
    </div>
  );
}

const rg = {
  wrapper:{ position:"fixed",inset:0,width:"100%",height:"100%",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",fontFamily:"'Lato',sans-serif" },
  bg:{ position:"absolute",inset:0,background:"linear-gradient(170deg,#fff8ee 0%,#fdf0d8 40%,#f5e4b8 75%,#e8d090 100%)",zIndex:0 },
  bgGlow:{ position:"absolute",top:0,left:0,right:0,height:220,background:"radial-gradient(ellipse at 50% 0%,rgba(255,180,60,0.18) 0%,transparent 70%)",zIndex:1 },
  topDeco:{ position:"absolute",top:0,right:0,width:120,height:80,zIndex:2,opacity:0.7 },
  titleWrap:{ position:"relative",zIndex:10,textAlign:"center",paddingTop:36,paddingBottom:8 },
  logo:{ fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:18,letterSpacing:"2px",marginBottom:4 },
  cropWord:{ color:"#7a3a00" },
  wiseWord:{ color:"#c87010" },
  heading:{ fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:32,color:"#4a2200",letterSpacing:"1px",lineHeight:1.1 },
  sub:{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:15,color:"#9a6030",marginTop:4,fontWeight:900 },
  card:{ position:"relative",zIndex:10,width:"88%",background:"rgba(255,252,242,0.88)",backdropFilter:"blur(12px)",borderRadius:24,padding:"20px 20px 16px",border:"1.5px solid rgba(180,120,40,0.2)",boxShadow:"0 8px 40px rgba(120,60,0,0.12)",display:"flex",flexDirection:"column",gap:10 },
  fieldWrap:{ position:"relative",display:"flex",flexDirection:"column" },
  icon:{ position:"absolute",left:14,top:13,fontSize:16,zIndex:1,pointerEvents:"none" },
  eyeBtn:{ position:"absolute",right:12,top:10,background:"none",border:"none",cursor:"pointer",fontSize:16,padding:2,zIndex:2 },
  dialCode:{ position:"absolute",left:44,top:"50%",transform:"translateY(-50%)",fontSize:14,fontWeight:700,color:"#6a3a00",fontFamily:"'Lato',sans-serif",zIndex:2,pointerEvents:"none",borderRight:"1.5px solid rgba(160,100,30,0.25)",paddingRight:8,lineHeight:1 },
  errMsg:{ fontSize:11,color:"#cc2200",marginTop:4,marginLeft:4,fontFamily:"'Lato',sans-serif" },
  hintMsg:{ fontSize:11,color:"#7a5010",background:"rgba(255,220,120,0.25)",border:"1px solid rgba(180,120,30,0.2)",borderRadius:8,padding:"5px 10px",marginTop:5,fontFamily:"'Lato',sans-serif",fontWeight:600 },
  matchMsg:{ fontSize:11,color:"#2a7a00",background:"rgba(100,200,50,0.12)",border:"1px solid rgba(60,160,0,0.2)",borderRadius:8,padding:"5px 10px",marginTop:5,fontFamily:"'Lato',sans-serif",fontWeight:700 },
  loginRow:{ textAlign:"center",fontSize:13,color:"#7a5030",marginTop:2,fontFamily:"'Lato',sans-serif" },
  loginLink:{ color:"#b85c00",fontWeight:700,cursor:"pointer",textDecoration:"underline",textUnderlineOffset:2 },
  bottomScene:{ position:"absolute",bottom:0,left:0,right:0,zIndex:5 },
  backBtn:{ position:"absolute",top:18,left:18,zIndex:30,background:"rgba(255,248,230,0.95)",border:"2px solid rgba(120,80,20,0.35)",borderRadius:50,width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:26,color:"#7a3a00",boxShadow:"0 3px 12px rgba(120,60,0,0.2)",backdropFilter:"blur(8px)",fontFamily:"sans-serif",lineHeight:1 },
};

const AUTH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,900&family=Cinzel:wght@700;900&family=Lato:wght@300;400;600&display=swap');
  @keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
  .reg-card{animation:slideUp 0.6s cubic-bezier(.22,.68,0,1.2) forwards}
  .reg-title{animation:slideUp 0.5s ease forwards}
  .reg-input{
    width:100%;box-sizing:border-box;padding:13px 16px 13px 44px;
    border-radius:14px;border:1.5px solid rgba(120,80,20,0.25);
    background:rgba(255,248,230,0.92);font-family:'Lato',sans-serif;
    font-size:15px;color:#3a1f00;outline:none;transition:border-color 0.2s,box-shadow 0.2s;
  }
  .reg-input::placeholder{color:rgba(120,80,30,0.45)}
  .reg-input:focus{border-color:#b85c00;box-shadow:0 0 0 3px rgba(184,92,0,0.12);background:#fff8ee}
  .reg-input.error{border-color:#cc2200;box-shadow:0 0 0 3px rgba(204,34,0,0.1)}
  .reg-input.match{border-color:#3a9a00;box-shadow:0 0 0 3px rgba(58,154,0,0.12)}
  .signup-btn{
    width:100%;padding:15px;border-radius:16px;border:none;
    background:linear-gradient(135deg,#7a3a00,#b85c00,#d47020);
    color:#fff8e8;font-family:'Cinzel',serif;font-size:16px;font-weight:700;
    letter-spacing:2px;cursor:pointer;box-shadow:0 4px 20px rgba(140,60,0,0.4);
    transition:transform 0.15s,box-shadow 0.15s;margin-top:6px;
  }
  .signup-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(140,60,0,0.5)}
  .signup-btn:active{transform:scale(0.98)}
  .login-pill{
    width:100%;box-sizing:border-box;padding:13px 18px 13px 46px;
    border-radius:50px;border:1.5px solid rgba(80,130,30,0.4);
    background:#fff;font-family:'Lato',sans-serif;font-size:15px;
    color:#2a3a00;outline:none;transition:border-color 0.2s,box-shadow 0.2s;
  }
  .login-pill::placeholder{color:rgba(80,120,30,0.45)}
  .login-pill:focus{border-color:#5a8a00;box-shadow:0 0 0 3px rgba(90,138,0,0.13)}
  .login-pill.error{border-color:#cc2200;box-shadow:0 0 0 3px rgba(204,34,0,0.1)}
  .otp-btn{
    width:100%;padding:15px;border-radius:50px;border:none;
    background:linear-gradient(135deg,#3a6800,#5a9000,#6aaa10);
    color:#fff;font-family:'Cinzel',serif;font-size:15px;font-weight:700;
    letter-spacing:2px;cursor:pointer;box-shadow:0 4px 20px rgba(60,110,0,0.38);
    transition:transform 0.15s,box-shadow 0.15s;margin-top:4px;
  }
  .otp-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(60,110,0,0.48)}
  .otp-btn:active{transform:scale(0.98)}
  .otp-btn:disabled{opacity:0.65;cursor:not-allowed;transform:none}
  .otp-box{
    width:52px;height:62px;border-radius:14px;
    border:1.8px solid rgba(80,130,30,0.35);background:rgba(255,252,242,0.92);
    font-family:'Cinzel',serif;font-size:26px;font-weight:700;
    color:#3a6200;text-align:center;outline:none;
    transition:border-color 0.2s,box-shadow 0.2s;caret-color:#5a8a00;
  }
  .otp-box:focus{border-color:#5a8a00;box-shadow:0 0 0 3px rgba(90,138,0,0.14);background:#f8ffee}
  .otp-box.filled{border-color:#5a8a00;background:#f0fde0}
  .otp-box.err{border-color:#cc2200;box-shadow:0 0 0 3px rgba(204,34,0,0.1)}
  .verify-btn{
    width:100%;padding:15px;border-radius:50px;border:none;
    background:linear-gradient(135deg,#3a6800,#5a9000,#6aaa10);
    color:#fff;font-family:'Cinzel',serif;font-size:15px;font-weight:700;
    letter-spacing:2px;cursor:pointer;box-shadow:0 4px 20px rgba(60,110,0,0.38);
    transition:transform 0.15s,box-shadow 0.15s;margin-top:8px;
  }
  .verify-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(60,110,0,0.48)}
  .verify-btn:active{transform:scale(0.98)}
  .verify-btn:disabled{opacity:0.65;cursor:not-allowed;transform:none}
  .resend-link{color:#b85c00;font-weight:700;cursor:pointer;text-decoration:underline;text-underline-offset:2px}
  .resend-link:disabled,.resend-link[disabled]{color:#aaa;cursor:not-allowed;text-decoration:none}
  @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
  .shake{animation:shake 0.4s ease}
`;

//  SPLASH SCREEN

function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setPhase(1),300);
    const t2=setTimeout(()=>setPhase(2),900);
    const t3=setTimeout(()=>setPhase(3),1600);
    return ()=>[t1,t2,t3].forEach(clearTimeout);
  },[]);

  return (
    <div style={sp.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,900&family=Cinzel:wght@700;900&family=Lato:wght@300;400;600&display=swap');
        @keyframes riseSun{from{transform:translateY(60px) scale(0.6);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
        @keyframes fadeUp{from{transform:translateY(28px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes shimmer{0%,100%{opacity:0.55}50%{opacity:1}}
        @keyframes walkFarmer{from{transform:translateX(-30px);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes dustFloat{0%,100%{transform:translateY(0) scaleX(1);opacity:0.18}50%{transform:translateY(-6px) scaleX(1.1);opacity:0.28}}
        @keyframes rainbowSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes rainbowFade{from{opacity:0}to{opacity:1}}
        @keyframes nextBtnIn{from{opacity:0;transform:translateY(14px) scale(0.9)}to{opacity:1;transform:translateY(0) scale(1)}}
        .sun-anim{animation:riseSun 0.9s cubic-bezier(.22,.68,0,1.2) forwards}
        .title-anim{animation:fadeUp 0.7s ease forwards}
        .tag-anim{animation:fadeUp 0.6s ease forwards}
        .scene-anim{animation:fadeIn 0.8s ease forwards}
        .farmer-anim{animation:walkFarmer 0.9s cubic-bezier(.22,.68,0,1.2) forwards}
        .rainbow-fade{animation:rainbowFade 1s ease forwards}
        .rainbow-spin{animation:rainbowSpin 8s linear infinite}
        .next-btn-anim{animation:nextBtnIn 0.5s cubic-bezier(.22,.68,0,1.2) forwards}
        .next-btn-anim:hover{transform:scale(1.06)!important;box-shadow:0 6px 28px rgba(180,80,0,0.5)!important}
      `}</style>
      <div style={sp.sky}/><div style={sp.haze}/>
      <div className={phase>=1?"sun-anim":""} style={{...sp.sunWrap,opacity:phase>=1?undefined:0}}>
        {phase>=1&&(<div className="rainbow-fade" style={sp.rainbowOuter}><div className="rainbow-spin" style={sp.rainbowSpinner}>
          <svg viewBox="0 0 200 200" width="180" height="180"><defs><linearGradient id="rb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ff2200" stopOpacity="0.95"/><stop offset="16%"  stopColor="#ff8800" stopOpacity="0.95"/>
            <stop offset="32%"  stopColor="#ffe800" stopOpacity="0.95"/><stop offset="48%"  stopColor="#22dd00" stopOpacity="0.95"/>
            <stop offset="64%"  stopColor="#0088ff" stopOpacity="0.95"/><stop offset="80%"  stopColor="#7700cc" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#ff00aa" stopOpacity="0.95"/>
          </linearGradient></defs>
          <circle cx="100" cy="100" r="85" fill="none" stroke="url(#rb)" strokeWidth="8" strokeDasharray="430" strokeDashoffset="108" strokeLinecap="round"/>
          </svg>
        </div></div>)}
        <div style={sp.sun}><div style={sp.sunGlow}/></div>
      </div>
      <div className={phase>=2?"scene-anim":""} style={{opacity:phase>=2?undefined:0}}>
        <svg viewBox="0 0 400 120" style={sp.villageSvg} preserveAspectRatio="xMidYMax meet">
          <polygon points="310,90 325,52 340,90" fill="#2a0e00" opacity="0.85"/>
          <rect x="307" y="88" width="36" height="22" rx="2" fill="#2a0e00" opacity="0.85"/>
          <rect x="316" y="72" width="18" height="6" rx="1" fill="#2a0e00" opacity="0.7"/>
          <polygon points="323,52 325,38 327,52" fill="#2a0e00" opacity="0.85"/>
          <polygon points="50,100 68,76 86,100" fill="#2a0e00" opacity="0.7"/>
          <rect x="50" y="99" width="36" height="16" fill="#2a0e00" opacity="0.7"/>
          <circle cx="160" cy="92" r="14" fill="#1e0800" opacity="0.6"/>
          <circle cx="172" cy="88" r="10" fill="#1e0800" opacity="0.55"/>
          <rect x="163" y="104" width="4" height="12" fill="#1e0800" opacity="0.6"/>
          <circle cx="360" cy="96" r="10" fill="#1e0800" opacity="0.55"/>
          <circle cx="370" cy="92" r="8"  fill="#1e0800" opacity="0.5"/>
          <path d="M0,108 Q60,98 120,106 Q180,114 240,104 Q300,95 400,108 L400,120 L0,120Z" fill="#1a0a00" opacity="0.5"/>
        </svg>
      </div>
      <div style={sp.groundScene}>
        <svg viewBox="0 0 400 180" style={sp.groundSvg} preserveAspectRatio="xMidYMax meet">
          <rect x="0" y="120" width="400" height="60" fill="#4a1c00"/>
          {[130,140,150,162,174,186].map((y,i)=>(
            <path key={i} d={`M0,${y} Q100,${y-4} 200,${y} Q300,${y+4} 400,${y}`} stroke="#3a1200" strokeWidth="2.5" fill="none" opacity="0.5"/>
          ))}
          {[30,55,80,105,135,165,200,235,265,295,325,355].map((x,i)=>(
            <g key={i}>
              <line x1={x} y1="126" x2={x} y2="118" stroke="#5a8a00" strokeWidth="1.8"/>
              <ellipse cx={x-3} cy="118" rx="5" ry="3" fill="#6aaa00" opacity="0.85" transform={`rotate(-20,${x-3},118)`}/>
              <ellipse cx={x+3} cy="116" rx="5" ry="3" fill="#78b800" opacity="0.85" transform={`rotate(20,${x+3},116)`}/>
            </g>
          ))}
          <g className={phase>=2?"farmer-anim":""} style={{opacity:phase>=2?undefined:0}}>
            <g transform="translate(60,95)">
              <ellipse cx="0" cy="10" rx="22" ry="9" fill="#1a0800"/><circle cx="-20" cy="4" r="8" fill="#1a0800"/>
              <line x1="-26" y1="-2" x2="-32" y2="-10" stroke="#1a0800" strokeWidth="2"/><line x1="-18" y1="-2" x2="-14" y2="-10" stroke="#1a0800" strokeWidth="2"/>
              <line x1="-10" y1="18" x2="-12" y2="30" stroke="#1a0800" strokeWidth="3"/><line x1="0" y1="18" x2="0" y2="30" stroke="#1a0800" strokeWidth="3"/><line x1="10" y1="18" x2="12" y2="30" stroke="#1a0800" strokeWidth="3"/>
            </g>
            <g transform="translate(110,98)">
              <ellipse cx="0" cy="10" rx="22" ry="9" fill="#1a0800"/><circle cx="-20" cy="4" r="8" fill="#1a0800"/>
              <line x1="-26" y1="-2" x2="-32" y2="-10" stroke="#1a0800" strokeWidth="2"/><line x1="-18" y1="-2" x2="-14" y2="-10" stroke="#1a0800" strokeWidth="2"/>
              <line x1="-10" y1="18" x2="-12" y2="30" stroke="#1a0800" strokeWidth="3"/><line x1="0" y1="18" x2="0" y2="30" stroke="#1a0800" strokeWidth="3"/><line x1="10" y1="18" x2="12" y2="30" stroke="#1a0800" strokeWidth="3"/>
            </g>
            <line x1="80" y1="99" x2="128" y2="102" stroke="#1a0800" strokeWidth="3"/>
            <path d="M142,103 Q165,108 178,107" stroke="#1a0800" strokeWidth="2" fill="none"/>
            <g transform="translate(178,78)">
              <circle cx="0" cy="0" r="9" fill="#1a0800"/><ellipse cx="0" cy="-8" rx="16" ry="4" fill="#1a0800"/>
              <rect x="-6" y="-16" width="12" height="10" rx="3" fill="#1a0800"/><rect x="-7" y="8" width="14" height="20" rx="3" fill="#1a0800"/>
              <line x1="-7" y1="14" x2="-24" y2="26" stroke="#1a0800" strokeWidth="4" strokeLinecap="round"/>
              <line x1="-24" y1="26" x2="-28" y2="38" stroke="#1a0800" strokeWidth="3" strokeLinecap="round"/>
              <line x1="-4" y1="28" x2="-6" y2="44" stroke="#1a0800" strokeWidth="4" strokeLinecap="round"/>
              <line x1="4" y1="28" x2="6" y2="44" stroke="#1a0800" strokeWidth="4" strokeLinecap="round"/>
            </g>
          </g>
          {[80,115,140].map((x,i)=>(
            <ellipse key={i} cx={x} cy="128" rx={6+i*2} ry="2" fill="#a05020" opacity="0.18"
              style={{animation:`dustFloat ${1.5+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.4}s`}}/>
          ))}
        </svg>
      </div>
      <div style={sp.grassRow}>
        <svg viewBox="0 0 400 40" style={{width:"100%",display:"block"}} preserveAspectRatio="none">
          {[...Array(36)].map((_,i)=>{
            const x=i/35*400,h=20+Math.sin(i*1.7)*10,lean=Math.sin(i*2.3)*8;
            return <line key={i} x1={x} y1="40" x2={x+lean} y2={40-h} stroke="#2d5a00" strokeWidth="2.2" strokeLinecap="round" opacity={0.7+Math.sin(i)*0.3}/>;
          })}
        </svg>
      </div>
      <div style={sp.textArea}>
        <div className={phase>=1?"title-anim":""} style={{...sp.title,opacity:phase>=1?undefined:0,animationDelay:"0.2s"}}>
          <span style={sp.cropWord}>Crop</span><span style={sp.wiseWord}>Wise</span>
        </div>
        <div className={phase>=3?"tag-anim":""} style={{...sp.tagline,opacity:phase>=3?undefined:0}}>
          Grow Better. Earn Smarter.
        </div>
      </div>
      {phase>=3&&(
        <button className="next-btn-anim" onClick={onFinish} style={sp.nextBtn}>
          <span style={sp.nextLabel}>Next</span><span style={sp.nextArrow}>›</span>
        </button>
      )}
    </div>
  );
}
const sp={
  wrapper:{position:"fixed",inset:0,width:"100%",height:"100%",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',Georgia,serif"},
  sky:{position:"absolute",inset:0,background:"linear-gradient(175deg,#b83a00 0%,#e05c00 18%,#f07020 35%,#f5a030 55%,#f8c060 72%,#fad88a 88%,#fce8a8 100%)",zIndex:0},
  haze:{position:"absolute",bottom:"30%",left:0,right:0,height:120,background:"radial-gradient(ellipse at 50% 100%,rgba(255,180,60,0.28) 0%,transparent 70%)",zIndex:1},
  sunWrap:{position:"absolute",top:"32%",left:"50%",transform:"translateX(-50%)",zIndex:2,width:110,height:110},
  rainbowOuter:{position:"absolute",top:"50%",left:"50%",width:180,height:180,transform:"translate(-50%,-50%)",zIndex:0,pointerEvents:"none"},
  rainbowSpinner:{width:180,height:180,transformOrigin:"center center",display:"flex",alignItems:"center",justifyContent:"center"},
  sun:{position:"absolute",top:0,left:0,width:110,height:110,borderRadius:"50%",background:"radial-gradient(circle,#fff8d0 0%,#ffe070 40%,#ffb820 75%,#ff8800 100%)",boxShadow:"0 0 60px 30px rgba(255,180,40,0.45),0 0 120px 60px rgba(255,120,0,0.2)",zIndex:1},
  sunGlow:{position:"absolute",inset:-30,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,230,100,0.18) 0%,transparent 70%)",animation:"shimmer 3s ease-in-out infinite"},
  villageSvg:{position:"absolute",bottom:"28%",left:0,width:"100%",height:130,zIndex:3},
  groundScene:{position:"absolute",bottom:"-2%",left:0,right:0,zIndex:4},
  groundSvg:{width:"100%",display:"block",height:180},
  grassRow:{position:"absolute",bottom:0,left:0,right:0,height:40,zIndex:5,background:"linear-gradient(to top,#1a3800 60%,transparent 100%)"},
  textArea:{position:"absolute",top:"7%",width:"100%",textAlign:"center",zIndex:10,padding:"0 20px"},
  title:{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:50,letterSpacing:"3px",lineHeight:1.05},
  cropWord:{color:"#ffffff",textShadow:"0 2px 20px rgba(80,20,0,0.7),0 0 50px rgba(255,200,80,0.3),2px 2px 0 rgba(150,50,0,0.4)"},
  wiseWord:{color:"#ffd040",textShadow:"0 2px 20px rgba(200,100,0,0.8),0 0 50px rgba(255,220,0,0.5),2px 2px 0 rgba(180,80,0,0.5)"},
  tagline:{marginTop:12,fontFamily:"'Cormorant Garamond',serif",fontWeight:900,fontStyle:"italic",fontSize:19,letterSpacing:"0.04em",color:"#fff",textShadow:"0 1px 12px rgba(80,20,0,0.6),0 0 30px rgba(255,180,50,0.3)",animationDelay:"0.1s"},
  nextBtn:{position:"absolute",bottom:"5%",right:"6%",zIndex:20,display:"flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#c94a00,#e87020)",border:"1.5px solid rgba(255,200,100,0.35)",borderRadius:50,padding:"12px 22px 12px 20px",cursor:"pointer",boxShadow:"0 4px 20px rgba(160,60,0,0.45)",transition:"transform 0.2s,box-shadow 0.2s"},
  nextLabel:{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:14,letterSpacing:"1.5px",color:"#fff",textTransform:"uppercase"},
  nextArrow:{fontSize:22,color:"rgba(255,240,180,0.9)",lineHeight:1,marginTop:-1},
};

//  REGISTER SCREEN

function RegisterScreen({ onSignUp, onNavigate, onBack }) {
  const [form,setForm]=useState({name:"",phone:"",password:"",confirm:""});
  const [focused,setFocused]=useState(null);
  const [visible,setVisible]=useState({password:false,confirm:false});
  const [submitted,setSubmitted]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const passwordValid=form.password.length>=6&&/\d/.test(form.password);
  const passwordsMatch=!!(form.password&&form.confirm&&form.password===form.confirm);
  const mismatch=form.confirm.length>0&&form.password!==form.confirm;
  const handleSignUp=()=>{
    setSubmitted(true);
    if(!form.name||!form.phone||!form.password||!form.confirm)return;
    if(!passwordValid||!passwordsMatch)return;
    if(onSignUp)onSignUp(form);
  };
  const err={name:submitted&&!form.name,phone:submitted&&!form.phone,pass:submitted&&(!form.password||!passwordValid),confirm:submitted&&(!form.confirm||!passwordsMatch)};
  return(
    <div style={rg.wrapper}>
      <style>{AUTH_CSS}</style>
      <div style={rg.bg}/><div style={rg.bgGlow}/>
      <TopCropDeco/>
      {onBack && <button style={rg.backBtn} onClick={onBack} aria-label="Go back">‹</button>}
      <div className="reg-title" style={rg.titleWrap}>
        <div style={rg.logo}><span style={rg.cropWord}>Crop</span><span style={rg.wiseWord}>Wise</span></div>
        <div style={rg.heading}>Register</div>
        <div style={rg.sub}>Join thousands of smart farmers</div>
      </div>
      <div className="reg-card" style={rg.card}>
        <div style={rg.fieldWrap}>
          <span style={rg.icon}>👤</span>
          <input className={`reg-input${err.name?" error":""}`} placeholder="Full Name" value={form.name} onChange={e=>set("name",e.target.value)} onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)}/>
          {err.name&&<div style={rg.errMsg}>Please enter your name</div>}
        </div>
        <div style={rg.fieldWrap}>
          <span style={rg.icon}>📱</span>
          <div style={{position:"relative"}}>
            <span style={rg.dialCode}>+91</span>
            <input className={`reg-input${err.phone?" error":""}`} placeholder="Phone Number" type="tel" value={form.phone} onChange={e=>set("phone",e.target.value.replace(/\D/g,"").slice(0,10))} onFocus={()=>setFocused("phone")} onBlur={()=>setFocused(null)} style={{paddingLeft:78}}/>
          </div>
          {err.phone&&<div style={rg.errMsg}>Please enter your phone number</div>}
        </div>
        <div style={rg.fieldWrap}>
          <span style={rg.icon}>🔒</span>
          <input className={`reg-input${err.pass?" error":""}`} placeholder="Password" type={visible.password?"text":"password"} value={form.password} onChange={e=>set("password",e.target.value)} onFocus={()=>setFocused("password")} onBlur={()=>setFocused(null)} style={{paddingRight:44}}/>
          <button style={rg.eyeBtn} onClick={()=>setVisible(v=>({...v,password:!v.password}))}>{visible.password?"🙈":"👁️"}</button>
          {focused==="password"&&!err.pass&&<div style={rg.hintMsg}>🌾 Min. 6 characters with at least one number</div>}
          {err.pass&&<div style={rg.errMsg}>{!form.password?"Please enter a password":"Min. 6 chars with at least one number"}</div>}
        </div>
        <div style={rg.fieldWrap}>
          <span style={rg.icon}>🔐</span>
          <input className={`reg-input${(err.confirm||mismatch)?" error":passwordsMatch?" match":""}`} placeholder="Re-enter Password" type={visible.confirm?"text":"password"} value={form.confirm} onChange={e=>set("confirm",e.target.value)} onFocus={()=>setFocused("confirm")} onBlur={()=>setFocused(null)} style={{paddingRight:44}}/>
          <button style={rg.eyeBtn} onClick={()=>setVisible(v=>({...v,confirm:!v.confirm}))}>{visible.confirm?"🙈":"👁️"}</button>
          {mismatch&&<div style={rg.errMsg}>❌ Passwords do not match</div>}
          {passwordsMatch&&<div style={rg.matchMsg}>✅ Passwords match</div>}
          {err.confirm&&!mismatch&&!passwordsMatch&&<div style={rg.errMsg}>Please confirm your password</div>}
        </div>
        <button className="signup-btn" onClick={handleSignUp}>Sign Up</button>
        <div style={rg.loginRow}>Already have an account?{" "}<span style={rg.loginLink} onClick={()=>onNavigate&&onNavigate("login")}>Log In</span></div>
      </div>
      <BottomScene/>
    </div>
  );
}

//  LOGIN SCREEN  — sends real OTP via Fast2SMS

function LoginScreen({ onGetOtp, onNavigate, onBack }) {
  const [phone, setPhone]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleOtp = async () => {

  setLoading(true);

  const otp = generateOtp();

  const result = await sendOtpViaSms(phone, otp);

  if (result.success) {
    setGeneratedOtp(otp);
    alert("OTP sent to your phone");
  } else {
    alert(result.message);
  }

  setLoading(false);
};

  return(
    <div style={rg.wrapper}>
      <style>{AUTH_CSS}</style>
      <div style={rg.bg}/><div style={rg.bgGlow}/>
      <TopCropDeco/>
      {onBack && <button style={rg.backBtn} onClick={onBack} aria-label="Go back">‹</button>}
      <div className="reg-title" style={{...rg.titleWrap,paddingBottom:0}}>
        <div style={rg.logo}><span style={rg.cropWord}>Crop</span><span style={rg.wiseWord}>Wise</span></div>
        <div style={rg.heading}>Login</div>
        <div style={rg.sub}>Enter your registered number</div>
      </div>
      <div style={{position:"relative",zIndex:10,margin:"18px 0 10px"}}>
        <svg viewBox="0 0 110 110" width="100" height="100">
          <circle cx="55" cy="55" r="52" fill="#eef8d8" stroke="#6aaa20" strokeWidth="2.5"/>
          <ellipse cx="55" cy="68" rx="28" ry="14" fill="#8B4513"/><ellipse cx="55" cy="64" rx="26" ry="12" fill="#a0622d"/>
          <circle cx="44" cy="59" r="6" fill="#dd2222"/><circle cx="55" cy="57" r="7" fill="#ff6600"/><circle cx="66" cy="59" r="6" fill="#ffaa00"/>
          <ellipse cx="48" cy="53" rx="4" ry="7" fill="#33aa00"/><ellipse cx="62" cy="53" rx="4" ry="7" fill="#33aa00"/>
          <ellipse cx="55" cy="51" rx="5" ry="8" fill="#44cc00" opacity="0.85"/>
          <circle cx="55" cy="36" r="13" fill="#c87040"/>
          <ellipse cx="55" cy="26" rx="15" ry="7" fill="#cc3300"/><rect x="40" y="22" width="30" height="8" rx="4" fill="#dd4400"/>
          <ellipse cx="55" cy="21" rx="9" ry="5" fill="#ee5500"/><circle cx="55" cy="18" r="4" fill="#ff6600"/>
        </svg>
      </div>
      <div className="reg-card" style={{...rg.card,gap:14}}>
        <div style={{position:"relative"}}>
          <span style={{position:"absolute",left:16,top:"50%",transform:"translateY(-55%)",fontSize:15,zIndex:1,pointerEvents:"none"}}>📞</span>
          <input
            className={`login-pill${submitted&&phone.length!==10?" error":""}`}
            placeholder="10-digit mobile number"
            type="tel"
            value={phone}
            onChange={e=>{setPhone(e.target.value.replace(/\D/g,"").slice(0,10));setError("");}}
          />
          {submitted&&phone.length!==10&&<div style={rg.errMsg}>Please enter a valid 10-digit number</div>}
          {error&&<div style={{...rg.errMsg,marginTop:6}}>{error}</div>}
        </div>
        <button className="otp-btn" onClick={handleOtp} disabled={loading}>
          {loading ? (
            <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
              <span style={{animation:"spin 1s linear infinite",display:"inline-block",fontSize:16}}>⟳</span>
              Sending OTP…
            </span>
          ) : "Get OTP"}
        </button>
        <div style={rg.loginRow}>Don't have an account?{" "}<span style={rg.loginLink} onClick={()=>onNavigate&&onNavigate("register")}>Register</span></div>
      </div>
      <div style={rg.bottomScene}>
        <svg viewBox="0 0 390 105" style={{width:"100%",display:"block"}} preserveAspectRatio="xMidYMax meet">
          <rect x="0" y="62" width="390" height="45" fill="#2a5000"/>
          <path d="M0,66 Q100,62 200,66 Q300,70 390,66" stroke="#1e3a00" strokeWidth="2" fill="none" opacity="0.4"/>
          {[...Array(32)].map((_,i)=>{const x=i/31*390,h=20+Math.sin(i*1.9)*9,lean=Math.sin(i*2.5)*8;return <line key={i} x1={x} y1="64" x2={x+lean} y2={64-h} stroke={i%3===0?"#6aaa00":i%3===1?"#4a8a00":"#88cc20"} strokeWidth="2.2" strokeLinecap="round" opacity={0.6+Math.sin(i)*0.3}/>;})  }
          {[18,45,72,100,130,158,188].map((x,i)=>(<g key={i}><line x1={x} y1="65" x2={x} y2="55" stroke="#5a8a00" strokeWidth="1.6"/><ellipse cx={x-3} cy="55" rx="4" ry="2.5" fill="#6aaa00" opacity="0.85" transform={`rotate(-20,${x-3},55)`}/><ellipse cx={x+3} cy="53" rx="4" ry="2.5" fill="#78b800" opacity="0.85" transform={`rotate(20,${x+3},53)`}/></g>))}
          <g transform="translate(235,10)">
            <line x1="-4" y1="36" x2="-6" y2="54" stroke="#cc4400" strokeWidth="5" strokeLinecap="round"/><line x1="4" y1="36" x2="6" y2="54" stroke="#cc4400" strokeWidth="5" strokeLinecap="round"/>
            <rect x="-11" y="12" width="22" height="26" rx="6" fill="#ee6600"/>
            <line x1="-11" y1="18" x2="-22" y2="10" stroke="#cc4400" strokeWidth="4" strokeLinecap="round"/><line x1="11" y1="18" x2="22" y2="10" stroke="#cc4400" strokeWidth="4" strokeLinecap="round"/>
            <rect x="-14" y="-10" width="28" height="18" rx="6" fill="#c8a060"/><ellipse cx="0" cy="-10" rx="14" ry="5" fill="#d4aa70"/>
            <circle cx="0" cy="-2" r="11" fill="#c87040"/><ellipse cx="0" cy="-11" rx="16" ry="5" fill="#cc8800"/><ellipse cx="0" cy="-14" rx="9" ry="5" fill="#ddaa00"/>
          </g>
          <g transform="translate(305,8)">
            <line x1="-4" y1="36" x2="-7" y2="56" stroke="#aa3300" strokeWidth="5" strokeLinecap="round"/><line x1="4" y1="36" x2="7" y2="56" stroke="#aa3300" strokeWidth="5" strokeLinecap="round"/>
            <rect x="-11" y="12" width="22" height="26" rx="6" fill="#cc4400"/>
            <line x1="11" y1="18" x2="26" y2="8" stroke="#aa3300" strokeWidth="4" strokeLinecap="round"/>
            {[-5,-2,1,4,7].map((dx,i)=>(<line key={i} x1={26+dx} y1="8" x2={24+dx} y2={-14+i} stroke="#8aaa00" strokeWidth="2.2" strokeLinecap="round"/>))}
            <ellipse cx="28" cy="-14" rx="10" ry="5" fill="#aacc20" opacity="0.95"/>
            <line x1="-11" y1="20" x2="-20" y2="28" stroke="#aa3300" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="0" cy="-2" r="11" fill="#b86030"/><ellipse cx="0" cy="-12" rx="18" ry="6" fill="#ddcc00"/><ellipse cx="0" cy="-15" rx="10" ry="5" fill="#eedd10"/>
          </g>
          {[220,240,260,280,295,315,330,350,370].map((x,i)=>{const h=14+Math.sin(i*2.1)*6,lean=Math.sin(i*1.8)*5;return <line key={i} x1={x} y1="64" x2={x+lean} y2={64-h} stroke={i%2===0?"#88cc20":"#5aaa00"} strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>;})  }
        </svg>
      </div>
    </div>
  );
}

LoginScreen._pendingOtp   = null;
LoginScreen._pendingExp   = null;
LoginScreen._pendingPhone = null;

//  OTP SCREEN  — verifies real 6-digit OTP with expiry + resend

function OtpScreen({ phone, onLogin, onNavigate, onBack }) {
  const OTP_LEN = 6;
  const [otp, setOtp]           = useState(Array(OTP_LEN).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  const [resendCooldown, setResendCooldown] = useState(30);
  const [resending, setResending]           = useState(false);
  useEffect(()=>{
    if (resendCooldown <= 0) return;
    const id = setInterval(()=>setResendCooldown(c=>c-1), 1000);
    return ()=>clearInterval(id);
  }, [resendCooldown]);

  const boxRefs = useRef(Array(OTP_LEN).fill(null).map(()=>({ current: null })));

  const handleChange = (i, val) => {
    if (val.length > 1) {
      const digits = val.replace(/\D/g,"").slice(0, OTP_LEN).split("");
      const next = [...otp];
      digits.forEach((d, idx) => { if (i+idx < OTP_LEN) next[i+idx] = d; });
      setOtp(next);
      const focusIdx = Math.min(i + digits.length, OTP_LEN - 1);
      boxRefs.current[focusIdx]?.current?.focus();
      return;
    }
    const v = val.replace(/\D/g,"").slice(-1);
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < OTP_LEN - 1) boxRefs.current[i+1]?.current?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      boxRefs.current[i-1]?.current?.focus();
    }
  };

  const handleLogin = () => {
    setSubmitted(true);
    setError("");
    const code = otp.join("");
    if (code.length < OTP_LEN) return;
    setLoading(true);

    setTimeout(() => {
      const stored  = LoginScreen._pendingOtp;
      const expiry  = LoginScreen._pendingExp;
      const expired = !expiry || Date.now() > expiry;

      if (!stored) {
        setError("Session expired. Please go back and request a new OTP.");
        setLoading(false); return;
      }
      if (expired) {
        setError("OTP has expired (5 min limit). Please request a new one.");
        LoginScreen._pendingOtp = null;
        setLoading(false); return;
      }
      if (code !== stored) {
        setError("Incorrect OTP. Please check and try again.");
        setOtp(Array(OTP_LEN).fill(""));
        boxRefs.current[0]?.current?.focus();
        setShakeKey(k => k+1);
        setLoading(false); return;
      }

      LoginScreen._pendingOtp   = null;
      LoginScreen._pendingExp   = null;
      LoginScreen._pendingPhone = null;
      setLoading(false);
      onLogin && onLogin();
    }, 600);
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || resending) return;
    setResending(true);
    setError("");
    const targetPhone = phone || LoginScreen._pendingPhone;
    if (!targetPhone) { setError("Phone number missing. Go back and try again."); setResending(false); return; }
    const newOtp = generateOtp();
    const result = await sendOtpViaSms(targetPhone, newOtp);
    if (result.success) {
      LoginScreen._pendingOtp = newOtp;
      LoginScreen._pendingExp = Date.now() + 5 * 60 * 1000;
      setOtp(Array(OTP_LEN).fill(""));
      boxRefs.current[0]?.current?.focus();
      setResendCooldown(30);
    } else {
      setError(result.message || "Resend failed. Try again.");
    }
    setResending(false);
  };

  const showErr = submitted && otp.some(d => d === "");

  return(
    <div style={rg.wrapper}>
      <style>{AUTH_CSS + `@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={rg.bg}/><div style={rg.bgGlow}/>
      <TopCropDeco/>
      {onBack && <button style={rg.backBtn} onClick={onBack} aria-label="Go back">‹</button>}
      <div className="reg-title" style={{...rg.titleWrap,paddingBottom:0}}>
        <div style={rg.logo}><span style={rg.cropWord}>Crop</span><span style={rg.wiseWord}>Wise</span></div>
        <div style={rg.heading}>Enter OTP</div>
        <div style={rg.sub}>
          {phone ? `Sent to +91 ${phone}` : "Sent to your registered number"}
        </div>
      </div>

      <div className="reg-card" style={{...rg.card,marginTop:16,alignItems:"center",gap:18}}>
        <div key={shakeKey} className={shakeKey?"shake":""} style={{display:"flex",gap:10,justifyContent:"center"}}>
          {otp.map((digit,i)=>(
            <input
              key={i}
              ref={el=>{ boxRefs.current[i].current=el; }}
              className={`otp-box${digit?" filled":""}${(showErr&&!digit)||error?" err":""}`}
              type="tel"
              inputMode="numeric"
              maxLength={OTP_LEN}
              value={digit}
              onChange={e=>handleChange(i,e.target.value)}
              onKeyDown={e=>handleKey(i,e)}
              onFocus={e=>e.target.select()}
            />
          ))}
        </div>

        {showErr && <div style={{...rg.errMsg,textAlign:"center"}}>Please enter all {OTP_LEN} digits</div>}
        {error   && <div style={{...rg.errMsg,textAlign:"center"}}>{error}</div>}

        <button className="verify-btn" onClick={handleLogin} disabled={loading} style={{width:"100%"}}>
          {loading ? (
            <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
              <span style={{animation:"spin 1s linear infinite",display:"inline-block",fontSize:16}}>⟳</span>
              Verifying…
            </span>
          ) : "Login"}
        </button>

        <div style={rg.loginRow}>
          Didn't receive OTP?{" "}
          {resendCooldown > 0
            ? <span style={{color:"#9a8060",fontSize:13}}>Resend in {resendCooldown}s</span>
            : <span className="resend-link" onClick={handleResend} style={{pointerEvents:resending?"none":"auto"}}>
                {resending ? "Sending…" : "Resend OTP"}
              </span>
          }
        </div>
      </div>
      <BottomScene/>
    </div>
  );
}

// TRANSLATIONS 
const T = {
  en: {
    appTagline: "Smart Farming Assistant",
    growSmarter: "Grow Smarter.",
    earnBetter: "Earn Better.",
    heroSub: "Live weather-based crop recommendations + real mandi prices for Indian farmers.",
    startPlanning: "🌱 Start Planning",
    liveMarkets: "📊 Live Markets",
    season: "Season",
    rainfall30: "Rainfall (Live)",
    avgTemp: "Avg Temp (Live)",
    mandiPrices: "Mandi Prices",
    navHome: "Home", navPlan: "Crop Plan", navMarket: "Markets", navProfit: "Profit", navAlerts: "Alerts",
    locationLabel: "📍 Location & Live Weather Detection",
    locationPlaceholder: "District, State — or click detect",
    detectBtn: "📍 Use Current Location",
    detecting: "Detecting...",
    farmDetails: "🌱 Farm Details",
    soilType: "Soil Type", selectSoil: "Select soil type",
    rainfallLevel: "Rainfall Level", selectRainfall: "Select rainfall",
    seasonLabel: "Season",
    voiceTitle: "🎙️ Krishi Voice Assistant",
    voiceBtn: "🎤 Speak your farm details in English",
    voiceListening: "🔴 Listening — speak now...",
    getRecommendations: "🌾 Get Real-Time Recommendations",
    analysing: "⟳ Analysing with live weather & prices...",
    topPicks: "🌱 Top Picks",
    mandiPrice: "Mandi Price",
    yieldAcre: "Yield/Acre",
    incomeAcre: "Income/Acre",
    risk: "Risk",
    simulateProfit: "💰 Simulate Profit",
    profitSim: "💰 Profit Simulator",
    selectCrop: "Select Crop",
    landArea: "Land Area",
    acres: "Acres",
    estimatedIncome: "Estimated Income",
    netProfit: "Net Profit",
    costPerAcre: "Cost per Acre (seeds, fertilizer, labour)",
    costHint: "Total farming cost",
    grossRevenue: "Gross Revenue",
    totalCost: "Total Cost",
    quickCompare: "⚡ Quick Compare",
    alertsTitle: "⚠️ Farmer Alert System",
    alertsSub: "AI-predicted oversupply warnings",
    riskReason: "⚠️ Reason:",
    switchTo: "✅ Switch to:",
    roadmap: "🌏 Future Roadmap",
    soilRed: "Red Soil", soilBlack: "Black / Cotton Soil", soilSandy: "Sandy Soil", soilLoamy: "Loamy Soil",
    rainLow: "Low (<500mm)", rainMedium: "Medium (500–1000mm)", rainHigh: "High (>1000mm)",
    kharif: "Kharif (Jun–Oct)", rabi: "Rabi (Oct–Mar)",
    liveWeather: "🌦 Live Weather",
    rain30day: "30-day rain", avgTempLabel: "avg temp",
    autoSet: "🟢 AUTO", autoLabel: "Auto-set below", autoDetected: "Auto-detected",
    topPick: "⭐ TOP PICK",
    pricesUpdated: "Prices:",
    addApiKey: "Add data.gov.in API key for live mandi prices",
    apiKeyInstructions: "Open src/App.jsx → replace 579b464db66ec23bdd0000016954fde32bb14a91715350d8fe72f537 at the top.",
    weatherLive: "Weather ✅ LIVE",
    fetchingWeather: "⟳ Fetching weather...",
    refreshPrices: "⟳ Refresh",
    livePricesFrom: "live prices from data.gov.in",
    estimatedPrices: "Estimated prices — add API key for live data",
    addKeyLive: "🔑 Add your data.gov.in API key at the top of App.jsx to see live mandi prices.",
    riskLow: "Low Risk", riskMedium: "Medium Risk", riskHigh: "High Risk",
    profitHigh: "High", profitMedium: "Medium", profitLow: "Low",
    stability: "Stability",
    totalYield: "Total Yield", totalYieldUnit: "q",
    livePrice: "LIVE PRICE",
    heard: "Heard:",
    riskWarningHigh: "⚠️ Many farmers are growing this crop — prices may fall at harvest time.",
    riskWarningMedium: "🟡 Moderate risk. Keep an eye on local market prices before selling.",
    soilOptions: {red:"Red Soil 🌄", black:"Black Soil 🏔️", sandy:"Sandy Soil 🏜️", loamy:"Loamy Soil 🌿"},
    rainfallOptions: {low:"Dry ☀️\n<500mm", medium:"Moderate 🌦️\n500–1000mm", high:"Heavy 🌧️\n>1000mm"},
    seasonOptions: {kharif:"Kharif 🌱\nJun–Oct", rabi:"Rabi ❄️\nOct–Mar"},
    rainfallForecast: "📊 30-Day Rainfall Forecast",
    locating: "Detecting...", locateBtn: "📍 Use Current Location",
    noKeyMsg: "Add data.gov.in API key for live mandi prices",
    heroDesc: "Live weather-based crop recommendations + real mandi prices for Indian farmers.",
    marketPrices: "Market Prices", liveCount: (n)=>`${n} live crops`,
    mandiData: "Mandi data", realPrices: "Real prices",
    riskAlerts: "Risk Alerts", warnings: "3 warnings",
    voiceInput: "Voice Input", krishiAI: "Krishi AI",
    seasonWidget: "Season", mandiIntelligence: "📊 Live Mandi",
    estimated: "Estimated prices — add API key for live data",
    refreshBtn: "⟳ Refresh",
    profitMed: "Medium", profitHigh2: "High Stability", profitLow2: "Low Stability",
    profitSimTitle: "Profit Simulator",
    costPlaceholder: "e.g. 8000", costNote: "Seeds + fertilizer + labour per acre",
    grossIncome: "Gross Revenue", netProfitTitle: "After all costs",
    totalCostLabel: "Total Cost", riskBadge: "⚠️ CAUTION",
    alertReason: "Why be careful:", alertSwitch: "✅ Better option:",
    alertsDesc: "Crops with supply risk this season",
    riskWarning: (v)=> v>=50 ? "⚠️ Many farmers are growing this — prices may fall at harvest time." : v>=30 ? "🟡 Moderate risk. Check local market prices before selling." : "✅ Good choice — stable demand, lower competition expected.",
  },
  hi: {
    appTagline: "स्मार्ट खेती सहायक",
    growSmarter: "समझदारी से उगाएं।",
    earnBetter: "ज़्यादा कमाएं।",
    heroSub: "मौसम के आधार पर फसल की सलाह + असली मंडी भाव।",
    startPlanning: "🌱 योजना बनाएं",
    liveMarkets: "📊 मंडी भाव",
    season: "मौसम",
    rainfall30: "बारिश (लाइव)",
    avgTemp: "तापमान (लाइव)",
    mandiPrices: "मंडी भाव",
    navHome: "होम", navPlan: "फसल योजना", navMarket: "मंडी", navProfit: "कमाई", navAlerts: "चेतावनी",
    locationLabel: "📍 स्थान और मौसम जानकारी",
    locationPlaceholder: "जिला, राज्य — या नीचे बटन दबाएं",
    detectBtn: "📍 मेरा स्थान पता करें",
    detecting: "पता लगा रहे हैं...",
    farmDetails: "🌱 खेत की जानकारी",
    soilType: "मिट्टी का प्रकार", selectSoil: "मिट्टी चुनें",
    rainfallLevel: "बारिश का स्तर", selectRainfall: "बारिश चुनें",
    seasonLabel: "मौसम",
    voiceTitle: "🎙️ आवाज़ से बोलें",
    voiceBtn: "🎤 हिंदी में बोलें",
    voiceListening: "🔴 सुन रहे हैं — अभी बोलें...",
    getRecommendations: "🌾 फसल की सलाह लें",
    analysing: "⟳ मौसम और भाव के साथ जाँच हो रही है...",
    topPicks: "🌱 सबसे अच्छी फसलें",
    mandiPrice: "मंडी भाव",
    yieldAcre: "प्रति एकड़ उपज",
    incomeAcre: "प्रति एकड़ आमदनी",
    risk: "जोखिम",
    simulateProfit: "💰 कमाई देखें",
    profitSim: "💰 कमाई हिसाब",
    selectCrop: "फसल चुनें",
    landArea: "ज़मीन",
    acres: "एकड़",
    estimatedIncome: "अनुमानित आमदनी",
    netProfit: "शुद्ध मुनाफ़ा",
    costPerAcre: "प्रति एकड़ खर्च (बीज, खाद, मज़दूरी)",
    costHint: "कुल खेती का खर्च",
    grossRevenue: "कुल आमदनी",
    totalCost: "कुल खर्च",
    quickCompare: "⚡ तुलना करें",
    alertsTitle: "⚠️ किसान चेतावनी",
    alertsSub: "ज़्यादा उत्पादन की चेतावनी",
    riskReason: "⚠️ कारण:",
    switchTo: "✅ इसकी जगह लगाएं:",
    roadmap: "🌏 आगे की योजना",
    soilRed: "लाल मिट्टी", soilBlack: "काली / कपास मिट्टी", soilSandy: "रेतीली मिट्टी", soilLoamy: "दोमट मिट्टी",
    rainLow: "कम (<500mm)", rainMedium: "मध्यम (500–1000mm)", rainHigh: "ज़्यादा (>1000mm)",
    kharif: "खरीफ (जून–अक्टूबर)", rabi: "रबी (अक्टूबर–मार्च)",
    liveWeather: "🌦 लाइव मौसम",
    rain30day: "30-दिन बारिश", avgTempLabel: "औसत तापमान",
    autoSet: "🟢 स्वतः", autoLabel: "स्वचालित रूप से सेट", autoDetected: "स्वतः पता चला",
    topPick: "⭐ सबसे अच्छा",
    pricesUpdated: "भाव:",
    addApiKey: "लाइव मंडी भाव के लिए API key डालें",
    apiKeyInstructions: "App.jsx खोलें → 579b464db66ec23bdd0000016954fde32bb14a91715350d8fe72f537 बदलें।",
    weatherLive: "मौसम ✅ लाइव",
    fetchingWeather: "⟳ मौसम जानकारी ला रहे हैं...",
    refreshPrices: "⟳ अपडेट करें",
    livePricesFrom: "लाइव भाव data.gov.in से",
    estimatedPrices: "अनुमानित भाव — लाइव के लिए API key डालें",
    addKeyLive: "🔑 लाइव भाव के लिए App.jsx में API key डालें।",
    riskLow: "कम जोखिम", riskMedium: "मध्यम जोखिम", riskHigh: "ज़्यादा जोखिम",
    profitHigh: "ज़्यादा", profitMedium: "मध्यम", profitLow: "कम",
    stability: "स्थिरता",
    totalYield: "कुल उपज", totalYieldUnit: "क्विंटल",
    livePrice: "लाइव भाव",
    heard: "सुना:",
    riskWarningHigh: "⚠️ इस फसल को बहुत किसान लगा रहे हैं — कटाई के समय भाव गिर सकते हैं।",
    riskWarningMedium: "🟡 मध्यम जोखिम। बेचने से पहले स्थानीय मंडी भाव देखें।",
    soilOptions: {red:"लाल मिट्टी 🌄", black:"काली मिट्टी 🏔️", sandy:"रेतीली 🏜️", loamy:"दोमट 🌿"},
    rainfallOptions: {low:"कम ☀️", medium:"मध्यम 🌦️", high:"ज़्यादा 🌧️"},
    seasonOptions: {kharif:"खरीफ 🌱", rabi:"रबी ❄️"},
    rainfallForecast:"📊 30-दिन बारिश", locating:"पता लग रहा है...", locateBtn:"📍 स्थान पता करें",
    noKeyMsg:"लाइव भाव के लिए API key डालें", heroDesc:"मौसम के आधार पर फसल सलाह + मंडी भाव।",
    marketPrices:"मंडी भाव", liveCount:(n)=>`${n} लाइव`, mandiData:"मंडी डेटा", realPrices:"असली भाव",
    riskAlerts:"चेतावनी", warnings:"3 चेतावनियां", voiceInput:"आवाज़", krishiAI:"कृषि AI",
    seasonWidget:"मौसम", mandiIntelligence:"📊 मंडी भाव", estimated:"अनुमानित भाव",
    refreshBtn:"⟳ अपडेट", profitMed:"मध्यम", profitHigh2:"उच्च", profitLow2:"कम",
    profitSimTitle:"कमाई हिसाब", costPlaceholder:"जैसे 8000",
    costNote:"बीज + खाद + मज़दूरी प्रति एकड़", grossIncome:"कुल आमदनी",
    netProfitTitle:"सभी खर्च के बाद", totalCostLabel:"कुल खर्च",
    riskBadge:"⚠️ सावधान", alertReason:"सावधान क्यों:", alertSwitch:"✅ बेहतर विकल्प:",
    alertsDesc:"इस मौसम ज़्यादा उत्पादन वाली फसलें",
    riskWarning:(v)=>v>=50?"⚠️ बहुत किसान यह फसल लगा रहे हैं — भाव गिर सकता है।":v>=30?"🟡 मध्यम जोखिम। मंडी भाव देखें।":"✅ अच्छा चुनाव।",
  },
  kn: {
    appTagline: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ",
    growSmarter: "ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಬೆಳೆಯಿರಿ.",
    earnBetter: "ಹೆಚ್ಚು ಗಳಿಸಿ.",
    heroSub: "ಹವಾಮಾನ ಆಧಾರಿತ ಬೆಳೆ ಶಿಫಾರಸು + ನೈಜ ಮಂಡಿ ಬೆಲೆಗಳು.",
    startPlanning: "🌱 ಯೋಜನೆ ಮಾಡಿ",
    liveMarkets: "📊 ಮಂಡಿ ಬೆಲೆ",
    season: "ಋತು",
    rainfall30: "ಮಳೆ (ನೇರ)",
    avgTemp: "ತಾಪಮಾನ (ನೇರ)",
    mandiPrices: "ಮಂಡಿ ಬೆಲೆ",
    navHome: "ಮನೆ", navPlan: "ಬೆಳೆ ಯೋಜನೆ", navMarket: "ಮಂಡಿ", navProfit: "ಲಾಭ", navAlerts: "ಎಚ್ಚರಿಕೆ",
    locationLabel: "📍 ಸ್ಥಳ ಮತ್ತು ಹವಾಮಾನ",
    locationPlaceholder: "ತಾಲೂಕು, ರಾಜ್ಯ — ಅಥವಾ ಕೆಳಗೆ ಒತ್ತಿರಿ",
    detectBtn: "📍 ನನ್ನ ಸ್ಥಳ ಪತ್ತೆ ಮಾಡಿ",
    detecting: "ಪತ್ತೆ ಮಾಡುತ್ತಿದ್ದೇವೆ...",
    farmDetails: "🌱 ಜಮೀನಿನ ವಿವರ",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ", selectSoil: "ಮಣ್ಣು ಆರಿಸಿ",
    rainfallLevel: "ಮಳೆಯ ಮಟ್ಟ", selectRainfall: "ಮಳೆ ಆರಿಸಿ",
    seasonLabel: "ಋತು",
    voiceTitle: "🎙️ ಧ್ವನಿ ಸಹಾಯಕ",
    voiceBtn: "🎤 ಕನ್ನಡದಲ್ಲಿ ಮಾತಾಡಿ",
    voiceListening: "🔴 ಕೇಳುತ್ತಿದ್ದೇವೆ — ಮಾತಾಡಿ...",
    getRecommendations: "🌾 ಬೆಳೆ ಸಲಹೆ ಪಡೆಯಿರಿ",
    analysing: "⟳ ಹವಾಮಾನ ಮತ್ತು ಬೆಲೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    topPicks: "🌱 ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳು",
    mandiPrice: "ಮಂಡಿ ಬೆಲೆ",
    yieldAcre: "ಪ್ರತಿ ಎಕರೆ ಇಳುವರಿ",
    incomeAcre: "ಪ್ರತಿ ಎಕರೆ ಆದಾಯ",
    risk: "ಅಪಾಯ",
    simulateProfit: "💰 ಲಾಭ ನೋಡಿ",
    profitSim: "💰 ಲಾಭ ಲೆಕ್ಕ",
    selectCrop: "ಬೆಳೆ ಆರಿಸಿ",
    landArea: "ಜಮೀನು",
    acres: "ಎಕರೆ",
    estimatedIncome: "ಅಂದಾಜು ಆದಾಯ",
    netProfit: "ನಿವ್ವಳ ಲಾಭ",
    costPerAcre: "ಪ್ರತಿ ಎಕರೆ ಖರ್ಚು (ಬೀಜ, ಗೊಬ್ಬರ, ಕೂಲಿ)",
    costHint: "ಒಟ್ಟು ಕೃಷಿ ಖರ್ಚು",
    grossRevenue: "ಒಟ್ಟು ಆದಾಯ",
    totalCost: "ಒಟ್ಟು ಖರ್ಚು",
    quickCompare: "⚡ ಹೋಲಿಕೆ ಮಾಡಿ",
    alertsTitle: "⚠️ ರೈತ ಎಚ್ಚರಿಕೆ",
    alertsSub: "ಹೆಚ್ಚಿನ ಉತ್ಪಾದನೆ ಎಚ್ಚರಿಕೆ",
    riskReason: "⚠️ ಕಾರಣ:",
    switchTo: "✅ ಬದಲಾಗಿ ಬೆಳೆಯಿರಿ:",
    roadmap: "🌏 ಭವಿಷ್ಯದ ಯೋಜನೆ",
    soilRed: "ಕೆಂಪು ಮಣ್ಣು", soilBlack: "ಕಪ್ಪು / ಹತ್ತಿ ಮಣ್ಣು", soilSandy: "ಮರಳು ಮಣ್ಣು", soilLoamy: "ಗೋಡು ಮಣ್ಣು",
    rainLow: "ಕಡಿಮೆ (<500mm)", rainMedium: "ಮಧ್ಯಮ (500–1000mm)", rainHigh: "ಹೆಚ್ಚು (>1000mm)",
    kharif: "ಖರೀಫ್ (ಜೂನ್–ಅಕ್ಟೋಬರ್)", rabi: "ರಬಿ (ಅಕ್ಟೋಬರ್–ಮಾರ್ಚ್)",
    liveWeather: "🌦 ನೇರ ಹವಾಮಾನ",
    rain30day: "30-ದಿನ ಮಳೆ", avgTempLabel: "ಸರಾಸರಿ ತಾಪ",
    autoSet: "🟢 ಸ್ವಯಂ", autoLabel: "ಸ್ವಯಂ ಹೊಂದಿಸಲಾಗಿದೆ", autoDetected: "ಸ್ವಯಂ ಪತ್ತೆ",
    topPick: "⭐ ಅತ್ಯುತ್ತಮ",
    pricesUpdated: "ಬೆಲೆ:",
    addApiKey: "ನೇರ ಮಂಡಿ ಬೆಲೆಗೆ API key ಸೇರಿಸಿ",
    apiKeyInstructions: "App.jsx ತೆರೆಯಿರಿ → 579b464db66ec23bdd0000016954fde32bb14a91715350d8fe72f537 ಬದಲಿಸಿ.",
    weatherLive: "ಹವಾಮಾನ ✅ ನೇರ",
    fetchingWeather: "⟳ ಹವಾಮಾನ ತರುತ್ತಿದ್ದೇವೆ...",
    refreshPrices: "⟳ ಅಪ್‌ಡೇಟ್",
    livePricesFrom: "ನೇರ ಬೆಲೆ data.gov.in ನಿಂದ",
    estimatedPrices: "ಅಂದಾಜು ಬೆಲೆ — ನೇರ ಬೆಲೆಗೆ API key ಸೇರಿಸಿ",
    addKeyLive: "🔑 ನೇರ ಬೆಲೆಗೆ App.jsx ನಲ್ಲಿ API key ಸೇರಿಸಿ.",
    riskLow: "ಕಡಿಮೆ ಅಪಾಯ", riskMedium: "ಮಧ್ಯಮ ಅಪಾಯ", riskHigh: "ಹೆಚ್ಚು ಅಪಾಯ",
    profitHigh: "ಹೆಚ್ಚು", profitMedium: "ಮಧ್ಯಮ", profitLow: "ಕಡಿಮೆ",
    stability: "ಸ್ಥಿರತೆ",
    totalYield: "ಒಟ್ಟು ಇಳುವರಿ", totalYieldUnit: "ಕ್ವಿಂಟಲ್",
    livePrice: "ನೇರ ಬೆಲೆ",
    heard: "ಕೇಳಿದ್ದು:",
    riskWarningHigh: "⚠️ ಹಲವು ರೈತರು ಈ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿದ್ದಾರೆ — ಕೊಯ್ಲು ಸಮಯದಲ್ಲಿ ಬೆಲೆ ಕಡಿಮೆ ಆಗಬಹುದು.",
    riskWarningMedium: "🟡 ಮಧ್ಯಮ ಅಪಾಯ. ಮಾರಾಟ ಮೊದಲು ಸ್ಥಳೀಯ ಬೆಲೆ ನೋಡಿ.",
    soilOptions: {red:"ಕೆಂಪು ಮಣ್ಣು 🌄", black:"ಕಪ್ಪು ಮಣ್ಣು 🏔️", sandy:"ಮರಳು ಮಣ್ಣು 🏜️", loamy:"ಗೋಡು ಮಣ್ಣು 🌿"},
    rainfallOptions: {low:"ಕಡಿಮೆ ☀️", medium:"ಮಧ್ಯಮ 🌦️", high:"ಹೆಚ್ಚು 🌧️"},
    seasonOptions: {kharif:"ಖರೀಫ್ 🌱", rabi:"ರಬಿ ❄️"},
    rainfallForecast:"📊 30-ದಿನ ಮಳೆ", locating:"ಪತ್ತೆ ಮಾಡುತ್ತಿದ್ದೇವೆ...", locateBtn:"📍 ಸ್ಥಳ ಪತ್ತೆ",
    noKeyMsg:"ನೇರ ಬೆಲೆಗೆ API key ಸೇರಿಸಿ", heroDesc:"ಹವಾಮಾನ ಆಧಾರಿತ ಬೆಳೆ ಶಿಫಾರಸು + ಮಂಡಿ ಬೆಲೆ.",
    marketPrices:"ಮಂಡಿ ಬೆಲೆ", liveCount:(n)=>`${n} ನೇರ`, mandiData:"ಮಂಡಿ ಡೇಟಾ", realPrices:"ನಿಜ ಬೆಲೆ",
    riskAlerts:"ಎಚ್ಚರಿಕೆ", warnings:"3 ಎಚ್ಚರಿಕೆ", voiceInput:"ಧ್ವನಿ", krishiAI:"ಕೃಷಿ AI",
    seasonWidget:"ಋತು", mandiIntelligence:"📊 ಮಂಡಿ ಬೆಲೆ", estimated:"ಅಂದಾಜು ಬೆಲೆ",
    refreshBtn:"⟳ ಅಪ್‌ಡೇಟ್", profitMed:"ಮಧ್ಯಮ", profitHigh2:"ಹೆಚ್ಚು", profitLow2:"ಕಡಿಮೆ",
    profitSimTitle:"ಲಾಭ ಲೆಕ್ಕ", costPlaceholder:"ಉದಾ 8000",
    costNote:"ಬೀಜ + ಗೊಬ್ಬರ + ಕೂಲಿ ಪ್ರತಿ ಎಕರೆ", grossIncome:"ಒಟ್ಟು ಆದಾಯ",
    netProfitTitle:"ಎಲ್ಲ ಖರ್ಚು ನಂತರ", totalCostLabel:"ಒಟ್ಟು ಖರ್ಚು",
    riskBadge:"⚠️ ಎಚ್ಚರ", alertReason:"ಯಾಕೆ ಎಚ್ಚರ:", alertSwitch:"✅ ಉತ್ತಮ ಆಯ್ಕೆ:",
    alertsDesc:"ಈ ಋತುವಿನಲ್ಲಿ ಹೆಚ್ಚು ಉತ್ಪಾದನೆ ಬೆಳೆಗಳು",
    riskWarning:(v)=>v>=50?"⚠️ ಹಲವು ರೈತರು ಈ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿದ್ದಾರೆ — ಬೆಲೆ ಕಡಿಮೆ ಆಗಬಹುದು.":v>=30?"🟡 ಮಧ್ಯಮ ಅಪಾಯ. ಸ್ಥಳೀಯ ಬೆಲೆ ನೋಡಿ.":"✅ ಉತ್ತಮ ಆಯ್ಕೆ.",
  },
};

const MANDI_KEY = "579b464db66ec23bdd0000016954fde32bb14a91715350d8fe72f537";

const CROPS_DB = {
  red:   { low:{kharif:["Groundnut","Ragi","Maize"],rabi:["Chickpea","Linseed","Safflower"]},medium:{kharif:["Cotton","Sunflower","Sesame"],rabi:["Wheat","Mustard","Barley"]},high:{kharif:["Sugarcane","Paddy","Banana"],rabi:["Potato","Onion","Garlic"]} },
  black: { low:{kharif:["Soybean","Tur Dal","Maize"],rabi:["Wheat","Chickpea","Linseed"]},medium:{kharif:["Cotton","Paddy","Bajra"],rabi:["Mustard","Safflower","Barley"]},high:{kharif:["Sugarcane","Banana","Turmeric"],rabi:["Onion","Garlic","Potato"]} },
  sandy: { low:{kharif:["Groundnut","Bajra","Moong"],rabi:["Mustard","Barley","Chickpea"]},medium:{kharif:["Sunflower","Sesame","Watermelon"],rabi:["Wheat","Garlic","Cumin"]},high:{kharif:["Maize","Cotton","Paddy"],rabi:["Potato","Onion","Tomato"]} },
  loamy: { low:{kharif:["Soybean","Tur Dal","Bajra"],rabi:["Wheat","Chickpea","Mustard"]},medium:{kharif:["Maize","Sunflower","Cotton"],rabi:["Barley","Potato","Onion"]},high:{kharif:["Paddy","Sugarcane","Banana"],rabi:["Tomato","Capsicum","Carrot"]} },
};

const MANDI_NAMES = {
  Groundnut:"Groundnut",Ragi:"Ragi","Tur Dal":"Tur",Maize:"Maize",Cotton:"Cotton",
  Wheat:"Wheat",Soybean:"Soyabean",Paddy:"Paddy(Common)",Chickpea:"Gram",
  Mustard:"Mustard",Sunflower:"Sunflower Seed",Bajra:"Bajra",
  Sesame:"Sesamum(Gingelly Oil Seeds)",Onion:"Onion",Tomato:"Tomato",
  Potato:"Potato",Capsicum:"Capsicum",Sugarcane:"Sugarcane",Banana:"Banana",
  Moong:"Moong(Green Gram)",Barley:"Barley",Turmeric:"Turmeric",Garlic:"Garlic",
  Watermelon:"Water Melon",Safflower:"Safflower",Cumin:"Cumin Seed(Jeera)",
  Carrot:"Carrot",Linseed:"Linseed",
};

const CROP_META = {
  Groundnut:{profit:"High",risk:18,yieldPerAcre:18,icon:"🥜",fallbackPrice:5200},
  Ragi:{profit:"Medium",risk:22,yieldPerAcre:20,icon:"🌾",fallbackPrice:2800},
  "Tur Dal":{profit:"High",risk:21,yieldPerAcre:12,icon:"🫘",fallbackPrice:6800},
  Maize:{profit:"Medium",risk:35,yieldPerAcre:35,icon:"🌽",fallbackPrice:1900},
  Cotton:{profit:"High",risk:28,yieldPerAcre:15,icon:"🌿",fallbackPrice:6200},
  Wheat:{profit:"Medium",risk:30,yieldPerAcre:40,icon:"🌾",fallbackPrice:2200},
  Soybean:{profit:"Medium",risk:25,yieldPerAcre:22,icon:"🫘",fallbackPrice:3800},
  Paddy:{profit:"Low",risk:42,yieldPerAcre:45,icon:"🌾",fallbackPrice:2100},
  Chickpea:{profit:"High",risk:19,yieldPerAcre:16,icon:"🫘",fallbackPrice:5600},
  Mustard:{profit:"Medium",risk:27,yieldPerAcre:14,icon:"🌻",fallbackPrice:5400},
  Sunflower:{profit:"Medium",risk:33,yieldPerAcre:16,icon:"🌻",fallbackPrice:5100},
  Bajra:{profit:"Low",risk:20,yieldPerAcre:25,icon:"🌾",fallbackPrice:2300},
  Sesame:{profit:"High",risk:24,yieldPerAcre:8,icon:"🌿",fallbackPrice:9200},
  Onion:{profit:"Low",risk:68,yieldPerAcre:120,icon:"🧅",fallbackPrice:1200},
  Tomato:{profit:"Low",risk:72,yieldPerAcre:150,icon:"🍅",fallbackPrice:900},
  Potato:{profit:"Medium",risk:48,yieldPerAcre:100,icon:"🥔",fallbackPrice:1400},
  Capsicum:{profit:"High",risk:31,yieldPerAcre:40,icon:"🫑",fallbackPrice:4200},
  Sugarcane:{profit:"Medium",risk:15,yieldPerAcre:800,icon:"🌿",fallbackPrice:350},
  Banana:{profit:"Medium",risk:26,yieldPerAcre:250,icon:"🍌",fallbackPrice:2400},
  Moong:{profit:"High",risk:20,yieldPerAcre:10,icon:"🫘",fallbackPrice:7200},
  Barley:{profit:"Low",risk:18,yieldPerAcre:35,icon:"🌾",fallbackPrice:1800},
  Linseed:{profit:"Medium",risk:22,yieldPerAcre:12,icon:"🌿",fallbackPrice:4800},
  Turmeric:{profit:"High",risk:29,yieldPerAcre:25,icon:"🌿",fallbackPrice:8500},
  Garlic:{profit:"High",risk:38,yieldPerAcre:50,icon:"🧄",fallbackPrice:12000},
  Watermelon:{profit:"Medium",risk:36,yieldPerAcre:200,icon:"🍉",fallbackPrice:1800},
  Safflower:{profit:"Medium",risk:20,yieldPerAcre:12,icon:"🌸",fallbackPrice:5800},
  Cumin:{profit:"High",risk:34,yieldPerAcre:8,icon:"🌿",fallbackPrice:18000},
  Carrot:{profit:"Medium",risk:30,yieldPerAcre:80,icon:"🥕",fallbackPrice:2200},
};

function getRainfallLevel(mmPer30Days) {
  if (mmPer30Days < 50)  return "low";
  if (mmPer30Days < 150) return "medium";
  return "high";
}
function getCurrentSeason() {
  const m = new Date().getMonth() + 1;
  return (m >= 6 && m <= 10) ? "kharif" : "rabi";
}
function getSeasonLabel() {
  const s = getCurrentSeason();
  const y = new Date().getFullYear();
  return s === "kharif" ? `Kharif ${y}` : `Rabi ${y}`;
}

async function fetchOpenMeteoWeather(lat, lon) {
  // Validate coords are real numbers in valid range before hitting API
  if (lat == null || lon == null || isNaN(lat) || isNaN(lon) ||
      lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    throw new Error(`Invalid coordinates: lat=${lat}, lon=${lon}`);
  }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${parseFloat(lat).toFixed(4)}&longitude=${parseFloat(lon).toFixed(4)}&daily=precipitation_sum,temperature_2m_max,temperature_2m_min&forecast_days=30&timezone=auto`;
  let res, d;
  for (let attempt = 0; attempt < 2; attempt++) {
    try { res = await fetch(url); d = await res.json(); break; }
    catch(e) { if (attempt === 1) throw e; await new Promise(r => setTimeout(r, 1200)); }
  }
  const totalRain = d.daily.precipitation_sum.reduce((a,b)=>a+(b||0),0);
  const avgTemp = d.daily.temperature_2m_max.reduce((a,b)=>a+b,0) / d.daily.temperature_2m_max.length;
  return {
    rainfallMm: Math.round(totalRain),
    rainfallLevel: getRainfallLevel(totalRain),
    avgTempC: Math.round(avgTemp),
    dailyRain: d.daily.precipitation_sum,
    dailyMaxTemp: d.daily.temperature_2m_max,
  };
}

async function fetchMandiPrice(cropName, state="") {
  if (MANDI_KEY === "579b464db66ec23bdd0000016954fde32bb14a91715350d8fe72f537") return null;
  const commodity = MANDI_NAMES[cropName] || cropName;
  let url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${MANDI_KEY}&format=json&limit=10&filters[commodity]=${encodeURIComponent(commodity)}`;
  if (state) url += `&filters[state]=${encodeURIComponent(state)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.records?.length > 0) {
      const prices = data.records.map(r=>parseFloat(r.modal_price)).filter(Boolean);
      return prices.length ? Math.round(prices.reduce((a,b)=>a+b)/prices.length) : null;
    }
  } catch { return null; }
  return null;
}

async function fetchAllMandiPrices(cropList, state="") {
  const out = {};
  await Promise.all(cropList.map(async crop => {
    const p = await fetchMandiPrice(crop, state);
    if (p) out[crop] = p;
  }));
  return out;
}

function MiniChart({data}) {
  if (!data||data.length<2) return null;
  const max=Math.max(...data),min=Math.min(...data),range=max-min||1,w=100,h=36;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/range)*(h-6)-3}`).join(" ");
  const up=data[data.length-1]>data[0];
  return(<svg width={w} height={h} style={{display:"block"}}><polyline points={pts} fill="none" stroke={up?"#22c55e":"#ef4444"} strokeWidth="2" strokeLinejoin="round"/>{data.map((v,i)=>{const cx=(i/(data.length-1))*w,cy=h-((v-min)/range)*(h-6)-3;return<circle key={i} cx={cx} cy={cy} r="2.5" fill={up?"#22c55e":"#ef4444"}/>;})}</svg>);
}

function RainBars({data}) {
  if (!data||!data.length) return null;
  const max=Math.max(...data,1);
  const w=300,h=60,pad=4;
  const bw=(w-pad*2)/data.length-1;
  return(<svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{display:"block"}}>
    {data.map((v,i)=>{
      const bh=Math.max(2,((v||0)/max)*(h-pad*2));
      const x=pad+i*((w-pad*2)/data.length);
      const c=v>15?"#22c55e":v>5?"#f59e0b":"#334155";
      return<rect key={i} x={x} y={h-pad-bh} width={bw} height={bh} fill={c} rx="1"/>;
    })}
    <text x={pad} y={h-1} fill="#334155" fontSize="7">Day 1</text>
    <text x={w-pad-22} y={h-1} fill="#334155" fontSize="7">Day 30</text>
  </svg>);
}

function RiskMeter({value, lang, showWarning}) {
  const c=value<30?"#22c55e":value<50?"#f59e0b":"#ef4444";
  const e=value<30?"🟢":value<50?"🟡":"🔴";
  const tl = T[lang||"en"];
  const label = value<30?(tl.riskLow||"Low Risk"):value<50?(tl.riskMedium||"Medium Risk"):(tl.riskHigh||"High Risk");
  const warning = tl.riskWarning ? tl.riskWarning(value) : null;
  return(
    <div style={{marginTop:6}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4,color:"#9a6030"}}>
        <span>{e} {label}</span>
        <span style={{color:c,fontWeight:700}}>{value}%</span>
      </div>
      <div style={{background:"rgba(180,120,40,0.15)",borderRadius:99,height:7,overflow:"hidden"}}>
        <div style={{width:`${value}%`,background:`linear-gradient(90deg,${c}88,${c})`,height:"100%",borderRadius:99,transition:"width 0.8s"}}/>
      </div>
      {showWarning && warning && (
        <div style={{marginTop:8,padding:"8px 10px",background:value>=50?"rgba(180,0,0,0.07)":value>=30?"rgba(180,100,0,0.07)":"rgba(40,120,0,0.07)",borderRadius:8,fontSize:12,color:value>=50?"#cc2200":value>=30?"#b85c00":"#2a7a00",lineHeight:1.5,border:`1px solid ${value>=50?"rgba(180,0,0,0.15)":value>=30?"rgba(180,100,0,0.15)":"rgba(40,120,0,0.15)"}`}}>
          {warning}
        </div>
      )}
    </div>
  );
}

function LiveTag({live}) {
  return live
    ? <span style={{fontSize:9,background:"rgba(120,60,0,0.08)",color:"#2a7a00",borderRadius:4,padding:"1px 6px",fontWeight:700,marginLeft:5}}>🟢 LIVE</span>
    : <span style={{fontSize:9,background:"rgba(180,100,0,0.07)",color:"#b85c00",borderRadius:4,padding:"1px 6px",fontWeight:700,marginLeft:5}}>EST</span>;
}

function LangToggle({lang, setLang}) {
  const langs = [["en","EN"],["hi","हि"],["kn","ಕ"]];
  return (
    <div style={{display:"flex",gap:4,background:"rgba(120,60,0,0.08)",borderRadius:99,padding:3,border:"1px solid rgba(120,60,0,0.18)",marginTop:10}}>
      {langs.map(([code,label])=>(
        <button key={code} onClick={()=>setLang(code)} style={{
          padding:"5px 10px",borderRadius:99,border:"none",cursor:"pointer",
          fontSize:12,fontWeight:700,fontFamily:"inherit",
          background:lang===code?"linear-gradient(135deg,#7a3a00,#b85c00)":"transparent",
          color:lang===code?"#fff8ee":"#9a6030",
          transition:"all .2s",
        }}>{label}</button>
      ))}
    </div>
  );
}

const CSS=`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(120,60,0,0.2);border-radius:99px}
.hw:hover{transform:translateY(-2px);border-color:rgba(120,60,0,0.4)!important;box-shadow:0 8px 24px rgba(120,60,0,0.12)!important;transition:all .2s}
.bb:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(120,60,0,0.3)!important;transition:all .15s}
.ob:hover{border-color:rgba(120,60,0,0.5)!important;color:#7a3a00!important;transition:all .2s}
.nb:hover{background:rgba(120,60,0,0.08)!important;transition:all .2s}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
.fade{animation:fadeUp .35s ease forwards}select option{background:#fff8ee;color:#3a1f00}
input,select{font-family:'Sora',sans-serif}`;

const bdg=(p)=>({display:"inline-block",padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:p==="High"?"rgba(40,120,0,0.1)":p==="Medium"?"rgba(180,100,0,0.1)":"rgba(180,0,0,0.08)",color:p==="High"?"#2a7a00":p==="Medium"?"#b85c00":"#cc2200",border:`1px solid ${p==="High"?"rgba(40,120,0,0.25)":p==="Medium"?"rgba(180,100,0,0.25)":"rgba(180,0,0,0.2)"}`});
const NAV_IDS=[{id:"home",icon:"🏠",tk:"navHome"},{id:"plan",icon:"🌱",tk:"navPlan"},{id:"market",icon:"📊",tk:"navMarket"},{id:"profit",icon:"💰",tk:"navProfit"},{id:"alerts",icon:"⚠️",tk:"navAlerts"}];

function CropWiseDashboard({ userName, onLogout }) {
  const [lang,setLang]           = useState("en");
  const t = T[lang];
  const [screen,setScreen]       = useState("home");
  const [soil,setSoil]           = useState("");
  const [rainfall,setRainfall]   = useState("");
  const [season,setSeason]       = useState(getCurrentSeason());
  const [location,setLocation]   = useState("");
  const [coords,setCoords]       = useState(null);
  const [userState,setUserState] = useState("");
  const [area,setArea]           = useState(2);
  const [profitCrop,setProfitCrop] = useState("Groundnut");
  const [costPerAcre,setCostPerAcre] = useState(8000);
  const [results,setResults]     = useState([]);
  const [listening,setListening] = useState(false);
  const [voiceText,setVoiceText] = useState("");
  const [expanded,setExpanded]   = useState(null);
  const [loading,setLoading]     = useState(false);
  const [locating,setLocating]   = useState(false);
  const [locErr,setLocErr]       = useState("");
  const [isDesktop,setIsDesktop] = useState(window.innerWidth>=900);

  const [weather,setWeather]           = useState(null);
  const [weatherLoading,setWeatherLoading] = useState(false);
  const [weatherErr,setWeatherErr]     = useState("");
  const [mandiPrices,setMandiPrices]   = useState({});
  const [mandiLoading,setMandiLoading] = useState(false);
  const [mandiErr,setMandiErr]         = useState("");
  const [lastUpdated,setLastUpdated]   = useState(null);

  useEffect(()=>{
    const fn=()=>setIsDesktop(window.innerWidth>=900);
    window.addEventListener("resize",fn);
    return()=>window.removeEventListener("resize",fn);
  },[]);

  useEffect(()=>{ detectLocation(); },[]);

  useEffect(()=>{
    if (!coords) return;
    const { lat, lon } = coords;
    if (!lat || !lon || !isFinite(lat) || !isFinite(lon) ||
        lat < -90 || lat > 90 || lon < -180 || lon > 180) return;
    setWeatherLoading(true); setWeatherErr("");
    fetchOpenMeteoWeather(lat, lon)
      .then(w=>{ setWeather(w); setRainfall(w.rainfallLevel); })
      .catch(()=>setWeatherErr("Weather fetch failed — select soil & rainfall manually below."))
      .finally(()=>setWeatherLoading(false));
  },[coords]);

  const refreshMandiPrices = useCallback(async(state=userState)=>{
    if (MANDI_KEY==="579b464db66ec23bdd0000016954fde32bb14a91715350d8fe72f537") { setMandiErr("no_key"); return; }
    setMandiLoading(true); setMandiErr("");
    try {
      const prices = await fetchAllMandiPrices(Object.keys(CROP_META), state);
      setMandiPrices(prices);
      setLastUpdated(new Date());
    } catch { setMandiErr("Could not fetch mandi prices."); }
    finally { setMandiLoading(false); }
  },[userState]);

  useEffect(()=>{ if(userState) refreshMandiPrices(userState); },[userState]);

  const getPrice = (crop) => mandiPrices[crop] || CROP_META[crop]?.fallbackPrice || 3000;
  const isLive   = (crop) => !!mandiPrices[crop];

  const [navHistory, setNavHistory] = useState(["home"]);

  const go = (s) => {
    setScreen(s);
    setExpanded(null);
    setNavHistory(prev => prev[prev.length-1] === s ? prev : [...prev, s]);
  };

  const goBack = () => {
    setNavHistory(prev => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      setScreen(next[next.length - 1]);
      setExpanded(null);
      return next;
    });
  };

  const canGoBack = navHistory.length > 1 && screen !== "home";

  const detectLocation = async()=>{
    setLocating(true); setLocErr("");
    const ipFallback = async()=>{
      try {
        const r=await fetch("https://ipapi.co/json/");
        const d=await r.json();
        if (d.city&&d.region) {
          setLocation(`${d.city}, ${d.region}`);
          setUserState(d.region);
          if (d.latitude&&d.longitude) setCoords({lat:d.latitude,lon:d.longitude});
        } else setLocErr("Could not detect. Please type manually.");
      } catch { setLocErr("Could not detect. Please type manually."); }
      finally { setLocating(false); }
    };
    if (!navigator.geolocation) { await ipFallback(); return; }
    navigator.geolocation.getCurrentPosition(async(pos)=>{
      const {latitude:lat,longitude:lng}=pos.coords;
      setCoords({lat,lon:lng});
      try {
        const res=await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const d=await res.json();
        const a=d.address;
        const city=a.city||a.town||a.village||a.county||"";
        const state=a.state||"";
        setLocation([city,state].filter(Boolean).join(", "));
        setUserState(state);
      } catch { setLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`); }
      finally { setLocating(false); }
    }, async()=>{ await ipFallback(); },{timeout:8000,enableHighAccuracy:true});
  };

  const getRecommendations = async()=>{
    if (!soil||!rainfall||!season) return;
    setLoading(true);
    const crops=(CROPS_DB[soil]?.[rainfall]?.[season]||["Groundnut","Ragi","Tur Dal"]).slice(0,3);
    let livePrices={};
    if (MANDI_KEY!=="579b464db66ec23bdd0000016954fde32bb14a91715350d8fe72f537") livePrices=await fetchAllMandiPrices(crops,userState);
    const enriched=crops.map(c=>({name:c,...CROP_META[c],price:livePrices[c]||getPrice(c),isLive:!!livePrices[c]}));
    setResults(enriched);
    setScreen("results");
    setLoading(false);
  };

    const speak = useCallback((text) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang==="hi"?"hi-IN":lang==="kn"?"kn-IN":"en-IN";
      u.rate = 0.88;
      window.speechSynthesis.speak(u);
    }, [lang]);
  
    // Wizard step for mobile guided flow (0=soil,1=rain,2=season,3=done)
    const [wizardStep, setWizardStep] = useState(0);
  
    // Real-time voice recognition refs
    const recognitionRef = useRef(null);
    const [interimText,   setInterimText]   = useState("");
    const [aiParsing,     setAiParsing]     = useState(false);
    const [voiceDetected, setVoiceDetected] = useState({soil:null,rainfall:null,season:null});
  
    const stopVoice = () => {
      if (recognitionRef.current) { recognitionRef.current.stop(); recognitionRef.current = null; }
      setListening(false); setInterimText("");
    };
  
    const parseWithAI = async (transcript) => {
      setAiParsing(true);
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:100,
            messages:[{role:"user",content:`Extract farm details from farmer speech (English/Hindi/Kannada). Return ONLY JSON with keys soil (red|black|sandy|loamy|null), rainfall (low|medium|high|null), season (kharif|rabi|null). Speech: "${transcript}"`}] })
        });
        const data = await res.json();
        const parsed = JSON.parse((data.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim());
        setVoiceDetected(parsed);
        if (parsed.soil)     { setSoil(parsed.soil);         setWizardStep(s=>Math.max(s,1)); }
        if (parsed.rainfall) { setRainfall(parsed.rainfall); setWizardStep(s=>Math.max(s,2)); }
        if (parsed.season)   { setSeason(parsed.season);     setWizardStep(s=>Math.max(s,3)); }
        const parts=[parsed.soil&&parsed.soil+" soil",parsed.rainfall&&parsed.rainfall+" rain",parsed.season&&parsed.season+" season"].filter(Boolean);
        if(parts.length) speak("I heard: "+parts.join(", "));
      } catch {
        const t=transcript.toLowerCase();
        const det={};
        if(t.includes("red")){setSoil("red");det.soil="red";}else if(t.includes("black")){setSoil("black");det.soil="black";}
        else if(t.includes("sandy")){setSoil("sandy");det.soil="sandy";}else if(t.includes("loam")){setSoil("loamy");det.soil="loamy";}
        if(t.includes("low")){setRainfall("low");det.rainfall="low";}else if(t.includes("medium")){setRainfall("medium");det.rainfall="medium";}else if(t.includes("high")){setRainfall("high");det.rainfall="high";}
        if(t.includes("kharif")||t.includes("summer")){setSeason("kharif");det.season="kharif";}else if(t.includes("rabi")||t.includes("winter")){setSeason("rabi");det.season="rabi";}
        setVoiceDetected(det);
      } finally { setAiParsing(false); }
    };
    
  const startVoice = () => {
    if (listening) { stopVoice(); return; }
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if (!SR){setVoiceText("Voice not supported.");return;}
    const r=new SR();
    r.lang=lang==="hi"?"hi-IN":lang==="kn"?"kn-IN":"en-IN";
    r.continuous=true; r.interimResults=true;
    r.onstart=()=>{setListening(true);setVoiceText("");setInterimText("");setVoiceDetected({soil:null,rainfall:null,season:null});};
    r.onend=()=>{setListening(false);setInterimText("");};
    r.onerror=(e)=>{setListening(false);setInterimText("");if(e.error!=="aborted")setVoiceText("Mic error: "+e.error);};
    r.onresult=(e)=>{
      let interim="",final="";
      for(let i=e.resultIndex;i<e.results.length;i++){
        const tx=e.results[i][0].transcript;
        if(e.results[i].isFinal) final+=tx+" "; else interim+=tx;
      }
      if(interim) setInterimText(interim);
      if(final){
        const full=(voiceText+" "+final).trim();
        setVoiceText(full); setInterimText("");
        parseWithAI(full);
      }
    };
    recognitionRef.current=r; r.start();
  };

  const profitMeta     = CROP_META[profitCrop];
  const grossRevenue   = profitMeta ? area * profitMeta.yieldPerAcre * getPrice(profitCrop) : 0;
  const totalCost      = costPerAcre * area;
  const netProfitAmt   = grossRevenue - totalCost;
  const profitEstimate = grossRevenue.toLocaleString("en-IN");
  const hasMandiKey    = MANDI_KEY !== "579b464db66ec23bdd0000016954fde32bb14a91715350d8fe72f537";
  const liveCount      = Object.keys(mandiPrices).length;

  const shared = {
    screen,soil,setSoil,rainfall,setRainfall,season,setSeason,
    location,setLocation,area,setArea,profitCrop,setProfitCrop,
    results,listening,voiceText,expanded,setExpanded,loading,
    locating,locErr,profitMeta,profitEstimate,
    getRecommendations,detectLocation,startVoice,go,bdg,
    weather,weatherLoading,weatherErr,
    mandiPrices,mandiLoading,mandiErr,lastUpdated,refreshMandiPrices,
    getPrice,isLive,hasMandiKey,liveCount,
    lang,setLang,T,t,
    costPerAcre,setCostPerAcre,netProfitAmt,totalCost,grossRevenue,
    onLogout,userName,CROPS_DB,CROP_META,
  };

  if (isDesktop) return (
    <div style={{display:"flex",minHeight:"100vh",background:"linear-gradient(170deg,#fff8ee 0%,#fdf0d8 40%,#f5e4b8 75%,#e8d090 100%)",color:"#3a1f00",fontFamily:"'Sora',sans-serif",overflow:"hidden"}}>
      <style>{CSS}</style>
      <aside style={{width:240,minHeight:"100vh",background:"linear-gradient(180deg,rgba(255,248,230,0.98),rgba(253,240,216,0.98))",borderRight:"1.5px solid rgba(180,120,40,0.2)",display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,bottom:0,zIndex:10,boxShadow:"2px 0 20px rgba(120,60,0,0.08)"}}>
        <div style={{padding:"28px 24px 16px"}}>
          <div style={{fontSize:24,fontWeight:900,letterSpacing:"-0.5px",fontFamily:"'Cinzel',serif"}}><span style={{color:"#7a3a00"}}>Crop</span><span style={{color:"#c87010"}}>Wise</span><span style={{fontSize:10,background:"rgba(120,60,0,0.1)",color:"#7a3a00",borderRadius:6,padding:"2px 7px",marginLeft:8,fontWeight:700,verticalAlign:"middle",border:"1px solid rgba(120,60,0,0.2)"}}>AI</span></div>
          <div style={{fontSize:11,color:"#9a6030",marginTop:4,fontWeight:600}}>{t.appTagline}</div>
          <LangToggle lang={lang} setLang={setLang}/>
          {weather && (
            <div style={{marginTop:14,padding:"12px",background:"rgba(120,60,0,0.06)",borderRadius:12,border:"1px solid rgba(120,60,0,0.15)"}}>
              <div style={{fontSize:10,color:"#b85c00",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>{t.liveWeather}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:"#2a7a00"}}>{weather.rainfallMm}<span style={{fontSize:10,fontWeight:400}}>mm</span></div><div style={{fontSize:9,color:"#9a6030"}}>{t.rain30day}</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:"#b85c00"}}>{weather.avgTempC}<span style={{fontSize:10,fontWeight:400}}>°C</span></div><div style={{fontSize:9,color:"#9a6030"}}>{t.avgTempLabel}</div></div>
              </div>
              <div style={{marginTop:8,fontSize:11,color:"#2a7a00",textAlign:"center",fontWeight:700}}>{weather.rainfallLevel.toUpperCase()}</div>
            </div>
          )}
          {weatherLoading && <div style={{marginTop:10,fontSize:11,color:"#9a6030"}}>{t.fetchingWeather}</div>}
        </div>
        <nav style={{flex:1,padding:"0 12px"}}>
          {NAV_IDS.map(n=>{
            const active=screen===n.id||(screen==="results"&&n.id==="plan");
            return(<div key={n.id} className="nb" onClick={()=>go(n.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 16px",borderRadius:12,cursor:"pointer",marginBottom:4,background:active?"linear-gradient(135deg,#7a3a00,#b85c00)":"transparent",color:active?"#fff8ee":"#7a5030",fontWeight:active?700:500,fontSize:14,border:active?"none":"1px solid transparent"}}><span style={{fontSize:18}}>{n.icon}</span>{t[n.tk]}</div>);
          })}
        </nav>
        <div style={{padding:"16px 24px",borderTop:"1.5px solid rgba(180,120,40,0.2)"}}>
          <div style={{background:"rgba(120,60,0,0.08)",border:"1px solid rgba(120,60,0,0.18)",borderRadius:10,padding:"10px 14px",marginBottom:10}}>
            <div style={{fontSize:10,color:"#b85c00",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>{t.season}</div>
            <div style={{fontSize:14,fontWeight:700,color:"#7a3a00",marginTop:3}}>🌾 {getSeasonLabel()}</div>
          </div>
          {lastUpdated && <div style={{fontSize:10,color:"#9a6030",marginBottom:10,textAlign:"center"}}>{t.pricesUpdated} {lastUpdated.toLocaleTimeString()}</div>}
          {userName && <div style={{fontSize:12,color:"#7a5030",fontWeight:600,marginBottom:8,textAlign:"center"}}>👤 {userName}</div>}
          <button onClick={onLogout} style={{width:"100%",padding:"9px",background:"rgba(180,0,0,0.07)",border:"1.5px solid rgba(180,0,0,0.18)",borderRadius:10,color:"#cc2200",fontSize:13,fontWeight:700,cursor:"pointer",transition:"all .2s"}}
            onMouseEnter={e=>e.target.style.background="rgba(180,0,0,0.14)"}
            onMouseLeave={e=>e.target.style.background="rgba(180,0,0,0.07)"}>
            🚪 Logout
          </button>
        </div>
      </aside>
      <main style={{marginLeft:240,width:"calc(100vw - 240px)",overflowY:"auto",minHeight:"100vh",position:"relative",zIndex:1}}>
        <div className="fade" key={screen} style={{padding:"32px 36px 60px"}}>
          {canGoBack && <BackButton onBack={goBack} mobile={false}/>}
          <DesktopScreens {...shared}/>
        </div>
      </main>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(170deg,#fff8ee 0%,#fdf0d8 40%,#f5e4b8 75%,#e8d090 100%)",color:"#3a1f00",fontFamily:"'Sora',sans-serif",overflow:"hidden"}}>
      <style>{CSS}</style>
      <div style={{padding:"18px 16px 8px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {canGoBack && <BackButton onBack={goBack} mobile={true}/>}
          <div style={{fontSize:20,fontWeight:900}}><span style={{color:"#7a3a00"}}>Crop</span><span style={{color:"#c87010"}}>Wise</span><span style={{fontSize:9,background:"rgba(120,60,0,0.12)",color:"#7a3a00",borderRadius:6,padding:"2px 6px",marginLeft:6,fontWeight:700,verticalAlign:"middle",border:"1px solid rgba(120,60,0,0.2)"}}>AI</span></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {weather && <div style={{fontSize:12,color:"#7a3a00",fontWeight:700}}>🌧 {weather.rainfallMm}mm · {weather.avgTempC}°C</div>}
          <LangToggle lang={lang} setLang={setLang}/>
        </div>
      </div>
      <div style={{display:"flex",gap:6,padding:"0 14px 14px",overflowX:"auto",position:"relative",zIndex:1}}>
        {NAV_IDS.map(n=>{const active=screen===n.id||(screen==="results"&&n.id==="plan"); return<button key={n.id} onClick={()=>go(n.id)} style={{padding:"7px 13px",borderRadius:99,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",background:active?"#7a3a00":"rgba(120,60,0,0.1)",color:active?"#fff8ee":"#7a5030",transition:"all .2s"}}>{n.icon} {t[n.tk]}</button>;})}
        <button onClick={onLogout} style={{padding:"7px 13px",borderRadius:99,border:"1px solid rgba(180,0,0,0.2)",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",background:"rgba(180,0,0,0.07)",color:"#cc2200",marginLeft:"auto",flexShrink:0}}>🚪</button>
      </div>
      <div className="fade" key={screen} style={{position:"relative",zIndex:1,paddingBottom:40}}>
        <MobileScreens {...shared}/>
      </div>
    </div>
  );
}

function BackButton({ onBack, mobile }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onBack} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{display:"flex",alignItems:"center",gap:mobile?4:8,background:h?"rgba(120,60,0,0.15)":"rgba(255,248,230,0.85)",border:`1.5px solid ${h?"rgba(120,60,0,0.4)":"rgba(120,80,20,0.2)"}`,borderRadius:99,padding:mobile?"5px 10px":"8px 16px 8px 12px",cursor:"pointer",marginBottom:mobile?0:20,backdropFilter:"blur(6px)",boxShadow:"0 2px 8px rgba(120,60,0,0.1)",transition:"all .2s"}}>
      <span style={{fontSize:20,color:"#7a3a00",lineHeight:1,transition:"transform .2s",display:"inline-block",transform:h?"translateX(-2px)":"none"}}>‹</span>
      {!mobile && <span style={{fontSize:13,fontWeight:700,color:h?"#4a2200":"#7a5030",fontFamily:"'Lato',sans-serif",transition:"color .2s"}}>Back</span>}
    </button>
  );
}

// DESKTOP SCREENS (unchanged from your app.jsx)

const PRICE_HISTORY = {
  Groundnut: [4500, 4890, 5050, 5285, 5200],
  Ragi: [1900, 2150, 2350, 2583, 2800],
  "Tur Dal": [5050, 5675, 5800, 6300, 6800],
  Maize:     [1310,1430,1570,1700,1900],
  Cotton:    [4320,5150,5726,6080,6200],
  Wheat:     [1735,1840,1975,2125,2200],
  Soybean:   [2600,3100,3500,3710,3800],
  Paddy:     [1470,1550,1750,1940,2100],
  Chickpea:  [4400,4620,5100,5335,5600],
  Mustard:   [3850,4200,5050,5150,5400],
  Sunflower: [3800,4100,4600,4800,5100],
  Bajra:     [1425,1520,1700,2015,2300],
  Sesame:    [5800,6200,7400,8635,9200],
  Onion:     [700,1100,1400,900,1200],
  Tomato:    [600,1200,800,700,900],
  Potato:    [900,1000,1200,1100,1400],
  Capsicum:  [2800,3200,3600,3900,4200],
  Sugarcane: [255,275,290,315,350],
  Banana:    [1600,1900,2000,2200,2400],
  Moong:     [5225,5575,6975,7196,7200],
  Barley:    [1325,1440,1600,1735,1800],
  Linseed:   [3500,3800,4200,4635,4800],
  Turmeric:  [5200,6000,7200,8000,8500],
  Garlic:    [5000,7000,9000,10000,12000],
  Watermelon:[1200,1400,1500,1700,1800],
  Safflower: [3695,4000,4600,5200,5800],
  Cumin:     [9000,12000,15000,20000,18000],
  Carrot:    [1400,1600,1900,2000,2200],
};
const HISTORY_YEARS = [2020,2021,2022,2023,2024];

//Price Trend Chart
function PriceTrendChart({ crop, currentPrice, isLive }) {
  const raw    = PRICE_HISTORY[crop] || [];
  const data   = isLive ? [...raw.slice(1), currentPrice] : raw;
  if (!data.length) return null;

  const W=480, H=160, PAD={t:20,r:16,b:36,l:64};
  const cW=W-PAD.l-PAD.r, cH=H-PAD.t-PAD.b;
  const years = isLive ? [...HISTORY_YEARS.slice(1), 2025] : HISTORY_YEARS;

  const minV=Math.min(...data)*0.92;
  const maxV=Math.max(...data)*1.05;
  const toX=(i)=>PAD.l+i/(data.length-1)*cW;
  const toY=(v)=>PAD.t+cH-(v-minV)/(maxV-minV)*cH;

  const pts=data.map((v,i)=>`${toX(i)},${toY(v)}`).join(" ");
  const area=`M${toX(0)},${toY(data[0])} `+data.map((v,i)=>`L${toX(i)},${toY(v)}`).join(" ")+` L${toX(data.length-1)},${PAD.t+cH} L${toX(0)},${PAD.t+cH} Z`;

  const trend=data[data.length-1]-data[0];
  const col=trend>=0?"#22c55e":"#ef4444";
  const trendPct=Math.abs(Math.round(trend/data[0]*100));

  const ticks=4;
  const gridLines=Array.from({length:ticks+1},(_,i)=>{
    const v=minV+(maxV-minV)*i/ticks;
    const y=toY(v);
    return {y,label:`₹${Math.round(v/100)*100}`};
  });

  return (
    <div style={{marginTop:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"#b85c00"}}>
          5-Year Price Trend
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          {isLive && <span style={{fontSize:9,background:"rgba(40,120,0,0.12)",color:"#2a7a00",borderRadius:4,padding:"2px 7px",fontWeight:700}}>🟢 2025 LIVE</span>}
          <span style={{fontSize:12,fontWeight:700,color:col}}>
            {trend>=0?"▲":"▼"} {trendPct}% since 2020
          </span>
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:"block",overflow:"visible"}}>
        <defs>
          <linearGradient id={`grad-${crop}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={col} stopOpacity="0.25"/>
            <stop offset="100%" stopColor={col} stopOpacity="0.02"/>
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {gridLines.map(({y,label},i)=>(
          <g key={i}>
            <line x1={PAD.l} y1={y} x2={W-PAD.r} y2={y} stroke="rgba(180,120,40,0.15)" strokeWidth="1" strokeDasharray="4,4"/>
            <text x={PAD.l-6} y={y+4} textAnchor="end" fontSize="9" fill="#9a6030">{label}</text>
          </g>
        ))}
        {/* Area fill */}
        <path d={area} fill={`url(#grad-${crop})`}/>
        {/* Line */}
        <polyline points={pts} fill="none" stroke={col} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        {/* Data points */}
        {data.map((v,i)=>(
          <g key={i}>
            <circle cx={toX(i)} cy={toY(v)} r="5" fill="#fff" stroke={col} strokeWidth="2.5"/>
            {i===data.length-1&&<circle cx={toX(i)} cy={toY(v)} r="3" fill={col}/>}
          </g>
        ))}
        {/* Year labels */}
        {years.map((yr,i)=>(
          <text key={i} x={toX(i)} y={H-6} textAnchor="middle" fontSize="10" fontWeight={i===years.length-1?"700":"400"} fill={i===years.length-1?col:"#9a6030"}>{yr}</text>
        ))}
        {/* Price labels on hover — show on all points */}
        {data.map((v,i)=>(
          <text key={i} x={toX(i)} y={toY(v)-10} textAnchor="middle" fontSize="9" fontWeight="700" fill={col}>
            {v>=1000?`₹${(v/1000).toFixed(1)}k`:`₹${v}`}
          </text>
        ))}
      </svg>
      {/* Year-by-year table */}
      <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}>
        {data.map((v,i)=>{
          const prev=i>0?data[i-1]:null;
          const chg=prev!=null?Math.round((v-prev)/prev*100):null;
          return(
            <div key={i} style={{flex:1,minWidth:60,background:i===data.length-1?"rgba(40,120,0,0.08)":"rgba(120,60,0,0.05)",borderRadius:8,padding:"6px 8px",textAlign:"center",border:i===data.length-1?"1.5px solid rgba(40,120,0,0.2)":"1px solid rgba(180,120,40,0.15)"}}>
              <div style={{fontSize:9,color:"#9a6030",marginBottom:2}}>{years[i]}</div>
              <div style={{fontSize:11,fontWeight:700,color:"#3a1f00"}}>₹{v>=1000?(v/1000).toFixed(1)+"k":v}</div>
              {chg!=null&&<div style={{fontSize:9,color:chg>=0?"#22c55e":"#ef4444",fontWeight:600}}>{chg>=0?"+":""}{chg}%</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DesktopScreens(p) {
  const card={background:"rgba(255,252,242,0.88)",border:"1.5px solid rgba(180,120,40,0.2)",borderRadius:20,padding:"24px 28px",marginBottom:20,boxShadow:"0 4px 20px rgba(120,60,0,0.08)",backdropFilter:"blur(8px)"};
  const lbl={fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#b85c00",marginBottom:12};
  const sel={width:"100%",padding:"12px 16px",background:"rgba(255,248,230,0.92)",border:"1.5px solid rgba(120,80,20,0.25)",borderRadius:12,color:"#3a1f00",fontSize:14,outline:"none",appearance:"none",cursor:"pointer"};
  const inp={width:"100%",padding:"12px 16px",background:"rgba(255,248,230,0.92)",border:"1.5px solid rgba(120,80,20,0.25)",borderRadius:12,color:"#3a1f00",fontSize:14,outline:"none"};
  const btn={width:"100%",padding:"15px",background:"linear-gradient(135deg,#7a3a00,#b85c00,#d47020)",border:"none",borderRadius:16,fontSize:15,fontWeight:800,color:"#fff8e8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 16px rgba(140,60,0,0.3)"};
  const spin={animation:"spin 1s linear infinite",display:"inline-block"};

  if (p.screen==="home") return(<>
    {!p.hasMandiKey && (
      <div style={{background:"rgba(255,240,210,0.9)",border:"1.5px solid rgba(180,80,0,0.25)",borderRadius:16,padding:"16px 22px",marginBottom:20,display:"flex",alignItems:"center",gap:14}}>
        <span style={{fontSize:28}}>⚙️</span>
        <div style={{flex:1}}><div style={{fontWeight:700,color:"#b85c00",marginBottom:4}}>{p.t.noKeyMsg}</div></div>
        <div style={{fontSize:11,background:"rgba(120,60,0,0.08)",color:"#2a7a00",borderRadius:8,padding:"6px 10px",fontWeight:700,textAlign:"center",whiteSpace:"nowrap"}}>Weather<br/>✅ LIVE</div>
      </div>
    )}
    <div style={{background:"linear-gradient(135deg,rgba(120,60,0,0.08),rgba(255,248,230,0.6))",border:"1px solid rgba(40,100,0,0.2)",borderRadius:24,padding:"40px 44px",marginBottom:24,display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"center"}}>
      <div>
        <div style={{fontSize:12,color:"#2a7a00",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>🌾 {getSeasonLabel()} · Real-Time Intelligence</div>
        <div style={{fontSize:44,fontWeight:900,letterSpacing:"-1.5px",lineHeight:1.05}}>{p.t.growSmarter}<br/><span style={{color:"#2a7a00"}}>{p.t.earnBetter}</span></div>
        <p style={{color:"#9a6030",fontSize:15,marginTop:14,lineHeight:1.7}}>{p.t.heroDesc}</p>
        <div style={{display:"flex",gap:12,marginTop:20}}>
          <button className="bb" style={{...btn,flex:1}} onClick={()=>p.go("plan")}>{p.t.startPlanning}</button>
          <button className="bb" style={{...btn,flex:1,background:"linear-gradient(135deg,#1d4ed8,#1e40af)",color:"#fff"}} onClick={()=>p.go("market")}>{p.t.liveMarkets}</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {(()=>{
          const mm=p.weather?.rainfallMm; const lvl=p.weather?.rainfallLevel;
          const desc=mm==null?null:mm<50?"Very dry conditions this month. Drought-risk crops advised.":mm<120?"Low rainfall. Irrigation-dependent crops best.":mm<250?"Moderate rainfall. Good for most Rabi/Kharif crops.":mm<400?"High rainfall. Paddy, Sugarcane & wet crops thriving.":"Excess rain. Risk of waterlogging — choose flood-tolerant crops.";
          const barPct=mm==null?0:Math.min(100,Math.round(mm/5));
          const barCol=mm==null?"#ccc":mm<120?"#f59e0b":mm<250?"#2a7a00":"#1d4ed8";
          return(<div className="hw" onClick={()=>p.go("plan")} style={{background:"rgba(255,252,242,0.92)",borderRadius:14,padding:"16px 18px",border:"1.5px solid rgba(180,120,40,0.2)",cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><span style={{fontSize:26}}>🌧</span><LiveTag live={!!p.weather}/></div>
            <div style={{fontWeight:900,fontSize:22,marginTop:6,color:"#3a1f00",letterSpacing:"-0.5px"}}>{p.weatherLoading?"Detecting…":mm!=null?`${mm} mm`:"—"}</div>
            <div style={{fontSize:11,fontWeight:700,color:"#b85c00",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:2}}>{lvl?`${lvl} Rainfall · 30-day`:"Current Rainfall Conditions"}</div>
            {desc&&<><div style={{height:4,background:"rgba(180,120,40,0.15)",borderRadius:99,margin:"8px 0 6px",overflow:"hidden"}}><div style={{width:`${barPct}%`,height:"100%",background:barCol,borderRadius:99,transition:"width 1s ease"}}/></div><div style={{fontSize:10,color:"#7a5030",lineHeight:1.5}}>{desc}</div></>}
          </div>);
        })()}
        {(()=>{
          const temp=p.weather?.avgTempC;
          const feel=temp==null?null:temp<15?{label:"Cold",tip:"Cold-weather crops: Wheat, Mustard, Peas",col:"#1d4ed8",icon:"🥶"}:temp<25?{label:"Pleasant",tip:"Ideal for Rabi crops: Wheat, Chickpea, Barley",col:"#2a7a00",icon:"😊"}:temp<32?{label:"Warm",tip:"Good for Maize, Sunflower, Soybean",col:"#b85c00",icon:"☀️"}:{label:"Hot",tip:"Heat-tolerant crops: Cotton, Bajra, Groundnut",col:"#cc2200",icon:"🌡"};
          return(<div className="hw" onClick={()=>p.go("plan")} style={{background:"rgba(255,252,242,0.92)",borderRadius:14,padding:"16px 18px",border:"1.5px solid rgba(180,120,40,0.2)",cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><span style={{fontSize:26}}>{feel?.icon||"🌡"}</span><LiveTag live={!!p.weather}/></div>
            <div style={{fontWeight:900,fontSize:22,marginTop:6,color:feel?.col||"#3a1f00",letterSpacing:"-0.5px"}}>{p.weatherLoading?"Detecting…":temp!=null?`${temp}°C`:"—"}</div>
            <div style={{fontSize:11,fontWeight:700,color:"#b85c00",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:2}}>{feel?`${feel.label} · ${p.location||"Your location"}`:"Avg Temperature"}</div>
            {feel&&<div style={{fontSize:10,color:"#7a5030",marginTop:6,lineHeight:1.5}}>{feel.tip}</div>}
          </div>);
        })()}
        {(()=>{
          const season=getCurrentSeason();
          const allCrops=[...new Set(Object.values(CROPS_DB).flatMap(soils=>Object.values(soils).flatMap(lvls=>lvls[season]||[])))];
          const scored=allCrops.map(c=>({name:c,price:p.mandiPrices[c]||CROP_META[c]?.fallbackPrice||0,live:!!p.mandiPrices[c],icon:CROP_META[c]?.icon||"🌿",profit:CROP_META[c]?.profit||"Medium"})).sort((a,b)=>b.price-a.price).slice(0,5);
          return(<div className="hw" onClick={()=>p.go("market")} style={{background:"rgba(255,252,242,0.92)",borderRadius:14,padding:"16px 18px",border:"1.5px solid rgba(180,120,40,0.2)",cursor:"pointer",gridColumn:"1 / -1"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div><div style={{fontSize:13,fontWeight:800,color:"#3a1f00"}}>🔥 Trending Crops — {season.charAt(0).toUpperCase()+season.slice(1)} 2026</div><div style={{fontSize:10,color:"#9a6030",marginTop:2}}>Ranked by current mandi price · Tap to see full market</div></div>
              <LiveTag live={Object.keys(p.mandiPrices).length>0}/>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {scored.map((c,i)=>(<div key={c.name} style={{display:"flex",alignItems:"center",gap:6,background:i===0?"linear-gradient(135deg,rgba(40,120,0,0.12),rgba(40,120,0,0.06))":"rgba(120,60,0,0.06)",border:`1.5px solid ${i===0?"rgba(40,120,0,0.3)":"rgba(180,120,40,0.18)"}`,borderRadius:10,padding:"7px 12px"}}>
                <span style={{fontSize:18}}>{c.icon}</span>
                <div><div style={{fontSize:12,fontWeight:700,color:"#3a1f00",display:"flex",alignItems:"center",gap:4}}>{i===0&&<span style={{fontSize:9,background:"rgba(40,120,0,0.15)",color:"#2a7a00",borderRadius:4,padding:"1px 5px",fontWeight:800}}>TOP</span>}{c.name}</div><div style={{fontSize:10,color:c.live?"#2a7a00":"#9a6030",fontWeight:600}}>₹{c.price.toLocaleString("en-IN")}/q {c.live?"🟢":""}</div></div>
              </div>))}
            </div>
          </div>);
        })()}
        <div className="hw" onClick={()=>p.go("plan")} style={{background:"rgba(255,252,242,0.92)",borderRadius:14,padding:"16px 18px",border:"1.5px solid rgba(180,120,40,0.2)",cursor:"pointer"}}>
          <div style={{fontSize:26}}>📅</div>
          <div style={{fontWeight:900,fontSize:18,marginTop:6,color:"#3a1f00"}}>{getSeasonLabel()}</div>
          <div style={{fontSize:11,fontWeight:700,color:"#b85c00",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:2}}>Current Season</div>
          <div style={{fontSize:10,color:"#7a5030",marginTop:6,lineHeight:1.5}}>Auto-detected from calendar. Tap to start planning your {getCurrentSeason()} crop strategy.</div>
          <div style={{marginTop:8,fontSize:11,fontWeight:700,color:"#7a3a00",background:"rgba(120,60,0,0.08)",borderRadius:6,padding:"3px 8px",display:"inline-block"}}>→ Start Planning</div>
        </div>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
      {[{icon:"📊",l:p.t.marketPrices,s:p.liveCount>0?p.t.liveCount(p.liveCount):p.t.mandiData,t:"market"},{icon:"💰",l:p.t.profitSim,s:p.t.realPrices,t:"profit"},{icon:"⚠️",l:p.t.riskAlerts,s:p.t.warnings,t:"alerts"},{icon:"🎙️",l:p.t.voiceInput,s:p.t.krishiAI,t:"plan"}].map((item,i)=>(
        <div key={i} className="hw" onClick={()=>p.go(item.t)} style={{...card,margin:0,cursor:"pointer"}}>
          <div style={{fontSize:28}}>{item.icon}</div>
          <div style={{fontWeight:700,fontSize:14,marginTop:10}}>{item.l}</div>
          <div style={{color:"#9a6030",fontSize:12,marginTop:4}}>{item.s}</div>
        </div>
      ))}
    </div>
  </>);

  if (p.screen==="plan"||p.screen==="results") return(<>
    <div style={card}>
      <div style={lbl}>📍 {p.t.locationLabel}</div>
      <div style={{display:"flex",gap:10,marginBottom:12}}>
        <input style={{...inp,flex:1}} placeholder={p.t.locationPlaceholder} value={p.location} onChange={e=>p.setLocation(e.target.value)}/>
        <button className="ob" style={{padding:"12px 20px",background:"rgba(255,248,230,0.85)",border:"1px solid rgba(40,120,0,0.25)",borderRadius:12,fontSize:13,fontWeight:600,color:"#2a7a00",cursor:"pointer",whiteSpace:"nowrap"}} onClick={p.detectLocation}>
          {p.locating?<><span style={spin}>⟳</span> {p.t.locating}</>:p.t.locateBtn}
        </button>
      </div>
      {p.locErr&&<div style={{fontSize:12,color:"#cc2200",marginBottom:10}}>⚠️ {p.locErr}</div>}
      {p.weatherLoading&&<div style={{padding:"12px",background:"rgba(255,248,230,0.7)",borderRadius:10,fontSize:13,color:"#9a6030"}}>{p.t.fetchingWeather}</div>}
      {p.weatherErr&&<div style={{fontSize:12,color:"#b85c00",background:"rgba(180,100,0,0.07)",border:"1px solid rgba(180,100,0,0.18)",borderRadius:10,padding:"8px 12px",marginTop:6,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span>🌤 {p.weatherErr}</span>
        <button onClick={p.detectLocation} style={{fontSize:11,fontWeight:700,color:"#7a3a00",background:"rgba(120,60,0,0.1)",border:"1px solid rgba(120,60,0,0.2)",borderRadius:8,padding:"3px 10px",cursor:"pointer"}}>⟳ Retry</button>
      </div>}
      {p.weather&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:4}}>
          {[{l:p.t.rainfallLevel,v:`${p.weather.rainfallMm}mm`,sub:`${p.weather.rainfallLevel} level`,c:"#2a7a00"},{l:"Avg Temp",v:`${p.weather.avgTempC}°C`,sub:"30-day avg",c:"#f59e0b"},{l:p.t.rainfallLevel,v:p.weather.rainfallLevel.toUpperCase(),sub:"Auto-set below",c:"#2a7a00"},{l:p.t.seasonLabel,v:p.season.toUpperCase(),sub:"Auto-detected",c:"#a78bfa"}].map(m=>(
            <div key={m.l+m.v} style={{background:"rgba(120,60,0,0.08)",borderRadius:10,padding:"12px 14px",border:"1px solid rgba(40,120,0,0.25)"}}>
              <div style={{fontSize:10,color:"rgba(40,120,0,0.6)",fontWeight:700,textTransform:"uppercase",marginBottom:4}}>{m.l}</div>
              <div style={{fontSize:16,fontWeight:800,color:m.c}}>{m.v}</div>
              <div style={{fontSize:10,color:"#9a6030",marginTop:2}}>{m.sub}</div>
            </div>
          ))}
        </div>
      )}
      {p.weather&&(<div style={{marginTop:12}}><div style={{fontSize:10,color:"#b87040",marginBottom:4}}>{p.t.rainfallForecast}</div><RainBars data={p.weather.dailyRain}/></div>)}
    </div>
    <div style={card}>
      <div style={lbl}>🌱 {p.t.farmDetails}</div>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:13,color:"#7a5030",marginBottom:10,fontWeight:600}}>{p.t.soilType}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {[{val:"red",img:"🌄",desc:p.t.soilOptions.red},{val:"black",img:"🏔️",desc:p.t.soilOptions.black},{val:"sandy",img:"🏜️",desc:p.t.soilOptions.sandy},{val:"loamy",img:"🌿",desc:p.t.soilOptions.loamy}].map(s=>(
            <div key={s.val} onClick={()=>p.setSoil(s.val)} style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${p.soil===s.val?"#7a3a00":"rgba(180,120,40,0.2)"}`,background:p.soil===s.val?"rgba(120,60,0,0.1)":"rgba(255,248,230,0.7)",cursor:"pointer",textAlign:"center",transition:"all .15s"}}><div style={{fontSize:28}}>{s.img}</div><div style={{fontSize:11,fontWeight:700,marginTop:6,color:p.soil===s.val?"#7a3a00":"#9a6030",lineHeight:1.3}}>{s.desc}</div></div>
          ))}
        </div>
      </div>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:13,color:"#7a5030",marginBottom:10,fontWeight:600}}>{p.t.rainfallLevel} {p.weather&&<span style={{fontSize:9,background:"rgba(40,120,0,0.1)",color:"#2a7a00",borderRadius:4,padding:"1px 5px",fontWeight:700}}>🟢 AUTO</span>}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[{val:"low",emoji:"☀️",desc:p.t.rainfallOptions.low},{val:"medium",emoji:"🌦️",desc:p.t.rainfallOptions.medium},{val:"high",emoji:"🌧️",desc:p.t.rainfallOptions.high}].map(r=>(
            <div key={r.val} onClick={()=>p.setRainfall(r.val)} style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${p.rainfall===r.val?"#7a3a00":"rgba(180,120,40,0.2)"}`,background:p.rainfall===r.val?"rgba(120,60,0,0.1)":"rgba(255,248,230,0.7)",cursor:"pointer",textAlign:"center",transition:"all .15s"}}><div style={{fontSize:32}}>{r.emoji}</div><div style={{fontSize:11,fontWeight:700,marginTop:6,color:p.rainfall===r.val?"#7a3a00":"#9a6030",lineHeight:1.3}}>{r.desc}</div></div>
          ))}
        </div>
      </div>
      <div>
        <div style={{fontSize:13,color:"#7a5030",marginBottom:10,fontWeight:600}}>{p.t.seasonLabel} <span style={{fontSize:9,background:"rgba(40,120,0,0.1)",color:"#2a7a00",borderRadius:4,padding:"1px 5px",fontWeight:700}}>🟢 AUTO</span></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{val:"kharif",emoji:"🌱",desc:p.t.seasonOptions.kharif},{val:"rabi",emoji:"❄️",desc:p.t.seasonOptions.rabi}].map(s=>(
            <div key={s.val} onClick={()=>p.setSeason(s.val)} style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${p.season===s.val?"#7a3a00":"rgba(180,120,40,0.2)"}`,background:p.season===s.val?"rgba(120,60,0,0.1)":"rgba(255,248,230,0.7)",cursor:"pointer",textAlign:"center",transition:"all .15s"}}><div style={{fontSize:32}}>{s.emoji}</div><div style={{fontSize:12,fontWeight:700,marginTop:6,color:p.season===s.val?"#7a3a00":"#9a6030"}}>{s.desc}</div></div>
          ))}
        </div>
      </div>
    </div>
    <div style={card}>
      <div style={lbl}>{p.t.voiceTitle}</div>
      <button className="bb" style={{...btn,background:p.listening?"linear-gradient(135deg,#cc2200,#991100)":"linear-gradient(135deg,#4a2200,#7a4010)",color:"#fff8ee"}} onClick={p.startVoice}>{p.listening?p.t.voiceListening:p.t.voiceBtn}</button>
      {p.voiceText&&<div style={{marginTop:10,padding:"10px 14px",background:"rgba(255,248,230,0.7)",borderRadius:10,fontSize:13,color:"#9a6030",fontStyle:"italic"}}>Heard: "{p.voiceText}"</div>}
    </div>
    <button className="bb" style={{...btn,opacity:(!p.soil||!p.rainfall||!p.season)?0.5:1}} onClick={p.getRecommendations} disabled={p.loading||!p.soil||!p.rainfall||!p.season}>
      {p.loading?<><span style={spin}>⟳</span> {p.t.analysing}</>:p.t.getRecommendations}
    </button>
    {p.screen==="results"&&p.results.length>0&&(
      <div style={{marginTop:24}}>
        <div style={{...lbl,marginBottom:16}}>{p.t.topPicks} · {p.soil} soil · {p.rainfall} rain · {p.season}{p.weather&&<span style={{marginLeft:10,fontSize:10,background:"rgba(120,60,0,0.08)",color:"#2a7a00",borderRadius:6,padding:"2px 8px"}}>Weather: {p.weather.rainfallMm}mm · {p.weather.avgTempC}°C</span>}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
          {p.results.map((crop,i)=>(
            <div key={crop.name} className="hw" onClick={()=>p.setExpanded(p.expanded===crop.name?null:crop.name)} style={{background:i===0?"linear-gradient(135deg,rgba(40,120,0,0.08),rgba(255,248,230,0.7))":"rgba(255,252,242,0.88)",border:`1.5px solid ${i===0?"rgba(40,120,0,0.3)":"rgba(180,120,40,0.2)"}`,borderRadius:18,padding:"22px",cursor:"pointer"}}>
              {i===0&&<div style={{fontSize:10,background:"rgba(180,80,0,0.12)",color:"#b85c00",borderRadius:6,padding:"2px 8px",fontWeight:700,marginBottom:8,display:"inline-block"}}>{p.t.topPick}</div>}
              <div style={{fontSize:32}}>{crop.icon}</div>
              <div style={{fontWeight:800,fontSize:18,marginTop:8}}>{crop.name}</div>
              <div style={{marginTop:8,display:"flex",alignItems:"center",flexWrap:"wrap",gap:6}}><span style={p.bdg(crop.profit)}>{crop.profit==="High"?p.t.profitHigh:crop.profit==="Medium"?p.t.profitMed:p.t.profitLow}</span><LiveTag live={crop.isLive}/></div>
              <div style={{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,color:"#7a5030"}}>{p.t.mandiPrice}</span><span style={{fontWeight:800,color:"#2a7a00",fontSize:15}}>₹{crop.price.toLocaleString()}/q</span></div>
              <RiskMeter value={crop.risk} lang={p.lang} showWarning={true}/>
              {p.expanded===crop.name&&(
                <div style={{marginTop:14,paddingTop:14,borderTop:"1.5px solid rgba(180,120,40,0.2)"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                    {[{l:p.t.mandiPrice,v:`₹${crop.price.toLocaleString()}/q`},{l:p.t.yieldAcre,v:`${crop.yieldPerAcre} q`},{l:p.t.incomeAcre,v:`₹${(crop.price*crop.yieldPerAcre).toLocaleString()}`},{l:p.t.risk,v:`${crop.risk}%`}].map(m=>(<div key={m.l} style={{background:"rgba(255,248,230,0.7)",borderRadius:10,padding:"10px",textAlign:"center"}}><div style={{fontSize:10,color:"#9a6030",marginBottom:3}}>{m.l}</div><div style={{fontWeight:700,fontSize:13}}>{m.v}</div></div>))}
                  </div>
                  <PriceTrendChart crop={crop.name} currentPrice={crop.price} isLive={crop.isLive}/>
                  <button className="bb" style={{...btn,marginTop:12}} onClick={e=>{e.stopPropagation();p.setProfitCrop(crop.name);p.go("profit");}}>{p.t.simulateProfit}</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </>);

  if (p.screen==="market") return(<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div>
        <div style={lbl}>{p.t.mandiIntelligence}</div>
        <div style={{fontSize:13,color:"#9a6030"}}>{p.liveCount>0?p.t.liveCount(p.liveCount):p.t.estimated}{p.lastUpdated&&` · ${p.t.pricesUpdated} ${p.lastUpdated.toLocaleTimeString()}`}</div>
        <div style={{fontSize:11,color:"#b85c00",marginTop:4,fontWeight:600}}>💡 Click any crop card to see 5-year price trend</div>
      </div>
      <button className="ob" onClick={()=>p.refreshMandiPrices()} style={{padding:"10px 18px",background:"transparent",border:"1.5px solid rgba(180,120,40,0.2)",borderRadius:10,color:"#7a5030",cursor:"pointer",fontSize:13,fontWeight:600}}>{p.mandiLoading?<span style={spin}>⟳</span>:p.t.refreshBtn}</button>
    </div>
    {p.mandiErr==="no_key"&&<div style={{background:"rgba(180,100,0,0.07)",border:"1px solid rgba(180,80,0,0.2)",borderRadius:14,padding:"14px 18px",marginBottom:16,fontSize:13,color:"#b85c00"}}>{p.t.noKeyMsg}</div>}

    {/* Expanded card overlay */}
    {p.expanded && CROP_META[p.expanded] && (()=>{
      const name=p.expanded; const data=CROP_META[name];
      const live=p.mandiPrices[name]; const price=live||data.fallbackPrice;
      const trend=PRICE_HISTORY[name]||[];
      const startPrice=trend[0]||price;
      const totalGrowth=Math.round((price-startPrice)/startPrice*100);
      return(
        <div style={{background:"rgba(255,252,242,0.98)",border:"2px solid rgba(180,120,40,0.3)",borderRadius:20,padding:"28px",marginBottom:24,boxShadow:"0 8px 40px rgba(120,60,0,0.15)",position:"relative"}}>
          <button onClick={()=>p.setExpanded(null)} style={{position:"absolute",top:16,right:16,background:"rgba(120,60,0,0.08)",border:"1px solid rgba(120,60,0,0.2)",borderRadius:99,width:32,height:32,cursor:"pointer",fontSize:16,color:"#7a3a00",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          {/* Header */}
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
            <span style={{fontSize:48}}>{data.icon}</span>
            <div>
              <div style={{fontWeight:900,fontSize:24,color:"#3a1f00"}}>{name}</div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6,flexWrap:"wrap"}}>
                <span style={{fontSize:20,fontWeight:900,color:live?"#2a7a00":"#b85c00"}}>₹{price.toLocaleString()}/q</span>
                <LiveTag live={!!live}/>
                <span style={bdg(data.profit)}>{data.profit} Profit</span>
              </div>
            </div>
          </div>
          {/* Stats row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:8}}>
            {[
              {l:"Yield/Acre",v:`${data.yieldPerAcre} q`,icon:"🌾"},
              {l:"Income/Acre",v:`₹${(price*data.yieldPerAcre).toLocaleString()}`,icon:"💰"},
              {l:"Supply Risk",v:`${data.risk}%`,icon:data.risk<30?"🟢":data.risk<50?"🟡":"🔴"},
              {l:"5yr Growth",v:`${totalGrowth>=0?"+":""}${totalGrowth}%`,icon:totalGrowth>=0?"📈":"📉"},
            ].map(m=>(
              <div key={m.l} style={{background:"rgba(120,60,0,0.06)",borderRadius:12,padding:"12px 14px",textAlign:"center",border:"1px solid rgba(180,120,40,0.15)"}}>
                <div style={{fontSize:18,marginBottom:4}}>{m.icon}</div>
                <div style={{fontSize:13,fontWeight:800,color:"#3a1f00"}}>{m.v}</div>
                <div style={{fontSize:10,color:"#9a6030",marginTop:2,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em"}}>{m.l}</div>
              </div>
            ))}
          </div>
          {/* Chart */}
          <PriceTrendChart crop={name} currentPrice={price} isLive={!!live}/>
          {/* Risk meter */}
          <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid rgba(180,120,40,0.15)"}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"#b85c00",marginBottom:8}}>Supply Risk Analysis</div>
            <RiskMeter value={data.risk} lang={p.lang} showWarning={true}/>
          </div>
          {/* Simulate profit CTA */}
          <button className="bb" style={{marginTop:20,width:"100%",padding:"14px",background:"linear-gradient(135deg,#7a3a00,#b85c00,#d47020)",border:"none",borderRadius:14,fontSize:14,fontWeight:700,color:"#fff8e8",cursor:"pointer",letterSpacing:"1px"}} onClick={()=>{p.setProfitCrop(name);p.go("profit");}}>
            💰 Simulate Profit for {name}
          </button>
        </div>
      );
    })()}

    {/* Crop grid */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
      {Object.entries(CROP_META).map(([name,data])=>{
        const live=p.mandiPrices[name]; const price=live||data.fallbackPrice;
        const isExp=p.expanded===name;
        const trend=PRICE_HISTORY[name]||[];
        const growth=trend.length>=2?Math.round((price-trend[0])/trend[0]*100):null;
        return(
          <div key={name} onClick={()=>p.setExpanded(isExp?null:name)}
            style={{background:isExp?"rgba(255,248,230,0.98)":"rgba(255,252,242,0.88)",
              border:`1.5px solid ${isExp?"rgba(180,80,0,0.4)":"rgba(180,120,40,0.2)"}`,
              borderRadius:18,padding:"20px",cursor:"pointer",transition:"all .2s",
              boxShadow:isExp?"0 4px 20px rgba(120,60,0,0.15)":"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:26}}>{data.icon}</span>
                <div>
                  <div style={{fontWeight:700,fontSize:15}}>{name}</div>
                  <div style={{fontSize:12,display:"flex",alignItems:"center",gap:4}}>
                    <span style={{color:live?"#2a7a00":"#b85c00",fontWeight:700}}>₹{price.toLocaleString()}/q</span>
                    <LiveTag live={!!live}/>
                  </div>
                </div>
              </div>
              {growth!=null&&(
                <span style={{fontSize:11,fontWeight:700,color:growth>=0?"#22c55e":"#ef4444",background:growth>=0?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)",borderRadius:6,padding:"2px 7px"}}>
                  {growth>=0?"+":""}{growth}% 5yr
                </span>
              )}
            </div>
            <RiskMeter value={data.risk} lang={p.lang}/>
            <div style={{marginTop:8,fontSize:11,color:"#9a6030",textAlign:"center",fontWeight:600}}>
              {isExp?"▲ Click to collapse":"▼ Click for 5-year trend"}
            </div>
          </div>
        );
      })}
    </div>
  </>);

  if (p.screen==="profit") return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:28}}>
      <div>
        <div style={card}>
          <div style={lbl}>💰 {p.t.profitSimTitle}</div>
          <div style={{marginBottom:16}}><div style={{fontSize:12,color:"#7a5030",marginBottom:6}}>{p.t.selectCrop} (🟢 = live price)</div><select style={sel} value={p.profitCrop} onChange={e=>p.setProfitCrop(e.target.value)}>{Object.keys(CROP_META).map(c=><option key={c} value={c}>{CROP_META[c].icon} {c}{p.isLive(c)?" 🟢":""}</option>)}</select></div>
          <div style={{marginBottom:16}}><div style={{fontSize:12,color:"#7a5030",marginBottom:6}}>{p.t.landArea}: <strong style={{color:"#3a1f00"}}>{p.area} {p.t.acres}</strong></div><input type="range" min="0.5" max="20" step="0.5" value={p.area} onChange={e=>p.setArea(Number(e.target.value))} style={{width:"100%",accentColor:"#7a3a00",cursor:"pointer"}}/><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#b87040",marginTop:4}}><span>0.5</span><span>20 {p.t.acres}</span></div></div>
          <div><div style={{fontSize:12,color:"#7a5030",marginBottom:6}}>{p.t.costPerAcre}</div><input type="number" min="0" step="500" value={p.costPerAcre} onChange={e=>p.setCostPerAcre(Number(e.target.value))} placeholder={p.t.costPlaceholder} style={{...inp,width:"100%"}}/><div style={{fontSize:11,color:"#b87040",marginTop:4}}>{p.t.costNote}</div></div>
        </div>
        <div style={card}>
          <div style={lbl}>⚡ {p.t.quickCompare} ({p.area} ac)</div>
          {["Groundnut","Sesame","Chickpea","Moong"].map(c=>(
            <div key={c} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid rgba(180,120,40,0.12)"}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}><span>{CROP_META[c].icon}</span><span style={{fontWeight:600,fontSize:13}}>{c}</span><LiveTag live={p.isLive(c)}/></div>
              <div style={{fontWeight:700,fontSize:14,color:"#2a7a00"}}>₹{(p.area*CROP_META[c].yieldPerAcre*p.getPrice(c)).toLocaleString("en-IN")}</div>
            </div>
          ))}
        </div>
      </div>
      {p.profitMeta&&(
        <div style={{background:"rgba(255,252,242,0.95)",border:"1.5px solid rgba(40,120,0,0.2)",borderRadius:20,padding:"28px"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}><span style={{fontSize:44}}>{p.profitMeta.icon}</span><div><div style={{fontWeight:800,fontSize:22}}>{p.profitCrop}</div><div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}><span style={p.bdg(p.profitMeta.profit)}>{p.profitMeta.profit==="High"?p.t.profitHigh:p.profitMeta.profit==="Medium"?p.t.profitMed:p.t.profitLow}</span><LiveTag live={p.isLive(p.profitCrop)}/></div></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
            {[{l:p.t.mandiPrice,v:`₹${p.getPrice(p.profitCrop).toLocaleString()}/q`,live:p.isLive(p.profitCrop)},{l:p.t.yieldAcre,v:`${p.profitMeta.yieldPerAcre} q`},{l:"Total Yield",v:`${(p.area*p.profitMeta.yieldPerAcre).toFixed(1)} q`},{l:p.t.risk,v:`${p.profitMeta.risk}%`}].map(m=>(<div key={m.l} style={{background:"rgba(40,120,0,0.06)",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:11,color:"rgba(40,120,0,0.7)",marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>{m.l}{m.live&&<span style={{marginLeft:4,fontSize:9,color:"#2a7a00"}}>● LIVE</span>}</div><div style={{fontWeight:800,fontSize:16}}>{m.v}</div></div>))}
          </div>
          <div style={{background:"rgba(40,120,0,0.08)",border:"1px solid rgba(40,120,0,0.25)",borderRadius:14,padding:"20px",textAlign:"center",marginBottom:12}}><div style={{fontSize:11,color:"rgba(40,120,0,0.7)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>{p.t.grossIncome} {p.isLive(p.profitCrop)&&<span style={{fontSize:9,background:"rgba(40,120,0,0.15)",padding:"2px 6px",borderRadius:4,marginLeft:6}}>🟢 {p.t.livePrice}</span>}</div><div style={{fontSize:32,fontWeight:900,color:"#2a7a00",letterSpacing:"-1px"}}>₹{p.profitEstimate}</div><div style={{fontSize:12,color:"#2a7a00",marginTop:4}}>{p.area} {p.t.acres} · {p.profitCrop}</div></div>
          <div style={{background:"rgba(180,0,0,0.07)",border:"1px solid rgba(180,0,0,0.2)",borderRadius:14,padding:"16px 20px",textAlign:"center",marginBottom:12}}><div style={{fontSize:11,color:"rgba(180,0,0,0.6)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{p.t.totalCost}</div><div style={{fontSize:24,fontWeight:800,color:"#cc2200"}}>− ₹{p.totalCost.toLocaleString("en-IN")}</div><div style={{fontSize:11,color:"#cc2200",marginTop:4}}>₹{p.costPerAcre.toLocaleString()} × {p.area} {p.t.acres}</div></div>
          <div style={{background:p.netProfitAmt>=0?"rgba(40,120,0,0.08)":"rgba(180,0,0,0.07)",border:`1.5px solid ${p.netProfitAmt>=0?"rgba(40,120,0,0.25)":"rgba(180,0,0,0.2)"}`,borderRadius:14,padding:"20px",textAlign:"center"}}><div style={{fontSize:11,color:p.netProfitAmt>=0?"rgba(40,120,0,0.7)":"rgba(180,0,0,0.6)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>{p.t.netProfit}</div><div style={{fontSize:38,fontWeight:900,color:p.netProfitAmt>=0?"#2a7a00":"#cc2200",letterSpacing:"-1px"}}>{p.netProfitAmt>=0?"":"−"}₹{Math.abs(p.netProfitAmt).toLocaleString("en-IN")}</div><div style={{fontSize:12,color:p.netProfitAmt>=0?"#2a7a00":"#cc2200",marginTop:6}}>{p.t.netProfitTitle}</div></div>
          <div style={{marginTop:16}}><RiskMeter value={p.profitMeta.risk} lang={p.lang}/></div>
        </div>
      )}
    </div>
  );

  if (p.screen==="alerts") return(<>
    <div style={{marginBottom:20}}><div style={lbl}>{p.t.alertsTitle}</div><div style={{fontSize:13,color:"#9a6030"}}>{p.t.alertsDesc}</div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,marginBottom:24}}>
      {[{crop:"Tomato",risk:72,reason:{en:"Many farmers in Karnataka & Maharashtra are growing this — prices may fall at harvest time.",hi:"कर्नाटक और महाराष्ट्र में बहुत किसान उगा रहे हैं — कटाई पर भाव गिर सकता है।",kn:"ಕರ್ನಾಟಕ ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ಅನೇಕ ರೈತರು ಬೆಳೆಯುತ್ತಿದ್ದಾರೆ — ಬೆಲೆ ಕಡಿಮೆಯಾಗಬಹುದು."},alt:"Capsicum",altRisk:31},{crop:"Onion",risk:68,reason:{en:"A big harvest is expected across South India this season — market may be flooded.",hi:"इस मौसम दक्षिण भारत में भारी फसल आने की उम्मीद — बाज़ार में ज़्यादा माल आ सकता है।",kn:"ಈ ಸಾಲಿನಲ್ಲಿ ದಕ್ಷಿಣ ಭಾರತದಲ್ಲಿ ದೊಡ್ಡ ಫಸಲು ನಿರೀಕ್ಷಿತ — ಮಾರುಕಟ್ಟೆ ತುಂಬಿ ಹೋಗಬಹುದು."},alt:"Garlic",altRisk:38},{crop:"Potato",risk:48,reason:{en:"Cold storage in UP & MP is full — extra supply is pushing prices down.",hi:"UP और MP में कोल्ड स्टोरेज भरा है — अतिरिक्त माल से भाव दब रहे हैं।",kn:"UP ಮತ್ತು MP ನಲ್ಲಿ ಶೀತಲ ಸಂಗ್ರಹ ತುಂಬಿದೆ — ಬೆಲೆ ಕಡಿಮೆಯಾಗುತ್ತಿದೆ."},alt:"Chickpea",altRisk:19}].map((a,i)=>(
        <div key={i} style={{background:"rgba(255,240,210,0.9)",border:"1.5px solid rgba(180,80,0,0.25)",borderRadius:18,padding:"22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontWeight:800,fontSize:16}}>{CROP_META[a.crop]?.icon} {a.crop}</span><span style={{fontSize:10,background:"rgba(180,80,0,0.15)",color:"#b85c00",borderRadius:6,padding:"3px 8px",fontWeight:700}}>{p.t.riskBadge}</span></div>
          <RiskMeter value={a.risk} lang={p.lang}/>
          <div style={{marginTop:12,padding:"10px 12px",background:"rgba(255,248,230,0.7)",borderRadius:10}}><div style={{fontSize:11,color:"#9a6030",marginBottom:4}}>{p.t.alertReason}</div><div style={{fontSize:13,color:"#3a1f00",lineHeight:1.6}}>{a.reason[p.lang]||a.reason.en}</div></div>
          <div style={{marginTop:12,padding:"10px 12px",background:"rgba(255,248,230,0.88)",borderRadius:10,border:"1.5px solid rgba(180,120,40,0.2)"}}><div style={{fontSize:11,color:"#2a7a00",marginBottom:4}}>{p.t.alertSwitch}</div><div style={{fontWeight:700,fontSize:14}}>{CROP_META[a.alt]?.icon} {a.alt}{p.isLive(a.alt)&&" 🟢"}</div></div>
        </div>
      ))}
    </div>
    <div style={card}><div style={lbl}>{p.t.roadmap}</div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>{["🗣️ Kannada & Hindi voice","🛰️ Satellite monitoring","🏛️ Govt scheme integration","📦 Farmer marketplace","🤖 AI yield prediction","📡 Real-time weather alerts"].map((f,i)=>(<div key={i} style={{background:"rgba(255,248,230,0.7)",borderRadius:12,padding:"14px",fontSize:13,color:"#9a6030"}}>{f}</div>))}</div></div>
  </>);
  return null;
}

// MOBILE SCREENS (unchanged from your app.jsx)

function MobileScreens(p) {
  const card={background:"rgba(255,252,242,0.88)",border:"1.5px solid rgba(180,120,40,0.2)",borderRadius:20,padding:"18px 20px",margin:"0 14px 12px",boxShadow:"0 4px 16px rgba(120,60,0,0.08)",backdropFilter:"blur(8px)"};
  const lbl={fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#b85c00",marginBottom:10};
  const sel={width:"100%",padding:"11px 14px",background:"rgba(255,248,230,0.92)",border:"1.5px solid rgba(120,80,20,0.25)",borderRadius:12,color:"#3a1f00",fontSize:14,outline:"none",appearance:"none",cursor:"pointer",marginTop:4};
  const inp={width:"100%",padding:"11px 14px",background:"rgba(255,248,230,0.92)",border:"1.5px solid rgba(120,80,20,0.25)",borderRadius:12,color:"#3a1f00",fontSize:14,outline:"none"};
  const btn={width:"100%",padding:"14px",background:"linear-gradient(135deg,#7a3a00,#b85c00,#d47020)",border:"none",borderRadius:16,fontSize:14,fontWeight:800,color:"#fff8e8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 16px rgba(140,60,0,0.3)"};
  const spin={animation:"spin 1s linear infinite",display:"inline-block"};

  if (p.screen==="home") return(<>
    <div style={{background:"linear-gradient(135deg,rgba(120,60,0,0.08),rgba(255,248,230,0.6))",border:"1px solid rgba(40,100,0,0.2)",borderRadius:24,padding:"26px 20px",margin:"0 14px 14px"}}>
      <div style={{fontSize:11,color:"#2a7a00",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>🌾 {getSeasonLabel()}</div>
      <div style={{fontSize:30,fontWeight:900,letterSpacing:"-1px",lineHeight:1.1}}>{p.t.growSmarter}<br/><span style={{color:"#2a7a00"}}>{p.t.earnBetter}</span></div>
      <div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div onClick={()=>p.go("plan")} style={{background:"rgba(255,252,242,0.92)",borderRadius:12,padding:"10px 12px",border:"1.5px solid rgba(180,120,40,0.2)",cursor:"pointer"}}>
          <div style={{fontSize:9,color:"#b85c00",fontWeight:700,textTransform:"uppercase",marginBottom:3}}>🌧 Rainfall · 30d</div>
          {p.weatherLoading?<div style={{fontSize:13,color:"#9a6030"}}>Detecting…</div>:p.weather?<><div style={{fontSize:20,fontWeight:900,color:"#2a7a00"}}>{p.weather.rainfallMm}<span style={{fontSize:10,fontWeight:400}}>mm</span></div><div style={{fontSize:9,color:"#7a5030",marginTop:2}}>{p.weather.rainfallLevel} conditions</div><div style={{height:3,background:"rgba(180,120,40,0.15)",borderRadius:99,marginTop:5,overflow:"hidden"}}><div style={{width:`${Math.min(100,Math.round(p.weather.rainfallMm/5))}%`,height:"100%",background:"#2a7a00",borderRadius:99}}/></div></>:<div style={{fontSize:10,color:"#b85c00",marginTop:4}}>Tap to detect</div>}
        </div>
        {(()=>{
          const t2=p.weather?.avgTempC;
          const feel=!t2?null:t2<15?{c:"#1d4ed8",e:"🥶"}:t2<25?{c:"#2a7a00",e:"😊"}:t2<32?{c:"#b85c00",e:"☀️"}:{c:"#cc2200",e:"🌡"};
          return(<div onClick={()=>p.go("plan")} style={{background:"rgba(255,252,242,0.92)",borderRadius:12,padding:"10px 12px",border:"1.5px solid rgba(180,120,40,0.2)",cursor:"pointer"}}>
            <div style={{fontSize:9,color:"#b85c00",fontWeight:700,textTransform:"uppercase",marginBottom:3}}>{feel?.e||"🌡"} Temperature</div>
            {p.weatherLoading?<div style={{fontSize:13,color:"#9a6030"}}>Detecting…</div>:p.weather?<><div style={{fontSize:20,fontWeight:900,color:feel?.c||"#3a1f00"}}>{t2}<span style={{fontSize:10,fontWeight:400}}>°C</span></div><div style={{fontSize:9,color:"#7a5030",marginTop:2}}>{p.location||"Your location"}</div></>:<div style={{fontSize:10,color:"#b85c00",marginTop:4}}>Tap to detect</div>}
          </div>);
        })()}
      </div>
      {(()=>{
        const season=getCurrentSeason();
        const allCrops=[...new Set(Object.values(CROPS_DB).flatMap(s=>Object.values(s).flatMap(l=>l[season]||[])))];
        const scored=allCrops.map(c=>({name:c,price:p.mandiPrices[c]||CROP_META[c]?.fallbackPrice||0,icon:CROP_META[c]?.icon||"🌿",live:!!p.mandiPrices[c]})).sort((a,b)=>b.price-a.price).slice(0,4);
        return(<div style={{marginTop:12,background:"rgba(255,252,242,0.9)",borderRadius:12,padding:"10px 12px",border:"1.5px solid rgba(180,120,40,0.2)"}}>
          <div style={{fontSize:9,color:"#b85c00",fontWeight:700,textTransform:"uppercase",marginBottom:8}}>🔥 Trending This {season.charAt(0).toUpperCase()+season.slice(1)}</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {scored.map((c,i)=>(<div key={c.name} style={{display:"flex",alignItems:"center",gap:4,background:i===0?"rgba(40,120,0,0.1)":"rgba(120,60,0,0.06)",border:`1px solid ${i===0?"rgba(40,120,0,0.25)":"rgba(180,120,40,0.15)"}`,borderRadius:8,padding:"4px 8px"}}><span style={{fontSize:14}}>{c.icon}</span><div><div style={{fontSize:10,fontWeight:700,color:"#3a1f00"}}>{c.name}</div><div style={{fontSize:9,color:c.live?"#2a7a00":"#9a6030"}}>₹{c.price.toLocaleString("en-IN")}</div></div>{i===0&&<span style={{fontSize:8,background:"rgba(40,120,0,0.15)",color:"#2a7a00",borderRadius:3,padding:"1px 4px",fontWeight:800}}>TOP</span>}</div>))}
          </div>
        </div>);
      })()}
      <button className="bb" style={{...btn,marginTop:14}} onClick={()=>p.go("plan")}>{p.t.startPlanning}</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0 14px 12px"}}>
      {[{icon:"📊",l:p.t.marketPrices,s:p.liveCount>0?p.t.liveCount(p.liveCount):p.hasMandiKey?"Loading":p.t.estimated,t:"market"},{icon:"💰",l:p.t.profitSim,s:p.t.realPrices,t:"profit"},{icon:"⚠️",l:p.t.riskAlerts,s:p.t.warnings,t:"alerts"},{icon:"🎙️",l:p.t.voiceInput,s:p.t.krishiAI,t:"plan"}].map((item,i)=>(
        <div key={i} onClick={()=>p.go(item.t)} style={{...card,margin:0,cursor:"pointer"}}><div style={{fontSize:22}}>{item.icon}</div><div style={{fontWeight:700,fontSize:13,marginTop:8}}>{item.l}</div><div style={{color:"#9a6030",fontSize:11,marginTop:3}}>{item.s}</div></div>
      ))}
    </div>
  </>);

  if (p.screen==="plan"||p.screen==="results") return(<>
    <div style={card}>
      <div style={lbl}>📍 {p.t.locationLabel}</div>
      <div style={{display:"flex",gap:8}}><input style={{...inp,flex:1}} placeholder={p.t.locationPlaceholder} value={p.location} onChange={e=>p.setLocation(e.target.value)}/><button style={{padding:"11px 13px",background:"rgba(255,248,230,0.85)",border:"1px solid rgba(40,120,0,0.25)",borderRadius:12,fontSize:12,fontWeight:600,color:"#2a7a00",cursor:"pointer",whiteSpace:"nowrap"}} onClick={p.detectLocation}>{p.locating?<span style={spin}>⟳</span>:"📍"}</button></div>
      {p.locErr&&<div style={{marginTop:6,fontSize:11,color:"#cc2200"}}>⚠️ {p.locErr}</div>}
      {p.weatherLoading&&<div style={{marginTop:8,fontSize:12,color:"#9a6030"}}>{p.t.fetchingWeather}</div>}
      {p.weather&&<div style={{marginTop:10,padding:"10px",background:"rgba(255,248,230,0.88)",borderRadius:10,border:"1.5px solid rgba(180,120,40,0.2)",fontSize:12,color:"#2a7a00"}}>{`🌦 ${p.weather.rainfallMm}mm · ${p.weather.avgTempC}°C · ${p.weather.rainfallLevel}`}</div>}
    </div>
    <div style={card}>
      <div style={lbl}>🌱 {p.t.farmDetails}</div>
      <div style={{marginBottom:16}}><div style={{fontSize:12,color:"#7a5030",marginBottom:8,fontWeight:600}}>{p.t.soilType}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[{val:"red",img:"🌄",desc:p.t.soilOptions.red},{val:"black",img:"🏔️",desc:p.t.soilOptions.black},{val:"sandy",img:"🏜️",desc:p.t.soilOptions.sandy},{val:"loamy",img:"🌿",desc:p.t.soilOptions.loamy}].map(s=>(<div key={s.val} onClick={()=>p.setSoil(s.val)} style={{padding:"12px 8px",borderRadius:12,border:`2px solid ${p.soil===s.val?"#7a3a00":"rgba(180,120,40,0.2)"}`,background:p.soil===s.val?"rgba(120,60,0,0.1)":"rgba(255,248,230,0.7)",cursor:"pointer",textAlign:"center",transition:"all .15s"}}><div style={{fontSize:22}}>{s.img}</div><div style={{fontSize:11,fontWeight:700,marginTop:5,color:p.soil===s.val?"#7a3a00":"#9a6030",lineHeight:1.3}}>{s.desc}</div></div>))}</div></div>
      <div style={{marginBottom:16}}><div style={{fontSize:12,color:"#7a5030",marginBottom:8,fontWeight:600}}>{p.t.rainfallLevel} {p.weather&&<span style={{fontSize:9,background:"rgba(40,120,0,0.1)",color:"#2a7a00",borderRadius:4,padding:"1px 5px",fontWeight:700}}>🟢 AUTO</span>}</div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>{[{val:"low",emoji:"☀️",desc:p.t.rainfallOptions.low},{val:"medium",emoji:"🌦️",desc:p.t.rainfallOptions.medium},{val:"high",emoji:"🌧️",desc:p.t.rainfallOptions.high}].map(r=>(<div key={r.val} onClick={()=>p.setRainfall(r.val)} style={{padding:"12px 6px",borderRadius:12,border:`2px solid ${p.rainfall===r.val?"#7a3a00":"rgba(180,120,40,0.2)"}`,background:p.rainfall===r.val?"rgba(120,60,0,0.1)":"rgba(255,248,230,0.7)",cursor:"pointer",textAlign:"center",transition:"all .15s"}}><div style={{fontSize:26}}>{r.emoji}</div><div style={{fontSize:10,fontWeight:700,marginTop:5,color:p.rainfall===r.val?"#7a3a00":"#9a6030",lineHeight:1.3}}>{r.desc}</div></div>))}</div></div>
      <div><div style={{fontSize:12,color:"#7a5030",marginBottom:8,fontWeight:600}}>{p.t.seasonLabel} <span style={{fontSize:9,background:"rgba(40,120,0,0.1)",color:"#2a7a00",borderRadius:4,padding:"1px 5px",fontWeight:700}}>🟢 AUTO</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[{val:"kharif",emoji:"🌱",desc:p.t.seasonOptions.kharif},{val:"rabi",emoji:"❄️",desc:p.t.seasonOptions.rabi}].map(s=>(<div key={s.val} onClick={()=>p.setSeason(s.val)} style={{padding:"12px 8px",borderRadius:12,border:`2px solid ${p.season===s.val?"#7a3a00":"rgba(180,120,40,0.2)"}`,background:p.season===s.val?"rgba(120,60,0,0.1)":"rgba(255,248,230,0.7)",cursor:"pointer",textAlign:"center",transition:"all .15s"}}><div style={{fontSize:26}}>{s.emoji}</div><div style={{fontSize:11,fontWeight:700,marginTop:5,color:p.season===s.val?"#7a3a00":"#9a6030"}}>{s.desc}</div></div>))}</div></div>
    </div>
    <div style={card}><div style={lbl}>{p.t.voiceTitle}</div><button style={{...btn,background:p.listening?"linear-gradient(135deg,#cc2200,#991100)":"linear-gradient(135deg,#4a2200,#7a4010)",color:"#fff8ee"}} onClick={p.startVoice}>{p.listening?p.t.voiceListening:p.t.voiceBtn}</button>{p.voiceText&&<div style={{marginTop:8,fontSize:12,color:"#9a6030",fontStyle:"italic"}}>"{p.voiceText}"</div>}</div>
    <div style={{margin:"0 14px 12px"}}><button className="bb" style={{...btn,opacity:(!p.soil||!p.rainfall||!p.season)?0.5:1}} onClick={p.getRecommendations} disabled={p.loading||!p.soil||!p.rainfall||!p.season}>{p.loading?<><span style={spin}>⟳</span> {p.t.analysing}</>:p.t.getRecommendations}</button></div>
    {p.screen==="results"&&p.results.map((crop,i)=>(
      <div key={crop.name} onClick={()=>p.setExpanded(p.expanded===crop.name?null:crop.name)} style={{...card,border:`1.5px solid ${i===0?"rgba(40,120,0,0.3)":"rgba(180,120,40,0.2)"}`}}>
        {i===0&&<div style={{fontSize:9,background:"rgba(180,80,0,0.12)",color:"#b85c00",borderRadius:5,padding:"2px 7px",fontWeight:700,marginBottom:6,display:"inline-block"}}>{p.t.topPick}</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:28}}>{crop.icon}</span><div><div style={{fontWeight:800,fontSize:15}}>{crop.name}</div><div style={{fontSize:12,color:"#2a7a00",fontWeight:700}}>₹{crop.price.toLocaleString()}/q<LiveTag live={crop.isLive}/></div></div></div></div>
        <RiskMeter value={crop.risk} lang={p.lang} showWarning={true}/>
      </div>
    ))}
  </>);

  if (p.screen==="market") return(<>
    <div style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={lbl}>{p.t.mandiIntelligence}</div><div style={{fontSize:11,color:"#9a6030"}}>{p.liveCount>0?p.t.liveCount(p.liveCount):p.t.estimated}</div></div><button style={{padding:"8px 14px",background:"transparent",border:"1.5px solid rgba(180,120,40,0.2)",borderRadius:8,color:"#7a5030",cursor:"pointer",fontSize:12}} onClick={()=>p.refreshMandiPrices()}>{p.mandiLoading?<span style={spin}>⟳</span>:p.t.refreshBtn}</button></div>
    {p.mandiErr==="no_key"&&<div style={{...card,color:"#b85c00",fontSize:12}}>{p.t.noKeyMsg}</div>}
    {Object.entries(CROP_META).map(([name,data])=>{const live=p.mandiPrices[name];const price=live||data.fallbackPrice;return(<div key={name} style={card}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>{data.icon}</span><div style={{fontWeight:700,fontSize:14}}>{name}</div></div><div style={{textAlign:"right"}}><div style={{fontWeight:700,color:live?"#2a7a00":"#b85c00"}}>₹{price.toLocaleString()}/q</div><LiveTag live={!!live}/></div></div><RiskMeter value={data.risk} lang={p.lang}/></div>);})}
  </>);

  if (p.screen==="profit") return(<>
    <div style={card}>
      <div style={lbl}>💰 {p.t.profitSimTitle}</div>
      <div style={{marginBottom:14}}><div style={{fontSize:12,color:"#7a5030",marginBottom:4}}>{p.t.selectCrop} (🟢 live)</div><select style={sel} value={p.profitCrop} onChange={e=>p.setProfitCrop(e.target.value)}>{Object.keys(CROP_META).map(c=><option key={c} value={c}>{CROP_META[c].icon} {c}{p.isLive(c)?" 🟢":""}</option>)}</select></div>
      <div style={{marginBottom:14}}><div style={{fontSize:12,color:"#7a5030",marginBottom:4}}>{p.t.landArea}: <strong style={{color:"#3a1f00"}}>{p.area} {p.t.acres}</strong></div><input type="range" min="0.5" max="20" step="0.5" value={p.area} onChange={e=>p.setArea(Number(e.target.value))} style={{width:"100%",accentColor:"#7a3a00",cursor:"pointer"}}/></div>
      <div><div style={{fontSize:12,color:"#7a5030",marginBottom:4}}>{p.t.costPerAcre}</div><input type="number" min="0" step="500" value={p.costPerAcre} onChange={e=>p.setCostPerAcre(Number(e.target.value))} placeholder={p.t.costPlaceholder} style={{...inp,width:"100%"}}/></div>
    </div>
    {p.profitMeta&&(
      <div style={{...card,background:"rgba(255,252,242,0.95)",border:"1.5px solid rgba(180,120,40,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}><span style={{fontSize:34}}>{p.profitMeta.icon}</span><div><div style={{fontWeight:800,fontSize:18}}>{p.profitCrop}</div><div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}><span style={p.bdg(p.profitMeta.profit)}>{p.profitMeta.profit==="High"?p.t.profitHigh:p.profitMeta.profit==="Medium"?p.t.profitMed:p.t.profitLow}</span><LiveTag live={p.isLive(p.profitCrop)}/></div></div></div>
        <div style={{background:"rgba(40,120,0,0.08)",border:"1px solid rgba(40,120,0,0.25)",borderRadius:12,padding:"16px",textAlign:"center",marginBottom:10}}><div style={{fontSize:10,color:"rgba(40,120,0,0.7)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{p.t.grossIncome}</div><div style={{fontSize:28,fontWeight:900,color:"#2a7a00",letterSpacing:"-1px"}}>₹{p.profitEstimate}</div></div>
        <div style={{background:"rgba(180,0,0,0.07)",border:"1px solid rgba(180,0,0,0.2)",borderRadius:12,padding:"14px",textAlign:"center",marginBottom:10}}><div style={{fontSize:10,color:"rgba(180,0,0,0.6)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{p.t.totalCost}</div><div style={{fontSize:22,fontWeight:800,color:"#cc2200"}}>− ₹{p.totalCost.toLocaleString("en-IN")}</div></div>
        <div style={{background:p.netProfitAmt>=0?"rgba(40,120,0,0.08)":"rgba(180,0,0,0.07)",border:`1.5px solid ${p.netProfitAmt>=0?"rgba(40,120,0,0.25)":"rgba(180,0,0,0.2)"}`,borderRadius:12,padding:"18px",textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6,color:p.netProfitAmt>=0?"#2a7a00":"#cc2200"}}>{p.t.netProfit}</div><div style={{fontSize:32,fontWeight:900,letterSpacing:"-1px",color:p.netProfitAmt>=0?"#2a7a00":"#cc2200"}}>{p.netProfitAmt>=0?"":"−"}₹{Math.abs(p.netProfitAmt).toLocaleString("en-IN")}</div><div style={{fontSize:11,marginTop:6,color:p.netProfitAmt>=0?"#2a7a00":"#cc2200"}}>{p.t.netProfitTitle}</div></div>
        <div style={{marginTop:12}}><RiskMeter value={p.profitMeta.risk} lang={p.lang}/></div>
      </div>
    )}
  </>);

  if (p.screen==="alerts") return(<>
    <div style={{...card}}><div style={lbl}>{p.t.alertsTitle}</div><div style={{fontSize:12,color:"#7a5030"}}>{p.t.alertsDesc}</div></div>
    {[{crop:"Tomato",risk:72,reason:{en:"Many farmers in Karnataka & Maharashtra are growing this — prices may fall at harvest time.",hi:"बहुत किसान उगा रहे हैं — कटाई पर भाव गिर सकता है।",kn:"ಅನೇಕ ರೈತರು ಬೆಳೆಯುತ್ತಿದ್ದಾರೆ — ಬೆಲೆ ಕಡಿಮೆಯಾಗಬಹುದು."},alt:"Capsicum",altRisk:31},{crop:"Onion",risk:68,reason:{en:"Big harvest expected across South India — market may be flooded.",hi:"दक्षिण भारत में भारी फसल — बाज़ार में ज़्यादा माल आ सकता है।",kn:"ದಕ್ಷಿಣ ಭಾರತದಲ್ಲಿ ಹೆಚ್ಚು ಫಸಲು — ಬೆಲೆ ಕಡಿಮೆಯಾಗಬಹುದು."},alt:"Garlic",altRisk:38},{crop:"Potato",risk:48,reason:{en:"Cold storage in UP & MP is full — extra supply pushing prices down.",hi:"UP/MP में कोल्ड स्टोरेज भरा है — भाव दब रहे हैं।",kn:"ಶೀತಲ ಸಂಗ್ರಹ ತುಂಬಿದೆ — ಬೆಲೆ ಕಡಿಮೆಯಾಗುತ್ತಿದೆ."},alt:"Chickpea",altRisk:19}].map((a,i)=>(
      <div key={i} style={{...card,background:"rgba(255,240,210,0.9)",border:"1.5px solid rgba(180,80,0,0.25)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontWeight:800}}>{CROP_META[a.crop]?.icon} {a.crop}</span><span style={{fontSize:10,background:"rgba(180,80,0,0.15)",color:"#b85c00",borderRadius:6,padding:"2px 8px",fontWeight:700}}>{p.t.riskBadge}</span></div>
        <RiskMeter value={a.risk} lang={p.lang}/>
        <div style={{marginTop:10,fontSize:12,color:"#9a6030",lineHeight:1.6}}>{a.reason[p.lang]||a.reason.en}</div>
        <div style={{marginTop:8,padding:"8px 10px",background:"rgba(120,60,0,0.08)",borderRadius:8,border:"1px solid rgba(40,120,0,0.25)"}}><div style={{fontSize:11,color:"#2a7a00",marginBottom:2}}>{p.t.alertSwitch}</div><div style={{fontSize:13,fontWeight:700}}>{CROP_META[a.alt]?.icon} {a.alt}</div></div>
      </div>
    ))}
  </>);
  return null;
}

//  APP ROOT 
export default function App() {
  const [history, setHistory]       = useState(["splash"]);
  const [registered, setRegistered] = useState(null);   // { name, phone }
  const [loginPhone, setLoginPhone] = useState("");
  const [userName, setUserName]     = useState("");

  const screen = history[history.length - 1];
  const goTo   = (s) => setHistory(prev => [...prev, s]);
  const goBack = () => setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);

  if (screen === "splash")
    return <SplashScreen onFinish={() => goTo("register")} />;

  // Welcome 
  if (screen === "register")
    return <RegisterScreen
      onSignUp={d => { setRegistered(d); goTo("welcome"); }}
      onNavigate={goTo}
      onBack={goBack} />;

  // Welcome (first-time only) 
  if (screen === "welcome")
    return (
      <div style={{position:"fixed",inset:0,width:"100%",height:"100%",overflow:"hidden",
        fontFamily:"'Cinzel',serif"}}>
        <style>{AUTH_CSS}</style>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(170deg,#fff8ee 0%,#fdf0d8 40%,#f5e4b8 75%,#e8d090 100%)",zIndex:0}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:220,background:"radial-gradient(ellipse at 50% 0%,rgba(255,180,60,0.18) 0%,transparent 70%)",zIndex:1}}/>
        <TopCropDeco/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:5}}>
          <svg viewBox="0 0 390 90" style={{width:"100%",display:"block"}} preserveAspectRatio="none">
            <rect x="0" y="55" width="390" height="40" fill="#2a5000"/>
            <path d="M0,60 Q100,56 200,60 Q300,64 390,60" stroke="#1e3a00" strokeWidth="2" fill="none" opacity="0.5"/>
            {[...Array(30)].map((_,i)=>{const x=i/29*390,h=18+Math.sin(i*1.9)*8,lean=Math.sin(i*2.5)*7;return<line key={i} x1={x} y1="56" x2={x+lean} y2={56-h} stroke={i%3===0?"#5aaa00":"#3d8000"} strokeWidth="2" strokeLinecap="round" opacity={0.6+Math.sin(i)*0.35}/>;})  }
          </svg>
        </div>
        <div style={{position:"absolute",inset:0,zIndex:10,display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",gap:20,padding:"0 32px",boxSizing:"border-box",
          paddingBottom:"15vh"}}>
          <div style={{fontSize:64,lineHeight:1}}>🌾</div>
          <div style={{fontSize:36,fontWeight:900,color:"#4a2200",textAlign:"center",
            letterSpacing:"1px",lineHeight:1.15,fontFamily:"'Cinzel',serif"}}>
            Welcome,<br/>{registered?.name}!
          </div>
          <div style={{fontSize:16,color:"#9a6030",fontFamily:"'Cormorant Garamond',serif",
            fontStyle:"italic",fontWeight:900,textAlign:"center",lineHeight:1.7,maxWidth:420}}>
            Your CropWise journey begins now.
          </div>
          <div style={{fontSize:13,color:"#b85c00",background:"rgba(255,252,242,0.88)",
            border:"1px solid rgba(180,92,0,0.25)",borderRadius:12,padding:"12px 28px",
            fontFamily:"'Lato',sans-serif",fontWeight:600,textAlign:"center",
            backdropFilter:"blur(8px)",boxShadow:"0 2px 12px rgba(120,60,0,0.1)"}}>
            📱 Use +91 {registered?.phone} to log in
          </div>
          <button
            onClick={() => goTo("login")}
            style={{marginTop:4,background:"linear-gradient(135deg,#7a3a00,#b85c00,#d47020)",
              border:"none",borderRadius:50,padding:"15px 60px",cursor:"pointer",
              fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:15,letterSpacing:"2.5px",
              color:"#fff8e8",textTransform:"uppercase",
              boxShadow:"0 6px 24px rgba(140,60,0,0.4)"}}>
            Log In →
          </button>
        </div>
      </div>
    );

  // Login 
  if (screen === "login")
    return <LoginScreen
      onGetOtp={(phone) => { setLoginPhone(phone); goTo("otp"); }}
      onNavigate={goTo}
      onBack={goBack} />;

  // OTP 
  if (screen === "otp")
    return <OtpScreen
      phone={loginPhone}
      onLogin={() => { setUserName(registered?.name || ""); goTo("app"); }}
      onNavigate={goTo}
      onBack={goBack} />;

  // Dashboard 
  return <CropWiseDashboard
    userName={userName}
    onLogout={() => { setHistory(["login"]); setUserName(""); setLoginPhone(""); }} />;
}
