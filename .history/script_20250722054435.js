document.getElementById("sendBtn").onclick = async () => {
  const message = document.getElementById("input").value;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  document.getElementById("response").innerText = data.reply;
};

function startClingy() {
  const task = document.getElementById("taskInput").value;
  if (!task) {
    alert("You can’t leave her hanging. Tell her what you’re working on.");
    return;
  }
  alert(`Okay baby 🥺. I believe in you. Go finish: "${task}" 💖`);
}

function markDone() {
  alert("YAYYYY 🥰. I’m so proud of you!!");
}

function sendProof() {
  const file = document.getElementById("proofFile").files[0];
  if (!file) {
    alert("No proof? 😢 She’s disappointed.");
    return;
  }
  alert("Proof received. She trusts you now. 💕");
}
