const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const toast = document.querySelector("#pending-toast");
const pendingLinks = document.querySelectorAll("[data-not-implemented]");

function showToast(text) {
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

for (const link of pendingLinks) {
  link.addEventListener("click", () => {
    const section = link.getAttribute("data-not-implemented") ?? "Cette section";
    sessionStorage.setItem("pendingSectionNotice", section);
    showToast(`"${section}" n'est pas encore implémentée.`);
  });
}

const pendingNotice = document.querySelector("[data-pending-notice]");
if (pendingNotice) {
  const params = new URLSearchParams(window.location.search);
  const sectionFromUrl = params.get("section");
  const sectionFromSession = sessionStorage.getItem("pendingSectionNotice");
  const section = sectionFromUrl || sectionFromSession || "Cette section";

  pendingNotice.textContent = `La section "${section}" n'est pas encore implémentée.`;
  sessionStorage.removeItem("pendingSectionNotice");
}
