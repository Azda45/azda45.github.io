// ========================
// Auto Redirect (safe)
// ========================
const userLang = (navigator.language || navigator.userLanguage).toLowerCase()
const path = window.location.pathname

// Hindari redirect loop + simpan preferensi
if (!localStorage.getItem('langSet')) {
  if (userLang.startsWith('id') && !path.startsWith('/id')) {
    localStorage.setItem('langSet', 'id')
    window.location.href = '/id'
  } else if (!userLang.startsWith('id') && path.startsWith('/id')) {
    localStorage.setItem('langSet', 'en')
    window.location.href = '/'
  }
}

// ========================
// Auto-update Tahun
// ========================
const yearEl = document.getElementById('year')
if (yearEl) {
  yearEl.textContent = new Date().getFullYear()
}

// ========================
// Dark Mode Toggle
// ========================
const toggleBtn = document.getElementById('darkModeToggle')
const body = document.body

function animateThemeIcon (icon) {
  if (!icon) return
  icon.classList.add('theme-icon')
  void icon.offsetWidth // trigger reflow
  icon.classList.add('spin')
  const cleanup = () => {
    icon.classList.remove('spin')
    icon.removeEventListener('animationend', cleanup)
  }
  icon.addEventListener('animationend', cleanup)
}

// Tentukan bahasa berdasar path
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
    if (body.classList.contains('dark')) {
      toggleBtn.innerHTML = `<i class="fa-solid fa-sun theme-icon"></i> <span class="dm-label sr-only-mobile">${STRINGS[lang].light}</span>`
      animateThemeIcon(toggleBtn.querySelector('.theme-icon'))
      localStorage.setItem('theme', 'dark')
    } else {
      toggleBtn.innerHTML = `<i class="fa-sharp fa-solid fa-moon theme-icon"></i> <span class="dm-label sr-only-mobile">${STRINGS[lang].dark}</span>`
      animateThemeIcon(toggleBtn.querySelector('.theme-icon'))
      localStorage.setItem('theme', 'light')
    }
  })
}

// ========================
// Typing Animation
// ========================
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

// ========================
// Language Dropdown
// ========================
;(function () {
  const dropdown = document.getElementById('langDropdown')
  const btn = document.getElementById('langBtn')
  const menu = dropdown ? dropdown.querySelector('.lang-menu') : null
  const label = dropdown ? dropdown.querySelector('.lang-label') : null

  if (!dropdown || !btn || !menu) return

  // Set initial label
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
    dropdown.classList.contains('open') ? closeDropdown() : openDropdown()
  })

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) closeDropdown()
  })

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDropdown()
  })

  // Update label when user selects language
  menu.querySelectorAll('a[data-lang]').forEach(a => {
    a.addEventListener('click', () => {
      const l = a.getAttribute('data-lang')
      if (label) label.textContent = l.toUpperCase()
      // dropdown akan tertutup saat navigasi
    })
  })
})()
