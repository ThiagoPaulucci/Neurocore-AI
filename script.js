const form = document.getElementById("chatForm");
const input = document.getElementById("promptInput");
const toggleBtn = document.getElementById("themeToggle");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = input.value.trim();

  if (!value) {
    input.focus();
    return;
  }

  console.log("Mensagem enviada:", value);
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    toggleBtn.textContent = "🌙";
  } else {
    toggleBtn.textContent = "☀️";
  }
});