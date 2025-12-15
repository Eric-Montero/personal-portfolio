const GITHUB_USERNAME = "Eric-Montero";
const REPO_COUNT = 6;
const reposContainer = document.getElementById("repos-container");

/* =========================
   Utils
========================= */
const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/* =========================
   Scroll Reveal Animation
========================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.classList.remove("hidden");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

/* =========================
   Typing Effect
========================= */
const typingText = document.getElementById("typing-text");
const words = ["Full-Stack Developer", "WordPress Specialist", "UI/UX Designer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const pauseTime = 2000;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, pauseTime);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed);
  }
}

/* =========================
   Fetch GitHub Repos
========================= */
async function fetchRepos() {
  if (!reposContainer) return;

  reposContainer.innerHTML = `<p class="loading">Cargando repositorios...</p>`;

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`
    );

    if (!response.ok) throw new Error("Error al cargar repositorios.");

    const repos = await response.json();

    const filteredRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, REPO_COUNT);

    if (!filteredRepos.length) {
      reposContainer.innerHTML = "<p>No hay repositorios públicos recientes.</p>";
      return;
    }

    reposContainer.innerHTML = "";

    filteredRepos.forEach((repo, index) => {
      const card = document.createElement("article");
      card.className = "project card hidden"; // Start hidden for animation
      // Add staggered delay based on index for nicer effect? 
      // CSS can handle it or we rely on scroll position.
      // Let's just observe it.

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "Sin descripción disponible."}</p>
        <div class="project-meta">
          <span>${repo.language || "Código"}</span>
          <span>${formatDate(repo.updated_at)}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="project-link">
          Ver en GitHub
        </a>
      `;

      reposContainer.appendChild(card);
      revealObserver.observe(card);
    });

  } catch (error) {
    console.error(error);
    reposContainer.innerHTML = `<p class="error">No se pudo conectar con GitHub.</p>`;
  }
}

/* =========================
   Theme Toggle
========================= */
function toggleTheme() {
  const body = document.body;
  const icon = document.querySelector("#theme-toggle i");

  // Logic inverted slightly: now default is dark (no class), light is 'light-mode'
  // But wait, style.css defined :root (dark) and body.light-mode.
  // Previous logic: body.dark-mode was distinct.
  // New style.css: default is dark. .light-mode is overridden.

  // Check if we are currently light
  const isLight = body.classList.contains("light-mode");

  if (isLight) {
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
    icon.className = "fas fa-moon";
  } else {
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    icon.className = "fas fa-sun";
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const icon = document.querySelector("#theme-toggle i");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (icon) icon.className = "fas fa-sun";
  } else {
    document.body.classList.remove("light-mode"); // Ensure dark default
    if (icon) icon.className = "fas fa-moon";
  }
}

/* =========================
   Init
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();

  // Theme Toggle
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Init Typing Effect
  if (typingText) setTimeout(typeEffect, 1000);

  // Init Scroll Reveal
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => revealObserver.observe(el));

  // Load Repos
  fetchRepos();
});

/* =========================
   Certificate Click Preview
========================= */
function openCertModal(imagePath, certLink) {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalLink = document.getElementById('cert-modal-link');
  modalImg.src = imagePath;
  if (modalLink && certLink) {
    modalLink.href = certLink;
  }
  modal.classList.add('active');
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  modal.classList.remove('active');
}

// Close modal on background click
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('cert-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCertModal();
      }
    });
  }

  // Add click handlers to certificate cards
  const certCards = document.querySelectorAll('.cert-card[data-cert-image]');
  certCards.forEach(card => {
    const certLink = card.querySelector('.cert-link');
    const imagePath = card.getAttribute('data-cert-image');
    let clickCount = 0;
    let clickTimer = null;

    if (certLink && imagePath) {
      certLink.addEventListener('click', (e) => {
        e.preventDefault();
        clickCount++;

        if (clickCount === 1) {
          // First click: show preview
          clickTimer = setTimeout(() => {
            openCertModal(imagePath, certLink.href);
            clickCount = 0;
          }, 300);
        } else if (clickCount === 2) {
          // Second click: go to link
          clearTimeout(clickTimer);
          window.open(certLink.href, '_blank');
          clickCount = 0;
        }
      });
    }
  });
});
