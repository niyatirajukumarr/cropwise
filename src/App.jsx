import { useState, useEffect, useCallback } from "react";

// ── TRANSLATIONS ────────────────────────────────────────────────
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
    apiKeyInstructions: "Open src/App.jsx → replace YOUR_DATA_GOV_IN_KEY at the top.",
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
    // Risk plain-language
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
    apiKeyInstructions: "App.jsx खोलें → YOUR_DATA_GOV_IN_KEY बदलें।",
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
    riskWarningLow: "✅ अच्छा चुनाव — माँग स्थिर है और कम प्रतिस्पर्धा।",
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
    apiKeyInstructions: "App.jsx ತೆರೆಯಿರಿ → YOUR_DATA_GOV_IN_KEY ಬದಲಿಸಿ.",
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
    riskWarningLow: "✅ ಉತ್ತಮ ಆಯ್ಕೆ — ಬೇಡಿಕೆ ಸ್ಥಿರ ಮತ್ತು ಕಡಿಮೆ ಸ್ಪರ್ಧೆ.",
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
  const monthly = mmPer30Days;
  if (monthly < 50)  return "low";
  if (monthly < 150) return "medium";
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
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum,temperature_2m_max,temperature_2m_min&forecast_days=30&timezone=auto`;
  const res = await fetch(url);
  const d = await res.json();
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
  if (MANDI_KEY === "YOUR_DATA_GOV_IN_KEY") return null;
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
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4,color:"#94a3b8"}}>
        <span>{e} {label}</span>
        <span style={{color:c,fontWeight:700}}>{value}%</span>
      </div>
      <div style={{background:"#1e293b",borderRadius:99,height:7,overflow:"hidden"}}>
        <div style={{width:`${value}%`,background:`linear-gradient(90deg,${c}88,${c})`,height:"100%",borderRadius:99,transition:"width 0.8s"}}/>
      </div>
      {showWarning && warning && (
        <div style={{marginTop:8,padding:"8px 10px",background:value>=50?"#1c0505":value>=30?"#1c1000":"#021a0d",borderRadius:8,fontSize:12,color:value>=50?"#fca5a5":value>=30?"#fde68a":"#86efac",lineHeight:1.5}}>
          {warning}
        </div>
      )}
    </div>
  );
}

function LiveTag({live}) {
  return live
    ? <span style={{fontSize:9,background:"#052e16",color:"#4ade80",borderRadius:4,padding:"1px 6px",fontWeight:700,marginLeft:5}}>🟢 LIVE</span>
    : <span style={{fontSize:9,background:"#1c1a05",color:"#fbbf24",borderRadius:4,padding:"1px 6px",fontWeight:700,marginLeft:5}}>EST</span>;
}

function LangToggle({lang, setLang}) {
  const langs = [["en","EN"],["hi","हि"],["kn","ಕ"]];
  return (
    <div style={{display:"flex",gap:4,background:"#0a1628",borderRadius:99,padding:3,border:"1px solid #1e293b"}}>
      {langs.map(([code,label])=>(
        <button key={code} onClick={()=>setLang(["en","hi","kn"].includes(code) ? code : "en")} style={{
          padding:"5px 10px",borderRadius:99,border:"none",cursor:"pointer",
          fontSize:12,fontWeight:700,fontFamily:"inherit",
          background:lang===code?"#4ade80":"transparent",
          color:lang===code?"#020c18":"#475569",
          transition:"all .2s",
        }}>{label}</button>
      ))}
    </div>
  );
}

const CSS=`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#1e293b;border-radius:99px}
.hw:hover{transform:translateY(-2px);border-color:#166534!important;transition:all .2s}
.bb:hover{transform:translateY(-2px);box-shadow:0 12px 40px #4ade8044;transition:all .15s}
.ob:hover{border-color:#4ade80!important;color:#4ade80!important;transition:all .2s}
.nb:hover{background:#0a1628!important;transition:all .2s}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
.fade{animation:fadeUp .35s ease forwards}select option{background:#0f172a}`;

const bdg=(p)=>({display:"inline-block",padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:p==="High"?"#052e16":p==="Medium"?"#1c1a05":"#1c0505",color:p==="High"?"#4ade80":p==="Medium"?"#fbbf24":"#f87171",border:`1px solid ${p==="High"?"#166534":p==="Medium"?"#854d0e":"#7f1d1d"}`});
const NAV_IDS=[{id:"home",icon:"🏠",tk:"navHome"},{id:"plan",icon:"🌱",tk:"navPlan"},{id:"market",icon:"📊",tk:"navMarket"},{id:"profit",icon:"💰",tk:"navProfit"},{id:"alerts",icon:"⚠️",tk:"navAlerts"}];

export default function CropWise() {
  const [lang,setLang]           = useState("en");
  const t = T[lang] || T["en"];
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

  useEffect(()=>{
    if (!coords) return;
    setWeatherLoading(true); setWeatherErr("");
    fetchOpenMeteoWeather(coords.lat, coords.lon)
      .then(w=>{ setWeather(w); setRainfall(w.rainfallLevel); })
      .catch(()=>setWeatherErr("Could not fetch weather. Check connection."))
      .finally(()=>setWeatherLoading(false));
  },[coords]);

  const refreshMandiPrices = useCallback(async(state=userState)=>{
    if (MANDI_KEY==="YOUR_DATA_GOV_IN_KEY") {
      setMandiErr("no_key"); return;
    }
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

  const go = (s)=>{ setScreen(s); setExpanded(null); };

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
    if (MANDI_KEY!=="YOUR_DATA_GOV_IN_KEY") {
      livePrices=await fetchAllMandiPrices(crops,userState);
    }
    const enriched=crops.map(c=>({
      name:c, ...CROP_META[c],
      price: livePrices[c]||getPrice(c),
      isLive: !!livePrices[c],
    }));
    setResults(enriched);
    setScreen("results");
    setLoading(false);
  };

  // Voice input
  const startVoice=()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if (!SR){setVoiceText("Voice not supported.");return;}
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

  const profitMeta     = CROP_META[profitCrop];
  const grossRevenue   = profitMeta ? area * profitMeta.yieldPerAcre * getPrice(profitCrop) : 0;
  const totalCost      = costPerAcre * area;
  const netProfitAmt   = grossRevenue - totalCost;
  const profitEstimate = grossRevenue.toLocaleString("en-IN");
  const hasMandiKey    = MANDI_KEY !== "YOUR_DATA_GOV_IN_KEY";
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
    lang,setLang,T,
    costPerAcre,setCostPerAcre,netProfitAmt,totalCost,grossRevenue,
  };

  const blobs=[["15%","-5%","#22c55e"],["55%","65%","#0ea5e9"],["85%","25%","#a855f7"]];

  if (isDesktop) return (
    <div style={{display:"flex",minHeight:"100vh",background:"#020c18",color:"#e2e8f0",fontFamily:"'Sora',sans-serif",overflow:"hidden"}}>
      <style>{CSS}</style>
      {blobs.map(([t,l,c],i)=><div key={i} style={{position:"fixed",top:t,left:l,width:500,height:500,borderRadius:"50%",background:c,filter:"blur(120px)",opacity:0.09,pointerEvents:"none",zIndex:0}}/>)}

      {/* Sidebar */}
      <aside style={{width:240,minHeight:"100vh",background:"linear-gradient(180deg,#0a1628,#050e1a)",borderRight:"1px solid #1e293b",display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,bottom:0,zIndex:10}}>
        <div style={{padding:"28px 24px 16px"}}>
          <div style={{fontSize:24,fontWeight:900,letterSpacing:"-0.5px"}}><span style={{color:"#4ade80"}}>Crop</span>Wise<span style={{fontSize:10,background:"#052e16",color:"#4ade80",borderRadius:6,padding:"2px 7px",marginLeft:8,fontWeight:700,verticalAlign:"middle"}}>AI</span></div>
          <div style={{fontSize:11,color:"#475569",marginTop:4,fontWeight:600}}>{t.appTagline}</div>
          <LangToggle lang={lang} setLang={setLang}/>

          {weather && (
            <div style={{marginTop:14,padding:"12px",background:"#052e16",borderRadius:12,border:"1px solid #166534"}}>
              <div style={{fontSize:10,color:"#4ade8066",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>{t.liveWeather}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:900,color:"#4ade80"}}>{weather.rainfallMm}<span style={{fontSize:10,fontWeight:400}}>mm</span></div>
                  <div style={{fontSize:9,color:"#475569"}}>{t.rain30day}</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:900,color:"#f59e0b"}}>{weather.avgTempC}<span style={{fontSize:10,fontWeight:400}}>°C</span></div>
                  <div style={{fontSize:9,color:"#475569"}}>{t.avgTempLabel}</div>
                </div>
              </div>
              <div style={{marginTop:8,fontSize:11,color:"#4ade80",textAlign:"center",fontWeight:700}}>
                {weather.rainfallLevel.toUpperCase()}
              </div>
            </div>
          )}
          {weatherLoading && <div style={{marginTop:10,fontSize:11,color:"#475569"}}>{t.fetchingWeather}</div>}
        </div>

        <nav style={{flex:1,padding:"0 12px"}}>
          {NAV_IDS.map(n=>{
            const active=screen===n.id||(screen==="results"&&n.id==="plan");
            return(<div key={n.id} className="nb" onClick={()=>go(n.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 16px",borderRadius:12,cursor:"pointer",marginBottom:4,background:active?"linear-gradient(135deg,#052e16,#0a2010)":"transparent",color:active?"#4ade80":"#64748b",fontWeight:active?700:500,fontSize:14,border:active?"1px solid #166534":"1px solid transparent"}}><span style={{fontSize:18}}>{n.icon}</span>{t[n.tk]}</div>);
          })}
        </nav>

        <div style={{padding:"16px 24px",borderTop:"1px solid #1e293b"}}>
          <div style={{background:"#052e16",border:"1px solid #166534",borderRadius:10,padding:"10px 14px"}}>
            <div style={{fontSize:10,color:"#4ade8066",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>{t.season}</div>
            <div style={{fontSize:14,fontWeight:700,color:"#4ade80",marginTop:3}}>🌾 {getSeasonLabel()}</div>
          </div>
          {lastUpdated && <div style={{fontSize:10,color:"#1e3a2a",marginTop:8,textAlign:"center"}}>{t.pricesUpdated} {lastUpdated.toLocaleTimeString()}</div>}
        </div>
      </aside>

      {/* Main */}
      <main style={{marginLeft:240,width:"calc(100vw - 240px)",overflowY:"auto",minHeight:"100vh",position:"relative",zIndex:1}}>
        <div className="fade" key={screen} style={{padding:"32px 36px 60px"}}>
          <DesktopScreens {...shared}/>
        </div>
      </main>
    </div>
  );

  // Mobile
  return(
    <div style={{minHeight:"100vh",background:"#020c18",color:"#e2e8f0",fontFamily:"'Sora',sans-serif",overflow:"hidden"}}>
      <style>{CSS}</style>
      {blobs.map(([_t,l,c],i)=><div key={i} style={{position:"fixed",top:_t,left:l,width:400,height:400,borderRadius:"50%",background:c,filter:"blur(100px)",opacity:0.12,pointerEvents:"none",zIndex:0}}/>)}
      <div style={{padding:"18px 16px 8px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1}}>
        <div style={{fontSize:20,fontWeight:900}}><span style={{color:"#4ade80"}}>Crop</span>Wise<span style={{fontSize:9,background:"#052e16",color:"#4ade80",borderRadius:6,padding:"2px 6px",marginLeft:6,fontWeight:700,verticalAlign:"middle"}}>AI</span></div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {weather && <div style={{fontSize:12,color:"#4ade80",fontWeight:700}}>🌧 {weather.rainfallMm}mm · {weather.avgTempC}°C</div>}
          <LangToggle lang={lang} setLang={setLang}/>
        </div>
      </div>
      <div style={{display:"flex",gap:6,padding:"0 14px 14px",overflowX:"auto",position:"relative",zIndex:1}}>
        {NAV_IDS.map(n=>{const active=screen===n.id||(screen==="results"&&n.id==="plan"); return<button key={n.id} onClick={()=>go(n.id)} style={{padding:"7px 13px",borderRadius:99,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",background:active?"#4ade80":"#0f172a",color:active?"#020c18":"#64748b",transition:"all .2s"}}>{n.icon} {t[n.tk]}</button>;})}
      </div>
      <div className="fade" key={screen} style={{position:"relative",zIndex:1,paddingBottom:40}}>
        <MobileScreens {...shared}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// DESKTOP SCREENS
// ══════════════════════════════════════════════════════════════════
function DesktopScreens(p) {
  const card={background:"linear-gradient(145deg,#0f172a,#0a1628)",border:"1px solid #1e293b",borderRadius:20,padding:"24px 28px",marginBottom:20};
  const lbl={fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#4ade80",marginBottom:12};
  const sel={width:"100%",padding:"12px 16px",background:"#0a1225",border:"1px solid #1e293b",borderRadius:12,color:"#e2e8f0",fontSize:14,outline:"none",appearance:"none",cursor:"pointer"};
  const inp={width:"100%",padding:"12px 16px",background:"#0a1225",border:"1px solid #1e293b",borderRadius:12,color:"#e2e8f0",fontSize:14,outline:"none"};
  const btn={width:"100%",padding:"15px",background:"linear-gradient(135deg,#4ade80,#22c55e)",border:"none",borderRadius:16,fontSize:15,fontWeight:800,color:"#020c18",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8};
  const spin={animation:"spin 1s linear infinite",display:"inline-block"};

  if (p.screen==="home") return(<>
    {/* API key banner — only show to developers, phrased simply */}
    {!p.hasMandiKey && (
      <div style={{background:"linear-gradient(135deg,#1c1a05,#0a1628)",border:"1px solid #854d0e",borderRadius:16,padding:"16px 22px",marginBottom:20,display:"flex",alignItems:"center",gap:14}}>
        <span style={{fontSize:28}}>⚙️</span>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,color:"#fbbf24",marginBottom:4}}>{p.t.noKeyMsg}</div>
        </div>
        <div style={{fontSize:11,background:"#052e16",color:"#4ade80",borderRadius:8,padding:"6px 10px",fontWeight:700,textAlign:"center",whiteSpace:"nowrap"}}>Weather<br/>✅ LIVE</div>
      </div>
    )}

    <div style={{background:"linear-gradient(135deg,#052e16,#0a1628,#1a1028)",border:"1px solid #14532d",borderRadius:24,padding:"40px 44px",marginBottom:24,display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"center"}}>
      <div>
        <div style={{fontSize:12,color:"#4ade80",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>🌾 {getSeasonLabel()} · Real-Time Intelligence</div>
        <div style={{fontSize:44,fontWeight:900,letterSpacing:"-1.5px",lineHeight:1.05}}>{p.t.growSmarter}<br/><span style={{color:"#4ade80"}}>{p.t.earnBetter}</span></div>
        <p style={{color:"#475569",fontSize:15,marginTop:14,lineHeight:1.7}}>{p.t.heroDesc}</p>
        <div style={{display:"flex",gap:12,marginTop:20}}>
          <button className="bb" style={{...btn,flex:1}} onClick={()=>p.go("plan")}>{p.t.startPlanning}</button>
          <button className="bb" style={{...btn,flex:1,background:"linear-gradient(135deg,#1d4ed8,#1e40af)",color:"#fff"}} onClick={()=>p.go("market")}>{p.t.liveMarkets}</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {[
          {icon:"🌧",label:p.t.rainfallLevel,value:p.weather?`${p.weather.rainfallMm}mm`:p.weatherLoading?p.t.locating:"Use Crop Plan",sub:p.weather?`${p.weather.rainfallLevel} level`:"Open-Meteo API",live:!!p.weather},
          {icon:"🌡",label:"Avg Temp",value:p.weather?`${p.weather.avgTempC}°C`:p.weatherLoading?"...":"—",sub:"30-day forecast",live:!!p.weather},
          {icon:"📊",label:p.t.marketPrices,value:p.mandiLoading?"Fetching...":p.liveCount>0?p.t.liveCount(p.liveCount):p.hasMandiKey?"0 fetched":"Add API key",sub:p.lastUpdated?`${p.lastUpdated.toLocaleTimeString()}`:"data.gov.in",live:p.liveCount>0},
          {icon:"📅",label:p.t.seasonWidget,value:getSeasonLabel(),sub:"Auto-detected",live:true},
        ].map((s,i)=>(
          <div key={i} style={{background:"#0a1628",borderRadius:14,padding:"16px 18px",border:"1px solid #1e293b"}}>
            <div style={{fontSize:24}}>{s.icon}</div>
            <div style={{fontWeight:800,fontSize:16,marginTop:8}}>{s.value}</div>
            <div style={{fontSize:11,color:"#475569",marginTop:3,display:"flex",alignItems:"center",gap:4}}>{s.label}<LiveTag live={s.live}/></div>
            <div style={{fontSize:10,color:"#334155",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
      {[{icon:"📊",l:p.t.marketPrices,s:p.liveCount>0?p.t.liveCount(p.liveCount):p.t.mandiData,t:"market"},{icon:"💰",l:p.t.profitSim,s:p.t.realPrices,t:"profit"},{icon:"⚠️",l:p.t.riskAlerts,s:p.t.warnings,t:"alerts"},{icon:"🎙️",l:p.t.voiceInput,s:p.t.krishiAI,t:"plan"}].map((item,i)=>(
        <div key={i} className="hw" onClick={()=>p.go(item.t)} style={{...card,margin:0,cursor:"pointer"}}>
          <div style={{fontSize:28}}>{item.icon}</div>
          <div style={{fontWeight:700,fontSize:14,marginTop:10}}>{item.l}</div>
          <div style={{color:"#475569",fontSize:12,marginTop:4}}>{item.s}</div>
        </div>
      ))}
    </div>
  </>);

  if (p.screen==="plan"||p.screen==="results") return(<>
    {/* Location card */}
    <div style={card}>
      <div style={lbl}>📍 {p.t.locationLabel}</div>
      <div style={{display:"flex",gap:10,marginBottom:12}}>
        <input style={{...inp,flex:1}} placeholder={p.t.locationPlaceholder} value={p.location} onChange={e=>p.setLocation(e.target.value)}/>
        <button className="ob" style={{padding:"12px 20px",background:"#0f172a",border:"1px solid #4ade8044",borderRadius:12,fontSize:13,fontWeight:600,color:"#4ade80",cursor:"pointer",whiteSpace:"nowrap"}} onClick={p.detectLocation}>
          {p.locating?<><span style={spin}>⟳</span> {p.t.locating}</>:p.t.locateBtn}
        </button>
      </div>
      {p.locErr&&<div style={{fontSize:12,color:"#f87171",marginBottom:10}}>⚠️ {p.locErr}</div>}
      {p.weatherLoading&&<div style={{padding:"12px",background:"#0a1628",borderRadius:10,fontSize:13,color:"#475569"}}>{p.t.fetchingWeather}</div>}
      {p.weatherErr&&<div style={{fontSize:12,color:"#f87171"}}>{p.weatherErr}</div>}
      {p.weather&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:4}}>
          {[
            {l:p.t.rainfallLevel,v:`${p.weather.rainfallMm}mm`,sub:`${p.weather.rainfallLevel} level`,c:"#4ade80"},
            {l:"Avg Temp",v:`${p.weather.avgTempC}°C`,sub:"30-day avg",c:"#f59e0b"},
            {l:p.t.rainfallLevel,v:p.weather.rainfallLevel.toUpperCase(),sub:"Auto-set below",c:"#4ade80"},
            {l:p.t.seasonLabel,v:p.season.toUpperCase(),sub:"Auto-detected",c:"#a78bfa"},
          ].map(m=>(
            <div key={m.l+m.v} style={{background:"#052e16",borderRadius:10,padding:"12px 14px",border:"1px solid #166534"}}>
              <div style={{fontSize:10,color:"#4ade8066",fontWeight:700,textTransform:"uppercase",marginBottom:4}}>{m.l}</div>
              <div style={{fontSize:16,fontWeight:800,color:m.c}}>{m.v}</div>
              <div style={{fontSize:10,color:"#475569",marginTop:2}}>{m.sub}</div>
            </div>
          ))}
        </div>
      )}
      {p.weather&&(
        <div style={{marginTop:12}}>
          <div style={{fontSize:10,color:"#334155",marginBottom:4}}>{p.t.rainfallForecast}</div>
          <RainBars data={p.weather.dailyRain}/>
        </div>
      )}
    </div>

    {/* Farm details — VISUAL TILES */}
    <div style={card}>
      <div style={lbl}>🌱 {p.t.farmDetails}</div>

      {/* Soil Type Tiles */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:13,color:"#64748b",marginBottom:10,fontWeight:600}}>{p.t.soilType}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {[
            {val:"red",   emoji:"🟥", img:"🌄", desc:p.t.soilOptions.red},
            {val:"black", emoji:"⬛", img:"🏔️", desc:p.t.soilOptions.black},
            {val:"sandy", emoji:"🟨", img:"🏜️", desc:p.t.soilOptions.sandy},
            {val:"loamy", emoji:"🟫", img:"🌿", desc:p.t.soilOptions.loamy},
          ].map(s=>(
            <div key={s.val} onClick={()=>p.setSoil(s.val)} style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${p.soil===s.val?"#4ade80":"#1e293b"}`,background:p.soil===s.val?"#052e16":"#0a1225",cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
              <div style={{fontSize:28}}>{s.img}</div>
              <div style={{fontSize:11,fontWeight:700,marginTop:6,color:p.soil===s.val?"#4ade80":"#94a3b8",lineHeight:1.3}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rainfall Tiles */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:13,color:"#64748b",marginBottom:10,fontWeight:600}}>
          {p.t.rainfallLevel} {p.weather&&<span style={{fontSize:9,background:"#052e16",color:"#4ade80",borderRadius:4,padding:"1px 5px",fontWeight:700}}>🟢 AUTO</span>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[
            {val:"low",    emoji:"☀️",  desc:p.t.rainfallOptions.low},
            {val:"medium", emoji:"🌦️", desc:p.t.rainfallOptions.medium},
            {val:"high",   emoji:"🌧️", desc:p.t.rainfallOptions.high},
          ].map(r=>(
            <div key={r.val} onClick={()=>p.setRainfall(r.val)} style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${p.rainfall===r.val?"#4ade80":"#1e293b"}`,background:p.rainfall===r.val?"#052e16":"#0a1225",cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
              <div style={{fontSize:32}}>{r.emoji}</div>
              <div style={{fontSize:11,fontWeight:700,marginTop:6,color:p.rainfall===r.val?"#4ade80":"#94a3b8",lineHeight:1.3}}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Season Tiles */}
      <div>
        <div style={{fontSize:13,color:"#64748b",marginBottom:10,fontWeight:600}}>
          {p.t.seasonLabel} <span style={{fontSize:9,background:"#052e16",color:"#4ade80",borderRadius:4,padding:"1px 5px",fontWeight:700}}>🟢 AUTO</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[
            {val:"kharif", emoji:"🌱", desc:p.t.seasonOptions.kharif},
            {val:"rabi",   emoji:"❄️", desc:p.t.seasonOptions.rabi},
          ].map(s=>(
            <div key={s.val} onClick={()=>p.setSeason(s.val)} style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${p.season===s.val?"#4ade80":"#1e293b"}`,background:p.season===s.val?"#052e16":"#0a1225",cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
              <div style={{fontSize:32}}>{s.emoji}</div>
              <div style={{fontSize:12,fontWeight:700,marginTop:6,color:p.season===s.val?"#4ade80":"#94a3b8"}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Voice */}
    <div style={card}>
      <div style={lbl}>{p.t.voiceTitle}</div>
      <button className="bb" style={{...btn,background:p.listening?"linear-gradient(135deg,#ef4444,#dc2626)":"linear-gradient(135deg,#1d4ed8,#1e40af)",color:"#fff"}} onClick={p.startVoice}>
        {p.listening?p.t.voiceListening:p.t.voiceBtn}
      </button>
      {p.voiceText&&<div style={{marginTop:10,padding:"10px 14px",background:"#0a1628",borderRadius:10,fontSize:13,color:"#94a3b8",fontStyle:"italic"}}>Heard: "{p.voiceText}"</div>}
    </div>

    <button className="bb" style={{...btn,opacity:(!p.soil||!p.rainfall||!p.season)?0.5:1}} onClick={p.getRecommendations} disabled={p.loading||!p.soil||!p.rainfall||!p.season}>
      {p.loading?<><span style={spin}>⟳</span> {p.t.analysing}</>:p.t.getRecommendations}
    </button>

    {/* Results */}
    {p.screen==="results"&&p.results.length>0&&(
      <div style={{marginTop:24}}>
        <div style={{...lbl,marginBottom:16}}>
          {p.t.topPicks} · {p.soil} soil · {p.rainfall} rain · {p.season}
          {p.weather&&<span style={{marginLeft:10,fontSize:10,background:"#052e16",color:"#4ade80",borderRadius:6,padding:"2px 8px"}}>Weather: {p.weather.rainfallMm}mm · {p.weather.avgTempC}°C</span>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
          {p.results.map((crop,i)=>(
            <div key={crop.name} className="hw" onClick={()=>p.setExpanded(p.expanded===crop.name?null:crop.name)} style={{background:i===0?"linear-gradient(135deg,#052e16,#0a2010)":"linear-gradient(145deg,#0f172a,#0a1628)",border:`1px solid ${i===0?"#166534":"#1e293b"}`,borderRadius:18,padding:"22px",cursor:"pointer"}}>
              {i===0&&<div style={{fontSize:10,background:"#854d0e",color:"#fbbf24",borderRadius:6,padding:"2px 8px",fontWeight:700,marginBottom:8,display:"inline-block"}}>{p.t.topPick}</div>}
              <div style={{fontSize:32}}>{crop.icon}</div>
              <div style={{fontWeight:800,fontSize:18,marginTop:8}}>{crop.name}</div>
              <div style={{marginTop:8,display:"flex",alignItems:"center",flexWrap:"wrap",gap:6}}>
                <span style={p.bdg(crop.profit)}>{crop.profit==="High"?p.t.profitHigh:crop.profit==="Medium"?p.t.profitMed:p.t.profitLow}</span>
                <LiveTag live={crop.isLive}/>
              </div>
              <div style={{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:12,color:"#64748b"}}>{p.t.mandiPrice}</span>
                <span style={{fontWeight:800,color:"#4ade80",fontSize:15}}>₹{crop.price.toLocaleString()}/q</span>
              </div>
              <RiskMeter value={crop.risk} lang={p.lang} showWarning={true}/>
              {p.expanded===crop.name&&(
                <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid #1e293b"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                    {[{l:p.t.mandiPrice,v:`₹${crop.price.toLocaleString()}/q`},{l:p.t.yieldAcre,v:`${crop.yieldPerAcre} q`},{l:p.t.incomeAcre,v:`₹${(crop.price*crop.yieldPerAcre).toLocaleString()}`},{l:p.t.risk,v:`${crop.risk}%`}].map(m=>(
                      <div key={m.l} style={{background:"#0a1628",borderRadius:10,padding:"10px",textAlign:"center"}}>
                        <div style={{fontSize:10,color:"#475569",marginBottom:3}}>{m.l}</div>
                        <div style={{fontWeight:700,fontSize:13}}>{m.v}</div>
                      </div>
                    ))}
                  </div>
                  <button className="bb" style={{...btn,marginTop:4}} onClick={e=>{e.stopPropagation();p.setProfitCrop(crop.name);p.go("profit");}}>{p.t.simulateProfit}</button>
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
        <div style={{fontSize:13,color:"#475569"}}>
          {p.liveCount>0?p.t.liveCount(p.liveCount):p.t.estimated}
          {p.lastUpdated&&` · ${p.t.pricesUpdated} ${p.lastUpdated.toLocaleTimeString()}`}
        </div>
      </div>
      <button className="ob" onClick={()=>p.refreshMandiPrices()} style={{padding:"10px 18px",background:"transparent",border:"1px solid #1e293b",borderRadius:10,color:"#64748b",cursor:"pointer",fontSize:13,fontWeight:600}}>
        {p.mandiLoading?<span style={spin}>⟳</span>:p.t.refreshBtn}
      </button>
    </div>
    {p.mandiErr==="no_key"&&(
      <div style={{background:"#1c1a05",border:"1px solid #854d0e",borderRadius:14,padding:"14px 18px",marginBottom:16,fontSize:13,color:"#fbbf24"}}>
        {p.t.noKeyMsg}
      </div>
    )}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
      {Object.entries(CROP_META).map(([name,data])=>{
        const live=p.mandiPrices[name];
        const price=live||data.fallbackPrice;
        return(
          <div key={name} className="hw" style={{background:"linear-gradient(145deg,#0f172a,#0a1628)",border:"1px solid #1e293b",borderRadius:18,padding:"20px",cursor:"pointer"}} onClick={()=>p.setExpanded(p.expanded===name?null:name)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:26}}>{data.icon}</span>
                <div>
                  <div style={{fontWeight:700,fontSize:15}}>{name}</div>
                  <div style={{fontSize:12,display:"flex",alignItems:"center"}}>
                    <span style={{color:live?"#4ade80":"#fbbf24",fontWeight:700}}>₹{price.toLocaleString()}/q</span>
                    <LiveTag live={!!live}/>
                  </div>
                </div>
              </div>
            </div>
            <RiskMeter value={data.risk} lang={p.lang}/>
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
          <div style={{marginBottom:16}}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:6}}>{p.t.selectCrop} (🟢 = live price)</div>
            <select style={sel} value={p.profitCrop} onChange={e=>p.setProfitCrop(e.target.value)}>
              {Object.keys(CROP_META).map(c=><option key={c} value={c}>{CROP_META[c].icon} {c}{p.isLive(c)?" 🟢":""}</option>)}
            </select>
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:6}}>{p.t.landArea}: <strong style={{color:"#e2e8f0"}}>{p.area} {p.t.acres}</strong></div>
            <input type="range" min="0.5" max="20" step="0.5" value={p.area} onChange={e=>p.setArea(Number(e.target.value))} style={{width:"100%",accentColor:"#4ade80",cursor:"pointer"}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#334155",marginTop:4}}><span>0.5</span><span>20 {p.t.acres}</span></div>
          </div>
          {/* Cost input */}
          <div>
            <div style={{fontSize:12,color:"#64748b",marginBottom:6}}>{p.t.costPerAcre}</div>
            <input
              type="number" min="0" step="500"
              value={p.costPerAcre}
              onChange={e=>p.setCostPerAcre(Number(e.target.value))}
              placeholder={p.t.costPlaceholder}
              style={{...inp,width:"100%"}}
            />
            <div style={{fontSize:11,color:"#334155",marginTop:4}}>{p.t.costNote}</div>
          </div>
        </div>
        <div style={card}>
          <div style={lbl}>⚡ {p.t.quickCompare} ({p.area} ac)</div>
          {["Groundnut","Sesame","Chickpea","Moong"].map(c=>(
            <div key={c} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #0f172a"}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span>{CROP_META[c].icon}</span>
                <span style={{fontWeight:600,fontSize:13}}>{c}</span>
                <LiveTag live={p.isLive(c)}/>
              </div>
              <div style={{fontWeight:700,fontSize:14,color:"#4ade80"}}>₹{(p.area*CROP_META[c].yieldPerAcre*p.getPrice(c)).toLocaleString("en-IN")}</div>
            </div>
          ))}
        </div>
      </div>
      {p.profitMeta&&(
        <div style={{background:"linear-gradient(135deg,#052e16,#0a1628)",border:"1px solid #14532d",borderRadius:20,padding:"28px"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
            <span style={{fontSize:44}}>{p.profitMeta.icon}</span>
            <div>
              <div style={{fontWeight:800,fontSize:22}}>{p.profitCrop}</div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
                <span style={p.bdg(p.profitMeta.profit)}>{p.profitMeta.profit==="High"?p.t.profitHigh:p.profitMeta.profit==="Medium"?p.t.profitMed:p.t.profitLow}</span>
                <LiveTag live={p.isLive(p.profitCrop)}/>
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
            {[
              {l:p.t.mandiPrice,v:`₹${p.getPrice(p.profitCrop).toLocaleString()}/q`,live:p.isLive(p.profitCrop)},
              {l:p.t.yieldAcre,v:`${p.profitMeta.yieldPerAcre} q`},
              {l:"Total Yield",v:`${(p.area*p.profitMeta.yieldPerAcre).toFixed(1)} q`},
              {l:p.t.risk,v:`${p.profitMeta.risk}%`},
            ].map(m=>(
              <div key={m.l} style={{background:"#0a2010",borderRadius:12,padding:"14px 16px"}}>
                <div style={{fontSize:11,color:"#4ade8099",marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>{m.l}{m.live&&<span style={{marginLeft:4,fontSize:9,color:"#4ade80"}}>● LIVE</span>}</div>
                <div style={{fontWeight:800,fontSize:16}}>{m.v}</div>
              </div>
            ))}
          </div>

          {/* Gross Income */}
          <div style={{background:"#0a2010",border:"1px solid #166534",borderRadius:14,padding:"20px",textAlign:"center",marginBottom:12}}>
            <div style={{fontSize:11,color:"#4ade8099",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>
              {p.t.grossIncome} {p.isLive(p.profitCrop)&&<span style={{fontSize:9,background:"#166534",padding:"2px 6px",borderRadius:4,marginLeft:6}}>🟢 {p.t.livePrice}</span>}
            </div>
            <div style={{fontSize:32,fontWeight:900,color:"#4ade80",letterSpacing:"-1px"}}>₹{p.profitEstimate}</div>
            <div style={{fontSize:12,color:"#166534",marginTop:4}}>{p.area} {p.t.acres} · {p.profitCrop}</div>
          </div>

          {/* Cost row */}
          <div style={{background:"#1c0505",border:"1px solid #7f1d1d",borderRadius:14,padding:"16px 20px",textAlign:"center",marginBottom:12}}>
            <div style={{fontSize:11,color:"#f8717199",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{p.t.totalCost}</div>
            <div style={{fontSize:24,fontWeight:800,color:"#f87171"}}>− ₹{p.totalCost.toLocaleString("en-IN")}</div>
            <div style={{fontSize:11,color:"#7f1d1d",marginTop:4}}>₹{p.costPerAcre.toLocaleString()} × {p.area} {p.t.acres}</div>
          </div>

          {/* Net Profit */}
          <div style={{background:p.netProfitAmt>=0?"#052e16":"#1c0505",border:`1px solid ${p.netProfitAmt>=0?"#166534":"#7f1d1d"}`,borderRadius:14,padding:"20px",textAlign:"center"}}>
            <div style={{fontSize:11,color:p.netProfitAmt>=0?"#4ade8099":"#f8717199",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>{p.t.netProfit}</div>
            <div style={{fontSize:38,fontWeight:900,color:p.netProfitAmt>=0?"#4ade80":"#f87171",letterSpacing:"-1px"}}>
              {p.netProfitAmt>=0?"":"−"}₹{Math.abs(p.netProfitAmt).toLocaleString("en-IN")}
            </div>
            <div style={{fontSize:12,color:p.netProfitAmt>=0?"#166534":"#7f1d1d",marginTop:6}}>{p.t.netProfitTitle}</div>
          </div>
          <div style={{marginTop:16}}><RiskMeter value={p.profitMeta.risk} lang={p.lang}/></div>
        </div>
      )}
    </div>
  );

  if (p.screen==="alerts") return(<>
    <div style={{marginBottom:20}}>
      <div style={lbl}>{p.t.alertsTitle}</div>
      <div style={{fontSize:13,color:"#475569"}}>{p.t.alertsDesc}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,marginBottom:24}}>
      {[{crop:"Tomato",risk:72,reason:{en:"Many farmers in Karnataka & Maharashtra are growing this — prices may fall at harvest time.",hi:"कर्नाटक और महाराष्ट्र में बहुत किसान उगा रहे हैं — कटाई पर भाव गिर सकता है।",kn:"ಕರ್ನಾಟಕ ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ಅನೇಕ ರೈತರು ಬೆಳೆಯುತ್ತಿದ್ದಾರೆ — ಕೊಯ್ಲಿನ ಸಮಯದಲ್ಲಿ ಬೆಲೆ ಕಡಿಮೆಯಾಗಬಹುದು."},alt:"Capsicum",altRisk:31},{crop:"Onion",risk:68,reason:{en:"A big harvest is expected across South India this season — market may be flooded.",hi:"इस मौसम दक्षिण भारत में भारी फसल आने की उम्मीद — बाज़ार में ज़्यादा माल आ सकता है।",kn:"ಈ ಸಾಲಿನಲ್ಲಿ ದಕ್ಷಿಣ ಭಾರತದಲ್ಲಿ ದೊಡ್ಡ ಫಸಲು ನಿರೀಕ್ಷಿತ — ಮಾರುಕಟ್ಟೆ ತುಂಬಿ ಹೋಗಬಹುದು."},alt:"Garlic",altRisk:38},{crop:"Potato",risk:48,reason:{en:"Cold storage in UP & MP is full — extra supply is pushing prices down.",hi:"UP और MP में कोल्ड स्टोरेज भरा है — अतिरिक्त माल से भाव दब रहे हैं।",kn:"UP ಮತ್ತು MP ನಲ್ಲಿ ಶೀತಲ ಸಂಗ್ರಹ ತುಂಬಿದೆ — ಹೆಚ್ಚು ಸಂಗ್ರಹದಿಂದ ಬೆಲೆ ಕಡಿಮೆಯಾಗುತ್ತಿದೆ."},alt:"Chickpea",altRisk:19}].map((a,i)=>(
        <div key={i} style={{background:"linear-gradient(135deg,#100a02,#0a1628)",border:"1px solid #854d0e",borderRadius:18,padding:"22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
            <span style={{fontWeight:800,fontSize:16}}>{CROP_META[a.crop]?.icon} {a.crop}</span>
            <span style={{fontSize:10,background:"#78350f",color:"#fbbf24",borderRadius:6,padding:"3px 8px",fontWeight:700}}>{p.t.riskBadge}</span>
          </div>
          <RiskMeter value={a.risk} lang={p.lang}/>
          <div style={{marginTop:12,padding:"10px 12px",background:"#0a1628",borderRadius:10}}>
            <div style={{fontSize:11,color:"#94a3b8",marginBottom:4}}>{p.t.alertReason}</div>
            <div style={{fontSize:13,color:"#e2e8f0",lineHeight:1.6}}>{a.reason[p.lang]||a.reason.en}</div>
          </div>
          <div style={{marginTop:12,padding:"10px 12px",background:"#052e16",borderRadius:10,border:"1px solid #166534"}}>
            <div style={{fontSize:11,color:"#4ade80",marginBottom:4}}>{p.t.alertSwitch}</div>
            <div style={{fontWeight:700,fontSize:14}}>{CROP_META[a.alt]?.icon} {a.alt}{p.isLive(a.alt)&&" 🟢"}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={card}><div style={lbl}>{p.t.roadmap}</div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>{["🗣️ Kannada & Hindi voice","🛰️ Satellite monitoring","🏛️ Govt scheme integration","📦 Farmer marketplace","🤖 AI yield prediction","📡 Real-time weather alerts"].map((f,i)=>(<div key={i} style={{background:"#0a1628",borderRadius:12,padding:"14px",fontSize:13,color:"#475569"}}>{f}</div>))}</div></div>
  </>);
  return null;
}

// ══════════════════════════════════════════════════════════════════
// MOBILE SCREENS
// ══════════════════════════════════════════════════════════════════
function MobileScreens(p) {
  const card={background:"linear-gradient(145deg,#0f172a,#0a1628)",border:"1px solid #1e293b",borderRadius:20,padding:"18px 20px",margin:"0 14px 12px"};
  const lbl={fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#4ade80",marginBottom:10};
  const sel={width:"100%",padding:"11px 14px",background:"#0a1225",border:"1px solid #1e293b",borderRadius:12,color:"#e2e8f0",fontSize:14,outline:"none",appearance:"none",cursor:"pointer",marginTop:4};
  const inp={width:"100%",padding:"11px 14px",background:"#0a1225",border:"1px solid #1e293b",borderRadius:12,color:"#e2e8f0",fontSize:14,outline:"none"};
  const btn={width:"100%",padding:"14px",background:"linear-gradient(135deg,#4ade80,#22c55e)",border:"none",borderRadius:16,fontSize:14,fontWeight:800,color:"#020c18",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8};
  const spin={animation:"spin 1s linear infinite",display:"inline-block"};

  if (p.screen==="home") return(<>
    <div style={{background:"linear-gradient(135deg,#052e16,#0a1628,#1a1028)",border:"1px solid #14532d",borderRadius:24,padding:"26px 20px",margin:"0 14px 14px"}}>
      <div style={{fontSize:11,color:"#4ade80",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>🌾 {getSeasonLabel()}</div>
      <div style={{fontSize:30,fontWeight:900,letterSpacing:"-1px",lineHeight:1.1}}>{p.t.growSmarter}<br/><span style={{color:"#4ade80"}}>{p.t.earnBetter}</span></div>
      {p.weather&&<div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div style={{background:"#052e16",borderRadius:10,padding:"8px 10px",border:"1px solid #166534"}}>
          <div style={{fontSize:9,color:"#4ade8066",fontWeight:700,textTransform:"uppercase"}}>🌧 {p.t.rainfallLevel}</div>
          <div style={{fontSize:16,fontWeight:800,color:"#4ade80"}}>{p.weather.rainfallMm}mm <span style={{fontSize:10}}>{p.weather.rainfallLevel}</span></div>
        </div>
        <div style={{background:"#052e16",borderRadius:10,padding:"8px 10px",border:"1px solid #166634"}}>
          <div style={{fontSize:9,color:"#f59e0b66",fontWeight:700,textTransform:"uppercase"}}>🌡 Temp</div>
          <div style={{fontSize:16,fontWeight:800,color:"#f59e0b"}}>{p.weather.avgTempC}°C <span style={{fontSize:10}}>avg</span></div>
        </div>
      </div>}
      <button className="bb" style={{...btn,marginTop:16}} onClick={()=>p.go("plan")}>{p.t.startPlanning}</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0 14px 12px"}}>
      {[{icon:"📊",l:p.t.marketPrices,s:p.liveCount>0?p.t.liveCount(p.liveCount):p.hasMandiKey?"Loading":p.t.estimated,t:"market"},{icon:"💰",l:p.t.profitSim,s:p.t.realPrices,t:"profit"},{icon:"⚠️",l:p.t.riskAlerts,s:p.t.warnings,t:"alerts"},{icon:"🎙️",l:p.t.voiceInput,s:p.t.krishiAI,t:"plan"}].map((item,i)=>(
        <div key={i} onClick={()=>p.go(item.t)} style={{...card,margin:0,cursor:"pointer"}}>
          <div style={{fontSize:22}}>{item.icon}</div>
          <div style={{fontWeight:700,fontSize:13,marginTop:8}}>{item.l}</div>
          <div style={{color:"#475569",fontSize:11,marginTop:3}}>{item.s}</div>
        </div>
      ))}
    </div>
  </>);

  if (p.screen==="plan"||p.screen==="results") return(<>
    <div style={card}>
      <div style={lbl}>📍 {p.t.locationLabel}</div>
      <div style={{display:"flex",gap:8}}>
        <input style={{...inp,flex:1}} placeholder={p.t.locationPlaceholder} value={p.location} onChange={e=>p.setLocation(e.target.value)}/>
        <button style={{padding:"11px 13px",background:"#0f172a",border:"1px solid #4ade8044",borderRadius:12,fontSize:12,fontWeight:600,color:"#4ade80",cursor:"pointer",whiteSpace:"nowrap"}} onClick={p.detectLocation}>
          {p.locating?<span style={spin}>⟳</span>:"📍"}
        </button>
      </div>
      {p.locErr&&<div style={{marginTop:6,fontSize:11,color:"#f87171"}}>⚠️ {p.locErr}</div>}
      {p.weatherLoading&&<div style={{marginTop:8,fontSize:12,color:"#475569"}}>{p.t.fetchingWeather}</div>}
      {p.weather&&<div style={{marginTop:10,padding:"10px",background:"#052e16",borderRadius:10,border:"1px solid #166534",fontSize:12,color:"#4ade80"}}>🌦 {p.weather.rainfallMm}mm · {p.weather.avgTempC}°C · {p.weather.rainfallLevel.toUpperCase()}</div>}
    </div>

    {/* Farm details — Visual Tiles */}
    <div style={card}>
      <div style={lbl}>🌱 {p.t.farmDetails}</div>

      {/* Soil tiles */}
      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:"#64748b",marginBottom:8,fontWeight:600}}>{p.t.soilType}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            {val:"red",   img:"🌄", desc:p.t.soilOptions.red},
            {val:"black", img:"🏔️", desc:p.t.soilOptions.black},
            {val:"sandy", img:"🏜️", desc:p.t.soilOptions.sandy},
            {val:"loamy", img:"🌿", desc:p.t.soilOptions.loamy},
          ].map(s=>(
            <div key={s.val} onClick={()=>p.setSoil(s.val)} style={{padding:"12px 8px",borderRadius:12,border:`2px solid ${p.soil===s.val?"#4ade80":"#1e293b"}`,background:p.soil===s.val?"#052e16":"#0a1225",cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
              <div style={{fontSize:22}}>{s.img}</div>
              <div style={{fontSize:11,fontWeight:700,marginTop:5,color:p.soil===s.val?"#4ade80":"#94a3b8",lineHeight:1.3}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rainfall tiles */}
      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:"#64748b",marginBottom:8,fontWeight:600}}>
          {p.t.rainfallLevel} {p.weather&&<span style={{fontSize:9,background:"#052e16",color:"#4ade80",borderRadius:4,padding:"1px 5px",fontWeight:700}}>🟢 AUTO</span>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[
            {val:"low",    emoji:"☀️",  desc:p.t.rainfallOptions.low},
            {val:"medium", emoji:"🌦️", desc:p.t.rainfallOptions.medium},
            {val:"high",   emoji:"🌧️", desc:p.t.rainfallOptions.high},
          ].map(r=>(
            <div key={r.val} onClick={()=>p.setRainfall(r.val)} style={{padding:"12px 6px",borderRadius:12,border:`2px solid ${p.rainfall===r.val?"#4ade80":"#1e293b"}`,background:p.rainfall===r.val?"#052e16":"#0a1225",cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
              <div style={{fontSize:26}}>{r.emoji}</div>
              <div style={{fontSize:10,fontWeight:700,marginTop:5,color:p.rainfall===r.val?"#4ade80":"#94a3b8",lineHeight:1.3}}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Season tiles */}
      <div>
        <div style={{fontSize:12,color:"#64748b",marginBottom:8,fontWeight:600}}>
          {p.t.seasonLabel} <span style={{fontSize:9,background:"#052e16",color:"#4ade80",borderRadius:4,padding:"1px 5px",fontWeight:700}}>🟢 AUTO</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            {val:"kharif",emoji:"🌱",desc:p.t.seasonOptions.kharif},
            {val:"rabi",  emoji:"❄️",desc:p.t.seasonOptions.rabi},
          ].map(s=>(
            <div key={s.val} onClick={()=>p.setSeason(s.val)} style={{padding:"12px 8px",borderRadius:12,border:`2px solid ${p.season===s.val?"#4ade80":"#1e293b"}`,background:p.season===s.val?"#052e16":"#0a1225",cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
              <div style={{fontSize:26}}>{s.emoji}</div>
              <div style={{fontSize:11,fontWeight:700,marginTop:5,color:p.season===s.val?"#4ade80":"#94a3b8"}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={card}>
      <div style={lbl}>{p.t.voiceTitle}</div>
      <button style={{...btn,background:p.listening?"linear-gradient(135deg,#ef4444,#dc2626)":"linear-gradient(135deg,#1d4ed8,#1e40af)",color:"#fff"}} onClick={p.startVoice}>
        {p.listening?p.t.voiceListening:p.t.voiceBtn}
      </button>
      {p.voiceText&&<div style={{marginTop:8,fontSize:12,color:"#94a3b8",fontStyle:"italic"}}>"{p.voiceText}"</div>}
    </div>
    <div style={{margin:"0 14px 12px"}}>
      <button className="bb" style={{...btn,opacity:(!p.soil||!p.rainfall||!p.season)?0.5:1}} onClick={p.getRecommendations} disabled={p.loading||!p.soil||!p.rainfall||!p.season}>
        {p.loading?<><span style={spin}>⟳</span> {p.t.analysing}</>:p.t.getRecommendations}
      </button>
    </div>
    {p.screen==="results"&&p.results.map((crop,i)=>(
      <div key={crop.name} onClick={()=>p.setExpanded(p.expanded===crop.name?null:crop.name)} style={{...card,border:`1px solid ${i===0?"#166534":"#1e293b"}`}}>
        {i===0&&<div style={{fontSize:9,background:"#854d0e",color:"#fbbf24",borderRadius:5,padding:"2px 7px",fontWeight:700,marginBottom:6,display:"inline-block"}}>{p.t.topPick}</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:28}}>{crop.icon}</span>
            <div>
              <div style={{fontWeight:800,fontSize:15}}>{crop.name}</div>
              <div style={{fontSize:12,color:"#4ade80",fontWeight:700}}>₹{crop.price.toLocaleString()}/q<LiveTag live={crop.isLive}/></div>
            </div>
          </div>
        </div>
        <RiskMeter value={crop.risk} lang={p.lang} showWarning={true}/>
      </div>
    ))}
  </>);

  if (p.screen==="market") return(<>
    <div style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><div style={lbl}>{p.t.mandiIntelligence}</div><div style={{fontSize:11,color:"#475569"}}>{p.liveCount>0?p.t.liveCount(p.liveCount):p.t.estimated}</div></div>
      <button style={{padding:"8px 14px",background:"transparent",border:"1px solid #1e293b",borderRadius:8,color:"#64748b",cursor:"pointer",fontSize:12}} onClick={()=>p.refreshMandiPrices()}>
        {p.mandiLoading?<span style={spin}>⟳</span>:p.t.refreshBtn}
      </button>
    </div>
    {p.mandiErr==="no_key"&&<div style={{...card,color:"#fbbf24",fontSize:12}}>{p.t.noKeyMsg}</div>}
    {Object.entries(CROP_META).map(([name,data])=>{
      const live=p.mandiPrices[name];
      const price=live||data.fallbackPrice;
      return(
        <div key={name} style={card}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>{data.icon}</span><div style={{fontWeight:700,fontSize:14}}>{name}</div></div>
            <div style={{textAlign:"right"}}>
              <div style={{fontWeight:700,color:live?"#4ade80":"#fbbf24"}}>₹{price.toLocaleString()}/q</div>
              <LiveTag live={!!live}/>
            </div>
          </div>
          <RiskMeter value={data.risk} lang={p.lang}/>
        </div>
      );
    })}
  </>);

  if (p.screen==="profit") return(<>
    <div style={card}>
      <div style={lbl}>💰 {p.t.profitSimTitle}</div>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:12,color:"#64748b",marginBottom:4}}>{p.t.selectCrop} (🟢 live)</div>
        <select style={sel} value={p.profitCrop} onChange={e=>p.setProfitCrop(e.target.value)}>
          {Object.keys(CROP_META).map(c=><option key={c} value={c}>{CROP_META[c].icon} {c}{p.isLive(c)?" 🟢":""}</option>)}
        </select>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:12,color:"#64748b",marginBottom:4}}>{p.t.landArea}: <strong style={{color:"#e2e8f0"}}>{p.area} {p.t.acres}</strong></div>
        <input type="range" min="0.5" max="20" step="0.5" value={p.area} onChange={e=>p.setArea(Number(e.target.value))} style={{width:"100%",accentColor:"#4ade80",cursor:"pointer"}}/>
      </div>
      <div>
        <div style={{fontSize:12,color:"#64748b",marginBottom:4}}>{p.t.costPerAcre}</div>
        <input type="number" min="0" step="500" value={p.costPerAcre} onChange={e=>p.setCostPerAcre(Number(e.target.value))} placeholder={p.t.costPlaceholder} style={{...inp,width:"100%"}}/>
      </div>
    </div>
    {p.profitMeta&&(
      <div style={{...card,background:"linear-gradient(135deg,#052e16,#0a1628)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <span style={{fontSize:34}}>{p.profitMeta.icon}</span>
          <div>
            <div style={{fontWeight:800,fontSize:18}}>{p.profitCrop}</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
              <span style={p.bdg(p.profitMeta.profit)}>{p.profitMeta.profit==="High"?p.t.profitHigh:p.profitMeta.profit==="Medium"?p.t.profitMed:p.t.profitLow}</span>
              <LiveTag live={p.isLive(p.profitCrop)}/>
            </div>
          </div>
        </div>
        {/* Gross income */}
        <div style={{background:"#0a2010",border:"1px solid #166534",borderRadius:12,padding:"16px",textAlign:"center",marginBottom:10}}>
          <div style={{fontSize:10,color:"#4ade8099",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{p.t.grossIncome}</div>
          <div style={{fontSize:28,fontWeight:900,color:"#4ade80",letterSpacing:"-1px"}}>₹{p.profitEstimate}</div>
        </div>
        {/* Cost */}
        <div style={{background:"#1c0505",border:"1px solid #7f1d1d",borderRadius:12,padding:"14px",textAlign:"center",marginBottom:10}}>
          <div style={{fontSize:10,color:"#f8717199",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{p.t.totalCost}</div>
          <div style={{fontSize:22,fontWeight:800,color:"#f87171"}}>− ₹{p.totalCost.toLocaleString("en-IN")}</div>
        </div>
        {/* Net profit */}
        <div style={{background:p.netProfitAmt>=0?"#052e16":"#1c0505",border:`1px solid ${p.netProfitAmt>=0?"#166534":"#7f1d1d"}`,borderRadius:12,padding:"18px",textAlign:"center"}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6,color:p.netProfitAmt>=0?"#4ade80":"#f87171"}}>{p.t.netProfit}</div>
          <div style={{fontSize:32,fontWeight:900,letterSpacing:"-1px",color:p.netProfitAmt>=0?"#4ade80":"#f87171"}}>
            {p.netProfitAmt>=0?"":"−"}₹{Math.abs(p.netProfitAmt).toLocaleString("en-IN")}
          </div>
          <div style={{fontSize:11,marginTop:6,color:p.netProfitAmt>=0?"#166534":"#7f1d1d"}}>{p.t.netProfitTitle}</div>
        </div>
        <div style={{marginTop:12}}><RiskMeter value={p.profitMeta.risk} lang={p.lang}/></div>
      </div>
    )}
  </>);

  if (p.screen==="alerts") return(<>
    <div style={{...card}}>
      <div style={lbl}>{p.t.alertsTitle}</div>
      <div style={{fontSize:12,color:"#64748b"}}>{p.t.alertsDesc}</div>
    </div>
    {[{crop:"Tomato",risk:72,reason:{en:"Many farmers in Karnataka & Maharashtra are growing this — prices may fall at harvest time.",hi:"बहुत किसान उगा रहे हैं — कटाई पर भाव गिर सकता है।",kn:"ಅನೇಕ ರೈತರು ಬೆಳೆಯುತ್ತಿದ್ದಾರೆ — ಬೆಲೆ ಕಡಿಮೆಯಾಗಬಹುದು."},alt:"Capsicum",altRisk:31},{crop:"Onion",risk:68,reason:{en:"Big harvest expected across South India — market may be flooded.",hi:"दक्षिण भारत में भारी फसल — बाज़ार में ज़्यादा माल आ सकता है।",kn:"ದಕ್ಷಿಣ ಭಾರತದಲ್ಲಿ ಹೆಚ್ಚು ಫಸಲು — ಬೆಲೆ ಕಡಿಮೆಯಾಗಬಹುದು."},alt:"Garlic",altRisk:38},{crop:"Potato",risk:48,reason:{en:"Cold storage in UP & MP is full — extra supply pushing prices down.",hi:"UP/MP में कोल्ड स्टोरेज भरा है — भाव दब रहे हैं।",kn:"ಶೀತಲ ಸಂಗ್ರಹ ತುಂಬಿದೆ — ಬೆಲೆ ಕಡಿಮೆಯಾಗುತ್ತಿದೆ."},alt:"Chickpea",altRisk:19}].map((a,i)=>(
      <div key={i} style={{...card,background:"linear-gradient(135deg,#100a02,#0a1628)",border:"1px solid #854d0e"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontWeight:800}}>{CROP_META[a.crop]?.icon} {a.crop}</span>
          <span style={{fontSize:10,background:"#78350f",color:"#fbbf24",borderRadius:6,padding:"2px 8px",fontWeight:700}}>{p.t.riskBadge}</span>
        </div>
        <RiskMeter value={a.risk} lang={p.lang}/>
        <div style={{marginTop:10,fontSize:12,color:"#94a3b8",lineHeight:1.6}}>{a.reason[p.lang]||a.reason.en}</div>
        <div style={{marginTop:8,padding:"8px 10px",background:"#052e16",borderRadius:8,border:"1px solid #166534"}}>
          <div style={{fontSize:11,color:"#4ade80",marginBottom:2}}>{p.t.alertSwitch}</div>
          <div style={{fontSize:13,fontWeight:700}}>{CROP_META[a.alt]?.icon} {a.alt}</div>
        </div>
      </div>
    ))}
  </>);
  return null;
}
