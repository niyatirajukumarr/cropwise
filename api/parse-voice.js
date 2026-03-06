module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: "Missing transcript" });

  const key = process.env.ANTHROPIC_KEY;
  if (!key) return res.status(500).json({ error: "ANTHROPIC_KEY not configured" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 100,
        messages: [{
          role: "user",
          content: `Extract farm details from farmer speech (English/Hindi/Kannada). Return ONLY JSON with keys soil (red|black|sandy|loamy|null), rainfall (low|medium|high|null), season (kharif|rabi|null). Speech: "${transcript}"`
        }]
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "{}";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};