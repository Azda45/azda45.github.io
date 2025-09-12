// Auto-update tahun
document.getElementById("year").textContent = new Date().getFullYear();

const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;

// Restore theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.textContent = `<i class="fa-solid fa-sun"></i> Light Mode`;
}

// Toggle theme with smooth fade
toggleBtn.addEventListener("click", () => {
  body.style.transition = "background 0.6s ease, color 0.6s ease";
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    toggleBtn.textContent = `<i class="fa-solid fa-sun"></i> Light Mode`;
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = `<i class="fa-sharp fa-solid fa-moon"></i> Dark Mode`;
    localStorage.setItem("theme", "light");
  }
});

// Typing animation
const text = "Welcome to My Personal Page";
const typingText = document.getElementById("typingText");
let i = 0;
function typeWriter() {
  if (i < text.length) {
    typingText.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = typeWriter;