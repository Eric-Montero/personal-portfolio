const GITHUB_USERNAME = "Eric-Montero";

const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const typingText = document.getElementById("typing-text");
const repoCount = document.getElementById("repo-count");
const currentYear = document.getElementById("current-year");

// Mobile navigation
navToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    if (navToggle) navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Theme persistence
function applyTheme(theme) {
  const light = theme === "light";
  document.body.classList.toggle("light-mode", light);
  localStorage.setItem("theme", light ? "light" : "dark");
  if (themeToggle) {
    themeToggle.innerHTML = light
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    themeToggle.setAttribute("aria-label", light ? "Activar modo oscuro" : "Activar modo claro");
  }
}

const savedTheme = localStorage.getItem("theme");
const systemPrefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
applyTheme(savedTheme || (systemPrefersLight ? "light" : "dark"));

themeToggle?.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("light-mode") ? "dark" : "light");
});

// Typing effect
const roles = [
  "React · Next.js · JavaScript",
  "Django · Node.js · REST APIs",
  "SQL · PostgreSQL · SQLite",
  "Python · D3.js · Kotlin",
  "WordPress · WooCommerce · SEO"
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  if (!typingText || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const value = roles[roleIndex];
  charIndex += deleting ? -1 : 1;
  typingText.textContent = value.slice(0, charIndex);

  if (!deleting && charIndex === value.length) {
    deleting = true;
    setTimeout(typeRole, 1500);
    return;
  }
  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeRole, deleting ? 32 : 58);
}
if (typingText) {
  typingText.textContent = "";
  setTimeout(typeRole, 450);
}

// Reveal on scroll
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((el) => revealObserver.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("visible"));
}

// Active section in navigation
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  }, { rootMargin: "-28% 0px -58% 0px", threshold: [0.1, 0.25, 0.5] });
  sections.forEach((section) => sectionObserver.observe(section));
}

// GitHub public profile metadata. Gracefully keeps the static fallback if API is unavailable.
async function loadGitHubProfile() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) return;
    const profile = await response.json();
    if (repoCount && Number.isFinite(profile.public_repos)) {
      repoCount.textContent = profile.public_repos;
    }
  } catch (error) {
    console.info("GitHub profile data unavailable; using local fallback.");
  }
}
loadGitHubProfile();

if (currentYear) currentYear.textContent = new Date().getFullYear();
