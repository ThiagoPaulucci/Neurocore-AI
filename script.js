const form = document.getElementById("chatForm");
const input = document.getElementById("promptInput");
const toggleBtn = document.getElementById("themeToggle");
const chatMessages = document.getElementById("chatMessages");

// ===============================
// TOGGLE DARK / LIGHT
// ===============================
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    toggleBtn.textContent = "🌙";
  } else {
    toggleBtn.textContent = "☀️";
  }
});

// ===============================
// FLUXO BASE DO CHAT
// ===============================
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const userMessage = input.value.trim();

  if (!userMessage) {
    input.focus();
    return;
  }

  addMessage(userMessage, "user");

  input.value = "";

  showLoading();

  try {
    const response = await getChatGPTResponse(userMessage);

    hideLoading();

    addMessage(response, "bot");
  } catch (error) {
    hideLoading();

    console.error("Erro no fluxo da IA:", error);

    addMessage("Erro ao processar sua solicitação. Tente novamente.", "bot");
  }
});

// ===============================
// ADICIONAR MENSAGEM NA TELA
// ===============================
function addMessage(text, sender) {
  const message = document.createElement("div");

  message.classList.add("message", sender);
  message.textContent = text;

  chatMessages.appendChild(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===============================
// SIMULAÇÃO DA API DO CHATGPT
// ===============================
async function getChatGPTResponse(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resposta simulada da IA para: "${message}"`);
    }, 1200);
  });
}

// ===============================
// ESTADO DE CARREGAMENTO
// ===============================
function showLoading() {
  const button = form.querySelector(".send-btn");
  button.disabled = true;
  button.innerHTML = "...";
}

function hideLoading() {
  const button = form.querySelector(".send-btn");
  button.disabled = false;
  button.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 12H18" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>
      <path d="M13.5 7L19 12L13.5 17" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}