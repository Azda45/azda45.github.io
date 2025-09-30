// Auto-update tahun

// Auto-redirect by browser language or location (only on root domain)
const userLang = navigator.language || navigator.userLanguage
const isRoot =
  window.location.pathname === '/' || window.location.pathname === ''
// Only run redirect logic on root domain, never on /id/ or other subpaths
if (
  (window.location.pathname === '/' || window.location.pathname === '') &&
  !sessionStorage.getItem('langRedirected')
) {
  // If browser language is Indonesian, redirect to /id
  if (userLang && userLang.toLowerCase().startsWith('id')) {
    sessionStorage.setItem('langRedirected', '1')
    window.location.replace('/id/')
  } else if (navigator.geolocation) {
    // Try geolocation if allowed
    navigator.geolocation.getCurrentPosition(function (pos) {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      // Simple bounding box for Indonesia
      // Indonesia: lat -11 to 6, lon 95 to 141
      if (lat >= -11 && lat <= 6 && lon >= 95 && lon <= 141) {
        sessionStorage.setItem('langRedirected', '1')
        window.location.replace('/id/')
      }
    })
  }
  // Otherwise, stay at root
}

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

// Determine current language (default: en)
const path = window.location.pathname
const lang = path.startsWith('/id') ? 'id' : 'en'

// Localized strings
const STRINGS = {
  en: {
    typing: 'Welcome to My Personal Page',
    dark: 'Dark Mode',
    light: 'Light Mode'
  },
  id: {
    typing: 'Selamat datang di Halaman Pribadi Saya',
    dark: 'Mode Gelap',
    light: 'Mode Terang'
  }
}

// Restore theme preference
if (toggleBtn && localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark')
  toggleBtn.innerHTML = `<i class="fa-solid fa-sun theme-icon"></i> <span class="dm-label sr-only-mobile">${STRINGS[lang].light}</span>`
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    body.style.transition = 'background 0.6s ease, color 0.6s ease'
    body.classList.toggle('dark')
    // Update icon and animate it
    if (body.classList.contains('dark')) {
      toggleBtn.innerHTML = `<i class="fa-solid fa-sun theme-icon"></i> <span class="dm-label sr-only-mobile">${STRINGS[lang].light}</span>`
      // animate the new icon
      const icon = toggleBtn.querySelector('.theme-icon')
      animateThemeIcon(icon)
      localStorage.setItem('theme', 'dark')
    } else {
      toggleBtn.innerHTML = `<i class="fa-sharp fa-solid fa-moon theme-icon"></i> <span class="dm-label sr-only-mobile">${STRINGS[lang].dark}</span>`
      const icon = toggleBtn.querySelector('.theme-icon')
      animateThemeIcon(icon)
      localStorage.setItem('theme', 'light')
    }
  })
}

// Typing animation (localized)
const text = STRINGS[lang].typing
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

// Language dropdown behavior
;(function () {
  const dropdown = document.getElementById('langDropdown')
  const btn = document.getElementById('langBtn')
  const menu = dropdown ? dropdown.querySelector('.lang-menu') : null
  const label = dropdown ? dropdown.querySelector('.lang-label') : null

  if (!dropdown || !btn || !menu) return

  // Set initial label based on path
  const path = window.location.pathname
  if (path.startsWith('/id')) {
    if (label) label.textContent = 'ID'
  } else {
    if (label) label.textContent = 'EN'
  }

  const openDropdown = () => {
    dropdown.classList.add('open')
    btn.setAttribute('aria-expanded', 'true')
  }

  const closeDropdown = () => {
    dropdown.classList.remove('open')
    btn.setAttribute('aria-expanded', 'false')
  }

  btn.addEventListener('click', e => {
    e.stopPropagation()
    if (dropdown.classList.contains('open')) closeDropdown()
    else openDropdown()
  })

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) closeDropdown()
  })

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDropdown()
  })

  // Update label if user selects a language (progressive enhancement)
  menu.querySelectorAll('a[data-lang]').forEach(a => {
    a.addEventListener('click', () => {
      const l = a.getAttribute('data-lang')
      if (label) label.textContent = l.toUpperCase()
      // dropdown will close when navigation happens
    })
  })
})()
