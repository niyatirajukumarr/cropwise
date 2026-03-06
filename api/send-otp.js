export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });

  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ success: false, message: "Missing phone or otp" });

  const key = process.env.FAST2SMS_KEY;
  if (!key) return res.status(500).json({ success: false, message: "FAST2SMS_KEY not configured" });

  try {
    const response = await fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=${key}&variables_values=${otp}&route=otp&numbers=${phone}`,
      { method: "GET", headers: { "cache-control": "no-cache" } }
    );
    const data = await response.json();
    return res.status(200).json({ success: data.return === true, message: data.message?.[0] || "Sent" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}