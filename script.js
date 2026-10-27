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
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  if (event.key === "Escape" && isOpen) {
    closeMenu();
    menuToggle.focus();
  }
});
}
/* ========================================
   RESERVATION FORM — DEMO
======================================== */

const reservationForm = document.querySelector("#reservation-form");
const reservationDate = document.querySelector("#reservation-date");
const reservationFeedback = document.querySelector("#reservation-feedback");

if (reservationForm && reservationDate && reservationFeedback) {
  // Format today's date using the visitor's local calendar date.
  function getLocalDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Prevent selecting a date in the past.
  reservationDate.min = getLocalDateString();

  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Run the browser's built-in required-field and input validation.
    if (!reservationForm.reportValidity()) {
      return;
    }

    const selectedDate = reservationDate.value;
    const today = getLocalDateString();

    // Also check the date in JavaScript.
    if (selectedDate < today) {
      reservationDate.setCustomValidity(
        "Please choose today or a future date."
      );
      reservationDate.reportValidity();
      reservationDate.setCustomValidity("");
      return;
    }

    const guestName = reservationForm.elements.guestName.value.trim();

    reservationFeedback.textContent =
      `Thank you, ${guestName}! Your demo reservation request has been received for review. No real booking has been made.`;

    reservationFeedback.hidden = false;

    // Bring the confirmation into view for keyboard and screen-reader users.
    reservationFeedback.focus({ preventScroll: true });
    reservationFeedback.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  });
}