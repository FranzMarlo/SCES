$(".menu-btn").on("click", function (e) {
  e.stopPropagation();
  if ($(".module-dropdown-content").hasClass("show-modules")) {
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

$(".menu > ul > li").on("click", function (e) {
  $(this).toggleClass("active");
  $(this).siblings().removeClass("active");
  $(this).find("ul").slideToggle();
  $(this).siblings().find("ul").slideUp();
  $(this).siblings().find("ul").find("li").removeClass("active");
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
let openPopupMenu = null;

function subjectBtn(event, button) {
  event.preventDefault();
  event.stopPropagation();

  var subjectItem = button.closest(".subject-item");
  var popupMenu = subjectItem.querySelector(".popup-menu");

  if (openPopupMenu && openPopupMenu !== popupMenu) {
    openPopupMenu.classList.remove("show");
  }

  if (popupMenu) {
    popupMenu.classList.toggle("show");
    openPopupMenu = popupMenu.classList.contains("show") ? popupMenu : null;
  }

  document.addEventListener(
    "click",
    function (e) {
      if (!subjectItem.contains(e.target) && openPopupMenu) {
        openPopupMenu.classList.remove("show");
        openPopupMenu = null;
      }
    },
    { once: true }
  );
}

function hiddenLink(element) {
  var subjectItem = element.closest(".subject-item");
  var hiddenLink = subjectItem.querySelector(".hidden-link");

  if (hiddenLink) {
    hiddenLink.click(); // Trigger the hidden link click
  }
}

function toggleRecords(){
  const recordSection = document.getElementById("records");
  const profileSection = document.getElementById("profile");
  const analyticsSection = document.getElementById("analytics");

  recordSection.style.display = "flex";
  profileSection.style.display = "none";
  analyticsSection.style.display ="none";
}

function toggleProfile(){
  const recordSection = document.getElementById("records");
  const profileSection = document.getElementById("profile");
  const analyticsSection = document.getElementById("analytics");

  recordSection.style.display = "none";
  profileSection.style.display = "flex";
  analyticsSection.style.display ="none";
}

function toggleAnalytics() {
    const recordSection = document.getElementById("records");
    const profileSection = document.getElementById("profile");
    const analyticsSection = document.getElementById("analytics");

    recordSection.style.display = "none";
    profileSection.style.display = "none";
    analyticsSection.style.display = "flex";
}


document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', function() {
        const targetSection = this.getAttribute('data-target');
        if (targetSection === "analytics") {
            toggleAnalytics();
        } else if (targetSection === "profile") {
            toggleProfile();  // Your function to toggle profile section
        } else if (targetSection === "records") {
            toggleRecords();  // Your function to toggle records section
        }
    });
});

