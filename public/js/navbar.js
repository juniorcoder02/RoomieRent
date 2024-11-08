
  document.addEventListener("DOMContentLoaded", function () {
    const navbarToggle = document.querySelector(".navbar-toggle");
    const navbarMenu = document.querySelector(".navbar ul");

    navbarToggle.addEventListener("click", function () {
      navbarMenu.classList.toggle("show");
    });
  });

