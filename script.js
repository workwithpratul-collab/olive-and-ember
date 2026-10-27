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
const reservationTime = document.querySelector("#reservation-time");
const reservationFeedback = document.querySelector("#reservation-feedback");
const reservationSubmit = reservationForm?.querySelector(
  'button[type="submit"]'
);

if (
  reservationForm &&
  reservationDate &&
  reservationTime &&
  reservationFeedback
) {
  // Get today's date using the visitor's local calendar.
  function getLocalDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Get the current local time in HH:MM format.
  function getLocalTimeString() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  // Prevent selecting a date in the past.
  reservationDate.min = getLocalDateString();

  // Clear time validation when the visitor changes the date or time.
  reservationDate.addEventListener("change", () => {
    reservationTime.setCustomValidity("");
  });

  reservationTime.addEventListener("change", () => {
    reservationTime.setCustomValidity("");
  });

  reservationForm.addEventListener("submit", (event) => {
    // This is a demo: never send the form to a server.
    event.preventDefault();

    reservationTime.setCustomValidity("");

    // Run the browser's built-in required-field validation.
    if (!reservationForm.reportValidity()) {
      return;
    }

    const selectedDate = reservationDate.value;
    const selectedTime = reservationTime.value;
    const today = getLocalDateString();

    // Extra protection against past dates.
    if (selectedDate < today) {
      reservationDate.setCustomValidity(
        "Please choose today or a future date."
      );
      reservationDate.reportValidity();
      reservationDate.setCustomValidity("");
      return;
    }

    // If the visitor chooses today, reject times that have passed.
    if (
      selectedDate === today &&
      selectedTime <= getLocalTimeString()
    ) {
      reservationTime.setCustomValidity(
        "That time has passed. Please choose a later time."
      );
      reservationTime.reportValidity();
      reservationTime.setCustomValidity("");
      return;
    }

    const guestName =
      reservationForm.elements.guestName.value.trim();

    // Display a demo confirmation without transmitting any information.
    reservationFeedback.textContent =
      `Thank you, ${guestName}! Your demo reservation request has been received for review. No real booking has been made.`;

 reservationFeedback.hidden = false;

if (reservationSubmit) {
  reservationSubmit.disabled = true;
  reservationSubmit.textContent = "Demo Request Submitted";
}

    // Bring the confirmation into view accessibly.
    reservationFeedback.focus({ preventScroll: true });
    reservationFeedback.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  });
// Re-enable the button when the visitor edits the form.
  function resetDemoSubmission() {
    if (reservationSubmit && reservationSubmit.disabled) {
      reservationSubmit.disabled = false;
      reservationSubmit.textContent = "Request a table";

      reservationFeedback.hidden = true;
      reservationFeedback.textContent = "";
    }
  }

  reservationForm.addEventListener("input", resetDemoSubmission);
  reservationForm.addEventListener("change", resetDemoSubmission);
}
/* ========================================
   DAY 11 — SCROLL REVEAL
======================================== */

(() => {
  const revealElements = document.querySelectorAll(".reveal");

  if (
    !revealElements.length ||
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  document.documentElement.classList.add("reveal-ready");

  revealElements.forEach((element) => observer.observe(element));
})();