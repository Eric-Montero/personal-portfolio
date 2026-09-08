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

// Professional positioning for recruiting/event visitors.
function enhancePortfolioForRecruiting() {
  const heroLead = document.querySelector(".hero-lead");
  if (heroLead) {
    heroLead.innerHTML = `
      Soy <strong>Eric Montero</strong>, desarrollador Full-Stack Junior enfocado en construir productos reales.
      Trabajo con frontend, backend, bases de datos y aplicaciones móviles, y actualmente busco una
      <strong>pasantía o posición Junior</strong> donde pueda aportar, recibir code review y seguir creciendo dentro de un equipo.
    `;
  }

  const aboutHeading = document.querySelector("#about .section-heading h2");
  if (aboutHeading) {
    aboutHeading.textContent = "Construyo proyectos completos y puedo explicar las decisiones detrás del código.";
  }

  const aboutCopy = document.querySelector("#about .section-heading p:last-child");
  if (aboutCopy) {
    aboutCopy.textContent = "Mi enfoque es demostrar aprendizaje aplicado: interfaces, APIs, datos, seguridad, despliegue y evolución de productos.";
  }

  const projectsIntro = document.querySelector("#projects .section-heading p:last-child");
  if (projectsIntro) {
    projectsIntro.textContent = "Estos proyectos muestran dos niveles de trabajo: un producto web desplegado y una aplicación móvil Full-Stack en preproducción.";
  }

  const existingFeatured = document.querySelector("#projects .featured-project");
  if (!existingFeatured || document.getElementById("nursemarket-featured")) return;

  const nursemarket = document.createElement("article");
  nursemarket.id = "nursemarket-featured";
  nursemarket.className = "featured-project reveal visible";
  nursemarket.innerHTML = `
    <div class="featured-visual">
      <div class="browser-frame">
        <div class="browser-bar"><span></span><span></span><span></span><small>Flutter · Firebase · Cloud Functions</small></div>
        <div class="project-mockup">
          <i class="fa-solid fa-heart-pulse"></i>
          <strong>NurseMarket / Cuidado con Amor</strong>
          <span>Proyecto insignia · MVP avanzado en preproducción</span>
        </div>
      </div>
    </div>
    <div class="featured-content">
      <span class="project-label">Proyecto principal · En desarrollo</span>
      <h3>NurseMarket</h3>
      <p>
        Marketplace móvil para conectar pacientes y familias con profesionales de enfermería.
        Incluye autenticación, roles, perfiles, verificación de enfermeras, reservas, chat,
        funcionalidades en tiempo real y operaciones privilegiadas movidas a backend.
      </p>
      <div class="tag-list project-tags">
        <span>Flutter</span><span>Dart</span><span>Firebase</span><span>Cloud Functions</span><span>Admin SDK</span><span>Riverpod</span>
      </div>
      <div class="project-actions">
        <a class="button primary" href="https://github.com/Eric-Montero/nursemarket-app" target="_blank" rel="noopener">
          <i class="fa-brands fa-github"></i> Ver código
        </a>
      </div>
    </div>
  `;

  existingFeatured.parentNode.insertBefore(nursemarket, existingFeatured);

  const gameZoneLabel = existingFeatured.querySelector(".project-label");
  const gameZoneDescription = existingFeatured.querySelector(".featured-content p");
  const gameZoneStatus = existingFeatured.querySelector(".project-mockup span");

  if (gameZoneLabel) gameZoneLabel.textContent = "Proyecto web desplegado";
  if (gameZoneStatus) gameZoneStatus.textContent = "Gaming discovery & community · Demo en producción";
  if (gameZoneDescription) {
    gameZoneDescription.textContent = "Plataforma gamer Full-Stack con catálogo, búsqueda, favoritos, listas, reseñas, comunidad, marketplace y diferentes áreas de contenido. Demuestra arquitectura de una aplicación amplia, manejo de datos y despliegue real en Vercel.";
  }
}

enhancePortfolioForRecruiting();

// Typing effect
const roles = [
  "React · Next.js · TypeScript",
  "Flutter · Firebase · Riverpod",
  "Cloud Functions · Admin SDK",
  "Django · Node.js · REST APIs",
  "SQL · PostgreSQL · Supabase"
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
