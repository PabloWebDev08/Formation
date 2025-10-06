// Active le menu mobile accessible et le scroll fluide
(function () {
  // Sélecteurs sûrs
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var header = document.querySelector(".site-header");
  var yearSpan = document.getElementById("year");

  // Mise à jour de l'année du footer
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Toggle du menu mobile
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      // Empêche le scroll de fond quand le menu est ouvert sur mobile
      document.documentElement.style.overflow = isOpen ? "hidden" : "";
    });
  }

  // Fermeture du menu lors d'un clic sur un lien
  if (nav) {
    nav.addEventListener("click", function (e) {
      var target = e.target;
      if (target && target.tagName === "A") {
        nav.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        document.documentElement.style.overflow = "";
      }
    });
  }

  // Scroll fluide avec offset du header sticky
  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var hash = this.getAttribute("href");
      if (!hash || hash === "#") return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var targetTop =
        target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    });
  });
})();
