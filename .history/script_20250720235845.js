let interval;
let chatBox = null;

function startClingy() {
  const task = document.getElementById("taskInput").value.trim();
  if (!task) {
    alert("Tell her what you're working on...");
    return;
  }

  localStorage.setItem("task", task);
  document.getElementById("taskInputSection").classList.add("hidden");
  document.getElementById("chatContainer").classList.remove("hidden");
  chatBox = document.getElementById("chatBox");

  sendMessage(`Okay... I'll believe in you. Finish: "${task}" 😞`);

  interval = setInterval(() => {
    askClingyBot("Why aren't you done yet?");
  }, 180000); // every 3 minutes
}

function sendMessage(msg) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.innerText = msg;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

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
  const response = await fetch("/api/clingy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userMessage })
  });

  const data = await response.json();
  sendMessage(data.reply || "She's too mad to talk right now 😤");
}
