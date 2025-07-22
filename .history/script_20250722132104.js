async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message);
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!data.reply) {
      throw new Error("Chatbot error: OpenAI response is missing");
    }

    appendMessage("Clingy", data.reply);

  } catch (err) {
    console.error("Chatbot error:", err);
    appendMessage("Clingy", "Ughh... I think something broke 💔");
  }
}
document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
