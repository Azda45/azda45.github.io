// Set tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();

// Efek tambahan: animasi muncul tombol 1 per 1
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".link li");
  links.forEach((li, i) => {
    li.style.opacity = 0;
    setTimeout(() => {
      li.style.transition = "opacity 0.6s ease";
      li.style.opacity = 1;
    }, i * 200); // delay tiap link
  });
});