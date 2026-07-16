document.getElementById('year').textContent = new Date().getFullYear();

const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const typingText = document.getElementById('typing-text');

const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
document.body.setAttribute('data-theme', initialTheme);
if (themeToggle) {
  themeToggle.textContent = initialTheme === 'light' ? '🌙' : '☀︎';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    themeToggle.textContent = nextTheme === 'light' ? '🌙' : '☀︎';
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));

const words = ['scalable apps', 'AI copilots', 'smart platforms', 'beautiful experiences'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];
  if (!typingText) return;

  if (!deleting) {
    typingText.textContent = currentWord.slice(0, ++charIndex);
    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
    setTimeout(typeLoop, 90);
  } else {
    typingText.textContent = currentWord.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeLoop, 60);
  }
}

typeLoop();

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.getAttribute('data-count'));
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 36));

    const timer = window.setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = `${target}`;
        window.clearInterval(timer);
        counterObserver.unobserve(counter);
      } else {
        counter.textContent = `${current}`;
      }
    }, 30);
  });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const mailToLink = `mailto:officialankush84ya@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailToLink;
    if (formMessage) {
      formMessage.textContent = 'Opening your mail client now...';
    }
  });
}
