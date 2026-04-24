const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const toast = document.querySelector("[data-toast]");
const searchOpen = document.querySelector("[data-search-open]");
const searchClose = document.querySelector("[data-search-close]");
const searchDialog = document.querySelector("[data-search-dialog]");
const searchForm = document.querySelector("[data-search-form]");
const newsletterForm = document.querySelector("[data-newsletter-form]");

let toastTimer;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4200);
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMenu() {
  nav.classList.remove("is-open");
  header.classList.remove("nav-active");
  document.body.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const willOpen = !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", willOpen);
  header.classList.toggle("nav-active", willOpen);
  document.body.classList.toggle("nav-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
});

document.querySelectorAll("[data-unimplemented]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    closeMenu();
    showToast("Cette section n'est pas encore implémentée. La refonte démarre par la page d'accueil.");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeMenu);
});

searchOpen.addEventListener("click", () => {
  if (typeof searchDialog.showModal === "function") {
    searchDialog.showModal();
    searchDialog.querySelector("input").focus();
  } else {
    showToast("La recherche sera implémentée dans une prochaine page.");
  }
});

searchClose.addEventListener("click", () => searchDialog.close());

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchDialog.close();
  showToast("La recherche du site n'est pas encore implémentée.");
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterForm.reset();
  showToast("L'inscription à la lettre d'information sera raccordée lors de l'intégration des formulaires.");
});

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const node = entry.target;
    const target = Number(node.dataset.count);
    const start = performance.now();
    const duration = 1200;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(target * eased).toLocaleString("fr-FR");

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
    observer.unobserve(node);
  });
}, { threshold: 0.35 });

counters.forEach((counter) => counterObserver.observe(counter));
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeMenu();
});
updateHeader();
