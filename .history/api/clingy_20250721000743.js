export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userMessage } = req.body;

    // basic logic
    const reply = `Okay fine 😤 — "${userMessage}" noted.`;

    res.status(200).json({ reply });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
