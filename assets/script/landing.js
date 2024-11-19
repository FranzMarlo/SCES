document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the document
    navMenu.classList.toggle("show");
  });

  // Close the menu when clicking outside of the hamburger or nav menu
  document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove("show");
    }
  });

  // Prevent clicks inside the nav menu or hamburger from closing the menu
  navMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  const navLinks = document.querySelectorAll(".nav-menu a");
  const offset = document.querySelector(".nav-bar").offsetHeight; // Height of the navbar

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor click behavior

      // Remove active class from all menu items
      navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
      });

      // Add active class to the clicked menu item
      this.classList.add("active");

      const targetId = this.getAttribute("href").substring(1); // Remove the '#' from href
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const targetPosition = targetElement.offsetTop - offset; // Adjust position by navbar height
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
  document.getElementById("more-btn").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor click behavior

    const targetId = "about"; // The ID of the target section
    const targetSection = document.getElementById(targetId);
    const offset = document.querySelector(".nav-bar").offsetHeight; // Height of the navbar

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: "smooth",
      });
    }
  });

  
});
const modal = document.getElementById("infoModal");
  const closeModal = document.getElementById("closeModal");

  function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
  }

  function closeModalHandler() {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
  }

  closeModal.addEventListener("click", closeModalHandler);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalHandler();
    }
  });