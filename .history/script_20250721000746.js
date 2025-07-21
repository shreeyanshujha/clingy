function finishTask() {
  clearInterval(interval);
  askClingyBot("Hey babe, I finally finished my task.");
}

function sendProof() {
  document.getElementById("proofUpload").click();
}

function proofUploaded() {
  askClingyBot("I uploaded proof for you, babe. Happy now?");
}

async function askClingyBot(userMessage) {
  try {
    const response = await fetch("/api/clingy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userMessage })  // backend expects: { userMessage: "..." }
    });

    const data = await response.json();
    sendMessage(data.reply || "She's too mad to talk right now 🥺");

  } catch (error) {
    console.error("API error:", error);
    sendMessage("Something went wrong babe 😢");
  }
}
