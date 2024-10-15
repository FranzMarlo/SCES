$(".menu-btn").on("click", function (e) {
  e.stopPropagation();
  if ($(".dropdown-content").hasClass("show")) {
    $(".dropdown-content").removeClass("show");
  } else if ($(".module-dropdown-content").hasClass("show-modules")) {
    $(".module-dropdown-content").removeClass("show-modules");
  } else if ($(".quiz-dropdown-content").hasClass("show-quizzes")) {
    $(".quiz-dropdown-content").removeClass("show-quizzes");
  }
  $(".pop-up").toggleClass("active");
  $(".overlay").toggle();
});

$(document).on("click", function (e) {
  if (
    !$(e.target).closest(".pop-up").length &&
    $(".pop-up").hasClass("active")
  ) {
    $(".pop-up").removeClass("active");
    $(".overlay").hide();
  }
});

$(".overlay").on("click", function () {
  $(".pop-up").removeClass("active");
  $(this).hide();
});

$(".pop-btn").on("click", function (e) {
  e.stopPropagation();
  if ($(".module-dropdown-content").hasClass("show-modules")) {
    $(".module-dropdown-content").removeClass("show-modules");
  } else if ($(".quiz-dropdown-content").hasClass("show-quizzes")) {
    $(".quiz-dropdown-content").removeClass("show-quizzes");
  }
  $(".dropdown-content").toggleClass("show");
});

$(document).on("click", function (e) {
  if (!$(e.target).closest(".pop-btn, .dropdown-content").length) {
    $(".dropdown-content").removeClass("show");
  }
});

$(".module-btn").on("click", function (e) {
  e.stopPropagation();
  if ($(".dropdown-content").hasClass("show")) {
    $(".dropdown-content").removeClass("show");
  }
  $(".module-dropdown-content").toggleClass("show-modules");
});

$(document).on("click", function (e) {
  if (!$(e.target).closest(".module-btn, .module-dropdown-content").length) {
    $(".module-dropdown-content").removeClass("show-modules");
  }
});

$(".quiz-btn").on("click", function (e) {
  e.stopPropagation();
  if ($(".dropdown-content").hasClass("show")) {
    $(".dropdown-content").removeClass("show");
  } else if ($(".module-dropdown-content").hasClass("show-modules")) {
    $(".module-dropdown-content").removeClass("show-modules");
  }
  $(".quiz-dropdown-content").toggleClass("show-quizzes");
});

$(document).on("click", function (e) {
  if (!$(e.target).closest(".quiz-btn, .quiz-dropdown-content").length) {
    $(".quiz-dropdown-content").removeClass("show-quizzes");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const activeItem = document.querySelector(".sidebar .menu ul li.active");
  if (activeItem) {
    const subMenu = activeItem.closest(".sub-menu");
    if (subMenu) {
      subMenu.style.display = "block";
      const parentMenu = subMenu.closest("li");
      parentMenu.classList.add("active");
    }
  }
});

