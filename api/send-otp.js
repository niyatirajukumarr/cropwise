export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { phone, otp } = req.body;

  try {
    const params = new URLSearchParams({
      route: "q",
      message: `Your OTP is ${otp}`,
      language: "english",
      numbers: phone
    });

    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: process.env.FAST2SMS_KEY,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const data = await response.json();

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}