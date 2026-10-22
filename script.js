const menuToggle = document.querySelector(".menu-toggle");
const headerMenu = document.querySelector(".header-menu");

if (menuToggle && headerMenu) {
  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    headerMenu.classList.remove("is-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu"
    );

    headerMenu.classList.toggle("is-open", !isOpen);
  });

  headerMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });
}