const GITHUB_USERNAME = "Eric-Montero";
const CURRENT_CV = "assets/CV_Eric_Montero_Actualizado_NurseMarket.pdf";
const NURSEMARKET_WEB = "https://nursemarket-app.vercel.app";

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
    themeToggle.setAttribute(
      "aria-label",
      light ? "Activar modo oscuro" : "Activar modo claro"
    );
  }
}

const savedTheme = localStorage.getItem("theme");
const systemPrefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
applyTheme(savedTheme || (systemPrefersLight ? "light" : "dark"));

themeToggle?.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("light-mode") ? "dark" : "light");
});

function addPortfolioEnhancementStyles() {
  if (document.getElementById("portfolio-enhancement-styles")) return;
  const style = document.createElement("style");
  style.id = "portfolio-enhancement-styles";
  style.textContent = `
    .portfolio-highlights { margin: -0.35rem 0 1.45rem; }
    .portfolio-highlights span { color: var(--text); background: rgba(105,210,255,.055); }
    #nursemarket-featured {
      border-color: rgba(83,211,155,.28);
      background: linear-gradient(135deg, rgba(83,211,155,.09), rgba(105,210,255,.08), rgba(165,139,255,.06));
    }
    #nursemarket-featured .project-mockup {
      background: radial-gradient(circle at center, rgba(83,211,155,.18), transparent 45%), linear-gradient(160deg,#07111f,#0d2730);
    }
    #nursemarket-featured .project-mockup i { color: #53d39b; }
    .project-proof {
      display: flex;
      flex-wrap: wrap;
      gap: .55rem;
      margin: 1rem 0 0;
    }
    .project-proof span {
      display: inline-flex;
      align-items: center;
      gap: .4rem;
      padding: .38rem .65rem;
      border-radius: 999px;
      border: 1px solid var(--line);
      color: var(--muted);
      font-size: .78rem;
      font-weight: 700;
    }
    .project-proof i { color: var(--success); }
    .nav-cv-link {
      color: var(--text) !important;
      padding: .52rem .75rem;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--surface);
    }
    @media (max-width: 700px) {
      .portfolio-highlights { margin-top: -.15rem; }
      .project-proof { gap: .45rem; }
    }
  `;
  document.head.appendChild(style);
}

function wireCurrentCv() {
  document.querySelectorAll('a[href*="CV_Eric_Montero"]').forEach((link) => {
    link.href = CURRENT_CV;
    link.target = "_blank";
    link.rel = "noopener";
    if (/ver cv/i.test(link.textContent || "")) {
      link.innerHTML = '<i class="fa-solid fa-file-lines"></i> Ver CV actualizado';
    }
  });

  if (navMenu && !navMenu.querySelector(".nav-cv-link")) {
    const cvLink = document.createElement("a");
    cvLink.className = "nav-cv-link";
    cvLink.href = CURRENT_CV;
    cvLink.target = "_blank";
    cvLink.rel = "noopener";
    cvLink.innerHTML = '<i class="fa-regular fa-file-lines"></i> CV';
    navMenu.insertBefore(cvLink, themeToggle);
  }

  const contactActions = document.querySelector("#contact .contact-actions");
  if (contactActions && !contactActions.querySelector('[href*="CV_Eric_Montero_Actualizado"]')) {
    const cvButton = document.createElement("a");
    cvButton.className = "button secondary";
    cvButton.href = CURRENT_CV;
    cvButton.target = "_blank";
    cvButton.rel = "noopener";
    cvButton.innerHTML = '<i class="fa-solid fa-file-arrow-down"></i> Abrir CV';
    contactActions.insertBefore(cvButton, contactActions.children[1] || null);
  }
}

// Professional positioning for recruiters and presentation visitors.
function enhancePortfolioForRecruiting() {
  document.title = "Eric Montero | Front-End / Full Stack Junior · Flutter & Web";

  const heroTitle = document.querySelector("#hero h1");
  if (heroTitle) {
    heroTitle.innerHTML = 'Construyo productos <span>web y multiplataforma</span> con enfoque Full Stack.';
  }

  const heroLead = document.querySelector(".hero-lead");
  if (heroLead) {
    heroLead.innerHTML = `
      Soy <strong>Eric Montero</strong>, desarrollador Web Junior con formación Full Stack y enfoque en Front-End.
      Construyo interfaces responsivas, APIs, soluciones con datos y aplicaciones multiplataforma con
      <strong>React, Next.js, Django, Flutter y Firebase</strong>. Actualmente busco una pasantía o posición Junior
      donde pueda aportar, recibir code review y seguir creciendo dentro de un equipo.
    `;
  }

  const heroRole = document.querySelector(".hero-role");
  if (heroRole && !document.querySelector(".portfolio-highlights")) {
    const highlights = document.createElement("div");
    highlights.className = "tag-list portfolio-highlights";
    highlights.innerHTML = `
      <span>Flutter · Android · iOS · Web</span>
      <span>Firebase · Firestore</span>
      <span>React · Next.js</span>
      <span>Django · REST APIs</span>
    `;
    heroRole.insertAdjacentElement("afterend", highlights);
  }

  const summaryBlocks = document.querySelectorAll(".profile-summary > div");
  if (summaryBlocks.length >= 3) {
    summaryBlocks[1].querySelector("strong").textContent = "3";
    summaryBlocks[1].querySelector("span").textContent = "plataformas en NurseMarket";
    summaryBlocks[2].querySelector("strong").textContent = "10+";
    summaryBlocks[2].querySelector("span").textContent = "credenciales y cursos";
  }

  const aboutHeading = document.querySelector("#about .section-heading h2");
  if (aboutHeading) {
    aboutHeading.textContent = "Puedo llevar una idea desde la interfaz hasta los datos y el despliegue.";
  }

  const aboutCopy = document.querySelector("#about .section-heading p:last-child");
  if (aboutCopy) {
    aboutCopy.textContent = "Mi portafolio demuestra aprendizaje aplicado: UI responsive, APIs, Firebase, bases de datos, seguridad, despliegue y evolución de productos reales.";
  }

  const capabilityCards = [...document.querySelectorAll("#about .capability-card")];
  const mobileCapability = capabilityCards[3];
  if (mobileCapability) {
    const heading = mobileCapability.querySelector("h3");
    const copy = mobileCapability.querySelector("p");
    const icon = mobileCapability.querySelector("i");
    if (heading) heading.textContent = "Mobile & Multiplataforma";
    if (copy) copy.textContent = "Aplicaciones con Flutter y Dart para Android, iOS y Web, integradas con Firebase, Firestore y gestión de estado con Riverpod.";
    if (icon) icon.className = "fa-solid fa-mobile-screen-button";
  }

  const mobileStack = [...document.querySelectorAll("#skills .stack-card")].find(
    (card) => card.querySelector("h3")?.textContent.trim() === "Mobile"
  );
  if (mobileStack) {
    const tags = mobileStack.querySelector(".tag-list");
    if (tags) {
      tags.innerHTML = "<span>Flutter</span><span>Dart</span><span>Firebase</span><span>Riverpod</span><span>Android</span><span>iOS</span><span>Kotlin</span>";
    }
  }

  const projectsHeading = document.querySelector("#projects .section-heading h2");
  if (projectsHeading) projectsHeading.textContent = "Productos que demuestran cómo trabajo";

  const projectsIntro = document.querySelector("#projects .section-heading p:last-child");
  if (projectsIntro) {
    projectsIntro.textContent = "NurseMarket muestra arquitectura multiplataforma y roles de negocio; GameZoneDL demuestra una experiencia web amplia y desplegada. El resto refuerza JavaScript, Python, datos y APIs.";
  }

  const existingFeatured = document.querySelector("#projects .featured-project");
  if (!existingFeatured || document.getElementById("nursemarket-featured")) return;

  const nursemarket = document.createElement("article");
  nursemarket.id = "nursemarket-featured";
  nursemarket.className = "featured-project reveal visible";
  nursemarket.innerHTML = `
    <div class="featured-visual">
      <div class="browser-frame">
        <div class="browser-bar"><span></span><span></span><span></span><small>Flutter · Firebase · Web / Android / iOS</small></div>
        <div class="project-mockup">
          <i class="fa-solid fa-heart-pulse"></i>
          <strong>NurseMarket</strong>
          <span>Marketplace de cuidado en casa · MVP avanzado</span>
        </div>
      </div>
    </div>
    <div class="featured-content">
      <span class="project-label">Proyecto insignia · MVP / Preproducción</span>
      <h3>NurseMarket / Cuidado con Amor</h3>
      <p>
        Marketplace multiplataforma para conectar pacientes y familias con profesionales de enfermería.
        Implementa autenticación, experiencias separadas para paciente, enfermera y administrador,
        perfiles profesionales, búsqueda, reservas, chat, notificaciones, agenda, validación y módulos financieros.
        El backend seguro con Cloud Functions está preparado para la siguiente fase de despliegue.
      </p>
      <div class="project-proof">
        <span><i class="fa-solid fa-check"></i> Web responsive</span>
        <span><i class="fa-solid fa-check"></i> Android probado en dispositivo real</span>
        <span><i class="fa-solid fa-check"></i> Arquitectura iOS</span>
      </div>
      <div class="tag-list project-tags">
        <span>Flutter</span><span>Dart</span><span>Firebase Auth</span><span>Firestore</span><span>Riverpod</span><span>Cloud Functions</span>
      </div>
      <div class="project-actions">
        <a class="button primary" href="${NURSEMARKET_WEB}" target="_blank" rel="noopener">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo web
        </a>
        <a class="button secondary" href="https://github.com/Eric-Montero/nursemarket-app" target="_blank" rel="noopener">
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
    gameZoneDescription.textContent = "Plataforma web Full Stack con catálogo gamer, búsqueda, perfiles, favoritos, reseñas, comunidad, marketplace y contenido dinámico. Demuestra construcción de una experiencia amplia, consumo de datos y despliegue real.";
  }
}

addPortfolioEnhancementStyles();
wireCurrentCv();
enhancePortfolioForRecruiting();

// Typing effect
const roles = [
  "Flutter · Firebase · Riverpod",
  "React · Next.js · TypeScript",
  "Django · REST APIs · SQL",
  "Android · iOS · Web",
  "Git · GitHub · Deploy"
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