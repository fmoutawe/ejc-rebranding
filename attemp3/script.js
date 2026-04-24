(function () {
  const notice = document.getElementById("notice");
  const pendingLinks = document.querySelectorAll(".pending-link");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");

  function showNotice(message) {
    if (!notice) {
      window.alert(message);
      return;
    }

    notice.textContent = message;
    notice.classList.add("show");
    window.clearTimeout(showNotice.timer);
    showNotice.timer = window.setTimeout(() => {
      notice.classList.remove("show");
    }, 2800);
  }

  pendingLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#")) {
        return;
      }

      const target = document.querySelector(href);
      if (target && href !== "#") {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (
        href === "#programme" ||
        href === "#intervenants" ||
        href === "#projets" ||
        href === "#que-sont-les-ejc"
      ) {
        return;
      }

      event.preventDefault();
      showNotice("Cette section n'est pas encore implémentée.");
    });
  });

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("open");
    });
  }
})();
