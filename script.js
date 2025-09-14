// Auto-update tahun
const yearEl = document.getElementById('year')
if (yearEl) {
  yearEl.textContent = new Date().getFullYear()
}

const toggleBtn = document.getElementById('darkModeToggle')
const body = document.body

// Helper to animate the theme icon
function animateThemeIcon (icon) {
  if (!icon) return
  // Ensure it has the base class
  icon.classList.add('theme-icon')
  // Trigger reflow to allow re-adding the class reliably
  void icon.offsetWidth
  icon.classList.add('spin')
  const cleanup = () => {
    icon.classList.remove('spin')
    icon.removeEventListener('animationend', cleanup)
  }
  icon.addEventListener('animationend', cleanup)
}

// Restore theme preference
if (toggleBtn && localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark')
  toggleBtn.innerHTML = `<i class="fa-solid fa-sun theme-icon"></i> Light Mode`
}

// Toggle theme with smooth fade
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    body.style.transition = 'background 0.6s ease, color 0.6s ease'
    body.classList.toggle('dark')
    // Update icon and animate it
    if (body.classList.contains('dark')) {
      toggleBtn.innerHTML = `<i class="fa-solid fa-sun theme-icon"></i> Light Mode`
      // animate the new icon
      const icon = toggleBtn.querySelector('.theme-icon')
      animateThemeIcon(icon)
      localStorage.setItem('theme', 'dark')
    } else {
      toggleBtn.innerHTML = `<i class="fa-sharp fa-solid fa-moon theme-icon"></i> Dark Mode`
      const icon = toggleBtn.querySelector('.theme-icon')
      animateThemeIcon(icon)
      localStorage.setItem('theme', 'light')
    }
  })
}

// Typing animation
const text = 'Welcome to My Personal Page'
const typingText = document.getElementById('typingText')
let i = 0
function typeWriter () {
  if (typingText && i < text.length) {
    typingText.textContent += text.charAt(i)
    i++
    setTimeout(typeWriter, 100)
  }
}
window.onload = () => {
  if (typingText) typingText.textContent = ''
  typeWriter()
}
